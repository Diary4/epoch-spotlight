# Epoch Spotlight — Application Documentation

This document describes what the app contains, how it is organized, and notable product and technical decisions (including work completed during recent iterations).

---

## 1. Purpose and audience

**Epoch Spotlight** (package name: `vite_react_shadcn_ts`) is a **single-page React application** that presents content about **Kurdistan** through multiple immersive “screens”: historical characters (portraits), regional discovery flows, religions, a women’s legacy section, and standalone demos. It is built for **web** and can be wrapped for **mobile** via Capacitor (Android config present in the repo).

---

## 2. Technology stack

| Area | Choice |
|------|--------|
| Framework | React (Vite) |
| Language | TypeScript |
| Routing | `react-router-dom` (BrowserRouter) |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Animation | GSAP (section intros, cards, heroes) |
| Data fetching utilities | TanStack React Query (provider in `App.tsx`) |
| Mobile | Capacitor (`@capacitor/core`, Android) |

**Scripts:** `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm test`.

---

## 3. Application entry and routing

### 3.1 Startup screen menu (`/`)

- **File:** `src/pages/StartMenu.tsx`
- **Behavior:** On first load, users see a **launcher** listing **11 predefined screens**. Choosing one navigates with **`replace: true`**, so the menu is **not** left in the browser history and users **cannot use “back”** to return to the launcher.
- **Routes offered:** Main experience (`/screen-1`), second screen, portraits grid, sample portrait detail/timeline URLs, tourism slider, religions, women, and additional portrait IDs.

### 3.2 Registered routes (`src/App.tsx`)

| Path | Page component | Role |
|------|----------------|------|
| `/` | `StartMenu` | Screen picker (no back to menu after choice) |
| `/screen-1` | `Index` | Primary “Discover Kurdistan” multi-section experience |
| `/screen-2` | `SecondScreen` | Alternate hero + leadership-style layout |
| `/portraits` | `Portraits` | Grid/list of historical characters |
| `/portraits/:id` | `PortraitDetail` | Character detail with imagery and copy |
| `/portraits/:id/timeline` | `PortraitTimeline` | Scrollable timeline for a character |
| `/slider` | `SliderPage` | Vertical tourism-style showcase (sample places) |
| `/religions` | `Religions` | Religions hub and sub-sections |
| `/women` | `WomenPage` | Women of Kurdistan hub and sub-pages |
| `*` | `NotFound` | Catch-all |

---

## 4. Main experience — Screen 1 (`/screen-1`, `Index.tsx`)

**File:** `src/pages/Index.tsx`

This is the **largest** page: a **state-driven flow** (not URL-nested) that switches “views” after language selection and user interaction.

### 4.1 Highlights

- **Languages:** Kurdish (`ku`), English (`en`), Arabic (`ar`) — localized strings for many sections; RTL-capable options for ku/ar.
- **Hero:** Tap-to-advance story titles; optional intro; then **language overlay**.
- **Discover Kurdistan:** `DiscoverKurdistan` — entry into themed sections.
- **The People:** `ThePeople` — cards for *Who Are the Kurds*, *Shared Identity*, *Resilience*; deep links into dedicated section components under `src/components/Sections/ThePople/`.
- **The Journey:** `TheJourney` + milestone pages (`1991`, `1992`, `BuildingInstitutions`, `2005`, `Today`).
- **The System:** `TheSystem` + `Parliament`, `Government`, `Presidency`, `PrimeMinister`.
- **The Land and Future:** `TheLand` hub + `TheLand/TheLand`, `Peshmarga`, `Progress`, `KurdishLanguageDialects` (identity/symbols path).

Animations use **GSAP** scoped to the active view.

---

## 5. Other top-level pages

### 5.1 Second screen (`/screen-2`)

**File:** `src/pages/SecondScreen.tsx`  
Alternate narrative hero with language selection and a simplified “leadership overview” style block.

### 5.2 Portraits (`/portraits`, `/portraits/:id`, …)

