# Implementation Plan

## Status: Phases 1-4 Complete, Phase 5 In Progress

The portfolio website has been substantially rebuilt from the original prototype. All five pages exist in a vertical 3D spatial stack within a single DOM (`app/page.tsx`). Navigation uses hash-based URLs (`/#aboutSkills`, `/#academics`, etc.) with Framer Motion spring-driven camera Y-axis translation. The nav bar triggers direct jumps with ghost page placeholders for distant (≥2 page) transitions. The About Skills card scales based on camera proximity via `useTransform`. The Projects and Experience sections now contain interactive card detail views.

### Key Architectural Deviation from Original Plan
The original plan called for a **multi-route** architecture with separate Next.js route pages (`/about`, `/projects`, `/experience`, `/academics`). The actual implementation uses a **single-DOM** architecture — all sections render in `app/page.tsx` and navigation is purely hash-based with camera Y translation. This was chosen for seamless transitions without page loads. The [Types], [Files], and [Functions] sections below remain as the **original specification** for reference; actual implementation differs as noted throughout.

## Current Implementation Status

### ✅ Completed (Phases 1-4)

| Feature | Status | Notes |
|---|---|---|
| Single-DOM camera system | ✅ Done | Spring physics (stiffness 100, damping 20, mass 0.5) |
| Hash-based navigation | ✅ Done | `/#aboutSkills`, `/#academics`, `/#projects`, `/#experience` |
| Ghost page fly-throughs | ✅ Done | Distant transitions (≥2 pages), 0.9s duration |
| NavWrapper | ✅ Done | Hash links, active page highlighting |
| Zoom handling | ✅ Done | Ctrl/Cmd+scroll blocked, camera recalibration on resize |
| AboutSkillsCard | ✅ Done | Bidirectional scaling (0.3→1.0→0.3), dual scrollable panels |
| Interest carousels (×3) | ✅ Done | Auto-rotate 5s, slide animations, 26 WebP images |
| Degree cards (×2) | ✅ Done | SVG noise glow, masters=highlight variant |
| Course cards (×14) | ✅ Done | Expandable with overflow shift |
| Contact section | ✅ Done | Hero, FloatingFlipCard (2 images), contact links, resume |
| Projects viewport morph | ✅ Done | Grid measurement → absolute positioning → `100vw × 100vh` border/content morph |
| Parallax background | ✅ Done | `useTransform` at 0.3× rate |
| Typed data layer | ✅ Done | 7 data files in `app/data/` |
| WebP conversion | ✅ Done | 26 carousel images (143KB), 2 pfps, 1 crest |
| Reduced motion CSS | ✅ Done | Media query disables 3D, animations, ghosts |
| Scroll boundary gating | ✅ Done | 5px threshold, panel wheel event consumption |
| Scroll reset on navigate | ✅ Done | AboutSkillsCard panels reset to top |
| Navigation debounce | ✅ Done | 200ms prevents multi-page jumps |
| Project detail views | ✅ Done | No 3D flip; inactive/active content cross-fades, active detail scales from stable final layout, detail scroll resets on close |
| Experience data | ✅ Done | One EKJ Rådgivende Ingeniører AS IT Intern entry in Copenhagen, DK |
| Experience card | ✅ Done | Expandable card with achievements, skills, flip-style detail, scroll-boundary handoff, and reset on deactivation |

### 🔧 In Progress (Current Focus)

1. **Polish ProjectsSection morph** — Test border/content timing, viewport sizing, readability, and scroll behavior on small and large screens.
2. **Polish ExperienceSection interaction** — Test the EKJ card's scroll boundary handoff and deactivation/reset behavior on small screens.

### 📋 Remaining (Phase 5 — Future)

1. **Polish:**
    - Add `AnimatePresence` page content fade transitions
   - Test mobile touch swipe navigation
   - Test 60fps on throttled CPU
   - Replace FloatingFlipCard cycling with static headshot (optional)

2. **Accessibility:**
   - Add `aria-label` on nav links, camera container, ghost pages
   - Manage focus during transitions
   - Keyboard navigation (Tab, Enter)
   - Skip-to-content link

