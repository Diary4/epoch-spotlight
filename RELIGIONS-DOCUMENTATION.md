# Religions Module Documentation

## Screen Naming

- **Home** = `Discover Kurdistan` screen
- **Religions** = `Religions` screen (`src/pages/Religions.tsx`)

## What Has Been Implemented

### 1) Navigation Flow

- From **Home (Discover Kurdistan)**, user can navigate to the **Religions** screen.
- Inside **Religions** (`src/pages/Religions.tsx`):
  - Clicking `Religions` card opens `ReligionsKurdistan` (`src/components/Sections/religions/ReligionsKurdistan.tsx`).
  - Clicking `Nationalities` card opens `Nationalities` (`src/components/Sections/religions/Nationalities.tsx`).
  - Clicking `Stories of Coexistence` card opens `Coexistence` (`src/components/Sections/religions/Coexistence.tsx`).
- Inside **Religions of Kurdistan**:
  - Clicking `Yazidism` card opens `Yazidism` (`src/components/Sections/religions/RelisgionsSection/Yazidism.tsx`).

### 2) Back Navigation

- Back button exists and is wired in:
  - `ReligionsKurdistan` -> back to `Religions`
  - `Nationalities` -> back to `Religions`
  - `Coexistence` -> back to `Religions`
  - `Yazidism` -> back to `ReligionsKurdistan`

### 3) Visual Fixes

- Fixed top hero image visibility issue in `Nationalities` by adjusting layering and overlay opacity.
- Added a soft white/cream fade effect at the bottom border of the hero image in `Yazidism` for smoother blend into content.

### 4) Asset/Import Stability

- Fixed broken image import paths that blocked page rendering.
- Updated pages to use existing assets so navigation targets compile and open correctly.

### 5) GSAP Animation Sequence

Implemented consistent staged animation across religion-related screens:

1. Hero image appears first (fade + slight scale-in)
2. Content appears after (fade + upward motion with stagger)

Applied in:

- `src/pages/Religions.tsx`
- `src/components/Sections/religions/ReligionsKurdistan.tsx`
- `src/components/Sections/religions/Nationalities.tsx`
- `src/components/Sections/religions/Coexistence.tsx`
- `src/components/Sections/religions/RelisgionsSection/Yazidism.tsx`

## Current Structure (Quick Map)

- `src/pages/Religions.tsx`
  - Parent controller for religions flow
  - Handles sub-page switching and shared language state
- `src/components/Sections/religions/ReligionsKurdistan.tsx`
  - Religions list screen
  - Entry point to `Yazidism`
- `src/components/Sections/religions/Nationalities.tsx`
  - Nationalities and communities screen
- `src/components/Sections/religions/Coexistence.tsx`
  - Stories of coexistence screen
- `src/components/Sections/religions/RelisgionsSection/Yazidism.tsx`
  - Yazidism detail screen

## Notes

- `RelisgionsSection` directory name is currently spelled as-is in the project and is being used consistently by imports.
- Language button UI exists across screens; full language-content localization can be extended later as needed.
