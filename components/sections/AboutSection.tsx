"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export const AboutSection = () => {
  const { ref, isVisible, isActive } = useScrollReveal({ id: "about" });

  return (
    <section
      id="about"
      className="py-32 w-full bg-zinc-950 border-t border-zinc-900"
      ref={ref}
    >
      <div
        className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span
              className={`font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${
                isActive ? "text-cyan-400" : "text-zinc-600"
              }`}
            >
              [ 01 // About & Contact ]
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight leading-tight max-w-2xl">
              I build predictable backend systems and seamless user interfaces.
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-sm border-l border-zinc-800 pl-4 max-w-xs">
            Based in Ho Chi Minh City. Focused on Developer Velocity and
            Software Craftsmanship.
          </p>
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-zinc-400 leading-relaxed text-lg">
          <div>
            <p className="mb-6">
              My journey began at FPT University, where I developed a deep
              appreciation for algorithms and clean code. Today, as a Full-Stack
              Engineer, I specialize in architecting systems that are as
              mathematically predictable as they are scalable.
            </p>
            <p>
              Whether I am optimizing complex PostgreSQL schemas or integrating
              Redis caching to resolve performance bottlenecks, my goal is
              always the same: eliminate technical debt before it reaches
              production.
            </p>
          </div>
          <div>
            <p className="mb-6">
              I am a strong advocate for an{" "}
              <strong className="text-zinc-200 font-medium">
                AI-first workflow
              </strong>
              . By leveraging tools like GitHub Copilot and Claude to generate
              foundational boilerplates, I bypass the mechanical typing and
              focus my mental energy entirely on complex business logic and
              architectural boundaries.
            </p>
            <p>
              I thrive in asynchronous environments where clean documentation
              and direct communication drive the product forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
