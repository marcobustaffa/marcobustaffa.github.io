# Design: Marco Bustaffa — Personal Portfolio Website

- **Date:** 2026-07-20
- **Status:** Approved design → ready for implementation planning
- **Owner:** Marco Bustaffa

## 1. Goal & Context

A single-page personal portfolio website whose job is to convince a technical hiring
manager or startup founder, within ~15 seconds, that Marco is a **generalist who can ship
AI end-to-end**. Marco recently completed a BSc in Computer Science and an MSc in Data
Science (University of Padua) and is job-hunting for AI/ML roles at innovative companies and
startups.

The site is also being built **collaboratively as a learning exercise** — Marco wants to
understand the frontend stack, so implementation should favour clarity and explanation over
cleverness.

## 2. Audience & Positioning

- **Audience:** technical hiring managers, founders, and recruiters at innovative
  companies / startups (primarily international → English).
- **Positioning:** **AI Engineer & Data Scientist.** This is a deliberate reframe from
  Marco's current CV ("Software Developer") toward where he wants to go.
- **Core narrative thread:** Marco works on intelligent control / traffic systems from three
  angles at once — (1) **production backend engineering** (Tecsen), (2) **frontier ML
  research** (thesis: multi-agent Deep RL for traffic), and (3) **shipping LLM/GenAI
  products** (legal AI consultancy). This "ships to production + does frontier research +
  builds with LLMs" combination is the site's central selling point.

## 3. Scope

**In scope**
- One static, single-page site (long-scroll, anchored sections).
- English only.
- Six content sections (see §6).
- Responsive (mobile-first) and accessible.
- CV PDF download.
- Deployment to GitHub Pages.

**Out of scope (YAGNI)**
- Blog / CMS / writing section (may be added later; Astro leaves the door open).
- Multi-page routing or per-project deep-dive pages.
- Multi-language (EN/IT) toggle.
- Photo / headshot.
- X/Twitter link.
- Contact form / backend (mailto link only).
- Analytics (can add later if wanted).

## 4. Tech Stack & Tooling

