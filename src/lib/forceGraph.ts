// A tiny, dependency-free force-directed simulation used to animate the ambient
// background graph. Kept pure and deterministic (no Math.random, no time reads
// inside `step`) so the physics can be unit-tested without a canvas. The Astro
// component owns seeding, drawing, and the animation loop.

export interface SimNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

export interface SimOptions {
  width: number;
  height: number;
  /** Rest length of each link. */
  linkDistance: number;
  /** How strongly links pull toward their rest length. */
  linkStrength: number;
  /** Repulsion coefficient between every pair of nodes. */
  charge: number;
  /** Velocity retained each tick (< 1 bleeds energy so motion stays calm). */
  damping: number;
  /** Gentle pull toward the viewport centre so nodes never drift off-screen. */
  centerStrength: number;
  /** Amplitude of the perpetual wander so the graph never fully settles. */
  wander: number;
  /** Speed of the wander oscillation. */
  wanderSpeed: number;
  /** Radius within which the cursor influences nodes. */
  pointerRadius: number;
  /** Peak strength of the cursor pull (at the cursor itself). */
  pointerStrength: number;
  /** Repulsion clamp so overlapping nodes don't launch apart. */
  minDistance: number;
}

export const DEFAULT_OPTIONS: Omit<SimOptions, 'width' | 'height'> = {
  linkDistance: 90,
  linkStrength: 0.03,
  charge: 260,
  damping: 0.86,
  centerStrength: 0.0015,
  wander: 0.06,
  wanderSpeed: 0.4,
  pointerRadius: 200,
  pointerStrength: 0.12,
  minDistance: 12,
};

export interface Simulation {
  nodes: SimNode[];
  edges: Array<{ source: number; target: number }>;
  options: SimOptions;
  step(pointer?: Pointer | null, t?: number): void;
}

export function createSimulation(
  nodes: Array<{ id: string; x: number; y: number }>,
  edges: Array<{ source: string; target: string }>,
  options: Partial<Omit<SimOptions, 'width' | 'height'>> & { width: number; height: number },
): Simulation {
  const opts: SimOptions = { ...DEFAULT_OPTIONS, ...options };
  const simNodes: SimNode[] = nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, vx: 0, vy: 0 }));

  const indexById = new Map(simNodes.map((n, i) => [n.id, i]));
  const simEdges = edges
    .map((e) => ({ source: indexById.get(e.source), target: indexById.get(e.target) }))
    .filter(
      (e): e is { source: number; target: number } =>
        e.source !== undefined && e.target !== undefined,
    );

  function step(pointer: Pointer | null = null, t = 0): void {
    const n = simNodes.length;
    const fx = new Array(n).fill(0);
    const fy = new Array(n).fill(0);
    const cx = opts.width / 2;
    const cy = opts.height / 2;

    // Repulsion between every pair of nodes.
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = simNodes[i].x - simNodes[j].x;
        const dy = simNodes[i].y - simNodes[j].y;
        let distSq = dx * dx + dy * dy;
        const minSq = opts.minDistance * opts.minDistance;
        if (distSq < minSq) distSq = minSq;
        const dist = Math.sqrt(distSq);
        const force = opts.charge / distSq;
        const ux = dx / dist;
        const uy = dy / dist;
        fx[i] += ux * force;
        fy[i] += uy * force;
        fx[j] -= ux * force;
        fy[j] -= uy * force;
      }
    }

    // Spring links pulling connected nodes toward the rest length.
    for (const e of simEdges) {
      const a = simNodes[e.source];
      const b = simNodes[e.target];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
      const diff = (dist - opts.linkDistance) * opts.linkStrength;
      const ux = dx / dist;
      const uy = dy / dist;
      fx[e.source] += ux * diff;
      fy[e.source] += uy * diff;
      fx[e.target] -= ux * diff;
      fy[e.target] -= uy * diff;
    }

    for (let i = 0; i < n; i++) {
      // Keep the cloud roughly centred.
      fx[i] += (cx - simNodes[i].x) * opts.centerStrength;
      fy[i] += (cy - simNodes[i].y) * opts.centerStrength;

      // Perpetual gentle drift, phase-offset per node so they don't move in unison.
      fx[i] += Math.cos(t * opts.wanderSpeed + i * 1.7) * opts.wander;
      fy[i] += Math.sin(t * opts.wanderSpeed + i * 2.3) * opts.wander;

      // Cursor attraction: strongest at the cursor, fading to zero at the radius.
      if (pointer && pointer.active) {
        const dx = pointer.x - simNodes[i].x;
        const dy = pointer.y - simNodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        if (dist < opts.pointerRadius) {
          const strength = (1 - dist / opts.pointerRadius) * opts.pointerStrength;
          fx[i] += (dx / dist) * strength;
          fy[i] += (dy / dist) * strength;
        }
      }
    }

    // Integrate: apply forces to velocity, damp, then move.
    for (let i = 0; i < n; i++) {
      const node = simNodes[i];
      node.vx = (node.vx + fx[i]) * opts.damping;
      node.vy = (node.vy + fy[i]) * opts.damping;
      node.x += node.vx;
      node.y += node.vy;
    }
  }

  return { nodes: simNodes, edges: simEdges, options: opts, step };
}
