'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects } from '@/data/projects';
import { ProjectCard } from '../ui/ProjectCard';

export const ProjectsSection = () => {
  const { ref, isVisible, isActive } = useScrollReveal({ id: 'projects' });

  return (
    <section 
      id="projects" 
      className="py-32 w-full bg-zinc-950 border-t border-zinc-900" 
      ref={ref}
    >
      <div 
        className={`container mx-auto px-6 max-w-6xl transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Section Label */}
        <div className="mb-16 border-b border-zinc-900 pb-8">
          <span className={`font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-700 ${
            isActive ? 'text-cyan-400' : 'text-zinc-600'
          }`}>
            [ 03 // Selected Architecture ]
          </span>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};