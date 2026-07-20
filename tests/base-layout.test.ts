import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import BaseLayout from '../src/layouts/BaseLayout.astro';

test('BaseLayout renders an English html document with the default title', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(BaseLayout);

  expect(html).toContain('<html lang="en"');
  expect(html).toContain('Marco Bustaffa | AI Engineer &amp; Data Scientist');
  expect(html).toContain('<meta name="description"');
});
