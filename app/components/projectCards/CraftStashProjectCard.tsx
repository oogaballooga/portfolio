import { useState } from 'react';
import type { ProjectCaseStudySection } from '../../types/content';
import type { ProjectCardDetailProps } from './types';

function CaseStudySection({
  section,
  textColor,
  accentColor,
}: {
  section: ProjectCaseStudySection;
  textColor: string;
  accentColor: string;
}) {
  return (
    <section>
      <p
        className="mb-3 text-2xl font-extrabold tracking-tight"
        style={{ color: accentColor }}
      >
        {section.heading}
      </p>
      {section.body && (
        <p className="text-base leading-8 sm:text-lg" style={{ color: textColor }}>
          {section.body}
        </p>
      )}
      {section.items && section.items.length > 0 && (
        <ul className="mt-3 space-y-3" style={{ color: textColor }}>
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg leading-relaxed">
              <span className="mt-1 shrink-0" style={{ color: accentColor }}>
                ✦
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

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
      <div className="relative flex items-start gap-8 pb-3 mb-8">
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
              className="flex h-25 w-25 items-center justify-center overflow-hidden rounded-[1.6rem] transition-transform duration-200 group-hover:scale-105"
              style={{
                boxShadow: `0 0 0 2px ${theme.primary}, 0 0 40px ${theme.primary}99, 0 0 80px ${theme.primary}55`,
              }}
            >
              {iconError ? (
                <span className="text-3xl font-black text-white">CS</span>
              ) : (
                <img
                  src={theme.iconImage}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={() => setIconError(true)}
                />
              )}
            </span>
            <span
              className="text-base font-semibold transition-colors group-hover:text-white"
              style={{ color: theme.secondary }}
            >
              {interactiveDemo.label} <span aria-hidden="true">↗</span>
            </span>
          </a>
        )}
      </div>

      <p
        className="max-w-3xl pb-3 text-lg leading-relaxed sm:text-xl"
        style={{ color: theme.mutedText }}
      >
        {caseStudy.heroSummary}
      </p>

      {/* ── Content Grid ── */}
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
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
