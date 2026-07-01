import { experiences } from '../../data/experience';

export default function ExperienceSection() {
  return (
    <div className="relative w-full min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-12">Experience</h1>

        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              Experience entries coming soon.
            </p>
            <p className="text-gray-500 mt-2">
              Internships, research positions, and work experience will be added
              here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="border-4 border-gray-500/50 rounded-2xl bg-black p-8"
              >
                <h2 className="text-2xl font-bold">{exp.role}</h2>
                <p className="text-gray-300 text-lg mt-1">{exp.company}</p>
                <p className="text-gray-400 mt-1">
                  {exp.startDate} – {exp.endDate ?? 'Present'}
                </p>
                <p className="text-gray-400 mt-4">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}