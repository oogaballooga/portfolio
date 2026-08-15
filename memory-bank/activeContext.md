# Active Context — Oscar Eriksen Portfolio

## Current Work Focus
Phases 1–4 are substantially complete. The single-DOM camera system, about me card (with bidirectional scaling + interest carousels), academics formatting (degree cards with shimmering glow + expandable course grid), projects viewport-morph cards, and the populated experience card are all built and functional.

**Current focus:** Polish and test the project-card morph on different viewport sizes, then continue the broader accessibility, mobile, and performance pass.

## Recent Changes
- **AboutSkillsCard built:** `useTransform`-based bidirectional scaling (0.3 → 1.0 → 0.3) as camera approaches the About page. Left column: personal text, interest carousels, professional text (separated by a horizontal divider). Right column: skills by category from `app/data/skills.ts`.
- **Interest carousels:** Three auto-rotating carousels (Favorite Artists, Favorite Games, Favorite Content Creators) with Framer Motion slide animations, left/right arrows, and category titles. All images converted to WebP and compressed to 224×224 at quality 75.
- **Education data refactored:** `Education` type no longer includes embedded `courses`. Courses are a standalone `Course[]` array. Degrees (`mastersEducation`, `bachelorsEducation`) are clean objects with just metadata. "Student Grader" added to master's honors.
- **CourseCard improvements:** Title wrapping at 180px max-width with center alignment. Overflow shift automatically slides cards left when expanded descriptions would overflow the viewport. `overflow-x: hidden` on `.page-shell` prevents scrollbar flash during expand animations. Grid uses `minmax(340px, 1fr)` for earlier column reduction.
- **DegreeCard with shimmering glow:** SVG `feTurbulence` noise + radial gradient glow behind cards, descending grain animation (8s) + pulse opacity (4s). Master's degree gets larger glow (`variant="highlight"`). Glow is on an outer wrapper, card content on an inner div at z-10.
- **Responsive degree layout:** CSS grid `repeat(auto-fit, minmax(300px, 670px))` with `justify-center`. Cards have responsive widths/heights/text across breakpoints.
- **Zoom handling:** Ctrl/Cmd+scroll blocked from navigating camera. `ctrl-zoom-active` CSS class toggled on `document.body` during keydown, disabling `overflow-y` on `.page-shell` and `.card-panel` elements. Camera recalibrates position on `resize` events during zoom to prevent drift.
- **Scroll reset:** AboutSkillsCard panels reset to top when user navigates back to the about page.
- **Content layer:** `app/data/aboutMe.ts` stores personal/professional text. `app/data/interests.ts` stores all three carousel categories with typed data.
- **WebP conversion:** All images (pfp, carousels, crests) converted to WebP. Carousel images compressed to 143KB total (84% reduction from 883KB).
- **Projects viewport morph:** ProjectsSection uses invisible grid placeholders for measurement, then positions ProjectCards absolutely over the grid via `useProjectCardLayout` hook. Clicking activates a card — its border/background grows to `100vw × 100vh` and moves to the center with a backdrop overlay. Inactive content fades out while active detail content fades in. Active content is laid out at its final size from the first render and visually scales during the morph to avoid text reflow/wrapping jumps. Detail wheel events remain inside the card until its scroll boundary; closing resets detail scroll to the top.
- **Experience section populated:** `app/data/experience.ts` contains one EKJ Rådgivende Ingeniører AS IT Intern entry in Copenhagen, DK, with description, achievements, and skills. `ExperienceSection` follows the project placeholder-grid/absolute-card pattern.
- **Experience card lifecycle:** ExperienceCard retains the flip-style detail view with scroll-boundary wheel handling. ExperienceSection deactivates the card whenever `currentPage` leaves `experience`, and ExperienceCard resets its detail scroll whenever it becomes inactive.
- **FloatingFlipCard:** 3D floating headshot card on Contact page. Uses `float3d` keyframe animation (rotation + translation). Cycles between 2 profile images.
- **Ghost pages:** Implemented for distant (≥2 page) navigation transitions. Lightweight placeholder divs with page labels, semi-transparent, non-interactive. Duration: 0.9s distant, 0.6s adjacent.