3. **SEO:**
   - JSON-LD structured data (Person schema, CreativeWork)
   - `sitemap.xml` and `robots.txt`
   - Open Graph image verification

4. **Performance:**
   - Replace `<img>` with `next/image` (responsive sizes, lazy loading)
   - Add `loading.tsx`, `error.tsx`, `not-found.tsx`
   - Bundle size audit

5. **Cross-browser testing** — Chrome, Firefox, Safari, Edge
6. **Lighthouse** — Target 90+ all categories
7. **Deploy to Vercel**

---

## Original Plan (Historical Reference)

[Overview]
Rebuild the existing Next.js portfolio prototype into a production-ready site where all five pages exist in a vertical 3D spatial stack. Scrolling down moves the camera to the next page; scrolling up moves to the previous page. The nav bar triggers direct jumps — with placeholder "ghost" pages rendered during fly-throughs spanning 2+ pages. The About Me / Skills page centers on a distance-responsive card that scales based on camera proximity.

The approach uses **Framer Motion v12** for all animation orchestration and **CSS 3D transforms** for the perspective camera illusion. No WebGL. All transforms are GPU-composited for consistent 60fps. The camera is a single container (`div` with `perspective: 1200px`) that translates along its Y axis. Each page is a child of the camera, positioned at fixed Y offsets. The About Me / Skills card scales via `useTransform` bound to the camera's Y position.

[Types]
Shared TypeScript interfaces for content data, camera state, transition configuration, and placeholder ghost pages.

**New file `app/types/content.ts`:**
```typescript
// Project entry
interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  skills: string[];
  tech: string[];
  images: string[];
  links?: { label: string; url: string }[];
  featured: boolean;
}

// Experience entry
interface Experience {
  id: string;
  slug: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
  logo?: string;
}

// Education entry
interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: number;
  honors?: string[];
  logo?: string;
  courses: Course[];
}

// Course data
interface Course {
  id: string;
  title: string;
  description: string;
}

// Pages in the vertical 3D stack (top to bottom)
type PageId = 'contact' | 'aboutSkills' | 'academics' | 'projects' | 'experience';

// A page's fixed position in the 3D layout
interface PageSlot {
  id: PageId;
  label: string;         // Display name for nav bar / ghost placeholders
  route: string;         // Next.js route (e.g., '/', '/about', '/academics', '/projects', '/experience')
  yIndex: number;        // 0 = top, 4 = bottom
}

// Direction the camera is moving
type CameraDirection = 'up' | 'down';

// A placeholder ghost page rendered during distant fly-throughs
interface GhostPage {
  pageId: PageId;
  yIndex: number;
  label: string;
}

// Camera system state
interface CameraState {
  currentPage: PageId;
  targetPage: PageId | null;   // null when stationary
  direction: CameraDirection;
  isTransitioning: boolean;
  transitionDistance: number;  // How many page-slots to traverse (1 = adjacent, 2+ = distant)
}
```

**New file `app/types/transitions.ts`:**
```typescript
// Configuration for a single page transition
interface TransitionConfig {
  from: PageId;
  to: PageId;
  distance: number;            // Number of page-slots between from and to
  direction: CameraDirection;
  useGhosts: boolean;          // True when distance >= 2
  ghostPages: GhostPage[];     // Intermediate pages to render as placeholders
  duration: number;            // Transition duration in seconds
}

// Spring physics config for camera movement
interface CameraSpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}
```

**Modified types:**
- `useCardStack` gains `isAnimating: boolean` and `activate(id: string): void`.
- `ProjectCard` props gain `slug: string`; lose `restTop`, `restLeft`, `activeWidth`, `activeHeight`, `id: number`.
- `CourseCard` props gain `layoutId: string`; lose `id: number`, `activeWidth`.

[Files]
Create 18 new files, modify 9 existing files, delete 3 files, update 2 configuration files.

**New files to create:**

1. `app/types/content.ts` — All shared interfaces: Project, Experience, Education, Course, PageId, PageSlot, GhostPage, CameraState.

2. `app/types/transitions.ts` — TransitionConfig, CameraSpringConfig, CameraDirection.

