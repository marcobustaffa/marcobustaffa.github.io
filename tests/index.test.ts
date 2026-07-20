import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from '../src/components/Nav.astro';
import Hero from '../src/components/Hero.astro';
import About from '../src/components/About.astro';
import Projects from '../src/components/Projects.astro';
import Experience from '../src/components/Experience.astro';
import Skills from '../src/components/Skills.astro';
import Contact from '../src/components/Contact.astro';

test('every anchored section id exists so nav links resolve', async () => {
  const container = await AstroContainer.create();
  const components = [Nav, Hero, About, Projects, Experience, Skills, Contact];
  const rendered = (await Promise.all(components.map((c) => container.renderToString(c)))).join('');

  for (const id of ['top', 'about', 'projects', 'experience', 'skills', 'contact']) {
    expect(rendered).toContain(`id="${id}"`);
  }
});
