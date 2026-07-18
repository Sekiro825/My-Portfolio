# Saket Pokale — Cinematic Portfolio

A Netflix-style, game-intro inspired portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deployed to GitHub Pages via static export.

## ✨ Features

- **Game-style loading screen** — animated logo reveal, progress bar, "Press any key to enter" (respects `prefers-reduced-motion`, shows once per session)
- **Netflix hero billboard** — rotating featured projects with parallax gradient backdrops, auto-advance (8s), keyboard navigation, pause on hover
- **Project rails** — horizontal scroll rails grouped by category (Trending Builds, Web Apps, Full-Stack, AI & Vision, Coming Soon) with hover-zoom cards
- **Project modal** — detailed view with synopsis, tech tags, repo link, status badge
- **RPG-style stats panel** — animated skill bars grouped by category (Language, Web, Database, Other)
- **Achievements grid** — certificates as trophy cards with hover glow
- **Cinematic dark theme** — deep ink blacks, crimson/electric/gold accents, film grain, scanline, and vignette overlays
- **Sticky glass-nav** — game-menu style with slide-down mobile drawer, active section highlight, smooth scroll
- **Player profile** — avatar placeholder, first-person bio, social links, resume download
- **Fully responsive** — mobile-first, horizontal rails on desktop, stacked on mobile
- **Accessible** — semantic HTML, ARIA labels, focus-visible outlines, reduced-motion support

## 🛠 Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router, `output: "export"`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | `next/font` (Bebas Neue, Inter, JetBrains Mono) — self-hosted, zero CLS |
| Testing | Vitest + Testing Library |
| CI | GitHub Actions (lint, typecheck, build) |
| Deploy | GitHub Pages (`gh-pages` branch) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm 9+

### Install & Dev
```bash
npm ci
npm run dev
```
Open `http://localhost:3000/My-Portfolio` (the `basePath` matches the GitHub Pages subpath).

### Build for production
```bash
npm run build
```
Static output lands in `out/` — ready for any static host.

### Deploy to GitHub Pages
```bash
npm run deploy
```
This runs `npm run build` then pushes `out/` to the `gh-pages` branch.

## 📁 Project Structure

```
├── .github/workflows/ci.yml      # CI pipeline
├── data/portfolio.ts             # Single source of truth (typed)
├── public/
│   ├── favicon.svg               # Custom "S" mark
│   ├── manifest.webmanifest      # PWA manifest
│   ├── resume.pdf                # Downloadable CV
│   └── icon192.png, icon512.png  # PWA placeholders
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind + theme tokens + cinematic overlays
│   │   ├── layout.tsx            # Root layout, fonts, metadata, grain/scanlines/vignette
│   │   └── page.tsx              # Server component: LoadingScreen + Navbar + PageContent
│   ├── components/
│   │   ├── LoadingScreen.tsx     # Game-intro loader
│   │   ├── Navbar.tsx            # Sticky glass nav
│   │   ├── HeroBillboard.tsx     # Netflix rotating hero
│   │   ├── ProjectRail.tsx       # Horizontal scroll rail
│   │   ├── ProjectCard.tsx       # Hover-zoom card
│   │   ├── ProjectModal.tsx      # Detail modal
│   │   ├── StatsPanel.tsx        # RPG skill bars
│   │   ├── AchievementsGrid.tsx  # Trophy cards
│   │   ├── AboutPanel.tsx        # Bio + socials
│   │   ├── Footer.tsx            # Credits
│   │   └── PageContent.tsx       # Client wrapper holding modal state
│   ├── lib/motion.ts             # Shared Framer Motion variants
│   └── types/portfolio.ts        # TypeScript interfaces
├── tests/                        # Vitest unit/integration tests
├── next.config.mjs               # Static export + basePath
├── tailwind.config.ts            # Theme tokens, animations
├── tsconfig.json                 # Strict TS config
└── package.json
```

## ✏️ Editing Content

All copy, projects, skills, certificates, and bio live in **one file**:

```
data/portfolio.ts
```

- Add a project → push an object to `projects[]` with `featured: true` to appear in hero
- Update skills → edit `skills[]` levels (1–100) and categories
- Change bio → edit `bio.body` paragraphs
- Swap resume → replace `public/resume.pdf` (keeps same path)

No component edits needed.

## 🎨 Theme Customization

CSS variables in `src/app/globals.css`:

```css
:root {
  --ink-900: #08090d;
  --ink-800: #0c0e14;
  --ink-700: #11131c;
  --ink-600: #1b1f2c;
  --accent-crimson: #e50914;
  --accent-electric: #00b3ff;
  --accent-gold: #f5c542;
}
```

Tailwind utilities: `bg-ink-900`, `text-accent-crimson`, `border-accent-electric`, etc.

## ♿ Accessibility & Performance

- `prefers-reduced-motion` honored globally (instant transitions, no auto-advance)
- Semantic landmarks (`<nav>`, `<main>`, `<section>`, `<dialog>`)
- Focus-visible outlines (electric blue)
- Lazy-loaded modal, code-split routes
- Self-hosted fonts → zero CLS, no external requests
- Lighthouse-friendly: static export, optimized images, minimal JS

## 🧪 Testing

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

Tests cover:
- `portfolio.data.test.ts` — data shape, required fields, cross-references
- `HeroBillboard.test.tsx` — renders, cycles, opens modal
- `ProjectRail.test.tsx` — renders projects, pills, tags, modal trigger
- `LoadingScreen.test.tsx` — session gating, progress, dismiss

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production static export → `out/` |
| `npm run serve:out` | Preview `out/` locally |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest run |
| `npm run predeploy` | Alias for `npm run build` |
| `npm run deploy` | Push `out/` to `gh-pages` branch |

## 📦 Deploy Details

- **Base path**: `/My-Portfolio` (from `package.json` `homepage`)
- **Output**: `out/` (via `next.config.mjs` `output: "export"`)
- **Images**: `unoptimized: true` (required for static export)
- **Trailing slash**: `true` (GitHub Pages SPA fallback)

## 🔒 Security

- No secrets in repo
- `npm audit` runs on CI
- Dependabot alerts enabled

## 📄 License

MIT — feel free to fork and customize for your own portfolio.

---

**Built with** Next.js, Tailwind, Framer Motion, and a lot of late-night coding. 🎮🍿