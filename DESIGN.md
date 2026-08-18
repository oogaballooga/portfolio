# Design — Oscar Eriksen Portfolio

## Color Palette

- **Background:** Pure black (`#000000`) body, dark radial gradients for parallax (`#333`, `#222`, `#2a2a2a`)
- **Text:** White (`#fff`) headings, gray-300/400 body text, gray-500 muted
- **Borders:** `border-gray-700` with `bg-black/30 backdrop-blur-sm` for cards/containers
- **Glow:** Purple-blue radial gradients (`rgba(180, 180, 255, 0.08–0.12)`) behind degree cards
- **Backdrop overlays:** `bg-black/60` for active card dimming

## Typography

- **Font:** Geist Sans (via Next.js), fallback to Arial/Helvetica
- **Headings:** `text-4xl md:text-6xl font-bold` (Contact), `text-4xl font-bold` (section titles), `text-2xl font-bold` (sub-sections)
- **Body:** `text-lg md:text-xl text-gray-400` (hero subtitle), `text-sm text-gray-500` (helpers)
- **Nav links:** Default weight, `font-bold scale-110` when active

## Layout Patterns

- **Page padding:** `px-8 pt-24 pb-16` on all sections
- **Max width:** `max-w-[90rem]` for Academics, Projects, Experience
- **Grid:** `grid-cols-[repeat(auto-fit,minmax(Xpx,1fr))]` — X varies by section (300px degrees, 340px courses, 400px projects/experience)
- **Contact page:** `max-w-6xl` two-column grid, single column on mobile
- **Cards:** Rounded corners (`rounded-2xl`), border + backdrop blur for containers

## Visual Effects

### Degree Card Glow
SVG `feTurbulence` fractal noise + radial gradients via `::before` pseudo-element on `.glow-grain` wrapper. Two animations: `grain-descend` (8s, noise scrolls down) + `glow-pulse` (4s, opacity 0.35–0.65). Inner card at `z-10` blocks glow from content. Master's degree uses `.glow-grain-lg` (larger inset, more blur).

### Floating 3D Card (Contact)
`FloatingFlipCard` with `float3d` keyframe — `rotateX` ±6°, `rotateY` ±4°, `translateY` ±3px over 10s. Card flips via `rotateY(180deg)` on interval. `perspective: 1200px` on scene wrapper.

### Viewport Morph (Projects, Experience)
Inactive card at fixed size → grows to `100vw × 100vh` at center. Active detail content is laid out at final size from first render, visually scaled down via `transform: scale()` during morph, then scales to 1.0. This prevents text reflow. `AnimatePresence` backdrop (black/60%) fades in/out.

### Proximity Scaling (AboutSkillsCard)
Card scales `0.3 → 1.0 → 0.3` as camera passes through the About page. Driven by `useTransform(cameraY, ...)` — pure GPU interpolation, zero React re-renders. Opacity fades over first 40% of approach.

### Navbar
Fixed top-center, `min(50rem, 90vw)` width, rounded bottom (`border-radius: 0 0 50px 50px`). `rgba(100, 100, 100, 0.35)` background with `backdrop-filter: blur(6px)`. Opacity 0.5 idle, 1.0 on hover. `z-index: 1000`.

## Motion Language

- **Camera transitions:** Framer Motion spring (`stiffness: 100, damping: 20, mass: 0.5`) — smooth deceleration, no overshoot
- **Adjacent pages (distance=1):** ~0.6s visual duration
- **Distant pages (distance≥2):** ~0.9s, ghost page placeholders fly through
- **Card expand/collapse:** CSS transitions on `width`/`height` (non-continuous, acceptable)
- **Content fades:** `AnimatePresence` for backdrop and page content
- **Carousels:** 5s auto-rotate, slide animation, pause on interaction
- **Nav debounce:** 200ms prevents accidental multi-page jumps
- **Reduced motion:** All 3D transforms, glow animations, and ghosts disabled via `prefers-reduced-motion: reduce` (CSS only)
