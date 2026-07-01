'use client';

import { projects } from '../../data/projects';

export default function ProjectsSection() {
  return (
    <div className="relative w-full min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-12">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-4 border-gray-500/50 rounded-2xl bg-black p-8 hover:bg-[#181818] transition-colors cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
              <p className="text-gray-400 mb-4">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}