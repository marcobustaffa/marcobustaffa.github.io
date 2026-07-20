import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Contact from '../src/components/Contact.astro';

test('Contact renders email, socials, CV, and a footer', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Contact);

  expect(html).toContain('id="contact"');
  expect(html).toContain('href="mailto:m.bustaffa@gmail.com"');
  expect(html).toContain('href="https://github.com/marcobustaffa"');
  expect(html).toContain('href="https://www.linkedin.com/in/marco-bustaffa"');
  expect(html).toContain('/cv/Marco_Bustaffa_CV.pdf');
  expect(html).toContain('<footer');
});
