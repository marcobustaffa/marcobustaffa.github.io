import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Hero from '../src/components/Hero.astro';

test('Hero shows name, positioning, pitch, and the right links', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Hero);

  expect(html).toContain('Marco Bustaffa');
  expect(html).toContain('AI Engineer');
  expect(html).toContain('Data Scientist');
  expect(html).toContain('intelligent systems end-to-end');
  expect(html).toContain('href="https://github.com/marcobustaffa"');
  expect(html).toContain('href="https://www.linkedin.com/in/marco-bustaffa"');
  expect(html).toContain('href="mailto:m.bustaffa@gmail.com"');
  expect(html).toContain('href="#projects"');
  expect(html).toContain('/cv/Marco_Bustaffa_CV.pdf');
});
