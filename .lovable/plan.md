
# Hero Section — "The Great Kurdistan"

A full-screen, minimal hero with a blurred office backdrop, a centered silhouette figure, and a bold title that smoothly cycles through different historical contexts on click/tap.

## Layout
- **Full-screen section** (`min-h-screen`), centered both vertically and horizontally
- **Background**: office environment image (Unsplash), slightly blurred + dark overlay (~50–60% opacity) for contrast
- **Centered silhouette**: generic human figure (SVG silhouette, not a real person) sitting above the title
- **Title block** below the silhouette:
  - Large, bold heading (e.g. `text-5xl md:text-7xl`, tight tracking)
  - Optional subtitle/description line in lighter weight underneath
- **Hint text** at the bottom: "Tap anywhere to explore" (subtle, fades after first interaction)

## Content Cycle
The whole hero is clickable/tappable. Each tap advances to the next historical context. Background + silhouette stay fixed; only the text changes.

Sequence (looping):
1. **The Great Kurdistan** — "An ancient land of mountains, poets, and resilience."
2. **The Silk Road** — "Where empires, ideas, and caravans crossed continents."
3. **Mesopotamia** — "The cradle of civilization between two rivers."
4. **The Ottoman Era** — "Six centuries that reshaped three continents."
5. **The Persian Empire** — "From Cyrus to Darius — an empire of tolerance and reach."

(Easy to edit/extend later.)

## Interaction & Animation
- Click or tap anywhere on the hero advances to the next entry
- Text transition: **fade + subtle upward slide**, 400ms, ease-out (using existing `fade-in` / `fade-out` keyframes, keyed on the active index so React remounts the text)
- No motion on background or silhouette — keeps it elegant
- Keyboard accessible: `Enter` / `Space` also advances; section has `role="button"` and `tabIndex={0}`

## Design System
- Add neutral, cinematic tokens to `index.css` (HSL): deep near-black background, warm off-white foreground, muted gold accent for the subtitle
- Typography: bold display heading, generous letter-spacing control, refined muted subtitle
- Add `fade-in` / `fade-out` keyframes + animations to `tailwind.config.ts` (per the animations guide)

## Responsiveness
- Mobile: smaller heading (`text-4xl`), tighter padding, silhouette scales down
- Desktop: large heading (`text-7xl`), more breathing room
- Background uses `bg-cover bg-center` with `object-cover` behavior

## Files
- **Update** `src/pages/Index.tsx` — replace placeholder with the hero
- **Create** `src/components/HeroCharacter.tsx` — inline SVG silhouette component
- **Update** `src/index.css` — add hero color tokens (HSL)
- **Update** `tailwind.config.ts` — add fade-in/out keyframes & animations
