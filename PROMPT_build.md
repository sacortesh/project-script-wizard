# PRD — Personal Blog: Cyberpunk / Coder / Fallout Theme

## Overview

A minimalist personal blog focused on **tech & scripting** content. The site uses a **cyberpunk / coder / Fallout** aesthetic: sharp corners (no rounded corners), neon colors, monospace typography, terminal-inspired UI elements. Content is managed via **Decap CMS** (headless, Git-based) so new posts can be added without code changes.

## Tech Stack

- **Static Site Generator**: Astro (fast, content-focused, ships minimal JS)
- **Styling**: Tailwind CSS (utility-first, easy to enforce sharp corners & neon palette)
- **CMS**: Decap CMS (formerly Netlify CMS — Git-based headless CMS, free, no backend needed)
- **Hosting**: Netlify (free tier, native Decap CMS identity integration)
- **Content format**: Markdown with YAML frontmatter

## Design Tokens

| Token | Value |
|---|---|
| `--neon-green` | `#39FF14` |
| `--neon-cyan` | `#00FFFF` |
| `--neon-magenta` | `#FF00FF` |
| `--neon-amber` | `#FFB000` |
| `--bg-dark` | `#0A0A0F` |
| `--bg-surface` | `#12121A` |
| `--bg-card` | `#1A1A2E` |
| `--text-primary` | `#E0E0E0` |
| `--text-muted` | `#7A7A8A` |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` |
| `border-radius` | `0` (everywhere — no rounded corners) |

---

## Phase 1 — Project Scaffolding

### Task 1.1: Initialize Astro project
- Run `npm create astro@latest` with blank template in the repo root
- Configure `astro.config.mjs` for static output
- Verify `npm run dev` starts without errors

### Task 1.2: Install and configure Tailwind CSS
- Add `@astrojs/tailwind` integration
- Create `tailwind.config.mjs` with the neon color palette from Design Tokens
- Set global `border-radius: 0` override in base styles
- Add `JetBrains Mono` via Google Fonts or local import

### Task 1.3: Create base layout and global styles
- Create `src/layouts/BaseLayout.astro` with `<html>`, `<head>`, `<body>` structure
- Add global CSS: dark background (`--bg-dark`), monospace font, no rounded corners
- Add scanline / CRT subtle overlay effect via CSS (optional background texture)
- Include meta viewport, charset, and a placeholder `<title>`

---

## Phase 2 — Core Pages & Components

### Task 2.1: Build the site header / navigation
- Create `src/components/Header.astro`
- Logo/site title in neon green with a terminal-cursor blink animation
- Nav links: `Home`, `Blog`, `About` — styled as terminal commands (e.g., `> blog_`)
- Sharp border-bottom with neon accent line
- Mobile-responsive hamburger menu (CSS-only, no JS if possible)

### Task 2.2: Build the site footer
- Create `src/components/Footer.astro`
- Minimal: copyright, social links (GitHub, X/Twitter), neon accent border-top
- ASCII art or Fallout-style "pip-boy" decorative element

### Task 2.3: Build the home page
- Create `src/pages/index.astro`
- Hero section: terminal-style intro text (typing animation CSS), tagline about tech/scripting
- "Latest Posts" section: list the 3 most recent blog posts (placeholder data for now)
- CTA link to `/blog`

### Task 2.4: Build the About page
- Create `src/pages/about.astro`
- Terminal-style bio section with neon accents
- Skills / interests list styled as a Fallout S.P.E.C.I.A.L. stat block or terminal readout
- Placeholder content

---

## Phase 3 — Blog System (Astro Content Collections)

### Task 3.1: Set up Astro content collections for blog posts
- Create `src/content/config.ts` defining a `blog` collection
- Schema: `title`, `description`, `date`, `tags` (array), `draft` (boolean), `image` (optional)
- Create `src/content/blog/` directory

### Task 3.2: Create sample blog posts
- Add 2–3 sample `.md` posts in `src/content/blog/`
- Include varied tags (`scripting`, `linux`, `automation`, `python`)
- Ensure frontmatter matches the schema

### Task 3.3: Build the blog listing page
- Create `src/pages/blog/index.astro`
- Fetch and list all non-draft posts sorted by date (newest first)
- Each entry: title, date, tags, short description
- Style as a terminal file listing or Pip-Boy log entries
- No pagination needed initially

### Task 3.4: Build the blog post detail page
- Create `src/pages/blog/[...slug].astro`
- Render markdown content with prose styling (headings, code blocks, links)
- Style code blocks with neon syntax theme (green-on-dark)
- Post metadata header: title, date, tags
- "Back to blog" link

### Task 3.5: Style markdown / prose content
- Configure Tailwind typography plugin (`@tailwindcss/typography`)
- Customize prose theme: dark background, neon accent links, monospace code
- Ensure headings, lists, blockquotes, and inline code match the cyberpunk aesthetic

---

## Phase 4 — Decap CMS Integration

### Task 4.1: Add Decap CMS admin page
- Create `public/admin/index.html` loading Decap CMS from CDN
- Create `public/admin/config.yml` with:
  - `backend: git-gateway` (for Netlify Identity)
  - `media_folder: "public/images/uploads"`
  - `public_folder: "/images/uploads"`
  - Collection definition for `blog` matching the content collection schema

### Task 4.2: Configure Decap CMS fields to match blog schema
- Map CMS fields to frontmatter: `title`, `description`, `date`, `tags`, `draft`, `image`
- Use `widget: list` for tags
- Use `widget: boolean` for draft
- Use `widget: image` for featured image
- Use `widget: markdown` for body

### Task 4.3: Add Netlify Identity widget to the site
- Add Netlify Identity script to `BaseLayout.astro` `<head>`
- Add Identity redirect snippet to `public/admin/index.html`
- Document in README how to enable Identity in Netlify dashboard

---

## Phase 5 — Polish & Deploy Readiness

### Task 5.1: Add SEO and OpenGraph meta tags
- Create a reusable `src/components/SEO.astro` component
- Props: `title`, `description`, `image`, `url`
- Add OG tags, Twitter card tags, canonical URL
- Wire into `BaseLayout.astro`

### Task 5.2: Add a 404 page
- Create `src/pages/404.astro`
- Fallout-style "ERROR: PAGE NOT FOUND" terminal screen
- Link back to home

### Task 5.3: Create `netlify.toml` deployment config
- Build command: `npm run build`
- Publish directory: `dist`
- Add redirects for SPA fallback if needed

### Task 5.4: Add a README with setup and usage instructions
- Local dev instructions (`npm install`, `npm run dev`)
- How to deploy on Netlify
- How to access the CMS admin (`/admin`)
- How to invite editors via Netlify Identity

### Task 5.5: Final visual QA pass
- Verify no rounded corners anywhere
- Check neon color consistency
- Test mobile responsiveness
- Verify blog listing and detail pages render correctly
- Verify Decap CMS admin loads and shows collections
