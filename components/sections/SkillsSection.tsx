"use client";

import { rowOneSkills, rowTwoSkills } from "@/data/skills";
import { useScrollReveal } from "@/hooks/useScrollReveal";


export const SkillsSection = () => {
  const { ref, isVisible, isActive } = useScrollReveal({ id: "stack" });

  // Quadruple the arrays to ensure the screen is fully covered on ultra-wide monitors
  const marqueeOne = [
    ...rowOneSkills,
    ...rowOneSkills,
    ...rowOneSkills,
    ...rowOneSkills,
  ];
  const marqueeTwo = [
    ...rowTwoSkills,
    ...rowTwoSkills,
    ...rowTwoSkills,
    ...rowTwoSkills,
  ];

  return (
    <section
      id="stack"
      className="py-32 w-full bg-zinc-950 border-t border-zinc-900 overflow-hidden relative"
      ref={ref}
    >
      <div
        className={`container mx-auto px-6 max-w-6xl mb-16 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <span
          className={`font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${
            isActive ? "text-cyan-400" : "text-zinc-600"
          }`}
        >
          [ 01 // About & Contact ]
        </span>
      </div>

      {/* Marquee Area */}
      <div className="relative flex flex-col gap-8 md:gap-12 w-full">
        {/* Left & Right Fade Masks (Creates the smooth disappearing effect at the edges) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950"></div>

        {/* Row 1: Scrolling Left */}
        <div className="flex w-max animate-marquee">
          {marqueeOne.map((skill, index) => (
            <div
              key={index}
              className="px-6 md:px-12 flex items-center justify-center whitespace-nowrap"
            >
              <span className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-900 hover:from-cyan-400 hover:to-blue-600 transition-colors duration-300 cursor-default">
                {skill}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-max animate-marquee-reverse">
          {marqueeTwo.map((skill, index) => (
            <div
              key={index}
              className="px-6 md:px-12 flex items-center justify-center whitespace-nowrap"
            >
              <span className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-900 hover:from-cyan-400 hover:to-blue-600 transition-colors duration-300 cursor-default">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
