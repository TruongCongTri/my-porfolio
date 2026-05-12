"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Terminal } from "@/components/ui/Terminal";

export const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal({ id: 'home' });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center w-full relative pt-20"
      ref={ref}
    >
      {/* Tech Grid Background Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div
        className={`container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Left Side: Content */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Available for Remote Roles
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 mb-6 leading-[1.1]">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Reliable Systems.
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed mb-10">
            I’m a Full-Stack Developer specializing in Node.js, React, and
            strict layer-based architectures. I help teams ship faster by
            leveraging <span className="text-zinc-200">AI-first workflows</span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="#projects"
              className="px-8 py-3 bg-zinc-100 text-zinc-950 font-bold rounded-lg hover:bg-white transition-all text-center shadow-lg shadow-white/5"
            >
              Explore Projects
            </Link>
            <Link
              href="https://github.com/TruongCongTri"
              target="_blank"
              className="px-8 py-3 bg-zinc-900 text-zinc-300 font-bold rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-all text-center"
            >
              GitHub
            </Link>
          </div>
        </div>

        {/* Right Side: Terminal (The "CMD" Section) */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
          <div className="w-full transform transition-transform duration-500 hover:rotate-y-tilt-left hover:rotate-x-tilt-up">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
};
