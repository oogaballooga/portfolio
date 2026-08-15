# Technical Context — Oscar Eriksen Portfolio

## Technologies Used

### Core Stack
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.4 | App Router, server components, file-based routing, metadata API |
| React | 19.2.3 | UI framework, server components, concurrent features |
| TypeScript | 5.x | Type safety, strict mode enabled |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Framer Motion | 12.x | Animation library — page transitions, springs, layout animations, useTransform, AnimatePresence |

### Dev Dependencies
| Package | Purpose |
|---|---|
| ESLint 9 | Linting with Next.js config |
| @tailwindcss/postcss | Tailwind v4 PostCSS integration |
| @types/react, @types/react-dom | TypeScript type definitions |
| @types/node | Node.js type definitions |
| sharp-cli | Image conversion and compression (WebP, resize, quality optimization) |

### Planned Additions (Phase 5)
- `@next/bundle-analyzer` — Bundle size analysis before production deploy
- `next-sitemap` — Automated sitemap generation for SEO

## Development Setup
- **OS:** Windows 11
- **Shell:** CMD (default)
- **Editor:** Visual Studio Code
- **Package Manager:** npm (via Node.js)
- **Version Control:** Git, hosted on GitHub (`oogaballooga/portfolio`)
- **Deployment Target:** Vercel (free tier, zero-config Next.js)

## Technical Constraints
- **No WebGL:** The 3D illusion uses CSS transforms only. No Three.js, no R3F, no canvas.
- **Single animation library:** Framer Motion only. No GSAP, no anime.js. CSS @keyframes permitted for ambient/background effects only (glow, float, grain).
- **GPU-composited only:** Only animate `transform`, `opacity`, and occasionally `filter`. CSS `width`/`height`/`top`/`left` transitions used for project card expand (acceptable for non-continuous transitions).
- **200-line `.tsx` limit:** Target for most components. `ProjectCard.tsx` (~330 lines) and `ExperienceCard.tsx` (~250 lines) are acknowledged exceptions due to their detail-view content.
- **Bundle budget:** < 200KB total (JS + CSS + fonts) on initial load.
- **Lighthouse targets:** 90+ Performance, 100 Accessibility, 100 SEO, 90+ Best Practices.
- **Browser support:** Chrome, Firefox, Safari, Edge (latest 2 versions). Mobile Safari, Chrome for Android.
- **Mobile:** Ghost pages disabled on viewport < 768px. Touch targets ≥ 44px. `passive: true` on touch/wheel listeners.
- **All images WebP:** 26 carousel images compressed to 224×224 at quality 75 (~143KB total). 2 PFP images at 576×768 quality 80. Crest at 200×200 quality 85.

## Dependencies
```json
{
  "framer-motion": "^12.x",
  "next": "16.2.4",
  "react": "^19.2.3",
  "react-dom": "^19.2.3"
}
```

No other runtime dependencies. GSAP and React Three Fiber are explicitly rejected.

## Tool Usage Patterns
- `next dev` — Local development server
- `next build` — Production build
- `next start` — Production server (local preview)
- `npx next lint` — ESLint
- `npx sharp-cli -i "path/*.ext" -o "path/" -f webp -q 75 resize 224 224` — Batch image conversion
- Chrome DevTools Performance tab (4x CPU throttling) — Animation profiling
- Lighthouse (Chrome DevTools) — Performance/accessibility/SEO auditing

