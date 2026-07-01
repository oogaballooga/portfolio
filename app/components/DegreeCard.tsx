interface DegreeCardProps {
  degree: string;
  school: string;
  dates: string;
  gpa: number;
  honors?: string[];
  logo?: string;
}

export default function DegreeCard({
  degree,
  school,
  dates,
  gpa,
  honors,
  logo,
}: DegreeCardProps) {
  return (
    <div className="border-4 border-gray-500/50 rounded-2xl bg-black p-8 relative overflow-hidden min-h-[220px]">
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{degree}</h2>
        <p className="text-gray-300 text-lg">{school}</p>
        <p className="text-gray-400 text-base mt-1">{dates}</p>
        <p className="text-gray-300 mt-3 text-lg">GPA: {gpa}</p>
        {honors && honors.length > 0 && (
          <p className="text-gray-400 text-sm mt-1">{honors.join(' · ')}</p>
        )}
      </div>
      {logo && (
        <img
          src={logo}
          alt={`${school} Crest`}
          className="absolute bottom-8 right-12 w-40 opacity-85"
        />
      )}
    </div>
  );
}