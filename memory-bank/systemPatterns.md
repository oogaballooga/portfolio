# System Patterns — Oscar Eriksen Portfolio

## Architecture Overview
Next.js 16 App Router application with a **vertical 3D spatial page stack** implemented via CSS 3D transforms + Framer Motion. The application shell is a fixed viewport camera container. Pages are children positioned at fixed Y offsets. Navigation translates the camera along the Y axis.

```
┌─────────────────────────────────────────┐
│  CameraSystem (fixed viewport, 100vh)   │
│  ┌───────────────────────────────────┐  │
│  │ CameraView (translateY via spring)│  │
│  │ ┌───────────────────────────────┐ │  │
│  │ │ PageShell (y=0) — Contact    │ │  │
│  │ │ PageShell (y=1) — About      │ │  │
│  │ │ PageShell (y=2) — Academics  │ │  │
│  │ │ PageShell (y=3) — Projects   │ │  │
│  │ │ PageShell (y=4) — Experience │ │  │
│  │ │ GhostPage(s) — temp overlay  │ │  │
│  │ └───────────────────────────────┘ │  │
│  └───────────────────────────────────┘  │
│  NavWrapper (fixed overlay)             │
└─────────────────────────────────────────┘
```

## Key Technical Decisions

### 1. Camera System (Not Real 3D)
The "camera" is a `motion.div` with `translateY()` controlled by a Framer Motion spring. The container has `perspective: 1200px` for depth illusion. All pages are `position: absolute` at `translateY(yIndex * 100vh)`. Pure CSS 3D — no WebGL.

### 2. State Flow
```
CameraContext (cameraY: MotionValue, currentPage, navigateTo)
  ├── CameraSystem (reads context, renders pages + ghosts)
  ├── NavWrapper (calls navigateTo on click)
  ├── AboutSkillsCard (useTransform(cameraY) → scale + opacity)
  ├── useCameraController (wheel/keyboard → navigateTo)
  └── InterestCarousel (auto-rotate via setInterval + AnimatePresence)
```

### 3. Two Transition Types
- **Adjacent (distance = 1):** Camera spring slides 100vh. Page content fades in/out via AnimatePresence.
- **Distant (distance ≥ 2):** Ghost pages mount → camera spring slides full distance → content fades in → ghosts unmount.

### 4. AboutSkillsCard Scaling
The card scales from 0.3 (camera at Contact, y=0) → 1.0 (camera at About, y=-vh) → 0.3 (camera at Academics, y=-2*vh). Symmetric bell curve via `useTransform(cameraY, [0, -vh, -2*vh], [0.3, 1, 0.3])`. Opacity fades in/out over the first 40% of approach from either side. Zero per-frame React re-renders — Framer Motion handles interpolation natively.

### 5. CourseCard Expand Pattern
Unfocused cards are 280px wide with title centered. Focus expands to 700–900px. Title wraps at 180px max-width. If the expanded card overflows the right viewport edge, `overflowShift` slides it left via `translateX`. `overflow-x: hidden` on `.page-shell` prevents scrollbar flash during width transitions.

### 6. Degree Card Glow Effect
SVG `feTurbulence` fractal noise combined with radial gradients via `::before` pseudo-element on an outer wrapper. Two simultaneous animations: `grain-descend` (8s) moves noise downward, `glow-pulse` (4s) oscillates opacity 0.35–0.65. Inner card div at `z-10` blocks glow from showing through content. Master's degree uses larger inset and blur via `glow-grain-lg`.

### 7. Zoom Prevention
Ctrl/Cmd keydown adds `ctrl-zoom-active` class to `document.body`. CSS rule sets `overflow-y: hidden !important` on `.page-shell` and `.card-panel` elements. Camera recalibrates position on every `resize` tick during zoom to keep view centered. `keyup`/`blur` remove the class. Guard in camera wheel handler: `if (e.ctrlKey || e.metaKey) return`.

### 8. Scroll Boundary Gating
`useCameraController` listens for `wheel` events on `window` (passive). When the active PageShell's `scrollTop` reaches 0 or scroll bottom (within 5px), `navigateTo` fires. Card panels inside AboutSkillsCard consume wheel events via `e.stopPropagation()` while they have remaining scroll room, then bubble to camera at boundaries.

