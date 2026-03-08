# Contributing to The Script Wizard

Thanks for contributing! This guide covers best practices for working on this project and outlines the 10 most common modifications you might need to make.

## General Practices

### Branching Strategy

- **Main branch**: `master` — production-ready code
- **Feature branches**: Create descriptive branches for each modification
  ```bash
  git checkout -b feature/description-of-change
  # Examples:
  git checkout -b feature/update-amber-theme
  git checkout -b feature/add-new-blog-post
  git checkout -b feature/refresh-hero-section
  ```

### Commit Messages

- Be descriptive and concise: `git commit -m "feat(header): update primary color to neon-amber"`
- Use conventional commits format: `type(scope): description`
  - `feat`: New feature
  - `fix`: Bug fix
  - `refactor`: Code restructuring
  - `docs`: Documentation updates
  - `style`: CSS/styling updates
  - `content`: Blog post or content changes

### Pull Request Workflow

1. Create your feature branch
2. Make changes (follow guidelines below)
3. Test locally: `npm run dev` and verify your changes
4. Commit with clear messages
5. Push to your branch: `git push origin feature/your-branch`
6. Open a PR with a description of what changed and why
7. Request review if applicable
8. Merge once approved

### Testing Before Pushing

```bash
npm run dev          # Start local dev server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

---

## Top 10 Common Modifications

### 1. **Change Primary Theme Color**

**When**: Rebrand the site's dominant accent color (currently neon-amber `#FFB000`)

**Files to Update**:
- `tailwind.config.mjs` — update color palette and prose theme
- `src/global.css` — CSS custom properties
- All component files using the old color (search for `neon-amber` or `neon-green`)

**Steps**:
1. Update the color value in `tailwind.config.mjs`:
   ```javascript
   extend: {
     colors: {
       'neon-amber': '#FFB000',  // ← change this value
       'neon-green': '#39FF14',
     }
   }
   ```
2. Update `prose-cyberpunk` theme styling for links, borders, and accents
3. Search for hardcoded color classes (`text-neon-amber`, `border-neon-amber`, `from-neon-amber`) and replace them in:
   - `src/components/Header.astro`
   - `src/components/Footer.astro`
   - `src/pages/index.astro`
   - `src/pages/about.astro`
   - `src/pages/blog/index.astro`
4. Test at `http://localhost:3000` with `npm run dev`

---

### 2. **Add or Edit a Blog Post**

**When**: Add new content or update an existing post (via code or Decap CMS)

**Via Code**:
1. Create a new `.md` file in `src/content/blog/`:
   ```markdown
   ---
   title: "Your Post Title"
   description: "Brief description for listings and SEO"
   date: 2026-03-02
   tags: ["scripting", "linux", "automation"]
   draft: false
   image: "/images/your-image.jpg"
   ---

   # Your Post Title

   Your markdown content here...
   ```
2. The blog listing and detail pages will automatically pick it up
3. Run `npm run dev` and verify at `/blog`

**Via Decap CMS**:
1. Navigate to `yoursite.com/admin`
2. Log in with Netlify Identity
3. Click "Blog" → "New Blog" to create a post
4. Fill in fields and publish — it auto-commits to your repo

---

### 3. **Rename or Rebrand the Site**

**When**: Change site name, tagline, or branding

**Files to Update**:
- `src/components/Header.astro` — logo/title display
- `src/components/Footer.astro` — copyright text
- `src/layouts/BaseLayout.astro` — default title
- `src/pages/index.astro` — hero heading and typing animation width
- `src/pages/about.astro` — page title and intro
- `src/pages/blog/index.astro` and `src/pages/blog/[id].astro` — titles
- `src/components/SEO.astro` — default description
- `astro.config.mjs` — site URL and title
- `README.md` — update project description

**Example**: Changing "script_wizard" to "thescriptwizard":
```astro
<!-- Before -->
<span class="text-neon-amber">script_wizard</span>

<!-- After -->
<span class="text-neon-amber">thescriptwizard</span>
```

---

### 4. **Update Component Styling**

**When**: Modify how any UI component looks (Header, Footer, cards, etc.)

**Files**:
- `src/components/Header.astro` — navigation bar
- `src/components/Footer.astro` — footer
- `src/layouts/BaseLayout.astro` — page wrapper
- Component-specific styles are in `<style>` blocks within `.astro` files

**Tips**:
- Use Tailwind classes where possible (`text-neon-amber`, `border-neon-cyan`, `bg-bg-dark`)
- For custom CSS, edit the `<style>` blocks at the bottom of `.astro` files
- Remember: no rounded corners (`border-radius: 0` everywhere)
- Test responsiveness at mobile sizes

---

### 5. **Change Page Layout or Add a New Page**

**When**: Restructure home, about, or add a new page (e.g., `/portfolio`)

**To Create a New Page**:
1. Create a new file in `src/pages/yourpage.astro`:
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   import SEO from '../components/SEO.astro';
   ---

   <BaseLayout title="Your Page Title">
     <SEO
       title="Your Page Title"
       description="Page description"
       url="/yourpage"
     />
     <main class="container mx-auto px-4 py-8">
       <!-- Your content here -->
     </main>
   </BaseLayout>
   ```
2. Update navigation in `src/components/Header.astro` to link to it:
   ```astro
   <a href="/yourpage" class="hover:text-neon-amber">yourpage_</a>
   ```
3. Test at `http://localhost:3000/yourpage`

