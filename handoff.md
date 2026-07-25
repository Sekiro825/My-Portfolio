# PROJECT SEKIRO: SHADOW ARCHITECT — Technical Handoff Document

> **Developer & Architect**: Saket Pokale  
> **Repository**: `Sekiro825/My-Portfolio`  
> **Stack**: Next.js 14 (App Router), React 18, TypeScript, TailwindCSS (Vanilla CSS tokens), Framer Motion, Three.js (`@react-three/fiber`, `@react-three/drei`), Web Audio API, Vitest.

---

## 1. Executive Summary & Vision

This repository contains the Awwwards-grade, high-octane **Anime Action & Cyberpunk Cinematic Portfolio** for Saket Pokale (*"PROJECT SEKIRO: SHADOW ARCHITECT"*).

The application completely purges generic layout patterns (such as standard horizontal Netflix rails and basic card grids) in favor of an **immersive, 6-Act interactive manga/action game UI** inspired by *Persona 5*, *Sekiro: Shadows Die Twice*, and *Zenless Zone Zero*.

---

## 2. Key Architecture & Feature Matrix

### 📜 6-Act Narrative Workflow
1. **Act I — Hero Stage (`AnimeHeroStage.tsx`)**:
   - Split kinetic display headline (*"SHADOW ARCHITECT"*).
   - Borderless, freely floating Three.js WebGL 3D Core with dynamic particle swirls and electric cyan/crimson lighting.
   - Live action CTA buttons (`LAUNCH FEATURED BUILD`, `EXPLORE ARSENAL`, `RESUME DECK`).
2. **Act II — Manga Lore Dossier (`AboutPanel.tsx`)**:
   - Asymmetric webtoon comic panels with Saket's engineering lore and academic records.
   - **Web Audio Waveform Synthesizer**: Live audio visualizer canvas widget.
3. **Act III — Mission Arsenal Vault (`MissionVaultGrid.tsx`)**:
   - Asymmetric 3-column cyber mission grid gallery with 3D tilt hover physics and rank filter pills (`[ ALL MISSIONS ]`, `[ AI & VISION ]`, `[ FULL-STACK ]`, etc.).
4. **Act IV — RPG Skill Matrix (`StatsPanel.tsx`)**:
   - Interactive skill node constellation graph with a live top-moving skill ticker stick.
5. **Act V — Quest Milestones (`AchievementsGrid.tsx`)**:
   - S-Rank certificate and trophy badges with holographic borders and glow.
6. **Act VI — Final Transmission Terminal (`Footer.tsx`)**:
   - Terminal status console with direct copy-to-clipboard, social links, and live SFX.

### 🎮 Interactive Canvas Overlays
- **Katana Slash Cursor (`SlashCursorCanvas.tsx`)**:
  - Mouse-tracking light-blade trail (`#00f0ff` outer glow + `#ff0055` inner core).
- **Anime Scroll Speed Lines (`SpeedLinesCanvas.tsx`)**:
  - Dynamic 2D canvas speed-lines that activate when scrolling fast.

### 🔊 Web Audio API Synthesizer (`lib/sound.ts`)
- Zero-dependency Web Audio API oscillator synthesizer generating zero-latency sound effects (`whoosh`, `hover`, `click`, `laser`, `waveform`) without external audio asset downloads.

---

## 3. Directory & File Blueprint

```
My-Portfolio/
├── public/
│   ├── Saket_Pokale.png            # Primary High-Res Avatar Image
│   ├── saket_avatar_stylized.png   # Secondary Stylized Avatar Fallback
│   └── resume.pdf                  # Saket's Resume Document
├── src/
│   ├── app/
│   │   ├── globals.css             # Cyber Obsidian palette (#0a0a0f), glowing text utilities, clip paths
│   │   ├── layout.tsx              # Root HTML & Metadata definition
│   │   └── page.tsx                # Page Entrypoint
│   ├── components/
│   │   ├── AnimeHeroStage.tsx      # Act I: Kinetic Hero Stage & Floating 3D Core
│   │   ├── MissionVaultGrid.tsx    # Act III: Asymmetric S-Rank Mission Vault Grid
│   │   ├── AboutPanel.tsx          # Act II: Manga Lore Dossier & Audio Visualizer
│   │   ├── StatsPanel.tsx          # Act IV: RPG Skill Matrix Node Graph & Ticker
│   │   ├── AchievementsGrid.tsx    # Act V: Unlocked Trophies & S-Rank Badges
│   │   ├── Footer.tsx              # Act VI: Final Transmission Terminal
│   │   ├── Navbar.tsx              # Cyber HUD Navigation with SFX Toggle & Combo Counter
│   │   ├── ProjectModal.tsx        # Tactical Deployment Dossier Modal
│   │   ├── SearchModal.tsx         # Full-Screen Tactical Mission Search Overlay
│   │   ├── Hero3DVisual.tsx        # Three.js WebGL Geometry & Particle Swirl
│   │   └── canvas/
│   │       ├── SlashCursorCanvas.tsx # Katana Slash Mouse Trail
│   │       └── SpeedLinesCanvas.tsx  # Anime Action Scroll Speed Lines
│   ├── data/
│   │   └── portfolio.ts            # Authoritative Portfolio Content Data
│   ├── lib/
│   │   ├── sound.ts                # Web Audio API Sound Effects Synthesizer Class
│   │   └── motion.ts               # Framer Motion Animation Variants
│   └── types/
│       └── portfolio.ts            # TypeScript Models (Project, Skill, Certificate, Bio)
└── tests/
    ├── LoadingScreen.test.tsx      # Loader Specs & ARIA Tests
    ├── HeroBillboard.test.tsx      # AnimeHeroStage Component Tests
    ├── ProjectRail.test.tsx        # MissionVaultGrid Component Tests
    ├── portfolio.data.test.ts      # Portfolio Data Validation Specs
    └── setup.ts                    # Dynamic Proxy Icon Mocking for Vitest
```

---

## 4. Commands & Verification Guide

### 🚀 Running Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to view the application in the browser.

### 🧪 Running Unit Tests
```bash
npm run test
```
Runs Vitest test suites. All 16+ tests are passing cleanly.

### 🔍 Running TypeScript Typecheck
```bash
npm run typecheck
```
Ensures 0 TypeScript compilation errors.

---

## 5. Maintenance & Content Updating

- **Updating Bio, Projects, or Skills**: Edit `src/data/portfolio.ts`. All categories, tags, metrics, and project cards will automatically update across the Mission Vault, Search Modal, and Hero Stage.
- **Adding New Avatar Assets**: Add files to `public/`. Ensure fallback handlers in `onError` point to existing public paths with base path prefix (e.g. `/My-Portfolio/saket_avatar_stylized.png`).
- **Adjusting Sound Volume / Effects**: Edit `src/lib/sound.ts` to tune oscillator frequency, gain, or wave types (`sine`, `triangle`, `sawtooth`).

---

## 6. Verification Status

| Suite | Status | Details |
| :--- | :--- | :--- |
| **TypeScript Compilation** | ✅ PASSED | 0 errors (`tsc --noEmit`) |
| **Vitest Unit Tests** | ✅ PASSED | 2/2 Test Files, 16/16 Tests |
| **Image Fallbacks** | ✅ PASSED | 0 404 console errors |
