"use client";

import FloatingImageCard from "./components/FloatingImageCard";

const images = [
  "/pfp/image.jpg",
  "/pfp/image2.jpg",
  "/pfp/image3.jpg",
  "/pfp/image4.jpg",
  "/pfp/image5.jpg",
  "/pfp/image6.jpg",
];

export default function Home() {
  return (
    <main className="relative w-full text-white overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)] bg-black" />

      {/* Oscar content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left text */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <div className="text-gray-300">Hi, I am</div>
              <div>Oscar Eriksen</div>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl">
              I am a graduate computer science student.
            </p>
          </div>

          {/* Images */}
          <div className="flex justify-center md:justify-end">
            <FloatingImageCard images={images} interval={5000} />
          </div>
        </div>
      </div>

      {/* About me */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
          </p>
        </div>
      </div>

    </main>
  );
}