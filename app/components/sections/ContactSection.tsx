import FloatingFlipCard from '../FloatingFlipCard';

const PFP_IMAGES = [
  '/images/pfp/image.webp',
  '/images/pfp/image1.webp',
];

export default function ContactSection() {
  return (
    <div className="relative w-full h-screen text-white">
      <div className="h-full flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-gray-300 text-3xl md:text-4xl">
                Hi, I'm
              </span>
              <br />
              Oscar Eriksen
            </h1>
            <p className="mt-10 text-lg md:text-xl text-gray-400 max-w-sm">
              M.S. Computer Science graduate student at Seattle University.
            </p>
            <div className="mt-10 flex gap-4">
              <a
                href="mailto:erikseno@seattleu.edu"
                className="text-gray-300 hover:text-white transition-colors underline"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/ooga"
                className="text-gray-300 hover:text-white transition-colors underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/oogaballooga"
                className="text-gray-300 hover:text-white transition-colors underline"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <FloatingFlipCard
              content={PFP_IMAGES}
              width={288}
              height={384}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
        ↓ Scroll down for more
      </div>
    </div>
  );
}
