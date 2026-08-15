# Progress — Oscar Eriksen Portfolio

## Current Status: Phases 1–4 Complete, Phase 5 In Progress

The single-DOM camera system, about me card, interest carousels, academics formatting, project viewport-morph cards, and populated experience card are all built and working. TypeScript and the production build pass with zero errors.

**Current task:** Polish and test the project-card morph and the responsive experience-card interaction.

## What Works

### Phase 1 — Foundation & Spatial Architecture ✅
- **Single DOM** — All 5 page sections in `app/page.tsx` inside CameraSystem
- **Hash-based URLs** — `/#aboutSkills`, `/#academics`, `/#projects`, `/#experience`
- **Scroll boundary gating** — Wheel events only navigate when at page edge (5px threshold)
- **Shared parallax background** — `useTransform` at 0.3x rate
- **CameraSystem** — Spring physics (stiffness 100, damping 20, mass 0.5), ghost page calculation, parallax background, Ctrl-zoom CSS class toggling
- **NavWrapper** — Hash-based links with `navigateTo`, active page highlighting (bold + scale)
- **Data layer** — Typed projects, experience, education, courses, skills, aboutMe, interests, pages
- **Navigation debounce** — 200ms debounce prevents accidental multi-page jumps from single scroll
- **Zoom handling** — Ctrl/Cmd+scroll blocked, `ctrl-zoom-active` class disables overflow on shells/panels, camera recalibrates on `resize` during zoom
- **Ghost pages** — Distant (≥2 page) transitions render lightweight placeholder divs with page labels

### Phase 2 — About Me & Academics ✅
- **AboutSkillsCard** — Bidirectional scaling (0.3 → 1.0 → 0.3) via `useTransform(cameraY, [0, -vh, -2*vh], [0.3, 1, 0.3])`. Opacity fades in/out over first 40% of distance
- **Interest carousels** — 3 auto-rotating carousels (11 artists, 9 games, 6 creators) with Framer Motion slide animations, left/right arrows, 5s auto-rotate, pause on interaction
- **WebP conversion** — All images (pfp, carousels, crests) converted. Carousels: 143KB total (84% reduction from 883KB)
- **CourseCard improvements** — Title wrapping at 180px, overflow shift (translateX) for right-edge cards, grid min 340px, z-index stacking
- **Degree card glow** — SVG `feTurbulence` noise + radial gradient behind cards, grain-descend (8s) + glow-pulse (6s) animations
- **Course data standalone** — Separated from Education type, `mastersEducation` + `bachelorsEducation` + `courses[]` (14 courses)
- **Scroll reset** — AboutSkillsCard panels reset to top on page return
- **Scroll prevention** — Card panels consume wheel events until scrolled to edge, then bubble to camera
- **Skills updated** — Godot, Agentic Programming, Cline added

### Phase 3 — Academics Formatting ✅
- **Responsive degree layout** — `auto-fit` grid with `justify-center`, responsive widths/heights/text
- **Course grid** — `overflow-x: hidden` prevents scrollbar flash, earlier column reduction
- **"Click courses for more information"** helper text
- **CourseCard overflow shift** — `useLayoutEffect` computes `overflowShift` from `getBoundingClientRect()` + `innerWidth`, recalculates on resize
- **Deactivate on navigation** — Course cards collapse when user navigates away from academics

### Phase 4 — Projects & Experience Content Integration ✅ (Simplified)
- **Grid measurement** — `useProjectCardLayout` hook measures invisible placeholder divs, computes section-relative positions
- **Card positioning** — ProjectCards and ExperienceCards are absolutely positioned over grid placeholders
- **Project activation** — Card moves to center and grows to `100vw × 100vh` with width/height transitions
- **Backdrop** — `AnimatePresence` dark overlay (black/60%) on activation, click-to-deactivate
- **Project detail view** — No 3D flip. Inactive content fades out while active content fades in. Active detail content uses final-size layout plus transform scaling during the morph to prevent text reflow/wrapping jumps. Includes title, description, tech badges, skills, key features, links, attachments, and demo video.
- **Project scroll handling** — Detail wheel events are consumed until the active panel reaches its top/bottom boundary; detail scroll resets when closed
- **2 projects populated** — Mobile App Capstone + Portfolio Website (both with full detail data)
- **Experience data** — One EKJ Rådgivende Ingeniører AS IT Intern entry populated with location, dates, description, achievements, and skills
- **Experience card** — Single expandable card matching the project grid/measurement pattern, with flip-style detail content, scroll boundary handling, and scroll reset on deactivation
- **Experience lifecycle** — Active card deactivates whenever the camera leaves the experience page, including navbar navigation

## What's Left to Build

### Current Tasks (In Progress)
- [x] ~~ProjectsSection basic functionality~~ ✅ (done — viewport morph works)
- [x] ~~Populate experience data~~ ✅ (done — EKJ IT internship)
- [x] ~~Build ExperienceSection card layout~~ ✅ (done — single expandable card)
- [x] ~~Add experience-specific detail fields~~ ✅ (done — location, achievements, skills)
- [ ] Polish ProjectsSection morph timing and responsive sizing
- [ ] Test ExperienceCard scrolling and boundary handoff on small screens

### Remaining Polish
- [ ] Add `AnimatePresence` page fade transitions for section content
- [ ] Test mobile touch swipe navigation
- [ ] Test 60fps on throttled CPU
- [ ] Replace FloatingFlipCard cycling with static headshot (optional)

### Phase 5 — Polish, Accessibility & Optimization (Future)
- [ ] Accessibility audit (aria-labels, focus management, keyboard nav, skip-to-content, `prefers-reduced-motion`)
- [ ] SEO audit (JSON-LD structured data, sitemap.xml, robots.txt, OG images)
- [ ] Performance: `next/image` with responsive sizes, `loading.tsx`, `error.tsx`, `not-found.tsx`
- [ ] Mobile: touch targets ≥44px, single-column grids, ghost pages disabled on <768px
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Lighthouse 90+ all categories
- [ ] Deploy to Vercel

## Decisions Made During Development

- **Single-DOM over multi-route:** All sections live in `app/page.tsx` with hash-based navigation. No separate route pages (`/projects`, `/experience`, etc.) needed. `app/about/` directory exists but is empty (unused).
- **Inline morph over CardPortal:** Projects use absolute positioning plus CSS width/height, opacity, and transform transitions instead of the originally planned Framer Motion `layoutId` portal system. The active project detail uses a stable final-size layout and scales visually during expansion to avoid text reflow.
- **Experience scroll lifecycle:** The active experience card owns its detail scroll boundary behavior; the section deactivates it when `currentPage` changes, and the card resets scroll position whenever it becomes inactive.
- **`useProjectCardLayout` over `useCardStack`:** Custom hook measures grid positions via placeholder refs, separate from the generic `useCardStack` (which uses numeric IDs and is oriented toward the course card pattern).