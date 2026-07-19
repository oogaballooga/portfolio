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
            <div className="mt-10 flex justify-around max-w-xs p-5 rounded-2xl border border-gray-700 bg-black backdrop-blur-sm">
              <a
                href="mailto:oscy105@gmail.com"
                className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors group"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-xs font-medium">Email</span>
              </a>
              <a
                href="https://linkedin.com/in/ooga"
                className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors group"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-xs font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com/oogaballooga"
                className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors group"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-xs font-medium">GitHub</span>
              </a>
              <a
                href="/Oscar-Eriksen-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors group"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="text-xs font-medium">Resume</span>
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
        ↓ Scroll down for more ↓
      </div>
    </div>
  );
}
