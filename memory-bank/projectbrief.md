# Project Brief — Oscar Eriksen Portfolio

## Project Name
Oscar Eriksen — CS Graduate Student Portfolio

## Core Objective
Build a modern, premium-feeling portfolio website that helps Oscar Eriksen get hired as a new graduate software engineer and future M.S. Computer Science graduate.

## Key Goals
- Make a strong first impression on recruiters and hiring managers
- Showcase projects, experience, education, skills, and contact information
- The site should support direct hash links to each section (`/#aboutSkills`, `/#academics`, `/#projects`, `/#experience`) for sharing and navigation
- Feel smooth, interactive, and memorable — 3D spatial navigation as a differentiator
- Achieve Lighthouse scores ≥ 90 across all categories
- Be fully accessible (WCAG AA) and mobile-friendly

## Core Visual Concept
A "connected 3D world" illusion where five pages exist in a vertical spatial stack. Navigation feels like a virtual camera moving through space. The implementation uses CSS 3D transforms + Framer Motion — not WebGL. The 3D effects enhance navigation and storytelling without sacrificing usability.

## Page Layout (Top to Bottom)
1. **Contact** (`/`) — Landing page: hero section, headshot, contact links, scroll-down indicator
2. **About Me / Skills** (`/#aboutSkills`) — Combined page with a distance-responsive card (personal left, skills right, vertical divider). Card scales based on camera proximity.
3. **Academics** (`/#academics`) — Degree display cards + course grid with expand-in-place interaction
4. **Projects** (`/#projects`) — Project card grid with full-viewport morph transitions to inline detail views
5. **Experience** (`/#experience`) — Experience card grid with inline detail views; currently one EKJ IT internship card

## Navigation Model
- **Scroll up/down** at page boundaries triggers adjacent page transitions (camera slides along Y axis)
- **Nav bar** triggers direct jumps to any page with ghost page fly-through illusion for distant (≥2) transitions
- **Browser back/forward** triggers reverse camera transitions
- **Project card clicks** trigger a full-viewport border/content morph with inline detail content
- **Experience card clicks** trigger a flip-style inline detail view with scroll-boundary handoff

## Timeline
~1 month (28 days) of solo development, broken into 5 phases.

## Success Criteria
- Lighthouse: 90+ Performance, 100 Accessibility, 100 SEO, 90+ Best Practices
- Smooth 60fps transitions on average laptops
- Usable on low-end hardware and mobile devices
- All content editable via data files without component changes
- Deployed on Vercel, accessible via custom domain