- **List:** `src/pages/Portraits.tsx` — characters from `src/data/portraits`.
- **Detail:** `src/pages/PortraitDetail.tsx` — image slider when multiple assets exist; link to timeline.
- **Timeline:** `src/pages/PortraitTimeline.tsx` — sample phased biography sections.
- **Navigation note:** “Back” from the portraits list targets **`/screen-1`** (not `/`), so it does not reopen the startup menu.

### 5.3 Slider (`/slider`)

**File:** `src/pages/SliderPage.tsx`  
Full-screen vertical showcase with rotating place cards (demo imagery).

### 5.4 Religions (`/religions`)

**File:** `src/pages/Religions.tsx`  
Hub that composes sections from `src/components/Sections/religions/` (e.g. coexistence, nationalities, Christianity, Yazidism, languages, shared celebrations). See also **`RELIGIONS-DOCUMENTATION.md`** for religion-specific notes.

### 5.5 Women (`/women`)

**File:** `src/pages/Women.tsx`

- **Landing:** Full-bleed **hero image** (viewport width), gradient into page background, headline *The Women of Kurdistan*, category cards (Leadership, Knowledge, Resistance, Culture), quote block, “Continue the Journey” CTA.
- **Sub-pages (inline state, not separate URLs):**
  - **Leadership** — `src/components/Sections/women/Leadership.tsx` (*Women of Power*), full-bleed hero, back button, GSAP.
  - **Knowledge** — `women/Knowledge.tsx`, same hero pattern.
  - **Culture** — `women/Culture.tsx`
  - **Resistance** — `women/Resistance.tsx`
- **Behavior:** Card clicks set local state and swap the main component; **back** returns to the women hub.

---

## 6. Typography and design tokens

- **Body:** Inter (and **Noto Sans Arabic** for `[lang="ku"]` / `[lang="ar"]` on `body`) — see `src/index.css`.
- **Display / titles:** **Cormorant Garamond** is loaded via Google Fonts and wired as Tailwind **`font-serif`** in `tailwind.config.ts`. Most section titles already use `font-serif`; hero titles on `Index` / `SecondScreen` and portrait names on `PortraitDetail` / `Portraits` were aligned to use it where appropriate.
- **Colors / theme:** CSS variables in `src/index.css` (HSL-based design system, hero palette, dark sidebar tokens).

---

## 7. Assets and content

- **Images:** Under `src/assets/` (e.g. `images/women/`, `mainImages/`, religions art).
- **Copy / i18n JSON:** `src/data/en.json`, `ar.json`, `ku.json` (consumed by sections like `ThePeople`).
- **Portraits data:** `src/data/portraits.ts` (+ helpers used by portrait pages).

---

## 8. Notable implementation details (recent work)

1. **Startup menu** — Centralized entry at `/` with history **replace** so the menu is one-way.
2. **Women hub** — Routed subsection navigation; **Leadership** wired from cards; hero images fixed to existing assets; **full-bleed heroes** aligned with **The Land** / Leadership / Knowledge patterns on the women landing and subsection pages.
3. **Back controls** — Leadership and Knowledge sub-pages expose a **back** control to return to the women hub.
4. **Full viewport height** — Leadership (and similar) can use `h-screen` + scroll for long content.
5. **Typography** — Cormorant Garamond for serif titles and key character naming.

---

## 9. Related documents

| File | Contents |
|------|----------|
| `README.md` | Short project readme |
| `RELIGIONS-DOCUMENTATION.md` | Religions module specifics |
| `APP-DOCUMENTATION.md` | This file — whole-app overview |

---

## 10. Development tips

- Add new routes **above** the `*` route in `src/App.tsx`.
- If you add a new launcher entry, update **`SCREEN_OPTIONS`** in `StartMenu.tsx` and keep paths in sync with `App.tsx`.
- For new women sub-sections, extend `Women.tsx` state union and conditional render (same pattern as Knowledge/Culture/Resistance).

---

*Last updated to reflect the repository structure and features as documented in this file. Adjust dates and bullets when you ship major changes.*
