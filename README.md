# Script Wizard

A cyberpunk-themed personal blog built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [Decap CMS](https://decapcms.org).

## Tech Stack

- **Astro** — static site generator (ships minimal JS)
- **Tailwind CSS** — utility-first styling with a custom cyberpunk theme
- **Decap CMS** — Git-based headless CMS (no backend required)
- **Netlify** — hosting and identity service

## Prerequisites

- [Node.js](https://nodejs.org) v20 or later
- npm (included with Node.js)

## Local Development

```bash
# Clone the repo
git clone <repo-url>
cd project-script-wizard

# Install dependencies
npm install

# Start the dev server (http://localhost:4321)
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site to `dist/` |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── components/        # Reusable Astro components (Header, Footer, SEO)
├── content/
│   └── blog/          # Blog posts as Markdown files
├── content.config.ts  # Content collection schema
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro    # Home page
│   ├── about.astro    # About page
│   ├── 404.astro      # Custom 404 page
│   └── blog/
│       ├── index.astro   # Blog listing
│       └── [id].astro    # Blog post detail
└── styles/
    └── global.css     # Global styles and CRT effects
```

## Writing Blog Posts

Blog posts live in `src/content/blog/` as Markdown files with YAML frontmatter:

```markdown
---
title: "Your Post Title"
description: "A short summary of the post."
date: "2025-01-15"
tags: ["scripting", "python"]
draft: false
image: "/images/uploads/optional-hero.png"
---

Your post content here…
```

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Post title |
| `description` | string | yes | Short summary for listings and SEO |
| `date` | date | yes | Publish date (`YYYY-MM-DD`) |
| `tags` | string[] | yes | Categorization tags |
| `draft` | boolean | yes | `true` hides the post from the public listing |
| `image` | string | no | Path to an optional featured image |

## Deploying to Netlify

1. Push your repo to GitHub (or GitLab/Bitbucket).
2. In the [Netlify dashboard](https://app.netlify.com), click **Add new site > Import an existing project** and select your repo.
3. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20
4. Click **Deploy site**.

### Custom Domain

To use a custom domain, go to **Site settings > Domain management > Add custom domain** in the Netlify dashboard and follow the DNS configuration instructions.

## CMS Admin Panel

The site includes [Decap CMS](https://decapcms.org) for managing blog posts through a web UI at `/admin/`.

### Netlify Identity Setup

Decap CMS uses Netlify Identity for authentication and Git Gateway to commit changes to your repo.

1. Deploy the site to Netlify.
2. In the Netlify dashboard, go to **Site settings > Identity** and click **Enable Identity**.
3. Under **Registration**, choose **Invite only** to restrict access.
4. Under **Services > Git Gateway**, click **Enable Git Gateway** so the CMS can commit to your repo.

### Invite Editors

1. Go to **Site settings > Identity > Invite users**.
2. Enter the email addresses of people who should have CMS access.
3. Invited users will receive an email with a link to set their password.

### Access the CMS

Navigate to `https://your-site.netlify.app/admin/` and log in with your Netlify Identity credentials. From there you can create, edit, and publish blog posts without touching code.

## License

All rights reserved.
