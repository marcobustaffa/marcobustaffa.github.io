import { expect, test } from 'vitest';
import { networkNodes, networkEdges } from '../src/data/network';

test('node ids are unique', () => {
  const ids = networkNodes.map((n) => n.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('every edge references existing nodes', () => {
  const ids = new Set(networkNodes.map((n) => n.id));
  for (const edge of networkEdges) {
    expect(ids.has(edge.source)).toBe(true);
    expect(ids.has(edge.target)).toBe(true);
  }
});

test('graph is connected (no orphan nodes)', () => {
  const linked = new Set<string>();
  for (const edge of networkEdges) {
    linked.add(edge.source);
    linked.add(edge.target);
  }
  for (const node of networkNodes) {
    expect(linked.has(node.id)).toBe(true);
  }
});

test('labels cover the three skill clusters', () => {
  const labels = networkNodes.map((n) => n.label);
  for (const label of ['Python', 'PPO', 'Spiking NN', 'Hadoop']) {
    expect(labels).toContain(label);
  }
});
