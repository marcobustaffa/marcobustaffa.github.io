import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Skills from '../src/components/Skills.astro';
import { skillGroups } from '../src/data/skills';

// Astro escapes `&` to `&amp;` in rendered text.
const esc = (s: string) => s.replace(/&/g, '&amp;');

test('skills render every group and key items', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Skills);

  expect(html).toContain('id="skills"');
  for (const group of skillGroups) {
    expect(html).toContain(esc(group.label));
  }
  for (const key of ['Python', 'Deep Reinforcement Learning', 'LLMs & RAG', 'Apache Hadoop']) {
    expect(html).toContain(esc(key));
  }
});
