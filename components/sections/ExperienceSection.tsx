'use client';

import { experienceData } from '@/data/experience';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { TimelineNode } from '../ui/TimelineNode';

export const ExperienceSection = () => {
  const { ref, isVisible, isActive } = useScrollReveal({ id: 'experience' });

  return (
    <section 
      id="experience" 
      className="py-32 w-full bg-zinc-950 relative overflow-hidden" 
      ref={ref}
    >
      {/* Minimalist Background Gradients for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div 
        className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="mb-24 text-center md:text-left border-b border-zinc-900 pb-8">
          <span className={`font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${
            isActive ? 'text-cyan-400' : 'text-zinc-600'
          }`}>
            [ 04 // Career Trajectory ]
          </span>
        </div>

        {/* The Timeline Container */}
        <div className="relative w-full">
          {/* Vertical Center Axis Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2"></div>
          
          {/* Timeline Nodes */}
          <div className="flex flex-col">
            {experienceData.map((node, index) => (
              <TimelineNode key={node.id} node={node} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};