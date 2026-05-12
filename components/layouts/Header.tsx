'use client';

import { navLinks } from '@/data/nav-links';
import { useState, useEffect } from 'react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-3 rounded-full transition-all duration-500 border ${
          isScrolled 
            ? 'bg-zinc-950/80 backdrop-blur-xl border-zinc-800 shadow-2xl shadow-black/50' 
            : 'bg-zinc-900/40 backdrop-blur-md border-zinc-800/50'
        }`}
      >
        {/* Left: Logo (Changed to standard <a> tag) */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors border border-cyan-500/30">
            <span className="text-cyan-400 font-mono text-xs font-bold">TCT</span>
          </div>
        </a>
        
        {/* Center: Navigation (Changed to standard <a> tags) */}
        <nav className="hidden md:flex items-center space-x-1 bg-zinc-950/50 px-2 py-1 rounded-full border border-zinc-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 px-4 py-2 rounded-full transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        {/* Right: CTA Button (Standard <a> tag for mailto) */}
        <div className="flex items-center gap-4">
          <a 
            href="mailto:tri.tcong@gmail.com"
            className="hidden sm:block text-xs font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            tri.tcong@gmail.com
          </a>
          <a
            href="mailto:tri.tcong@gmail.com"
            className="text-xs font-bold text-zinc-950 bg-zinc-100 hover:bg-white px-5 py-2.5 rounded-full transition-transform hover:scale-105 shadow-sm"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  );
};