### 9. Project Viewport Morph
ProjectsSection renders invisible placeholder divs in a CSS grid. `useProjectCardLayout` measures their positions via `getBoundingClientRect()` (section-relative). ProjectCards are `position: absolute` at those measured positions. On activation, the card moves to the viewport center and grows to `100vw × 100vh` using CSS width/height transitions. There is no 3D rotation or backface flip. The inactive content layer fades out, while the active detail layer fades in. The active layer is laid out at its final viewport dimensions from the first render and visually scales from the inactive card size, preventing text from rewrapping while the border grows. An `AnimatePresence` backdrop overlay (black/60%) appears and click-to-deactivate. Project detail wheel events are consumed until the detail panel reaches its scroll boundary, then bubble to the camera. Closing resets detail scroll to the top. No separate route or `layoutId` portal — simpler than the originally planned CardPortal approach. The `useCardStack` hook (numeric IDs) is used by course cards; `useProjectCardLayout` (string IDs, measured positions) is shared by project and experience sections.

### 10. Experience Card Scroll Lifecycle
ExperienceSection uses the same placeholder measurement and absolute positioning pattern as ProjectsSection for one EKJ internship card. The active ExperienceCard retains its flip-style detail view. Its detail panel consumes wheel events while it can scroll, allowing the camera to navigate only when the panel is already at the top/bottom and the user scrolls outward again. `ExperienceSection` watches `currentPage` and deactivates the card when the camera leaves the experience page. ExperienceCard resets its detail panel's `scrollTop` whenever `isActive` becomes false.

## Component Relationships
```
layout.tsx (server, metadata)
  └── CameraSystem (client)
        ├── CameraContext.Provider
        ├── NavWrapper (client)
        ├── PageShell (Contact) → ContactSection
        │     └── FloatingFlipCard (pfp images, 3D float + flip, 2 images)
        ├── PageShell (About) → AboutSection
        │     └── AboutSkillsCard
        │           ├── Personal text (from aboutMe.ts)
        │           ├── InterestCarousel × 3 (artists: 11, games: 9, creators: 6)
        │           ├── Divider → Professional text (from aboutMe.ts)
        │           └── Skills column (from skills.ts, 5 categories, 31 skills)
        ├── PageShell (Academics) → AcademicsSection
        │     ├── DegreeCard × 2 (glow-grain wrapper, masters = highlight variant)
        │     └── CourseCard[] (from education.ts courses[], 14 courses, useCourseCardStack)
        ├── PageShell (Projects) → ProjectsSection
        │     ├── Invisible placeholder grid (measurement only)
        │     ├── AnimatePresence backdrop overlay
        │     └── ProjectCard[] (from projects.ts, 2 projects, viewport morph + stable active layout)
        ├── PageShell (Experience) → ExperienceSection
        │     ├── Invisible placeholder grid (measurement only)
        │     ├── AnimatePresence backdrop overlay
        │     └── ExperienceCard[] (one EKJ internship, flip detail + scroll lifecycle)
        └── GhostPage[] (conditional, during distant ≥2 page transitions)
```

## Critical Implementation Paths
1. **Camera spring animation:** `useSpring(cameraYTarget, { stiffness: 100, damping: 20, mass: 0.5 })` drives the camera view's `translateY`. The spring target updates on `navigateTo`.
2. **AboutSkillsCard proximity scaling:** `useTransform(cameraY, [0, -vh, -2*vh], [0.3, 1, 0.3])` — GPU-composited, no re-renders.
3. **Scroll boundary detection:** `useCameraController` checks `isAtScrollBoundary(pageId, direction)` before calling `navigateTo`.
4. **CourseCard overflow handling:** `useLayoutEffect` computes `overflowShift` from `getBoundingClientRect()` + `innerWidth`. Recalculates on window `resize`.
5. **Zoom camera lock:** `isZoomingRef` tracked via keydown/keyup. `resize` handler recalibrates `cameraY` and `cameraYSpring` to `-yIndex * innerHeight`.
6. **Reduced motion:** All components check `useReducedMotion()`. Glow animations, 3D transforms, ghosts disable when active.
7. **Project viewport morph:** Grid placeholder measurement → absolute card positioning → `100vw × 100vh` border growth → inactive/active content cross-fade → stable active-layout scale → AnimatePresence backdrop. No 3D flip.
8. **Experience card lifecycle:** Detail wheel handling gates camera navigation at scroll boundaries; section-level `currentPage` changes deactivate the card; card-level `isActive` changes reset detail scroll.

## Design Patterns in Use
- **Context + MotionValue:** Camera state through React Context with Framer Motion `MotionValue` — no per-frame re-renders
- **Compound components:** PageShell wraps pages; degree card glow wrapper wraps card
- **Data layer pattern:** All content in `app/data/`, typed, imported by components. Single source of truth.
- **Hook extraction:** Camera control (`useCameraController`), card stack (`useCourseCardStack`) in custom hooks
- **Server/client split:** `layout.tsx` is server component; all interactive components marked `"use client"`
- **CSS pseudo-elements for ambient effects:** Degree card glow uses `::before` with SVG noise — no JS animation overhead