## Current State: What's Built vs. What's Left

### ✅ Done
- Single-DOM camera system with spring physics (stiffness 100, damping 20, mass 0.5)
- Hash-based navigation (`/#aboutSkills`, `/#academics`, etc.) with debounce (200ms)
- Ghost page fly-throughs for distant transitions
- NavWrapper with hash links and active state tracking
- Zoom handling (Ctrl/Cmd+scroll prevention, camera recalibration on resize)
- AboutSkillsCard with bidirectional scaling and dual scrollable panels
- 3 interest carousels (auto-rotate 5s, slide animations, arrows, 26 images)
- 2 degree cards with shimmering SVG noise glow (masters variant larger)
- 14 expandable course cards with overflow shift handling
- Contact section with hero, headshot, contact/resume links
- Projects section with inline expand (2 projects: capstone + portfolio)
- All images converted to WebP (carousels: 143KB total)
- CSS: camera container, page shells, ghost pages, flip cards, float, grain glow, zoom, reduced-motion
- All content in typed data files (`app/data/`)

### 🔧 Needs Work (Next Tasks)
- **ProjectsSection polish:** Test the viewport morph on small and large screens, tune border/content timing, and verify that the scaled active content remains readable.
- **ExperienceSection polish:** Test the single EKJ card at small viewport sizes and confirm boundary handoff feels natural when scrolling out of the active card.
- **FloatingFlipCard:** Currently cycles 2 profile images; may replace with static headshot
- **Page fade transitions:** `AnimatePresence` for page content fade as camera arrives/departs
- **Mobile touch swipe:** Not yet tested or implemented
- **Performance testing:** 60fps on throttled CPU not verified

### 📋 Phase 5 (Future — Polish, AO, SEO)
- Accessibility audit (aria-labels, focus management, keyboard nav, skip-to-content)
- SEO audit (metadata, JSON-LD, sitemap, OG images)
- Performance: `next/image`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Mobile: touch targets ≥44px, single-column grids on small viewports
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Lighthouse 90+ all categories
- Deploy to Vercel

## Active Decisions
- Hash-based URLs for single-DOM fluidity (`/#aboutSkills`, `/#academics`, etc.)
- **Single-DOM architecture:** All sections in `app/page.tsx`, no separate route pages. Navigation is pure camera Y-axis translation via Framer Motion spring. This was chosen over multi-route architecture for seamless transitions without page loads.
- Parallax rate: 0.3 (background moves 30% as fast as pages)
- Scroll threshold: 5px from edge before camera navigation triggers
- Body overflow: `hidden` to prevent double-scrollbars
- `overflow-x: hidden` on PageShell to prevent animation scrollbar flash
- Course title width: 180px max with wrapping and center alignment
- Carousel image size: 224×224px WebP at quality 75
- All content in typed data files, never inline in components
- Projects use **inline viewport morph** pattern (not CardPortal/separate routes) — cards expand to center with a `100vw × 100vh` border/background, inactive and active content cross-fade, and active detail content scales from a stable final layout. No dedicated project detail pages needed.

## Architecture: Single-DOM Camera System
```
app/page.tsx (single route, all 5 sections)
  └── CameraSystem (camera-container + parallax bg)
        ├── NavWrapper (fixed overlay, hash links)
        ├── PageShell y=0 → ContactSection (hero + FloatingFlipCard)
        ├── PageShell y=1 → AboutSection (AboutSkillsCard with carousels)
        ├── PageShell y=2 → AcademicsSection (DegreeCards + CourseGrid)
        ├── PageShell y=3 → ProjectsSection (viewport-morph cards)
        ├── PageShell y=4 → ExperienceSection (one EKJ internship card)
        └── GhostPage[] (conditional, during distant transitions)