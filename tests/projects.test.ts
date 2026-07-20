import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Projects from '../src/components/Projects.astro';
import { projects } from '../src/data/projects';

test('there are four featured projects, AnyLight first', () => {
  expect(projects).toHaveLength(4);
  expect(projects[0].title).toBe('AnyLight');
});

test('Projects section renders every project with its stack', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Projects);

  expect(html).toContain('id="projects"');
  for (const p of projects) {
    expect(html).toContain(p.title);
    expect(html).toContain(p.stack[0]);
  }
  // AnyLight highlights the international collaboration.
  expect(html).toContain('UNSW');
  // The Tecsen data project carries its hard numbers.
  expect(html).toContain('70%');
});

test('a project with a repo renders a code link', async () => {
  const container = await AstroContainer.create();
  const withRepo = projects.find((p) => p.repo)!;
  const html = await container.renderToString(Projects);
  expect(html).toContain(`href="${withRepo.repo}"`);
});