3. `app/data/pages.ts` — The five PageSlot definitions in order, plus a `PAGE_MAP: Record<PageId, PageSlot>` and `getPageByRoute(pathname: string): PageId` utility.

4. `app/data/projects.ts` — `projects: Project[]` array and `getProjectBySlug(slug: string): Project | undefined`.

5. `app/data/experience.ts` — `experiences: Experience[]` array and `getExperienceBySlug(slug: string): Experience | undefined`.

6. `app/data/education.ts` — `education: Education` object (currently one entry, structured for future expansion) with embedded courses array.

7. `app/data/skills.ts` — `skills: { category: string; items: string[] }[]` for the Professional Skills column on the About Me / Skills page.

8. `app/components/CameraSystem.tsx` — THE CORE COMPONENT. A client component that:
   - Wraps all pages in a perspective container (`perspective: 1200px`, `transform-style: preserve-3d`)
   - Manages camera Y translation via Framer Motion `useSpring` or `useMotionValue`
   - Exposes camera Y position via React Context for children (the About Me card needs it)
   - Renders `GhostPage` placeholders during distant transitions (Approach B)
   - Coordinates with `useCameraController` hook
   - Handles scroll-to-navigate (wheel events at page boundaries)
   - Handles nav bar click-to-navigate (direct jumps)

9. `app/components/CameraContext.tsx` — React Context providing `{ cameraY: MotionValue<number>, currentPage: PageId, isTransitioning: boolean, navigateTo: (pageId: PageId) => void }`.

10. `app/components/NavWrapper.tsx` — Client component extracted from layout. Renders the fixed navbar with page links in order (Contact → About/Skills → Academics → Projects → Experience). Uses `usePathname` for active link highlighting. Calls `navigateTo` from CameraContext on click.

11. `app/components/PageShell.tsx` — Wrapper for each page in the 3D stack. Positions the page at its Y offset (`translateY(${yIndex * 100}vh)`). Handles enter/exit fade animations. Ensures pages outside the viewport don't visibly render (clipped or opacity: 0).

12. `app/components/AboutSkillsCard.tsx` — The distance-responsive card for the About Me / Skills page. Uses `useTransform(cameraY, ...)` to scale from ~0.3 (when camera is at Contact) to 1.0 (when camera is at y=1). Two-column layout: left = Personal About Me, center = vertical divider line, right = Professional Skills (mapped from `app/data/skills.ts`).

13. `app/components/SkillBadge.tsx` — Reusable skill pill/badge with subtle hover scale animation.

14. `app/components/SectionHeader.tsx` — Consistent section title with optional animated underline.

15. `app/components/CardPortal.tsx` — Shared element transition wrapper using Framer Motion `layoutId`. Manages the card-expand-into-detail animation for Projects, Experience, and Academics course cards.

16. `app/projects/[slug]/page.tsx` — Dynamic project detail page. Server component for metadata (`generateMetadata`), client sub-component for animated content. Back navigation triggers reverse portal animation.

17. `app/experience/[slug]/page.tsx` — Dynamic experience detail page. Same pattern as project detail.

18. `app/hooks/useCameraController.ts` — Hook that manages camera navigation logic:
    - `navigateTo(target: PageId): void` — Calculates distance/direction, sets up ghost pages if distance >= 2, animates camera, cleans up ghosts after transition
    - Handles wheel events at page boundaries for scroll-to-navigate
    - Handles touch swipe for mobile
    - Returns `{ cameraY, currentPage, isTransitioning, navigateTo, ghostPages }`

**Existing files to modify:**

1. `app/layout.tsx` — Convert to server component. Export `metadata`. Import fonts. Render `<CameraSystem>` wrapping `{children}` and `<NavWrapper>`. The layout no longer directly renders `<main>{children}</main>` — CameraSystem handles the spatial layout.

2. `app/page.tsx` — Rebuilt as the Contact page (route: `/`). Content: hero with name/title/tagline, professional headshot (via simplified FloatingFlipCard), contact links (email, LinkedIn, GitHub), subtle scroll-down indicator. Remove all scroll-snap logic, parallax, and About Me button — those move to CameraSystem and AboutSkillsCard respectively.

