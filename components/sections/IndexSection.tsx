"use client";
import React, { useState } from 'react';
import { Project, projects } from '@/data/index';
import { Magnetic } from '../ui/Magnetic';

export const IndexSection = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalMounted, setIsModalMounted] = useState(false);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(0);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalMounted(true);
        setTimeout(() => setIsAnimatingIn(true), 50);
    };

    const closeModal = () => {
        setIsAnimatingIn(false);
        setTimeout(() => {
            setIsModalMounted(false);
            setSelectedProject(null);
        }, 500); 
    };

    return (
        <section id="index" className="reveal min-h-screen border-1.5 border-[#E2D9C8] rounded-3xl bg-white flex flex-col relative z-10">
            <div className="p-6 md:p-12 border-b-1.5 border-[#E2D9C8]">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase animate-chars">Index</h2>
            </div>
            
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden h-[80vh]">
                <div className="w-full md:w-3/5 flex flex-col overflow-y-auto custom-scrollbar">
                    {projects.map((project: Project, index) => (
                        <div 
                            key={project.id}
                            className="project-row group relative border-b-1.5 border-[#E2D9C8] p-6 md:p-12 hover:bg-[#FAF8F5] transition-colors cursor-none"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onClick={() => openModal(project)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="font-mono text-sm text-[#A38A5A]">{project.year}</span>
                                <span className="font-mono text-sm text-[#1C1B1A] border border-[#D4C6B0] rounded-full px-3 py-1 bg-white">{project.category}</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 group-hover:pl-4 transition-all duration-300">{project.title}</h3>
                            <p className="text-[#4A4135] max-w-md font-mono text-sm animate-lines">
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Desktop Preview Shutter */}    
                <div className="hidden md:block w-2/5 border-l-1.5 border-[#E2D9C8] bg-[#FAF8F5] relative p-8">
                    <div className="sticky top-12 w-full aspect-[4/5] border-1.5 border-[#E2D9C8] rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                        <div className="text-center font-mono text-sm text-[#C2A878] absolute z-0 animate-lines">Hover a project to view preview</div>
                        
                        {projects.map((project: Project, index) => (
                            <div 
                                key={`preview-${project.id}`}
                                className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                    clipPath: hoveredIndex === index ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                                    zIndex: hoveredIndex === index ? 10 : 0
                                }}
                            >
                                {/* Generative Architectural Placeholder */}
                                <div className={`w-full h-full grayscale opacity-50 mix-blend-multiply bg-gradient-to-br from-[#D4C6B0] to-[#1C1B1A] flex items-center justify-center p-12`}>
                                   <div className="w-full h-full border border-white/20 relative flex items-center justify-center">
                                       <span className="font-editorial italic text-4xl text-white/10 uppercase">{project.category}</span>
                                       <div className="absolute inset-0 grid grid-cols-4 opacity-10">
                                           {[...Array(16)].map((_, i) => <div key={i} className="border-[0.5px] border-white"></div>)}
                                       </div>
                                   </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalMounted && selectedProject && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 cursor-none ">
                    {/* Backdrop */}
                    <div 
                        className={`absolute inset-0 bg-[#1C1B1A]/60 backdrop-blur-sm transition-opacity duration-500 cursor-none rounded-3xl ${isAnimatingIn ? 'opacity-100' : 'opacity-0'}`} 
                        onClick={closeModal}
                    ></div>
                    {/* Content */}
                    <div className={`modal-content relative bg-white border-1.5 border-[#E2D9C8] rounded-3xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-none ${isAnimatingIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
                        {/* Modal Header */}
                        <div className="p-6 border-b-1.5 border-[#E2D9C8] flex justify-between items-center bg-[#FAF8F5] z-10 cursor-none">
                            <div>
                                <h3 className="text-3xl font-bold uppercase tracking-tight">{selectedProject.title}</h3>
                                <div className="flex gap-2 mt-2">
                                    {selectedProject.techStack.map((tech) => (
                                        <span key={tech} className="font-mono text-[10px] text-[#A38A5A] border border-[#E2D9C8] rounded-full px-2 py-0.5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button onClick={closeModal} className="cursor-close w-12 h-12 rounded-full border-1.5 border-[#1C1B1A] flex items-center justify-center hover:bg-[#1C1B1A] hover:text-white transition-colors cursor-none text-xl font-medium shrink-0">
                                ✕
                            </button>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row flex-grow overflow-hidden relative cursor-none">
                            {/* Project Info */}
                            <div className="w-full lg:w-1/3 p-8 border-b-1.5 lg:border-b-0 lg:border-r-1.5 border-[#E2D9C8] overflow-y-auto flex flex-col">
                                <p className="font-mono text-xs text-[#A38A5A] uppercase mb-4 tracking-widest">Description</p>
                                <p className="text-[#4A4135] text-lg leading-relaxed mb-12">
                                    {selectedProject.description}
                                </p>

                                <div className="mt-auto space-y-4">
                                    <div className="p-6 bg-[#E2D9C8]/30 rounded-2xl border-1.5 border-[#E2D9C8]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-2 h-2 rounded-full ${selectedProject.embeddable ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                                            <p className="font-mono text-[10px] uppercase font-bold">
                                                {selectedProject.embeddable ? 'Live Demo Available' : 'Source Code Only'}
                                            </p>
                                        </div>
                                        <p className="text-xs text-[#4A4135]">
                                            {selectedProject.embeddable 
                                                ? "Interaction enabled. You can use the prototype directly in the viewer."
                                                : "This project is an architectural module. Review the logic on GitHub."
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Live Demo / GitHub CTA Area */}
                            <div className="w-full lg:w-2/3 bg-[#E2D9C8]/10 relative overflow-hidden group">
                                {selectedProject.embeddable && selectedProject.liveLink ? (
                                    <>
                                        <iframe 
                                            src={selectedProject.liveLink} 
                                            className="w-full h-full border-none pointer-events-auto" 
                                            title="Live Demo" 
                                        />
                                        {/* Floating GitHub Icon on Embed */}
                                        {selectedProject.githubLink && (
                                            <div className="absolute top-6 right-6">
                                                <Magnetic>
                                                    <a href={selectedProject.githubLink} target="_blank" className="w-14 h-14 bg-[#1C1B1A] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                                    </a>
                                                </Magnetic>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Non-embeddable State: Large GitHub CTA */
                                    <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-[#1C1B1A]">
                                        <div className="w-24 h-24 mb-8 text-[#FAF8F5] opacity-20">
                                             <svg className="w-full h-full fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                        </div>
                                        <h4 className="text-[#FAF8F5] text-3xl font-bold uppercase mb-4">View Source Architecture</h4>
                                        <p className="text-[#A38A5A] font-mono text-sm max-w-xs mb-8">
                                            This project is optimized for performance and doesn&apos;t allow standard frame embedding. 
                                        </p>
                                        <Magnetic>
                                            <a href={selectedProject.githubLink} target="_blank" className="px-8 py-4 bg-[#FAF8F5] text-[#1C1B1A] rounded-full font-bold uppercase tracking-widest hover:bg-[#E2D9C8] transition-colors">
                                                Explore Repository
                                            </a>
                                        </Magnetic>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};