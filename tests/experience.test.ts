import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Experience from '../src/components/Experience.astro';
import { roles } from '../src/data/experience';

test('experience lists the roles with quantified wins', async () => {
  expect(roles.length).toBeGreaterThanOrEqual(2);
  const container = await AstroContainer.create();
  const html = await container.renderToString(Experience);

  expect(html).toContain('id="experience"');
  expect(html).toContain('Tec Systems Engineering');
  expect(html).toContain('Jun 2022');
  expect(html).toContain('microservices');
  expect(html).toContain('30%');
  expect(html).toContain('One-Sky-Solutions');
  expect(html).toContain('92%');
  expect(html).toContain('UNSW');
});
