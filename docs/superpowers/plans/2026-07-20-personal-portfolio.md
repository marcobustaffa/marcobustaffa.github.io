# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Marco Bustaffa's single-page portfolio — a static Astro site styled as a "Refined Dev Terminal" that positions him as an AI Engineer & Data Scientist.

**Architecture:** One static Astro page (`index.astro`) assembled from focused section components. Content lives in typed data modules (`src/data/*.ts`) so copy is editable in one place and testable. A `BaseLayout` supplies `<head>`, self-hosted fonts, and global design tokens. Near-zero client JS. Deployed to GitHub Pages via GitHub Actions.

**Tech Stack:** Astro, TypeScript, plain scoped CSS + CSS custom properties, `@fontsource` (Inter + JetBrains Mono), Vitest with the Astro Container API for component tests, `@astrojs/check` for type checks.

## Global Constraints

- **Framework:** Astro (latest), TypeScript, npm. No Tailwind — plain scoped CSS + CSS custom properties.
- **Language:** English only.
- **Positioning (verbatim):** `AI Engineer & Data Scientist`.
- **Hero pitch (verbatim):** `I build intelligent systems end-to-end — from production backends to multi-agent reinforcement learning and LLM-powered products.`
- **Design tokens (verbatim):** `--bg:#0d1117` · `--surface:#131a24` · `--border:#22303f` · `--text:#f0f6fc` · `--text-muted:#9aa5b1` · `--accent:#5eead4` · `--accent-dim:#2dd4bf`.
- **Fonts:** Inter (headings/body), JetBrains Mono (labels/nav/accents), self-hosted via `@fontsource` — no external font requests.
- **Terminal motifs** used as accents only: `~/marco` prompt, mono uppercase section labels, blinking cursor on the name (disabled under `prefers-reduced-motion`).
- **Accessibility:** WCAG AA contrast, semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), full keyboard nav + visible focus, `prefers-reduced-motion` honored, site fully readable with JS disabled.
- **Excluded (YAGNI):** photo, X/Twitter link, blog, multi-page routing, contact form/backend, analytics, i18n.
- **NDA-safe defaults:** the legal-AI client is referred to generically ("a legal-services company") unless Marco says otherwise.
- **Deployment:** GitHub Pages, user-site repo `marcobustaffa.github.io` (base `/`).

## File Structure

```
personal_website/
├── package.json                     # deps + scripts (Task 1)
├── astro.config.mjs                 # site/base config (Tasks 1, 9)
├── tsconfig.json                    # strict TS (Task 1)
├── vitest.config.ts                 # Vitest via getViteConfig (Task 1)
├── .github/workflows/deploy.yml     # GitHub Pages CI (Task 9)
├── public/
│   ├── favicon.svg                  # terminal-prompt glyph (Task 8)
│   └── cv/Marco_Bustaffa_CV.pdf     # downloadable CV (Task 7)
├── src/
│   ├── styles/global.css            # tokens, reset, base type, utilities (Task 1)
│   ├── layouts/BaseLayout.astro     # <head>, fonts, meta, slot (Task 1)
│   ├── data/
│   │   ├── projects.ts              # Project[] (Task 4)
│   │   ├── experience.ts            # Role[] (Task 5)
│   │   └── skills.ts                # SkillGroup[] (Task 6)
│   ├── components/
│   │   ├── Nav.astro                # sticky top nav (Task 2)
│   │   ├── Hero.astro               # name, role, pitch, links, CTAs (Task 2)
│   │   ├── About.astro              # narrative + education (Task 3)
│   │   ├── ProjectCard.astro        # one project (Task 4)
│   │   ├── Projects.astro           # projects section (Task 4)
│   │   ├── Experience.astro         # timeline (Task 5)
│   │   ├── Skills.astro             # grouped skills (Task 6)
│   │   └── Contact.astro            # contact + footer (Task 7)
│   └── pages/index.astro            # assembles all sections (Tasks 1, 8)
└── tests/
    ├── base-layout.test.ts          # (Task 1)
    ├── hero.test.ts                 # (Task 2)
    ├── about.test.ts                # (Task 3)
    ├── projects.test.ts             # (Task 4)
    ├── experience.test.ts           # (Task 5)
    ├── skills.test.ts               # (Task 6)
    ├── contact.test.ts              # (Task 7)
    └── index.test.ts                # (Task 8)
```

**Testing approach.** Data-driven content (projects, experience, skills, contact links) is tested with the Astro Container API (`renderToString`) asserting the right content and correct `href`s render — this is where regressions hurt. Pure visual styling (spacing, colors, the terminal feel) is verified by eye in the dev server (`npm run dev`) and by a green `npm run build` + `npm run check`. Every task lists both.

---

