import { expect, test } from 'vitest';
import { createSimulation } from '../src/lib/forceGraph';

// Options that silence every force except the one under test, so a single step
// is deterministic and easy to reason about.
const QUIET = {
  width: 1000,
  height: 1000,
  charge: 0,
  centerStrength: 0,
  wander: 0,
  linkStrength: 0,
};

test('with all forces disabled and no pointer, nodes stay put', () => {
  const sim = createSimulation(
    [{ id: 'a', x: 100, y: 100 }],
    [],
    { ...QUIET, pointerStrength: 0 },
  );
  sim.step(null, 0);
  expect(sim.nodes[0].x).toBe(100);
  expect(sim.nodes[0].y).toBe(100);
});

test('an active cursor pulls a nearby node toward it', () => {
  const sim = createSimulation(
    [{ id: 'a', x: 100, y: 100 }],
    [],
    { ...QUIET, pointerRadius: 200, pointerStrength: 0.2 },
  );
  sim.step({ x: 260, y: 100, active: true }, 0);
  // Node was pulled to the right (toward the cursor) and not vertically.
  expect(sim.nodes[0].x).toBeGreaterThan(100);
  expect(sim.nodes[0].y).toBeCloseTo(100, 5);
});

test('a node outside the cursor radius is not pulled', () => {
  const sim = createSimulation(
    [{ id: 'a', x: 100, y: 100 }],
    [],
    { ...QUIET, pointerRadius: 100, pointerStrength: 0.2 },
  );
  sim.step({ x: 400, y: 100, active: true }, 0);
  expect(sim.nodes[0].x).toBe(100);
});

test('a link draws two separated nodes closer together', () => {
  const sim = createSimulation(
    [
      { id: 'a', x: 0, y: 0 },
      { id: 'b', x: 400, y: 0 },
    ],
    [{ source: 'a', target: 'b' }],
    { ...QUIET, linkStrength: 0.1, linkDistance: 90, pointerStrength: 0 },
  );
  const before = sim.nodes[1].x - sim.nodes[0].x;
  sim.step(null, 0);
  const after = sim.nodes[1].x - sim.nodes[0].x;
  expect(after).toBeLessThan(before);
});
