import { useState } from 'react';
import Image from 'next/image';
import { CaseStudySection } from './CaseStudySection';
import { ProjectHeroLinks } from './ProjectHeroLinks';
import type { ProjectCardDetailProps } from './types';

export default function CraftStashProjectCard({
  project,
}: ProjectCardDetailProps) {
  const [iconError, setIconError] = useState(false);
  const caseStudy = project.caseStudy;
  const theme = caseStudy?.theme;
  const interactiveDemo = project.links?.find((link) =>
    link.label.toLowerCase().includes('interactive demo')
  );

  if (!caseStudy || !theme) return null;

  const [keyFeaturesSection, architectureSection, ...remainingSections] =
    caseStudy.sections;

  return (
    <div
      className="h-full p-8 sm:p-12"
      style={{ backgroundColor: theme.background }}
    >
      {/* ── Hero ── */}
      <div className="relative flex items-start gap-8 pb-3 mb-8 sm:pb-0 sm:mb-0">
        <div className="max-w-4xl shrink-0">
          <p
            className="mb-2 text-sm font-semibold uppercase tracking-[0.28em]"
            style={{ color: theme.secondary }}
          >
            {caseStudy.eyebrow}
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            {project.title}
          </h2>
        </div>

        {interactiveDemo && (
          <a
            href={interactiveDemo.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${project.title} interactive demo`}
            className="absolute left-1/2 top-16 -translate-x-1/2 group flex flex-col items-center gap-2"
          >
            <span
              className="relative flex h-25 w-25 items-center justify-center rounded-[1.6rem]"
              style={{
                boxShadow: `0 0 0 2px ${theme.primary}, 0 0 40px ${theme.primary}99, 0 0 80px ${theme.primary}55`,
              }}
            >
              {iconError || !theme.iconImage ? (
                <span className="text-3xl font-black text-white">CS</span>
              ) : (
                <Image
                  fill
                  sizes="100px"
                  src={theme.iconImage}
                  alt=""
                  className="rounded-[1.6rem] object-cover"
                  onError={() => setIconError(true)}
                />
              )}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 0 2px ${theme.primary}, 0 0 70px ${theme.primary}cc, 0 0 140px ${theme.primary}99`,
                }}
              />
            </span>
            <span
              className="text-base font-semibold transition-colors group-hover:text-white"
              style={{ color: theme.secondary }}
            >
              {interactiveDemo.label} <span aria-hidden="true">↗</span>
            </span>
          </a>
        )}

        <ProjectHeroLinks project={project} theme={theme} />
      </div>

      <p
        className="max-w-3xl pb-3 text-lg leading-relaxed sm:-mt-[45px] sm:pb-0 sm:text-xl"
        style={{ color: theme.mutedText }}
      >
        {caseStudy.heroSummary}
      </p>

      {/* ── Content Grid ── */}
      <div className="mt-4 grid gap-5 sm:mt-[46px] lg:grid-cols-2">
        {keyFeaturesSection && (
          <div
            className="rounded-3xl p-5 sm:p-6"
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
            className="rounded-3xl p-5 sm:p-6"
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
              className="rounded-3xl p-5 sm:p-6"
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
        className="mt-5 rounded-3xl p-5 pb-3 sm:p-6 sm:pb-4"
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
        <p className="text-base leading-8 sm:text-lg" style={{ color: theme.text }}>
          {caseStudy.recruiterTakeaway}
        </p>
      </div>
    </div>
  );
}