### Task 1: Scaffold project, tooling, layout & design tokens

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`
- Create: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`
- Test: `tests/base-layout.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `BaseLayout.astro` — a layout accepting props `{ title?: string; description?: string }` and a default `<slot />`; imports `../styles/global.css` and both `@fontsource` packages. `global.css` exposes the design tokens on `:root` and utility classes `.container`, `.mono`, `.section-label`. Later tasks wrap page content in `<BaseLayout>` and use these tokens/classes.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "marco-portfolio",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@fontsource/inter": "^5.0.0",
    "@fontsource/jetbrains-mono": "^5.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, no errors. (If a version is unavailable, `npm install` will pick the nearest satisfying release — that's fine.)

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Create `astro.config.mjs`** (site/base filled in Task 9)

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  // `site` and `base` are set in Task 9 (deployment).
});
```

- [ ] **Step 5: Create `vitest.config.ts`**

```ts
/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
  },
});
```

- [ ] **Step 6: Create `src/styles/global.css`**

```css
:root {
  --bg: #0d1117;
  --surface: #131a24;
  --border: #22303f;
  --text: #f0f6fc;
  --text-muted: #9aa5b1;
  --accent: #5eead4;
  --accent-dim: #2dd4bf;

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  --maxw: 760px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; }
a:hover { color: var(--accent-dim); text-decoration: underline; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }

h1, h2, h3 { line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 0.6rem; }
p { margin: 0 0 1rem; }

.container { max-width: var(--maxw); margin-inline: auto; padding-inline: 1.25rem; }
.mono { font-family: var(--font-mono); }
.section-label {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 1rem;
}
section { padding-block: 3.5rem; }
section + section { border-top: 1px solid var(--border); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 7: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Marco Bustaffa — AI Engineer & Data Scientist',
  description = 'AI Engineer & Data Scientist. I build intelligent systems end-to-end — from production backends to multi-agent reinforcement learning and LLM-powered products.',
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:card" content="summary" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 8: Create a minimal `src/pages/index.astro`** (sections wired in later tasks)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
  <main class="container">
    <p class="section-label">~/marco</p>
    <h1>Marco Bustaffa</h1>
  </main>
</BaseLayout>
```

- [ ] **Step 9: Write the failing test `tests/base-layout.test.ts`**

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import BaseLayout from '../src/layouts/BaseLayout.astro';

test('BaseLayout renders an English html document with the default title', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(BaseLayout);

  expect(html).toContain('<html lang="en"');
  expect(html).toContain('Marco Bustaffa — AI Engineer &amp; Data Scientist');
  expect(html).toContain('<meta name="description"');
});
```

- [ ] **Step 10: Run the test to verify it passes**

Run: `npm test -- tests/base-layout.test.ts`
Expected: 1 passed. (If it fails on `&amp;`, it means the entity encoding differs — check the actual output and match it; Astro HTML-escapes `&` in text to `&amp;`.)

- [ ] **Step 11: Verify build + dev server**

Run: `npm run build && npm run check`
Expected: build succeeds, 0 type errors. Then `npm run dev` → open the printed localhost URL → a dark page with a teal `~/marco` label and "Marco Bustaffa" in Inter.

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src tests
git commit -m "feat: scaffold Astro project, layout, and design tokens"
```

---

### Task 2: Nav + Hero

**Files:**
- Create: `src/components/Nav.astro`, `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/hero.test.ts`

**Interfaces:**
- Consumes: `BaseLayout`, global tokens/classes from Task 1.
- Produces: `Nav.astro` (no props) and `Hero.astro` (no props). Hero renders an `<h1>` with the name, the role label, the pitch, and three links with hrefs `https://github.com/marcobustaffa`, `https://www.linkedin.com/in/marco-bustaffa`, `mailto:m.bustaffa@gmail.com`, plus a `#projects` "View work" CTA and a `/cv/Marco_Bustaffa_CV.pdf` "CV" link.

- [ ] **Step 1: Write the failing test `tests/hero.test.ts`**

```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/hero.test.ts`
Expected: FAIL — cannot resolve `../src/components/Hero.astro`.

- [ ] **Step 3: Create `src/components/Hero.astro`**

