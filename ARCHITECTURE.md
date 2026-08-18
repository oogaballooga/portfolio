# Architecture — Oscar Eriksen Portfolio

## Camera System

```
CameraSystem (fixed viewport, perspective: 1200px)
  └── CameraView (translateY via Framer Motion spring)
        ├── PageShell y=0 → ContactSection
        ├── PageShell y=1 → AboutSection
        ├── PageShell y=2 → AcademicsSection
        ├── PageShell y=3 → ProjectsSection
        ├── PageShell y=4 → ExperienceSection
        └── GhostPage[] (conditional, during distant transitions)
```

Spring config: `{ stiffness: 100, damping: 20, mass: 0.5 }`. Parallax background at 0.3x rate. Navigation debounce: 200ms.

## State Flow

`CameraContext` provides `cameraY` (MotionValue), `currentPage`, `navigateTo`, `resetPage`, `registerPageReset`. The `useCameraController` hook owns spring physics, wheel/touch handling, zoom blocking, ghost page calculation, and hash URL sync.

## Key Hooks

- **`useCameraController`** — Spring target, wheel/keyboard events, zoom handling, ghost calc, nav debounce
- **`useProjectCardLayout`** — Measures invisible grid placeholders, returns absolute positions. Shared by Projects and Experience
- **`useCourseCardStack`** — Course card expand/collapse with string IDs and z-index stacking
- **`useCardStack`** — Generic card stack with numeric IDs

## Component Patterns

**Viewport morph (Projects, Experience):** Invisible CSS grid placeholders are measured via `getBoundingClientRect()`. Cards are `position: absolute` over them. On activation, card grows to `100vw × 100vh` at viewport center. Active detail content is laid out at final size from first render and visually scaled during morph to prevent text reflow. Backdrop overlay via `AnimatePresence`.

**Proximity scaling (AboutSkillsCard):** `useTransform(cameraY, [0, -vh, -2*vh], [0.3, 1, 0.3])` — GPU-composited, zero re-renders.

**Degree card glow:** SVG `feTurbulence` noise + radial gradients via `::before`. Animations: `grain-descend` (8s) + `glow-pulse` (4s).

**Scroll boundary gating:** `useCameraController` checks `isAtScrollBoundary(pageId, direction)` (5px threshold) before navigating. Card panels consume wheel events via `stopPropagation()` until scrolled to edge.

**Ghost pages:** Distant transitions (≥2 pages) render lightweight placeholder divs with page labels. Duration: 0.9s distant, 0.6s adjacent.

**Zoom handling:** Ctrl/Cmd keydown adds `ctrl-zoom-active` class to body. CSS disables overflow on shells/panels. Camera recalibrates on resize during zoom.

## Screens

### 1. Contact (`/`)
Two-column grid. Left: name, title, contact links (Email, LinkedIn, GitHub, Resume). Right: `FloatingFlipCard` (288×384, cycles 2 profile images). Bottom: scroll-down indicator.

### 2. About Me & Skills (`/#aboutSkills`)
Single proximity-scaling card. Left panel (scrollable): personal text, divider, professional text, 3 interest carousels (artists 11, games 9, creators 6). Right panel (scrollable): 5 skill categories, 31 skills.

### 3. Academics (`/#academics`)
Degrees: 2 `DegreeCard` components in responsive grid (master's = highlight variant with larger glow). Courses: 14 `CourseCard` components, click-to-expand inline with overflow shift.

### 4. Projects (`/#projects`)
CSS grid of project cards. Click triggers viewport morph to `100vw × 100vh` with backdrop. Detail view: full description, tech, skills, features, links, attachments, demo video. Scroll contained until boundary.

### 5. Experience (`/#experience`)
Same viewport morph pattern as Projects. One EKJ IT internship card. Flip-style detail with scroll-boundary wheel handling. Deactivates and resets when camera leaves page.

## Navigation

- **Scroll:** Wheel events at page boundary (5px threshold) trigger adjacent transition
- **Nav bar:** Fixed overlay with hash links. Click triggers `navigateTo` with ghost pages for distant jumps
- **Browser back/forward:** `hashchange` event triggers `navigateTo` with correct direction
- **Active state:** Bold + scale on current page link
- **Reset:** Clicking active nav tab calls `resetPage` to close any active card
