import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import About from '../src/components/About.astro';

test('About renders the narrative and education facts', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(About);

  expect(html).toContain('id="about"');
  expect(html).toContain('University of Padova');
  expect(html).toContain('103/110');
  expect(html).toContain('UNSW');
  expect(html).toContain('TOEFL iBT');
});