- **Framework:** [Astro](https://astro.build) — component-based, ships static HTML with
  near-zero JS, gentle learning curve for a backend developer.
- **Styling:** plain CSS (scoped Astro component styles) with CSS custom properties for the
  design tokens. No Tailwind — keeps things transparent and teachable.
- **Fonts:** self-hosted via `@fontsource` packages (no external requests → fast, private):
  - Sans: **Inter** (headings + body).
  - Mono: **JetBrains Mono** (labels, nav, accents, code motifs).
- **JS:** minimal / progressive enhancement only (e.g. smooth-scroll, cursor blink honoring
  `prefers-reduced-motion`). Site must be fully functional and readable with JS disabled.
- **Node/package manager:** npm (default, simplest).

## 5. Visual Design System — "Refined Dev Terminal"

Dark, code-flavoured, but readable: **monospace for personality (labels/nav/accents),
clean sans for anything the reader must actually read** (headings, body, project copy).
Terminal motifs are tasteful accents, never gimmicks.

**Color tokens (dark theme):**

| Token             | Value       | Use                              |
|-------------------|-------------|----------------------------------|
| `--bg`            | `#0d1117`   | Page background                  |
| `--surface`       | `#131a24`   | Cards / panels                   |
| `--border`        | `#22303f`   | Card & divider borders           |
| `--text`          | `#f0f6fc`   | Primary text / headings          |
| `--text-muted`    | `#9aa5b1`   | Secondary / body-dim text        |
| `--accent`        | `#5eead4`   | Teal/mint accent (links, labels, prompt, cursor) |
| `--accent-dim`    | `#2dd4bf`   | Hover / stronger accent          |

All foreground/background pairs must meet **WCAG AA** contrast (≥ 4.5:1 for body text).

**Typography:**
- Section labels & nav: JetBrains Mono, uppercase, letter-spacing ~0.1em, small, `--accent`.
- Headings: Inter, bold, tight tracking (`-0.02em`).
- Body: Inter, ~16px base, line-height ~1.6.

**Terminal motifs (accents, used sparingly):**
- A `~/marco` style prompt string in the nav/hero.
- `//` or `$` markers preceding section labels.
- A blinking cursor `_` after the name in the hero (disabled under `prefers-reduced-motion`).
- Project/skill groupings framed like code blocks / bordered panels.

**Accessibility (a craft Marco already values — see Bona e Gava):**
- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`).
- Full keyboard navigation, visible focus states.
- Alt text on any decorative/functional imagery (icons via accessible SVG).
- `prefers-reduced-motion` respected for all animation.

## 6. Page Structure & Content

Single long-scroll page with a sticky/anchored top nav (Work · About · Contact).

### 6.1 Hero
- Name: **Marco Bustaffa** (with blinking cursor).
- Role label: `AI Engineer & Data Scientist`.
- Pitch line (draft): *"I build intelligent systems end-to-end — from production backends to
  multi-agent reinforcement learning and LLM-powered products."*
- Quick links: GitHub (`github.com/marcobustaffa`), LinkedIn
  (`linkedin.com/in/marco-bustaffa`), email (`m.bustaffa@gmail.com`).
- Primary CTA: "View work ↓"; secondary: "Download CV".

### 6.2 About (2–3 short paragraphs)
Tells the core narrative (§2): the traffic/control-systems thread across production
engineering, frontier ML, and LLM products; education (BSc CS 103/110, MSc Data Science);
and the kind of role Marco is looking for.

### 6.3 Featured Projects (cards: problem → what I built → stack → result)
1. **AnyLight** *(flagship — MSc thesis)* — a generalizable multi-agent Deep Reinforcement
   Learning model for heterogeneous traffic networks. *(Abstract & quantified results to be
   pulled from `dissertation.pdf` during implementation — see §9.)*
2. **Legal AI Pipeline** *(consultancy, ~3 months)* — an LLM-based pipeline to automate
   legal procedures and document redaction. Demonstrates shipping GenAI products
   (RAG/agents, evals/observability — Langfuse).
3. **env-soundnet** — environmental sound recognition using Spiking Neural Networks (SNNs).
   Shows range and curiosity beyond mainstream ML.
4. **Hadoop/Parquet Migration @ Tecsen** — reframed as a project: implemented Hadoop HDFS
   with Apache Parquet, **reducing storage > 70% and improving query speed 30%**.

Older university projects (Bona e Gava, Login Warrior) are intentionally **excluded** from
the featured list (optionally mentioned as "earlier work" only if space allows).

### 6.4 Experience (compact timeline)
- **Tec Systems Engineering (Tecsen) S.r.l.** — Software Developer (Backend), **Jun 2021 –
  Oct 2022**. Highlights: maintained/optimised an OpenVPN network; built & maintained Java
  backend modules; drove Cloud-Native strategy & monolith→microservices roadmap (projected
  **−20% maintenance cost, +30% availability, +30% scalability**); Hadoop/Parquet migration
  (**−70% storage, +30% query speed**); built a Tecsen↔Enel X vehicular-traffic data
  exchange module.
- **Legal AI Consultancy** — AI Engineer / Consultant, **~3 months**. Built an AI pipeline
  to automate legal procedures and document redaction.

### 6.5 Skills (grouped, scannable)
- **Languages:** Python, Java, SQL, C++, JavaScript.
- **ML / AI:** Deep Reinforcement Learning (multi-agent), LLMs & RAG, LLM evals /
  observability (Langfuse), Spiking Neural Networks.
- **Data & Infra:** Apache Hadoop, Apache Spark, Apache Parquet, MongoDB, InfluxDB, Docker.
- **Tools / Foundations:** Git, Linux, R, Cloud-Native / microservices concepts.

### 6.6 Contact / Footer
- Email (`m.bustaffa@gmail.com`, mailto), GitHub, LinkedIn.
- CV download button.
- Small monospace footer line (e.g. `built with Astro · © 2026 Marco Bustaffa`).

## 7. Content Sources
- CV: `../../CV/Marco_Bustaffa_CV_Long.pdf` (read — dates, skills, Tecsen bullets, grade).
- Thesis: `../../../Development/Thesis-Project/Thesis/dissertation.pdf` (not yet readable on
  this machine — needs `poppler`; see §9).
- User-provided details (legal consultancy, project one-liners).

## 8. Deployment
- **Target:** GitHub Pages.
- **Recommended repo:** `marcobustaffa.github.io` (user site → served at the domain root,
  simplest Astro `base` config).
- **Method:** GitHub Actions workflow building the Astro site and publishing to Pages.
- **Custom domain:** optional, deferred — ship on the `github.io` subdomain first.

## 9. Open Items (to resolve during implementation, not blockers)
- **Thesis (AnyLight) content:** need the abstract + key quantified results. Resolve by
  running `brew install poppler` so the PDF is readable, or Marco pastes the abstract/results.
- **Project repository links:** confirm which project repos are public and linkable
  (env-soundnet exists on GitHub; AnyLight and legal AI may be private/NDA).
- **Legal consultancy naming:** confirm whether the client can be named or must stay generic
  ("a legal-services company") — assume **generic** unless told otherwise (NDA-safe default).
- **Custom domain:** decide if/when to buy one.

## 10. Success Criteria
- Loads fast (static, self-hosted fonts, minimal JS); Lighthouse ~100 on
  Performance/Accessibility/Best-Practices/SEO is the target.
- Communicates the AI-Engineer-who-ships positioning "above the fold".
- Fully responsive and keyboard-accessible; readable with JS disabled.
- Deployed and reachable at a public URL, with a working CV download.
- Codebase is clear enough that Marco understands and can maintain it.

## 11. Future (explicitly deferred)
- Blog / writing section.
- Analytics.
- Custom domain.
- Per-project deep-dive pages.
