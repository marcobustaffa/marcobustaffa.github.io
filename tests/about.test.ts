import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import About from '../src/components/About.astro';

test('About renders the narrative and education facts', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(About);

  expect(html).toContain('id="about"');
  expect(html).toContain('Bachelor in Computer Science');
  expect(html).toContain('Master in Data Science');
  expect(html).toContain('Research practicum');
  expect(html).toContain('University of Padova');
  expect(html).toContain('92%');
  expect(html).toContain('UNSW');
  expect(html).toContain('TOEFL iBT');
});
