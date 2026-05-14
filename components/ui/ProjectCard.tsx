'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Project } from '@/data/projects';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [isDemoActive, setIsDemoActive] = useState(false); // State to handle iframe injection
  
  // Determine if it's the wide card to apply a horizontal inner layout
  const isWide = project.span === 'md:col-span-3' || project.span === 'md:col-span-4';
  const isReversed = project.span === 'md:col-span-4';

  return (
    <div 
      ref={ref}
      className={`group relative flex flex-col bg-zinc-900/30 border border-zinc-800/80 rounded-[2rem] overflow-hidden hover:border-zinc-700 transition-all duration-700 ${project.span} ${
        isWide ? 'lg:flex-row' : ''
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Content Area */}
      <div className={`p-8 md:p-10 flex flex-col justify-between z-10 ${isWide ? 'w-full lg:w-1/2' : 'w-full flex-1'}`}>
        <div>
          <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest mb-4 block">
            {project.category}
          </span>
          <h3 className={`font-bold text-zinc-100 mb-4 tracking-tight ${isWide ? 'text-3xl' : 'text-2xl'}`}>
            {project.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed text-sm mb-8">
            {project.description}
          </p>
        </div>

        {/* Links & Tech Stack */}
        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-mono text-zinc-300">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800/50">
            {project.liveLink && (
              <Link href={project.liveLink} target="_blank" className="text-sm font-medium text-zinc-100 hover:text-cyan-400 transition-colors flex items-center gap-1">
                Live Demo <span className="text-xs">↗</span>
              </Link>
            )}
            {project.githubLink && (
              <Link href={project.githubLink} target="_blank" className="text-sm font-medium text-zinc-100 hover:text-cyan-400 transition-colors flex items-center gap-1">
                Source <span className="text-xs">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Visual / Mockup Area */}
      <div className={`relative bg-zinc-950 border-zinc-800/50 flex items-center justify-center overflow-hidden p-6 ${
        isWide ? `w-full lg:w-1/2 min-h-[350px] border-t lg:border-t-0 ${isReversed ? 'lg:border-r' : 'lg:border-l'}` : 'w-full h-48 border-t mt-auto'
      }`}>
        
        {/* Active Iframe State */}
        {isDemoActive && project.embeddable ? (
          <div className="w-full h-full relative z-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="h-8 bg-zinc-950 flex items-center justify-between px-4 border-b border-zinc-800">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
              </div>
              <button onClick={() => setIsDemoActive(false)} className="text-[10px] font-mono text-zinc-500 hover:text-red-400 transition-colors">
                [ Close Demo ]
              </button>
            </div>
            <iframe 
              src={project.liveLink} 
              className="w-full h-[calc(100%-2rem)] border-0"
              allow="microphone; camera"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          /* Default Static / Hover State */
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

            {/* "Play" Button Overlay for Embeddable Projects */}
            {project.embeddable && (
              <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-950/40 backdrop-blur-sm">
                <button 
                  onClick={() => setIsDemoActive(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
                  Run Live Demo
                </button>
              </div>
            )}

            {/* Render Abstract Visuals */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              
              {/* 1. Sensor Dashboard */}
              {project.id === 'sensor-tracking' && (
                <div className="w-full max-w-sm aspect-[4/3] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-4 flex flex-col gap-4 transform group-hover:scale-105 transition-transform duration-500">
                   <div className="flex gap-2 border-b border-zinc-800 pb-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                      <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                   </div>
                   <div className="flex-1 flex items-end gap-2 px-2">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="flex-1 bg-cyan-900/50 rounded-t-sm transition-all duration-700 group-hover:bg-cyan-500/80" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}></div>
                      ))}
                   </div>
                </div>
              )}

              {/* 2. Security Lock */}
              {project.id === 'rbac-module' && (
                <div className="relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                   <div className="absolute w-16 h-16 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/40 transition-colors"></div>
                   <div className="w-12 h-14 border-4 border-zinc-700 rounded-t-xl rounded-b-md flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                      <div className="w-2 h-3 bg-zinc-700 rounded-full group-hover:bg-cyan-500 transition-colors"></div>
                   </div>
                </div>
              )}

              {/* 3. Backend Architecture */}
              {project.id === 'be-boilerplate' && (
                <div className="flex flex-col gap-3 w-3/4 max-w-xs transform group-hover:-translate-y-2 transition-transform duration-500">
                   <div className="h-8 bg-zinc-900 border border-zinc-800 rounded flex items-center px-4"><span className="text-[10px] font-mono text-zinc-500">/controllers</span></div>
                   <div className="h-8 bg-zinc-900 border border-zinc-800 rounded flex items-center px-4 ml-4"><span className="text-[10px] font-mono text-cyan-500">/services (logic)</span></div>
                   <div className="h-8 bg-zinc-900 border border-zinc-800 rounded flex items-center px-4 ml-8"><span className="text-[10px] font-mono text-zinc-500">/repositories (db)</span></div>
                </div>
              )}

              {/* 4. Frontend Architecture */}
              {project.id === 'fe-boilerplate' && (
                <div className="flex items-center justify-center gap-4 transform group-hover:scale-105 transition-transform duration-500">
                   <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg flex items-center justify-center"><span className="text-cyan-500 font-bold">App</span></div>
                   <div className="flex flex-col gap-2">
                     <div className="h-px w-6 bg-zinc-700"></div>
                     <div className="h-px w-6 bg-zinc-700"></div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center"><span className="text-[10px] text-zinc-400">Nav</span></div>
                      <div className="w-10 h-10 bg-zinc-900 border border-cyan-900/50 rounded-xl flex items-center justify-center"><span className="text-[10px] text-cyan-400">Page</span></div>
                   </div>
                </div>
              )}

              {/* 5. AI Voice Coach */}
              {project.id === 'interview-prep-coach' && (
                <div className="relative flex flex-col items-center justify-center w-full max-w-md aspect-video bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl p-6 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                   <div className="flex items-center gap-1.5 h-16 z-10">
                      {[30, 60, 100, 50, 80, 40, 90, 60, 30].map((h, i) => (
                        <div key={i} className="w-2.5 bg-zinc-700 rounded-full group-hover:bg-cyan-400 transition-colors duration-500" style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}></div>
                      ))}
                   </div>
                   <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-mono text-zinc-400">System Ready</span>
                   </div>
                </div>
              )}

            </div>
          </>
        )}
      </div>
    </div>
  );
};