```astro
---
// Hero: the 5-second hook.
---
<section id="top" class="hero">
  <div class="container">
    <p class="section-label">~/marco</p>
    <p class="role mono">AI Engineer &amp; Data Scientist</p>
    <h1>Marco Bustaffa<span class="cursor" aria-hidden="true">_</span></h1>
    <p class="pitch">
      I build intelligent systems end-to-end — from production backends to
      multi-agent reinforcement learning and LLM-powered products.
    </p>
    <div class="actions">
      <a class="btn primary" href="#projects">View work ↓</a>
      <a class="btn" href="/cv/Marco_Bustaffa_CV.pdf">Download CV</a>
    </div>
    <ul class="links" aria-label="Profiles">
      <li><a href="https://github.com/marcobustaffa">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/marco-bustaffa">LinkedIn</a></li>
      <li><a href="mailto:m.bustaffa@gmail.com">Email</a></li>
    </ul>
  </div>
</section>

<style>
  .hero { padding-block: 5rem 4rem; }
  .role { color: var(--accent); font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.75rem; }
  h1 { font-size: clamp(2.4rem, 7vw, 3.6rem); font-weight: 700; }
  .cursor { color: var(--accent); font-weight: 400; animation: blink 1.1s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  .pitch { color: var(--text-muted); font-size: 1.15rem; max-width: 34rem; margin-top: 0.75rem; }
  .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1.75rem 0 1.5rem; }
  .btn {
    font-family: var(--font-mono); font-size: 0.9rem;
    padding: 0.6rem 1.1rem; border: 1px solid var(--border);
    border-radius: 6px; color: var(--text);
  }
  .btn:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
  .btn.primary { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 500; }
  .btn.primary:hover { background: var(--accent-dim); color: var(--bg); }
  .links { display: flex; gap: 1.25rem; list-style: none; padding: 0; margin: 0; font-family: var(--font-mono); font-size: 0.9rem; }
</style>
```

- [ ] **Step 4: Create `src/components/Nav.astro`**

```astro
---
// Sticky top nav with terminal prompt branding.
---
<header class="nav">
  <div class="container nav-inner">
    <a class="brand mono" href="#top">~/marco</a>
    <nav aria-label="Primary">
      <a href="#projects">work</a>
      <a href="#about">about</a>
      <a href="#contact">contact</a>
    </nav>
  </div>
</header>

<style>
  .nav {
    position: sticky; top: 0; z-index: 10;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; padding-block: 0.85rem; }
  .brand { color: var(--accent); font-size: 0.95rem; }
  .brand:hover { text-decoration: none; }
  nav { display: flex; gap: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem; }
  nav a { color: var(--text-muted); }
  nav a:hover { color: var(--accent); text-decoration: none; }
</style>
```

- [ ] **Step 5: Wire Nav + Hero into `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout>
  <Nav />
  <main>
    <Hero />
  </main>
</BaseLayout>
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- tests/hero.test.ts`
Expected: PASS.

- [ ] **Step 7: Visual verification**

Run: `npm run dev` → the hero shows the role label, big name with a blinking teal cursor, the pitch, two buttons, and three profile links. Resize the window narrow — text and buttons wrap cleanly, no horizontal scroll. The sticky nav stays on top when scrolling.

- [ ] **Step 8: Commit**

```bash
git add src/components/Nav.astro src/components/Hero.astro src/pages/index.astro tests/hero.test.ts
git commit -m "feat: add nav and hero"
```

---

### Task 3: About

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/about.test.ts`

**Interfaces:**
- Consumes: global tokens/classes.
- Produces: `About.astro` (no props) rendering a `<section id="about">` with the narrative and education facts.

- [ ] **Step 1: Write the failing test `tests/about.test.ts`**

```ts
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
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/about.test.ts`
Expected: FAIL — cannot resolve `About.astro`.

- [ ] **Step 3: Create `src/components/About.astro`** (copy is final — use verbatim)

```astro
---
// About: the narrative thread.
---
<section id="about" class="about">
  <div class="container">
    <p class="section-label">// about</p>
    <p>
      I'm an AI Engineer and Data Scientist with a Computer Science bachelor's
      (103/110) and a Data Science master's from the <strong>University of Padova</strong>.
      I work on intelligent systems across the whole stack — from the production
      backend that keeps them running to the frontier ML that makes them smart.
    </p>
    <p>
      That combination runs through everything I've built. At Tec Systems
      Engineering I wrote Java backends and drove a cloud-native migration for
      traffic-control software; for my master's thesis — carried out at the
      <strong>UNSW AI Institute in Sydney</strong> — I designed <em>AnyLight</em>, a
      multi-agent reinforcement-learning system that coordinates whole networks of
      traffic signals; and as a consultant I shipped an LLM pipeline that automates
      legal document work.
    </p>
    <p>
      I'm looking for a role at an innovative company or startup where I can keep
      shipping AI end-to-end and grow fast. If that sounds like your team,
      <a href="#contact">let's talk</a>.
    </p>
  </div>
</section>

<style>
  .about p { max-width: 40rem; color: var(--text); }
  .about strong { color: var(--text); }
  .about em { color: var(--accent); font-style: normal; }