**To Modify Existing Layout**:
- Edit the `.astro` file directly (e.g., `src/pages/index.astro` for home page)
- Restructure HTML and update Tailwind classes as needed

---

### 6. **Update Fonts or Typography**

**When**: Change monospace font, heading styles, or text sizes

**Files to Update**:
- `tailwind.config.mjs` — define font family
  ```javascript
  fontFamily: {
    mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
  }
  ```
- `src/components/Header.astro` — font size, weight
- `src/layouts/BaseLayout.astro` — global font-family CSS
- `src/global.css` — base text styling

**To Add a New Font**:
1. Add Google Fonts import to `src/layouts/BaseLayout.astro` `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
   ```
2. Update `tailwind.config.mjs` to use it

---

### 7. **Update Site Domain or Configuration**

**When**: Change domain, update site URL, or configure deployment settings

**Files to Update**:
- `astro.config.mjs` — site URL and build settings:
  ```javascript
  export default defineConfig({
    site: 'https://thescriptwizard.dev',
  });
  ```
- `netlify.toml` — deployment configuration (usually no changes needed)
- `README.md` — update domain references
- Netlify dashboard — configure custom domain and SSL

**Tip**: Update `astro.config.mjs` before building for production to ensure correct OpenGraph image URLs and canonical tags.

---

### 8. **Add New Navigation Links or Menu Items**

**When**: Add links to header, footer, or create a nav menu

**File**: `src/components/Header.astro`

**Steps**:
1. Add a new `<a>` tag in the nav section:
   ```astro
   <a href="/portfolio" class="hover:text-neon-amber">portfolio_</a>
   ```
2. Make sure:
   - Link text ends with underscore (terminal style)
   - Uses `hover:text-neon-amber` for accent
   - Matches the existing pattern
3. Create the corresponding page (see Modification #5)

**For Footer Links**: Edit `src/components/Footer.astro` similarly

---

### 9. **Update SEO, Meta Tags, or Page Descriptions**

**When**: Improve search engine optimization or add social media previews

**File**: `src/components/SEO.astro` (reusable component)

**To Update Default SEO**:
1. Edit `src/components/SEO.astro`:
   ```astro
   <meta name="description" content={description || "Your default description"} />
   <meta property="og:title" content={title || "The Script Wizard"} />
   ```

**To Update Per-Page**:
1. Add SEO component to any page:
   ```astro
   <SEO
     title="Your Page Title"
     description="Your description (155 chars recommended)"
     url="/your-page"
     image="/images/og-image.jpg"
   />
   ```

**Tips**:
- Keep descriptions under 160 characters
- Use keywords relevant to the page content
- Test with [Open Graph Preview](https://www.opengraph.xyz/)

---

### 10. **Fix a 404 Error Page or Update Error Handling**

**When**: Customize the error page or handle missing content

**File**: `src/pages/404.astro`

**Current Style**: Terminal/cyberpunk error display with link back to home

**To Customize**:
1. Edit the 404 page content (HTML and styling)
2. Keep the cyberpunk terminal aesthetic (no rounded corners, neon accents)
3. Include a link back to home: `<a href="/" class="text-neon-amber hover:underline">`
4. Test by visiting `http://localhost:3000/nonexistent-page`

**Example Error Message**:
```astro
<div class="font-mono text-red-500">
  > ERROR 404: PAGE NOT FOUND
</div>
<a href="/" class="text-neon-amber hover:underline">
  back to home_
</a>
```

---

## File Structure Reference

```
src/
├── pages/              # Route pages (auto-routed)
│   ├── index.astro     # Home page
│   ├── about.astro     # About page
│   ├── 404.astro       # Error page
│   ├── blog/
│   │   ├── index.astro # Blog listing
│   │   └── [id].astro  # Blog post detail
├── components/         # Reusable components
│   ├── Header.astro    # Navigation header
│   ├── Footer.astro    # Site footer
│   ├── SEO.astro       # Meta tags component
├── layouts/            # Page wrappers
│   └── BaseLayout.astro # Main layout template
├── content/            # Content collections
│   └── blog/           # Blog posts (.md files)
├── global.css          # Global styles
└── styles/             # Additional stylesheets (if any)
```

---

## Quick Command Reference

```bash
# Local development
npm run dev                 # Start dev server on localhost:3000
npm run build              # Build for production
npm run preview            # Preview production build

# Git workflow
git status                 # Check current changes
git add .                  # Stage all changes
git commit -m "message"    # Create commit
git push                   # Push to remote

# Search and replace (for theme/color changes)
grep -r "neon-amber" src/  # Find all color references
```

---

## Questions or Issues?

- Check the `PROMPT_build.md` for project specs and design system
- Review the `progress.md` for completed tasks and context
- Look at existing components for patterns (e.g., how other pages use SEO component)
- Test locally before opening a PR: `npm run dev`

Happy contributing! 🚀
