import Image from 'next/image';
import { CaseStudySection } from './CaseStudySection';
import { ProjectHeroLinks } from './ProjectHeroLinks';
import type { ProjectCardDetailProps } from './types';

export default function DefaultProjectCard({
  project,
}: ProjectCardDetailProps) {
  const caseStudy = project.caseStudy;
  const theme = caseStudy?.theme;

  if (!caseStudy || !theme) return null;

  const [keyFeaturesSection, architectureSection, ...remainingSections] =
    caseStudy.sections;

  return (
    <div
      className="h-full p-4 md:p-12"
      style={{ backgroundColor: theme.background }}
    >
      {/* ── Hero ── */}
      <div className="relative flex flex-col items-start gap-4 pb-3 mb-8 md:flex-row md:gap-8 md:pb-0 md:mb-0">
        <div className="max-w-4xl min-w-0">
          <p
            className="mb-2 text-sm font-semibold uppercase tracking-[0.28em]"
            style={{ color: theme.secondary }}
          >
            {caseStudy.eyebrow}
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            {project.title}
          </h2>
        </div>

        {theme.heroImage && (
          <div className="relative h-32 w-24 self-center md:absolute md:left-1/2 md:top-10 md:-translate-x-1/2">
            <Image
              fill
              sizes="96px"
              src={theme.heroImage}
              alt={`${project.title} project visual`}
              className="object-contain"
            />
          </div>
        )}

        <ProjectHeroLinks project={project} theme={theme} />
      </div>

      <p
        className="max-w-3xl pb-3 text-lg leading-relaxed md:mt-6 md:pb-0 md:text-xl"
        style={{ color: theme.mutedText }}
      >
        {caseStudy.heroSummary}
      </p>

      {/* ── Content Grid ── */}
      <div className="mt-4 grid gap-5 md:mt-[46px] lg:grid-cols-2">
        {keyFeaturesSection && (
          <div
            className="rounded-3xl p-5 md:p-6"
            style={{
              border: `1px solid ${theme.primary}59`,
              backgroundColor: `${theme.panel}e6`,
            }}
          >
            <CaseStudySection
              section={keyFeaturesSection}
              textColor={theme.text}
              accentColor={theme.secondary}
            />
          </div>
        )}

        {architectureSection && (
          <div
            className="rounded-3xl p-5 md:p-6"
            style={{
              border: `1px solid ${theme.secondary}4d`,
              backgroundColor: `${theme.panelAccent}1a`,
            }}
          >
            <CaseStudySection
              section={architectureSection}
              textColor={theme.text}
              accentColor={theme.secondary}
            />
          </div>
        )}
      </div>

      {/* ── Remaining Sections ── */}
      {remainingSections.length > 0 && (
        <div className="mt-5 space-y-5">
          {remainingSections.map((section) => (
            <div
              key={section.heading}
              className="rounded-3xl p-5 md:p-6"
              style={{
                border: `1px solid ${theme.secondary}4d`,
                backgroundColor: `${theme.panel}e6`,
              }}
            >
              <CaseStudySection
                section={section}
                textColor={theme.text}
                accentColor={theme.secondary}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Takeaway ── */}
      <div
        className="mt-5 rounded-3xl p-5 pb-3 md:p-6 md:pb-4"
        style={{
          border: `1px solid ${theme.secondary}4d`,
          backgroundColor: `${theme.panel}e6`,
        }}
      >
        <p
          className="mb-3 text-2xl font-extrabold tracking-tight"
          style={{ color: theme.secondary }}
        >
          Takeaway
        </p>
        <p className="text-base leading-8 md:text-lg" style={{ color: theme.text }}>
          {caseStudy.recruiterTakeaway}
        </p>
      </div>
    </div>
  );
}