</style>
```

- [ ] **Step 4: Add `<About />` to `src/pages/index.astro`**

Insert the import `import About from '../components/About.astro';` with the other imports, and place `<About />` after `<Hero />` inside `<main>`:

```astro
  <main>
    <Hero />
    <About />
  </main>
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- tests/about.test.ts`
Expected: PASS.

- [ ] **Step 6: Visual verification**

Run: `npm run dev` → the About section reads clearly, `AnyLight` and key phrases show the teal accent, "let's talk" links to contact.

- [ ] **Step 7: Commit**

```bash
git add src/components/About.astro src/pages/index.astro tests/about.test.ts
git commit -m "feat: add about section"
```

---

### Task 4: Featured Projects (data + card + section)

**Files:**
- Create: `src/data/projects.ts`, `src/components/ProjectCard.astro`, `src/components/Projects.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/projects.test.ts`

**Interfaces:**
- Consumes: global tokens/classes.
- Produces:
  - `src/data/projects.ts` exports `interface Project { title: string; subtitle: string; summary: string; stack: string[]; repo?: string; }` and `export const projects: Project[]`.
  - `ProjectCard.astro` props: `{ project: Project }`. Renders title, subtitle, summary, stack chips, and — only when `project.repo` is set — a "View code ↗" link to that URL.
  - `Projects.astro` (no props) renders `<section id="projects">` mapping `projects` to `ProjectCard`.

- [ ] **Step 1: Write the failing test `tests/projects.test.ts`**

```ts
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
  // AnyLight highlights the international collaboration and its numbers-free claim.
  expect(html).toContain('UNSW');
  // The Tecsen data project carries its hard numbers.
  expect(html).toContain('70%');
});