3. `app/about/page.tsx` — NEW ROUTE (`/about`). Renders the About Me / Skills page content inside `AboutSkillsCard`. Since the card handles its own scaling, this page just provides the card's internal content.

4. `app/projects/page.tsx` — Refactor to use CSS Grid for card layout. Data-driven rendering from `app/data/projects.ts`. Cards use `CardPortal` for click-to-detail transitions. Remove absolute positioning. Replace hardcoded `cards` array.

5. `app/experience/page.tsx` — Implement full experience page following Projects pattern. Card grid with portal transitions. Wire to `app/data/experience.ts`.

6. `app/academics/page.tsx` — Refactor to use data from `app/data/education.ts`. Keep degree display cards and course grid layout. Replace `CourseCard` absolute positioning with grid layout. Add portal transitions for course detail expansion.

7. `app/components/ProjectCard.tsx` — Refactor: use `motion.div`, add `layoutId`, remove absolute positioning props (`restTop`, `restLeft`), remove `activeWidth`/`activeHeight`, use CSS module for sizing. Keep CSS 3D flip (it works well). Add `slug` prop for routing. Use Framer Motion `whileHover` for hover effects.

8. `app/components/CourseCard.tsx` — Refactor: use Framer Motion for expand/collapse (`animate` prop with variants). Keep the line-and-description reveal pattern. Add `layoutId` and integrate with `CardPortal`.

9. `app/globals.css` — Remove scroll-snap and ScrollToTop-related styles. Add CSS custom properties: `--camera-perspective: 1200px`, `--page-height: 100vh`, `--transition-duration: 0.6s`, `--transition-easing: cubic-bezier(0.4, 0, 0.2, 1)`. Add `prefers-reduced-motion` media query that disables all 3D transforms and uses simple fades.

**Files to delete:**

1. `app/components/ScrollToTop.tsx` — CameraSystem handles scroll position.

2. `app/components/FlippableCard.module.css` — Merged into a shared `app/styles/transitions.css`.

3. `app/components/FloatingFlipCard.module.css` — Floating keyframes moved to `transitions.css`.

**Configuration updates:**

- `package.json` — Add `framer-motion: ^12`.
- `next.config.ts` — Add `images` config if external image domains are needed.
- `tsconfig.json` — Add path alias for `@/types/*` if not already covered by `@/*`.

[Functions]
Add 11 new functions, modify 5 existing functions, remove 2 functions.

**New functions:**

1. `getPageByRoute(pathname: string): PageId` — In `app/data/pages.ts`. Maps a Next.js route to a PageId. `/` → 'contact', `/about` → 'aboutSkills', `/academics` → 'academics', `/projects` → 'projects', `/experience` → 'experience'.

2. `getPageSlot(pageId: PageId): PageSlot` — In `app/data/pages.ts`. Returns the PageSlot object for a given PageId.

3. `getTransitionConfig(from: PageId, to: PageId): TransitionConfig` — In `app/hooks/useCameraController.ts`. Calculates distance, direction, whether ghosts are needed, and which ghost pages to render.

4. `getProjectBySlug(slug: string): Project | undefined` — In `app/data/projects.ts`.

5. `getExperienceBySlug(slug: string): Experience | undefined` — In `app/data/experience.ts`.

6. `generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>` — In `app/projects/[slug]/page.tsx` and `app/experience/[slug]/page.tsx`. Server-side metadata with Open Graph and Twitter card tags.

7. `useCameraController(): CameraControllerReturn` — In `app/hooks/useCameraController.ts`. The central navigation hook. Manages camera spring animation, ghost page lifecycle, wheel/touch event handling, and navigation gating (prevents double-triggers during transitions).

8. `formatDateRange(start: string, end?: string): string` — In `app/lib/formatting.ts`. "Jan 2026 – Present" / "Sept 2023 – Dec 2025".

9. `cn(...classes: (string | undefined | false | null)[]): string` — In `app/lib/cn.ts`. Classname merger.

10. `useScrollReveal(ref: RefObject<HTMLElement>, options?: { threshold?: number }): boolean` — In `app/hooks/useScrollReveal.ts`. IntersectionObserver-based scroll reveal for content within pages (not page transitions — those are camera-driven). Used on detail pages and within long-scroll content.

