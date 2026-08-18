import type { ProjectCardDetailProps } from './types';

export default function DefaultProjectCard({
  project,
}: ProjectCardDetailProps) {
  return (
    <div className="min-h-full p-12 text-white">
      <h2 className="mb-6 text-3xl font-bold">{project.title}</h2>
      <p className="mb-8 text-lg leading-relaxed text-gray-300">
        {project.description}
      </p>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold uppercase tracking-wide text-gray-400">
            Key Features
          </h3>
          <ul className="space-y-2">
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-gray-300">
                <span className="mt-1 text-gray-500">▸</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold uppercase tracking-wide text-gray-400">
            Skills Demonstrated
          </h3>
          <ul className="space-y-2">
            {project.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2 text-gray-300">
                <span className="mt-1 text-gray-500">▸</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h3 className="mb-3 text-lg font-semibold uppercase tracking-wide text-gray-400">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-800 px-4 py-1.5 text-sm text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {project.links && project.links.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold uppercase tracking-wide text-gray-400">
            Links
          </h3>
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline transition-colors hover:text-blue-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {project.attachments && project.attachments.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold uppercase tracking-wide text-gray-400">
            Documents
          </h3>
          <div className="flex flex-wrap gap-4">
            {project.attachments.map((attachment) => (
              <a
                key={attachment.url}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-blue-400 transition-colors hover:bg-gray-700 hover:text-blue-300"
              >
                {attachment.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {project.demoVideo && (
        <section className="mb-8">
          <h3 className="mb-3 text-lg font-semibold uppercase tracking-wide text-gray-400">
            Demo
          </h3>
          <div className="overflow-hidden rounded-xl border border-gray-600 bg-black">
            <video controls preload="metadata" className="w-full">
              <source src={project.demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}
    </div>
  );
}