test('a project with a repo renders a code link; one without does not force it', async () => {
  const container = await AstroContainer.create();
  const withRepo = projects.find((p) => p.repo)!;
  const html = await container.renderToString(Projects);
  expect(html).toContain(`href="${withRepo.repo}"`);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/projects.test.ts`
Expected: FAIL — cannot resolve `../src/data/projects`.

- [ ] **Step 3: Create `src/data/projects.ts`**

> Note: `AnyLight.repo` and the legal project are left without a `repo` link pending confirmation (see plan "Content to confirm"). `env-soundnet` links to the public GitHub repo. Adjust stack tags for the legal project once confirmed.

```ts
export interface Project {
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  repo?: string;
}

export const projects: Project[] = [
  {
    title: 'AnyLight',
    subtitle: 'MSc Thesis · University of Padova × UNSW Sydney',
    summary:
      'A generalizable multi-agent reinforcement-learning architecture for heterogeneous traffic-signal control. A movement-centric state representation and universal parameter-sharing let a single PPO network govern intersections of any shape, while a cross-attention decoder and centralized critic (CTDE) exploit neighbour information. Evaluated on six synthetic and real-world networks (RESCO / MA2C), it beats classical heuristics and RL baselines by cutting intersection delay under heavy traffic. Research conducted at the UNSW AI Institute in Sydney.',
    stack: ['Python', 'PyTorch', 'PPO / Actor-Critic', 'Cross-Attention', 'SUMO / TraCI'],
  },
  {
    title: 'Legal AI Pipeline',
    subtitle: 'AI Consultancy · 3-month engagement',
    summary:
      'Designed and built an LLM-powered pipeline for a legal-services company to automate legal procedures and document drafting/redaction — combining retrieval, structured extraction, and evaluation/observability to keep outputs reliable on sensitive documents.',
    stack: ['Python', 'LLMs', 'RAG', 'Evals / Langfuse'],
  },
  {
    title: 'env-soundnet',
    subtitle: 'Deep Learning · Research project',
    summary:
      'Environmental sound classification using Spiking Neural Networks (SNNs) — an energy-efficient, biologically-inspired alternative to standard deep nets. A study in applying non-mainstream architectures to real audio-recognition tasks.',
    stack: ['Python', 'PyTorch', 'Spiking Neural Networks'],
    repo: 'https://github.com/marcobustaffa/env-soundnet',
  },
  {
    title: 'Hadoop / Parquet Migration',
    subtitle: 'Tec Systems Engineering · R&D',
    summary:
      'Re-architected file storage onto Hadoop HDFS using the Apache Parquet columnar format for a traffic-software platform — reducing storage footprint by more than 70% and improving query speed by 30%.',
    stack: ['Java', 'Apache Hadoop (HDFS)', 'Apache Parquet'],
  },
];
```

- [ ] **Step 4: Create `src/components/ProjectCard.astro`**

```astro
---
import type { Project } from '../data/projects';

interface Props { project: Project; }
const { project } = Astro.props;
---
<article class="card">
  <header>
    <h3>{project.title}</h3>
    <p class="subtitle mono">{project.subtitle}</p>
  </header>
  <p class="summary">{project.summary}</p>
  <ul class="stack" aria-label="Tech stack">
    {project.stack.map((tech) => <li class="chip mono">{tech}</li>)}
  </ul>
  {project.repo && (
    <a class="code-link mono" href={project.repo}>View code ↗</a>
  )}
</article>

<style>
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.5rem;
  }
  .card:hover { border-color: color-mix(in srgb, var(--accent) 45%, var(--border)); }
  h3 { font-size: 1.3rem; margin-bottom: 0.2rem; }
  .subtitle { color: var(--accent); font-size: 0.78rem; letter-spacing: 0.03em; margin: 0 0 0.9rem; }
  .summary { color: var(--text-muted); margin-bottom: 1rem; }
  .stack { display: flex; flex-wrap: wrap; gap: 0.4rem; list-style: none; padding: 0; margin: 0; }
  .chip {
    font-size: 0.72rem; color: var(--text-muted);
    border: 1px solid var(--border); border-radius: 999px;
    padding: 0.2rem 0.6rem;
  }
  .code-link { display: inline-block; margin-top: 1rem; font-size: 0.85rem; }
</style>
```

- [ ] **Step 5: Create `src/components/Projects.astro`**

```astro
---
import ProjectCard from './ProjectCard.astro';
import { projects } from '../data/projects';
---
<section id="projects" class="projects">
  <div class="container">
    <p class="section-label">// featured work</p>
    <div class="grid">
      {projects.map((project) => <ProjectCard project={project} />)}
    </div>
  </div>
</section>

<style>
  .grid { display: grid; gap: 1.25rem; }
  @media (min-width: 640px) { .grid { grid-template-columns: 1fr 1fr; } }
</style>
```

- [ ] **Step 6: Add `<Projects />` to `src/pages/index.astro`**

Add `import Projects from '../components/Projects.astro';` and place `<Projects />` after `<About />`.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test -- tests/projects.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 8: Visual verification**

Run: `npm run dev` → four project cards in a 2-column grid (single column on mobile), stack chips, and a "View code ↗" link only on env-soundnet.

- [ ] **Step 9: Commit**

```bash
git add src/data/projects.ts src/components/ProjectCard.astro src/components/Projects.astro src/pages/index.astro tests/projects.test.ts
git commit -m "feat: add featured projects section"
```

---

### Task 5: Experience timeline

**Files:**
- Create: `src/data/experience.ts`, `src/components/Experience.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/experience.test.ts`

**Interfaces:**
- Consumes: global tokens/classes.
- Produces:
  - `src/data/experience.ts` exports `interface Role { title: string; org: string; period: string; highlights: string[]; }` and `export const roles: Role[]`.
  - `Experience.astro` (no props) renders `<section id="experience">` listing each role with its period and highlights.

- [ ] **Step 1: Write the failing test `tests/experience.test.ts`**

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Experience from '../src/components/Experience.astro';
import { roles } from '../src/data/experience';

test('experience lists both roles with quantified wins', async () => {
  expect(roles.length).toBeGreaterThanOrEqual(2);
  const container = await AstroContainer.create();
  const html = await container.renderToString(Experience);

  expect(html).toContain('id="experience"');
  expect(html).toContain('Tec Systems Engineering');
  expect(html).toContain('Jun 2021');
  expect(html).toContain('microservices');
  expect(html).toContain('30%'); // Hadoop/Parquet + cloud-native metrics
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/experience.test.ts`
Expected: FAIL — cannot resolve `../src/data/experience`.

- [ ] **Step 3: Create `src/data/experience.ts`**

```ts
export interface Role {
  title: string;
  org: string;
  period: string;
  highlights: string[];
}

export const roles: Role[] = [
  {
    title: 'Software Developer (Backend)',
    org: 'Tec Systems Engineering (Tecsen)',
    period: 'Jun 2021 – Oct 2022',
    highlights: [
      'Built and maintained Java backend modules powering core traffic-software operations.',
      'Drove the company’s cloud-native strategy — a monolith-to-microservices roadmap projected to cut maintenance cost 20% and raise availability and scalability 30%.',
      'With the Head of R&D, migrated file storage to Hadoop HDFS + Apache Parquet: 70%+ less storage, 30% faster queries.',
      'Built a data-exchange module for vehicular-traffic data between Tecsen and Enel X.',
      'Maintained and optimised an OpenVPN network for secure cross-system communication.',
    ],
  },
  {
    title: 'AI Engineer (Consultant)',
    org: 'Legal-services company',
    period: '3-month engagement',
    highlights: [
      'Designed and built an LLM pipeline to automate legal procedures and document drafting/redaction, with evaluation and observability to keep outputs reliable.',
    ],
  },
];
```

- [ ] **Step 4: Create `src/components/Experience.astro`**

```astro
---
import { roles } from '../data/experience';
---
<section id="experience" class="experience">
  <div class="container">
    <p class="section-label">// experience</p>
    <ol class="timeline">
      {roles.map((role) => (
        <li class="role">
          <div class="role-head">
            <h3>{role.title}</h3>
            <span class="period mono">{role.period}</span>
          </div>
          <p class="org mono">{role.org}</p>
          <ul class="highlights">
            {role.highlights.map((h) => <li>{h}</li>)}
          </ul>
        </li>
      ))}
    </ol>
  </div>
</section>

<style>
  .timeline { list-style: none; padding: 0; margin: 0; display: grid; gap: 2rem; }
  .role-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.25rem 1rem; align-items: baseline; }
  h3 { font-size: 1.15rem; margin: 0; }
  .period { color: var(--text-muted); font-size: 0.8rem; }
  .org { color: var(--accent); font-size: 0.85rem; margin: 0.15rem 0 0.75rem; }
  .highlights { color: var(--text-muted); margin: 0; padding-left: 1.1rem; display: grid; gap: 0.4rem; }
  .highlights li::marker { color: var(--accent); }
</style>
```

- [ ] **Step 5: Add `<Experience />` to `src/pages/index.astro`**

Add `import Experience from '../components/Experience.astro';` and place `<Experience />` after `<Projects />`.

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- tests/experience.test.ts`
Expected: PASS.

- [ ] **Step 7: Visual verification**

Run: `npm run dev` → two roles, each with title + period on one row, teal org line, and bulleted highlights with teal markers.

- [ ] **Step 8: Commit**

```bash
git add src/data/experience.ts src/components/Experience.astro src/pages/index.astro tests/experience.test.ts
git commit -m "feat: add experience timeline"
```

---

### Task 6: Skills

**Files:**
- Create: `src/data/skills.ts`, `src/components/Skills.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/skills.test.ts`

**Interfaces:**
- Consumes: global tokens/classes.
- Produces:
  - `src/data/skills.ts` exports `interface SkillGroup { label: string; items: string[]; }` and `export const skillGroups: SkillGroup[]`.
  - `Skills.astro` (no props) renders `<section id="skills">` with each group and its chips.

- [ ] **Step 1: Write the failing test `tests/skills.test.ts`**

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Skills from '../src/components/Skills.astro';
import { skillGroups } from '../src/data/skills';

test('skills render every group and key items', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Skills);

  expect(html).toContain('id="skills"');
  for (const group of skillGroups) {
    expect(html).toContain(group.label);
  }
  for (const key of ['Python', 'Deep Reinforcement Learning', 'LLMs & RAG', 'Apache Hadoop']) {
    expect(html).toContain(key);
  }
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/skills.test.ts`
Expected: FAIL — cannot resolve `../src/data/skills`.

- [ ] **Step 3: Create `src/data/skills.ts`**

```ts
export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'SQL', 'C++', 'JavaScript'],
  },
  {
    label: 'ML / AI',
    items: [
      'Deep Reinforcement Learning',
      'Multi-Agent RL',
      'LLMs & RAG',
      'LLM Evals & Observability (Langfuse)',
      'Spiking Neural Networks',
      'PyTorch',
    ],
  },
  {
    label: 'Data & Infra',
    items: ['Apache Hadoop', 'Apache Spark', 'Apache Parquet', 'MongoDB', 'InfluxDB', 'Docker'],
  },
  {
    label: 'Tools & Foundations',
    items: ['Git', 'Linux', 'R', 'Cloud-Native / Microservices'],
  },
];
```

- [ ] **Step 4: Create `src/components/Skills.astro`**

```astro
---
import { skillGroups } from '../data/skills';
---
<section id="skills" class="skills">
  <div class="container">
    <p class="section-label">// skills</p>
    <div class="groups">
      {skillGroups.map((group) => (
        <div class="group">
          <h3 class="mono">{group.label}</h3>
          <ul>
            {group.items.map((item) => <li class="chip mono">{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .groups { display: grid; gap: 1.75rem; }
  @media (min-width: 640px) { .groups { grid-template-columns: 1fr 1fr; } }
  .group h3 { font-size: 0.8rem; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .group ul { display: flex; flex-wrap: wrap; gap: 0.4rem; list-style: none; padding: 0; margin: 0; }
  .chip { font-size: 0.78rem; color: var(--text); border: 1px solid var(--border); border-radius: 6px; padding: 0.3rem 0.65rem; background: var(--surface); }
</style>
```

- [ ] **Step 5: Add `<Skills />` to `src/pages/index.astro`**

Add `import Skills from '../components/Skills.astro';` and place `<Skills />` after `<Experience />`.

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- tests/skills.test.ts`
Expected: PASS.

- [ ] **Step 7: Visual verification**

Run: `npm run dev` → four skill groups (two columns on desktop), each a mono heading with wrapped chips.

- [ ] **Step 8: Commit**

```bash
git add src/data/skills.ts src/components/Skills.astro src/pages/index.astro tests/skills.test.ts
git commit -m "feat: add skills section"
```

---

### Task 7: Contact + footer (+ CV asset)

**Files:**
- Create: `src/components/Contact.astro`, `public/cv/Marco_Bustaffa_CV.pdf`
- Modify: `src/pages/index.astro`
- Test: `tests/contact.test.ts`

**Interfaces:**
- Consumes: global tokens/classes.
- Produces: `Contact.astro` (no props) rendering `<section id="contact">` plus a `<footer>`; contains email, GitHub, LinkedIn, and CV-download links.

- [ ] **Step 1: Copy the CV into `public/`**

Run:
```bash
mkdir -p public/cv
cp ../../CV/Marco_Bustaffa_CV_Long.pdf public/cv/Marco_Bustaffa_CV.pdf
```
Expected: `public/cv/Marco_Bustaffa_CV.pdf` exists.
(See "Content to confirm" — Marco may want to update the CV to the new AI-Engineer positioning before this ships.)

- [ ] **Step 2: Write the failing test `tests/contact.test.ts`**

```ts
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
```

- [ ] **Step 3: Run to verify it fails**

Run: `npm test -- tests/contact.test.ts`
Expected: FAIL — cannot resolve `Contact.astro`.

- [ ] **Step 4: Create `src/components/Contact.astro`**

```astro
---
const year = new Date().getFullYear();
---
<section id="contact" class="contact">
  <div class="container">
    <p class="section-label">// contact</p>
    <h2>Let's build something.</h2>
    <p class="lead">
      Open to AI/ML roles at innovative companies and startups. The fastest way to
      reach me is email.
    </p>
    <ul class="links" aria-label="Contact links">
      <li><a href="mailto:m.bustaffa@gmail.com">m.bustaffa@gmail.com</a></li>
      <li><a href="https://github.com/marcobustaffa">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/marco-bustaffa">LinkedIn</a></li>
      <li><a href="/cv/Marco_Bustaffa_CV.pdf">Download CV</a></li>
    </ul>
  </div>
  <footer class="footer">
    <div class="container mono">
      <span>built with Astro</span>
      <span>© {year} Marco Bustaffa</span>
    </div>
  </footer>
</section>

<style>
  h2 { font-size: clamp(1.8rem, 5vw, 2.4rem); }
  .lead { color: var(--text-muted); max-width: 34rem; }
  .links { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; list-style: none; padding: 0; margin: 1.5rem 0 0; font-family: var(--font-mono); font-size: 0.9rem; }
  .footer { margin-top: 3.5rem; border-top: 1px solid var(--border); padding-top: 1.5rem; }
  .footer .container { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; color: var(--text-muted); font-size: 0.78rem; }
  .contact { padding-bottom: 2rem; }
</style>
```

- [ ] **Step 5: Add `<Contact />` to `src/pages/index.astro`** (last section, inside `<main>`)

Add `import Contact from '../components/Contact.astro';` and place `<Contact />` after `<Skills />`.

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- tests/contact.test.ts`
Expected: PASS.

- [ ] **Step 7: Visual verification**

Run: `npm run dev` → contact heading, links row (email, GitHub, LinkedIn, CV), and a mono footer. Click "Download CV" → the PDF opens.

- [ ] **Step 8: Commit**

```bash
git add public/cv/Marco_Bustaffa_CV.pdf src/components/Contact.astro src/pages/index.astro tests/contact.test.ts
git commit -m "feat: add contact section, footer, and CV download"
```

---

### Task 8: Assemble, polish, and page-level checks

**Files:**
- Create: `public/favicon.svg`
- Modify: `src/pages/index.astro` (final assembled form), `src/styles/global.css` (only if a fix is needed)
- Test: `tests/index.test.ts`

**Interfaces:**
- Consumes: all section components.
- Produces: the final `index.astro` containing all sections in order with all anchor ids present.

- [ ] **Step 1: Confirm final `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Projects from '../components/Projects.astro';
import Experience from '../components/Experience.astro';
import Skills from '../components/Skills.astro';
import Contact from '../components/Contact.astro';
---

<BaseLayout>
  <Nav />
  <main>
    <Hero />
    <About />
    <Projects />
    <Experience />
    <Skills />
    <Contact />
  </main>
</BaseLayout>
```

- [ ] **Step 2: Create `public/favicon.svg`** (terminal-prompt glyph in brand teal)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0d1117"/>
  <path d="M8 11l5 5-5 5" fill="none" stroke="#5eead4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="15" y1="22" x2="23" y2="22" stroke="#5eead4" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 3: Write the page integration test `tests/index.test.ts`**

```ts
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
  const html = [Nav, Hero, About, Projects, Experience, Skills, Contact];
  const rendered = (await Promise.all(html.map((c) => container.renderToString(c)))).join('');

  for (const id of ['top', 'about', 'projects', 'experience', 'skills', 'contact']) {
    expect(rendered).toContain(`id="${id}"`);
  }
});
```

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all test files pass.

- [ ] **Step 5: Type-check and build**

Run: `npm run check && npm run build`
Expected: 0 type errors; `dist/` produced with no build errors.

- [ ] **Step 6: Preview the production build + polish pass**

Run: `npm run preview` → open the URL and verify:
- No horizontal scroll at 360px width; all sections stack cleanly.
- Nav links jump to each section; the sticky nav doesn't cover headings awkwardly.
- Tab through the page: every link shows a visible teal focus ring.
- In the OS, enable "Reduce motion" and reload → the cursor stops blinking and scrolling is instant.
- Fix any spacing/contrast issue in the relevant component's scoped `<style>` (or `global.css`) and re-run `npm run build`.

- [ ] **Step 7: (Optional) Lighthouse check**

In Chrome DevTools → Lighthouse → run on the `npm run preview` URL. Target ~100 on Accessibility/Best-Practices/SEO and high Performance. Address any flagged contrast/label issue.

- [ ] **Step 8: Commit**

```bash
git add public/favicon.svg src/pages/index.astro tests/index.test.ts src/styles/global.css
git commit -m "feat: assemble full page, add favicon, and polish"
```

---

### Task 9: Deploy to GitHub Pages

**Files:**
- Modify: `astro.config.mjs`
- Create: `.github/workflows/deploy.yml`, `README.md`

**Interfaces:**
- Consumes: the built site from `npm run build`.
- Produces: a CI workflow that builds and publishes to GitHub Pages on push to `main`.

- [ ] **Step 1: Set `site` in `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://marcobustaffa.github.io',
  // User-site repo (marcobustaffa.github.io) serves at the root, so no `base` needed.
});
```

- [ ] **Step 2: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build Astro site
        uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Create `README.md`**

```markdown
# marcobustaffa.github.io

Personal portfolio — built with [Astro](https://astro.build).

## Develop
```bash
npm install
npm run dev      # local dev server
npm test         # component tests (Vitest)
npm run check    # type check
npm run build    # production build to dist/
```

## Deploy
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. In the repo: **Settings → Pages → Build and
deployment → Source: GitHub Actions** (one-time setup).
```

- [ ] **Step 4: Verify the production build once more**

Run: `npm run build`
Expected: success (this is what CI runs).

- [ ] **Step 5: Commit**

```bash
git add astro.config.mjs .github/workflows/deploy.yml README.md
git commit -m "chore: configure GitHub Pages deployment"
```

- [ ] **Step 6: Publish (manual, done with Marco)**

These steps need Marco's GitHub account and are run together, not by an agent:
1. Create a public repo named exactly **`marcobustaffa.github.io`** on GitHub.
2. `git remote add origin https://github.com/marcobustaffa/marcobustaffa.github.io.git`
3. `git push -u origin main`
4. Repo **Settings → Pages → Source: GitHub Actions**.
5. Wait for the Action to finish, then open `https://marcobustaffa.github.io`.

---

## Content to confirm (non-blocking — resolve with Marco while building)

- **AnyLight repo link:** is the thesis code public/linkable? If yes, add `repo` to the AnyLight entry in `projects.ts`.
- **Legal AI stack tags:** confirm the real stack (framework, model provider, whether RAG/agents/Langfuse are accurate) and adjust `projects.ts` + `experience.ts`.
- **Legal client naming:** currently generic ("a legal-services company"). Name it only if permitted.
- **AnyLight headline number:** optionally pull one delay/queue-reduction figure from the thesis Results chapter (pp. 67–79) to add to the AnyLight summary — numbers punch harder than prose.
- **CV freshness:** `Marco_Bustaffa_CV_Long.pdf` still brands Marco as "Software Developer" and predates the thesis/legal work. Consider updating it to the AI-Engineer positioning before it ships as the downloadable CV.
- **env-soundnet repo URL:** confirm `https://github.com/marcobustaffa/env-soundnet` resolves (it appeared as a pinned repo); fix the slug if not.

## Self-Review Notes

- **Spec coverage:** Hero (T2), About (T3), Featured Projects incl. AnyLight/Legal/env-soundnet/Hadoop (T4), Experience (T5), Skills (T6), Contact + CV (T7), design tokens/fonts/terminal motifs (T1–T2), accessibility + reduced-motion + responsive (T1, T8), GitHub Pages (T9). All spec sections mapped.
- **Placeholder scan:** no TODO/TBD in code steps; all components and tests contain complete code. Open content items are isolated in "Content to confirm" and do not block any task (cards degrade gracefully when `repo` is absent).
- **Type consistency:** `Project`/`projects` (T4), `Role`/`roles` (T5), `SkillGroup`/`skillGroups` (T6) are defined once and consumed with matching names; `ProjectCard` consumes `{ project: Project }` exactly as produced.