11. `useReducedMotion(): boolean` — In `app/hooks/useReducedMotion.ts`. Returns `true` if the user has `prefers-reduced-motion: reduce` set. Components use this to disable animations.

**Modified functions:**

1. `useCardStack` in `app/hooks/useCardStack.ts` — Add `isAnimating: boolean`, add `activate(id: string): void` (public), add `deactivateAll(): void`. Export return type.

2. `ProjectCard` in `app/components/ProjectCard.tsx` — Signature changes: add `slug: string`, remove `id: number`, remove `restTop/restLeft`, remove `activeWidth/activeHeight`. Add `layoutId: string`. Use Framer Motion `motion.div` for container. Keep CSS 3D flip. Hover state handled by `whileHover`.

3. `CourseCard` in `app/components/CourseCard.tsx` — Signature changes: add `layoutId: string`, remove `id: number`, remove `activeWidth`. Use Framer Motion `animate` for expand/collapse. Keep line-and-description pattern.

4. `RootLayout` in `app/layout.tsx` — Convert from `"use client"` to server component. Export `metadata`. Render `<CameraSystem><NavWrapper />{children}</CameraSystem>`.

5. `Home` (Contact page) in `app/page.tsx` — Complete rebuild. Remove scroll-snap, parallax, About Me button, about section. Replace with: hero section (name, title, tagline), FloatingFlipCard (simplified — headshot only, no interval cycling), contact links, scroll-down indicator.

**Removed functions:**

1. `ScrollToTop` component — Deleted. CameraSystem manages viewport position.

2. `onWheel` scroll-snap handler in `app/page.tsx` — Removed. Scroll-to-navigate logic moves to `useCameraController`.

[Classes]
No class-based components. All components are functional with hooks. Framer Motion provides animation primitives (`motion.div`, `AnimatePresence`, `LayoutGroup`, `useTransform`, `useSpring`, `useMotionValue`).

**CSS architectural changes:**
- New `.camera-container` class in `app/styles/transitions.css` — `perspective: 1200px; perspective-origin: center center; transform-style: preserve-3d; height: 100vh; overflow: hidden; position: fixed; inset: 0;`
- New `.camera-view` class — The single element that translates along Y to move between pages. Contains all `PageShell` children.
- New `.page-shell` class — Each page wrapper, positioned at its Y offset: `position: absolute; top: calc(var(--page-index) * 100vh); width: 100%; height: 100vh;`
- New `.ghost-page` class — Lightweight placeholder for Approach B fly-throughs. Semi-transparent, blurred, with page label text. Cheap to render (no content, no images, no interactivity).
- Consolidated `.flip-card`, `.face`, `.back` classes in `transitions.css` — Shared by ProjectCard, FloatingFlipCard, and any future flip-card uses.
- `.about-skills-card` — The distance-responsive card. Uses CSS custom property `--card-scale` driven by `useTransform`. Grid layout: `grid-template-columns: 1fr 1px 1fr` (personal | divider | skills).

[Dependencies]

**Add:**
- `framer-motion` v12+ — Core animation library. Bundle impact: ~30KB gzipped. React 19 compatible.

**Not adding:**
- GSAP — Overkill. Framer Motion handles all animation needs (spring physics, transforms, layout animations, scroll-linked animations).
- React Three Fiber / Drei — Actively harmful for this project. WebGL would break accessibility, SEO, and low-end hardware performance. CSS 3D transforms achieve the same 3D illusion with none of those costs.
- View Transitions API — Keep as a possible Phase 5 enhancement. Browser support is still maturing.
- `clsx` / `tailwind-merge` — The `cn()` utility is 4 lines and sufficient.

**Optional dev dependencies (Phase 5):**
- `@next/bundle-analyzer` — Verify bundle size before launch.
- `next-sitemap` — Automated sitemap.xml generation.

[Testing]
Manual testing with Chrome DevTools performance profiling and Lighthouse. No automated test suite (solo developer, 1-month timeline, animation-heavy site).

