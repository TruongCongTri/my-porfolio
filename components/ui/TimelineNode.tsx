'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExperienceNode } from '@/data/experience';

interface TimelineNodeProps {
  node: ExperienceNode;
  index: number;
}

export const TimelineNode = ({ node, index }: TimelineNodeProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  
  // Logic to alternate sides (Zigzag)
  const isEven = index % 2 === 0;
  // Logic for the highlighted dot
  const isCurrent = index === 0;

  // The Title & Metadata Block
  const TitleBlock = (
    <div className={`w-full flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-start text-left`}>
      <span className={`inline-block px-3 py-1 bg-zinc-900/80 border border-zinc-800 rounded-full font-mono text-xs tracking-widest shadow-sm mb-4 ${
        isCurrent ? 'text-cyan-400' : 'text-zinc-400'
      }`}>
        {node.period}
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight mb-2">
        {node.title}
      </h3>
      <p className="text-zinc-500 font-medium text-lg">
        {node.company}
      </p>
    </div>
  );
  
  // The Responsibilities Card Block (Always left-aligned text internally for readability)
  const ResponsibilityBlock = (
    <div className="w-full flex justify-center md:block">
      <div className="w-full bg-zinc-900/30 border border-zinc-800/80 p-6 md:p-8 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 shadow-xl shadow-black/20">
        <ul className="space-y-3">
          {node.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-zinc-400 leading-relaxed flex items-start text-left">
              <span className="text-cyan-500/50 mr-3 font-mono mt-0.5">▹</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div 
      ref={ref}
      className={`relative w-full flex flex-col md:flex-row items-center justify-between py-8 md:py-16 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {/* The Horizontal Branching Line (Desktop Only) 
        This connects the title block to the responsibility block under the center dot.
      */}
      <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-zinc-800/80 -translate-y-1/2 -z-10"></div>

      {/* Center Axis Dot (Desktop Only) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-zinc-950 bg-cyan-500 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)] items-center justify-center">
        <div className="w-1 h-1 bg-zinc-950 rounded-full"></div>
      </div>

      {/* Left Column (Changes based on Even/Odd) */}
      <div className="w-full md:w-[45%] mb-6 md:mb-0 flex justify-end">
        {isEven ? TitleBlock : ResponsibilityBlock}
      </div>

      {/* Right Column (Changes based on Even/Odd) */}
      <div className="w-full md:w-[45%] flex justify-start">
        {isEven ? ResponsibilityBlock : TitleBlock}
      </div>
    </div>
  );
};