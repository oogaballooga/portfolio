# Agent Instructions — Oscar Eriksen Portfolio

## Project

Next.js 16 portfolio with a **single-DOM 3D camera system**. Five sections render in `app/page.tsx`. Navigation translates a virtual camera along the Y axis with Framer Motion springs. CSS 3D transforms only — no WebGL.

## Stack

Next.js 16 (App Router, server components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion 12. No other runtime deps.

## Commands

```bash
npm run dev       # Dev server
npm run build     # Production build (must pass with zero errors)
npm run lint      # ESLint (has existing warnings)
```

## Reference Files

- **`ARCHITECTURE.md`** — Camera system, hooks, component patterns, screen layouts, navigation. Read when modifying structural code.
- **`DESIGN.md`** — Color palette, typography, visual effects, motion language. Read when changing visual style or adding new UI.

## Architecture

`layout.tsx` (server) → `CameraSystem` (client, perspective container) → `CameraContext.Provider` → five `PageShell` wrappers (y=0..4) each containing a section component. Navigation is hash-based (`/#aboutSkills`, `/#academics`, etc.). Ghost pages render for distant (≥2 page) transitions.

## Workflow: Sub-Agent Delegation

The main agent is a **delegator**, not a solo worker. To keep the context window lean:

1. **Explore first, code second.** Before writing code, delegate exploration to an `explore` sub-agent. It reads files, searches patterns, and returns a summary — not raw content.
2. **One task per sub-agent.** Each `general` sub-agent handles one focused unit of work (e.g., "refactor CourseCard overflow logic"). Provide exact file paths and expected output.
3. **Never read files you won't edit.** Use `explore` sub-agents to gather context. Only read files directly when you are about to modify them.
4. **Run builds via bash, not sub-agents.** `npm run build` is fast — run it directly to verify.
5. **Summarize, don't paste.** When a sub-agent returns results, act on the summary. Don't re-read the files it already read.

This keeps the main agent's context window focused on decisions, not data gathering.

## Rules

1. **Be concise.** Responses should be as short as possible unless the user asks for more detail.
2. **Content in data files, never in components.** Adding content = editing `app/data/`, not component code.
2. **Generic blueprint components pull from typed data.** No item-specific conditionals, copy, themes, or asset paths in shared components. Item-specific presentation goes in dedicated files registered by stable ID.
3. **GPU-composited only.** Animate `transform`, `opacity`, and `filter`. CSS `width`/`height` only for non-continuous card expand.
4. **Framer Motion for all animation.** CSS `@keyframes` only for ambient effects (glow, float, grain).
5. **No WebGL.** No Three.js, no R3F, no canvas.
6. **200-line `.tsx` target.** Exceptions: `ProjectCard.tsx` (~330), `ExperienceCard.tsx` (~250).

## Constraints

- All images WebP (carousel 224×224 q75, PFP 576×768 q80, crest 200×200 q85)
- Browser: latest 2 versions of Chrome, Firefox, Safari, Edge
- Mobile: ghost pages disabled <768px, touch targets ≥44px, `passive: true` on listeners
- `prefers-reduced-motion: reduce` disables all 3D, glow, and ghosts (CSS only)