**Phase 1:** `npm run build` succeeds. All routes render. TypeScript strict mode passes.
**Phase 2:** Test camera scroll between adjacent pages (60fps). Test nav bar click to adjacent pages. Test browser back/forward.
**Phase 3:** Test distant nav jumps (Contact → Projects) with ghost placeholders visible. Verify ghosts mount/unmount cleanly. Test card expand → detail → back flow.
**Phase 4:** All content renders correctly. No layout shifts during image loading. SEO metadata verified with Open Graph debugger.
**Phase 5:** Lighthouse targets — 90+ Performance, 100 Accessibility, 100 SEO, 90+ Best Practices. Test on Chrome, Firefox, Safari, Edge. Test on iPhone SE, iPad, 13" laptop, 27" desktop. Test with 4x CPU throttling. Test with `prefers-reduced-motion: reduce`. Test with screen reader (NVDA).

[Implementation Order — Actual vs. Planned]

The original 5-phase plan (below) was mostly followed through Phase 3, with these key differences:

**Phase 1 (Foundation):** ✅ Completed as planned, except:
- Single-DOM architecture instead of multi-route (no separate `/about/page.tsx`, `/projects/page.tsx`, etc.)
- `app/about/` directory created but left empty

**Phase 2 (Scroll-to-Navigate):** ✅ Completed as planned, except:
- `AnimatePresence` page fade transitions not yet added
- Mobile touch swipe not yet tested
- 60fps throttled CPU not verified

**Phase 3 (Ghost Pages):** ✅ Completed as planned.

**Phase 4 (Card Portals):** 🔄 Simplified inline approach implemented:
- Instead of CardPortal + layoutId transitions, projects use a viewport morph: absolute positioning, CSS width/height transitions, inactive/active opacity cross-fade, and stable active-layout scaling.
- Project detail scrolling is contained at its boundaries and resets on close.
- Experience section is populated with one EKJ IT internship entry and uses a matching placeholder-grid/absolute-card layout.
- Experience detail scrolling bubbles to the camera only at the card's top/bottom boundary; the active card deactivates when leaving the section and resets scroll on deactivation.
- `useProjectCardLayout` is shared by projects and experience instead of refactoring `useCardStack` for projects.
- `app/projects/[slug]/page.tsx` and `app/experience/[slug]/page.tsx` were not created (not needed with inline detail views).
- FloatingFlipCard still cycles 2 images; static headshot replacement deferred.

**Phase 5 (Polish):** 📋 In progress/planned. TypeScript and `next build` pass; `npm run lint` remains non-clean because of existing hook/component lint findings that still need a separate cleanup pass.

**Phase 1 — Foundation & Spatial Architecture (Days 1-4)**
1. Create `app/types/content.ts` and `app/types/transitions.ts`.
2. Create `app/lib/cn.ts` and `app/lib/formatting.ts`.
3. Create `app/data/pages.ts` with PageSlot definitions.
4. Create `app/data/projects.ts`, `app/data/experience.ts`, `app/data/education.ts`, `app/data/skills.ts` with real content.
5. Create `app/styles/transitions.css` with camera container, page shell, ghost page, flip card, and keyframe styles.
6. Install `framer-motion` (`npm install framer-motion`).
7. Create `app/components/CameraContext.tsx`.
8. Create `app/hooks/useCameraController.ts` (skeleton — navigation logic, no ghosts yet).
9. Create `app/components/CameraSystem.tsx` (skeleton — perspective container, page shells, camera Y spring).
10. Create `app/components/NavWrapper.tsx` (extracted from layout).
11. Refactor `app/layout.tsx` → server component with CameraSystem + NavWrapper.
12. Create placeholder pages for `/about`, `/skills` → redirect to `/about` (or treat `/about` as the combined page).
13. Create `app/about/page.tsx` (skeleton with AboutSkillsCard placeholder).
14. Delete `app/components/ScrollToTop.tsx`.
15. Verify build succeeds, all 5 routes render, camera spring moves between pages on scroll.

