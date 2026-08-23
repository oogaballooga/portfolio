import type { ProjectCaseStudySection } from '../../types/content';

export function CaseStudySection({
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
