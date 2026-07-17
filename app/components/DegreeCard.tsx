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
    <div className="border-4 border-gray-500/50 rounded-2xl bg-black p-4 sm:p-6 md:p-8 relative overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-[300px] sm:w-[500px] md:w-[670px]">
      <div className="relative z-10">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">{degree}</h2>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl">{school}</p>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-1">{dates}</p>
        <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">GPA: {gpa}</p>
        {honors && honors.length > 0 && (
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">{honors.join(' · ')}</p>
        )}
      </div>
      {logo && (
        <img
          src={logo}
          alt={`${school} Crest`}
          className="absolute bottom-2 right-4 sm:bottom-4 sm:right-12 md:bottom-8 md:right-20 w-16 sm:w-28 md:w-40 opacity-85"
        />
      )}
    </div>
  );
}