**Phase 2 — Scroll-to-Navigate & Camera Transitions (Days 5-8)**
1. Implement full `useCameraController` — wheel event handling at page boundaries, touch swipe for mobile.
2. Implement adjacent page camera animation (scroll down/up moves camera by 100vh).
3. Implement nav bar click for adjacent pages.
4. Add `AnimatePresence` fade-in/fade-out for page content as camera arrives/departs.
5. Implement the About Me / Skills card distance-based scaling via `useTransform(cameraY, ...)`.
6. Build the two-column AboutSkillsCard layout (personal left, divider, skills right).
7. Test all adjacent transitions at 60fps on throttled CPU.
8. Test browser back/forward button with correct camera direction reversal.
9. Verify mobile touch scroll works.

**Phase 3 — Distant Navigation with Ghost Pages (Days 9-13)**
1. Implement Approach B ghost system in CameraSystem:
   - When `transitionDistance >= 2`, render `GhostPage` components for intermediate pages.
   - GhostPage: a centered div with the page label, semi-transparent background, blur filter, positioned at the correct Y offset.
   - Ghosts mount before the camera begins moving, unmount after the transition completes.
2. Implement distant nav jump animation — camera spring moves the full distance, ghost pages fly past.
3. Test Contact → Projects (3 pages), Projects → Contact, Experience → Academics, etc.
4. Add speed-easing: distant transitions start fast and decelerate, or use a constant spring with longer duration.
5. Verify ghost pages don't cause layout thrashing (they're `position: absolute` with `transform` only).
6. Add nav bar active state that updates during transitions (not just after).

**Phase 4 — Card Portals & Content Integration (Days 14-20)**
1. Refactor `useCardStack` — add `isAnimating`, `activate()`, `deactivateAll()`.
2. Create `app/components/CardPortal.tsx` using Framer Motion `layoutId`.
3. Refactor `ProjectCard` — remove absolute positioning, add `layoutId`, integrate with CardPortal.
4. Refactor `CourseCard` — Framer Motion expand, `layoutId`, CardPortal integration.
5. Create `app/projects/[slug]/page.tsx` with `generateMetadata` + animated detail content.
6. Create `app/experience/[slug]/page.tsx` with `generateMetadata` + animated detail content.
7. Refactor `app/projects/page.tsx` — CSS Grid, data-driven, portal integration.
8. Implement `app/experience/page.tsx` — card grid following projects pattern.
9. Refactor `app/academics/page.tsx` — wire to education data, update course grid.
10. Wire Academics course cards to detail expansion (in-place, not separate route — course detail expands within the Academics page using CardPortal).
11. Add scroll-triggered fade animations on detail pages using `useScrollReveal`.
12. Build Contact page content — hero, headshot, contact links, scroll-down indicator.
13. Replace FloatingFlipCard cycling with static professional headshot display.
14. Build the Resume section on the Experience page (or as an inline expandable section).

**Phase 5 — Polish, Accessibility & Optimization (Days 21-28)**
1. Accessibility audit:
   - Add `aria-label` on nav links, camera container, ghost pages.
   - Manage focus during transitions (focus the new page's heading after camera settles).
   - Implement `prefers-reduced-motion` — all 3D transforms and springs replaced with instant fades.
   - Ensure keyboard navigation (Tab through nav, Enter to navigate).
   - Add skip-to-content link.
2. SEO audit:
   - Verify `generateMetadata` on all routes.
   - Add JSON-LD structured data (Person schema on Contact, CreativeWork on project detail pages).
   - Generate `sitemap.xml` and `robots.txt`.
   - Verify Open Graph images render correctly.
3. Performance:
   - Replace all `<img>` with `next/image` (responsive sizes, lazy loading).
   - Add `loading.tsx` skeleton states for dynamic routes.
   - Add `error.tsx` error boundaries per route group.
   - Add `not-found.tsx` custom 404 page.
   - Audit bundle size — verify Framer Motion tree-shaking.
4. Mobile:
   - Verify touch targets ≥ 44px.
   - Verify card grids reflow to single column on small viewports.
   - Test portrait and landscape.
   - Ensure ghost pages don't render on mobile (simplify to speed-blur for small screens — better performance).
5. Cross-browser testing — Chrome, Firefox, Safari, Edge.
6. Final Lighthouse audit — target 90+ all categories.
7. Deploy to Vercel, verify production build, test all transitions on production URL.