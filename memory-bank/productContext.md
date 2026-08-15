# Product Context — Oscar Eriksen Portfolio

## Why This Project Exists
Oscar Eriksen is a graduate CS student at Seattle University (M.S. Computer Science, expected Dec 2026) seeking his first software engineering role. He needs a portfolio website that communicates his skills, projects, and experience to recruiters and hiring managers quickly and memorably.

## Problems It Solves
- **Discoverability:** Recruiters searching for candidates need to find Oscar's work easily. Each section has a stable hash URL for navigation and sharing, while project and experience details remain inline to preserve the single-DOM experience.
- **First impression:** A standard resume PDF doesn't convey technical ability the way a polished, interactive website does. The 3D spatial navigation demonstrates frontend skill while showcasing content.
- **Content centralization:** Instead of scattered project links across GitHub, LinkedIn, and PDFs, one site presents everything cohesively.
- **Easy maintenance:** Adding a new project or updating skills should be trivial — edit a data file, not component code.

## User Experience Goals

### Primary User: Recruiters & Hiring Managers
- Land on the Contact page and immediately understand who Oscar is (name, title, photo)
- Scroll down naturally to discover About Me → Skills → Academics → Projects → Experience
- Each scroll feels like moving through a 3D space — smooth, continuous, no jarring page loads
- Click a project card → its border grows to the viewport and its content cross-fades into full detail → close to return to the grid
- Click the EKJ experience card → see its role, work performed, achievements, and skills in an expandable detail view
- Share a section using a hash URL such as `/#projects` or `/#experience`
- On mobile, the experience should feel just as smooth without the ghost page fly-throughs

### Secondary User: Oscar (Content Maintainer)
- Add a new project by adding one object to `app/data/projects.ts`
- Update skills by editing `app/data/skills.ts`
- Deploy with a single `git push` to Vercel

## How It Should Work
1. User lands on `/` (Contact page) — hero with name, headshot, contact links
2. User scrolls down — camera slides vertically to `/#aboutSkills` (About Me / Skills)
3. The AboutSkillsCard scales up as the camera approaches, revealing personal text and interest carousels (favorite artists, games, content creators) on the left, and skills on the right
4. Carousels auto-rotate with Framer Motion slide animations, arrows, and category labels
5. User continues scrolling — camera slides to `/#academics` (degree cards with shimmering glow + expandable course grid)
6. Clicking a course card expands it inline with the course description
7. Clicking a project card triggers a full-viewport morph at `/#projects`; inactive content fades out while stable-layout detail content fades in
8. Clicking the experience card opens its detail view. Its internal scroll consumes wheel events until the top/bottom boundary, then allows the camera to navigate; leaving the section deactivates and resets the card
9. Nav bar allows direct hash-link jumps. Ghost placeholders appear during distant (≥2 page) transitions
10. Browser back/forward reverse the camera animations correctly
11. On `prefers-reduced-motion: reduce`, all 3D transforms, glow animations, and ghosts disable

## Emotional Response Goals
- **First 3 seconds:** "This is polished. This person cares about craft."
- **First 30 seconds:** "I understand what he does, what he's built, and where he went to school."
- **After exploring:** "I remember this site. It stood out from the 50 other portfolios I reviewed today."