## File Structure (Current)
```
portfolio/
├── app/
│   ├── layout.tsx              # Server component, metadata + fonts, wraps children in CameraSystem
│   ├── page.tsx                # Single-DOM composition of all 5 sections (client component)
│   ├── globals.css             # Tailwind + CSS vars + body overflow:hidden
│   ├── favicon.ico
│   ├── about/                  # Empty directory (unused — single-DOM architecture)
│   ├── types/
│   │   ├── content.ts          # Project, Experience, Education, Course, PageSlot, SkillCategory, etc.
│   │   └── transitions.ts      # TransitionConfig, CameraSpringConfig
│   ├── data/
│   │   ├── pages.ts            # PAGE_SLOTS definitions + PAGE_MAP + lookup utilities
│   │   ├── projects.ts         # Project[] (2 entries) + getProjectBySlug()
│   │   ├── experience.ts       # Experience[] (1 EKJ IT internship entry) + getExperienceBySlug()
│   │   ├── education.ts        # mastersEducation, bachelorsEducation, courses[] (14 courses)
│   │   ├── skills.ts           # SkillCategory[] (5 categories, 31 skills)
│   │   ├── aboutMe.ts          # personalText, professionalText
│   │   └── interests.ts        # InterestCategory[] (artists: 11, games: 9, creators: 6)
│   ├── hooks/
│   │   ├── useCameraController.ts  # Spring physics, wheel/touch, zoom, ghost calc, nav debounce
│   │   ├── useCourseCardStack.ts   # Course card expand/collapse (string IDs)
│   │   ├── useProjectCardLayout.ts # Grid placeholder measurement for project cards
│   │   └── useCardStack.ts         # Generic card stack (numeric IDs)
│   ├── components/
│   │   ├── CameraSystem.tsx    # Camera provider + parallax bg + GhostPageOverlay
│   │   ├── CameraContext.tsx   # React Context (MotionValue, currentPage, etc.)
│   │   ├── NavWrapper.tsx      # Fixed nav bar, hash links, active state
│   │   ├── PageShell.tsx       # Scrollable page wrapper, Y offset
│   │   ├── AboutSkillsCard.tsx # Proximity-scaling card with panels + carousels
│   │   ├── InterestCarousel.tsx # Auto-rotate carousel, next/Image, slide anim
│   │   ├── DegreeCard.tsx      # Degree display with glow-grain effect
│   │   ├── CourseCard.tsx      # Expandable course card with overflow shift
│   │   ├── CourseCard.css      # Course card grid styles
│   │   ├── ProjectCard.tsx     # Viewport-morph detail view + inline expand activation
│   │   ├── ExperienceCard.tsx  # Flip-style detail view with scroll boundary/reset behavior
│   │   ├── FloatingFlipCard.tsx # 3D floating flip card (2 images, 10s cycle)
│   │   ├── FlippableCard.module.css    # CSS module (legacy, may be unused)
│   │   ├── FloatingFlipCard.module.css # CSS module (legacy, may be unused)
│   │   └── sections/
│   │       ├── ContactSection.tsx     # Hero + headshot + contact links
│   │       ├── AboutSection.tsx       # Heading + AboutSkillsCard wrapper
│   │       ├── AcademicsSection.tsx   # DegreeCards + CourseGrid
│   │       ├── ProjectsSection.tsx    # Viewport-morph grid + backdrop
│   │       └── ExperienceSection.tsx  # Single EKJ internship card + lifecycle handling
│   ├── styles/
│   │   └── transitions.css     # Camera, ghost, flip, float, grain, zoom, a11y
│   └── lib/
│       ├── cn.ts               # Classname utility
│       └── formatting.ts       # Date range formatter
├── public/
│   ├── images/
│   │   ├── pfp/                # 2 pfps (image.webp, image1.webp — 576×768)
│   │   ├── carousels/          # artists(11), games(9), creators(6) — 224×224 WebP
│   │   └── seattleuCrest.webp  # 200×200
│   ├── documents/capstone/     # Design Doc.pdf, Presentation.pdf, Scope Doc.pdf
│   └── Oscar-Eriksen-Resume.pdf
├── memory-bank/                # 6 docs
├── .clinerules/                # Coding standards
├── package.json                # next 16.2.4, react 19.2.3, framer-motion ^12.42.0
├── tsconfig.json
├── next.config.ts
└── implementation_plan.md
```

## Key Architecture Decisions (Deviations from Original Plan)
- **Single-DOM architecture** (not multi-route): All sections in `app/page.tsx`, navigation via hash + camera Y translation. Originally planned as separate routes.
- **Inline viewport morph** (not CardPortal): Project detail views use CSS width/height, opacity, and transform transitions plus absolute positioning. The active content is laid out at final size and visually scaled during the morph instead of using Framer Motion `layoutId` shared element animations.
- **Experience card scroll lifecycle:** Experience detail content consumes wheel events until its scroll boundary, deactivates on section leave, and resets to the top whenever closed.
- **No `SkillBadge.tsx`, `SectionHeader.tsx`, `CardPortal.tsx`**: Not needed with current architecture.
- **No `useScrollReveal.ts` or `useReducedMotion.ts`**: Reduced motion via CSS media queries.
- **No separate route pages**: `app/projects/[slug]/` and `app/experience/[slug]/` were not created.
- **No `ScrollToTop.tsx`**: Deleted as planned.
- **2 pfps, not 3**: Only image.webp and image1.webp exist.