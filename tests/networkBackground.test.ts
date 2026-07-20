import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import NetworkBackground from '../src/components/NetworkBackground.astro';

test('renders a non-interactive, aria-hidden canvas', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(NetworkBackground);

  expect(html).toContain('<canvas');
  expect(html).toContain('id="network-bg"');
  expect(html).toContain('aria-hidden="true"');
});
