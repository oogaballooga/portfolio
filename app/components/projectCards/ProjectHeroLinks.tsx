import type { CSSProperties, ReactNode } from 'react';
import type { Project, ProjectDetailTheme } from '../../types/content';

interface ProjectHeroLinksProps {
  project: Project;
  theme: ProjectDetailTheme;
}

interface PillAction {
  href: string;
  label: string;
  ariaLabel: string;
  icon: ReactNode;
}

function LinkPill({
  href,
  label,
  ariaLabel,
  icon,
  accentColor,
  surfaceColor,
  compact = false,
}: PillAction & { accentColor: string; surfaceColor: string; compact?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`group flex min-h-11 items-center rounded-2xl border border-(--pill-border) bg-(--pill-bg) transition-[background-color,border-color] duration-300 ease-out hover:border-(--pill-border-hover) hover:bg-(--pill-bg-hover) ${
        compact ? 'gap-2 px-3 py-1.5' : 'gap-2.5 px-4 py-2.5'
      }`}
      style={
        {
          '--pill-border': `${accentColor}${compact ? '40' : '59'}`,
          '--pill-bg': surfaceColor,
          '--pill-border-hover': `${accentColor}${compact ? '80' : 'aa'}`,
          '--pill-bg-hover': `color-mix(in srgb, ${surfaceColor} 86%, white)`,
        } as CSSProperties
      }
    >
      <span className="shrink-0" style={{ color: accentColor }}>
        {icon}
      </span>
      <span
        className={`font-semibold transition-colors duration-300 group-hover:text-white ${
          compact ? 'text-sm' : 'text-base'
        }`}
        style={{ color: accentColor }}
      >
        {label} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}

const GithubIcon = (
  <svg viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

const PlayIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M8 5v14l11-7L8 5Z" />
  </svg>
);

const DocIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
    <path d="M14 2v6h6" />
  </svg>
);

export function ProjectHeroLinks({ project, theme }: ProjectHeroLinksProps) {
  const githubLink = project.links?.find(
    (link) => link.label.toLowerCase() === 'github'
  );
  const docs = project.attachments ?? [];
  if (!githubLink && !project.demoVideo && docs.length === 0) return null;

  return (
    <div className="ml-auto mt-4 flex shrink-0 flex-col items-start gap-2.5 sm:mt-16 sm:items-end">
      {(githubLink || project.demoVideo) && (
        <div className="flex flex-wrap gap-4">
          {githubLink && (
            <LinkPill
              href={githubLink.url}
              label={githubLink.label}
              ariaLabel={`Open the ${project.title} GitHub repository`}
              icon={GithubIcon}
              accentColor={theme.primary}
              surfaceColor={`${theme.panel}e6`}
            />
          )}
          {project.demoVideo && (
            <LinkPill
              href={project.demoVideo}
              label="Demo Video"
              ariaLabel={`Watch the ${project.title} demo video`}
              icon={PlayIcon}
              accentColor={theme.primary}
              surfaceColor={`${theme.panel}e6`}
            />
          )}
        </div>
      )}
      {docs.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {docs.map((doc) => (
            <LinkPill
              key={doc.label}
              href={doc.url}
              label={doc.label}
              ariaLabel={`Open the ${project.title} ${doc.label}`}
              icon={DocIcon}
              compact
              accentColor={theme.secondary}
              surfaceColor={`${theme.panelAccent}1a`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
