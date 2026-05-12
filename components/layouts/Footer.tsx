'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const Footer = () => {
  // 1. Initialize the scroll reveal hook
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <footer 
      ref={ref} // 2. Attach the ref to the section wrapper
      className="w-full bg-zinc-950 pt-32 pb-12 border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* 3. Apply the dynamic opacity and translate classes based on isVisible */}
      <div 
        className={`container mx-auto px-6 max-w-6xl relative z-10 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        
        {/* Top Half: Huge Impact CTA */}
        <div className="flex flex-col items-center text-center mb-32">
          <span className="font-mono text-xs text-cyan-500 uppercase tracking-widest mb-6 block">
            [ Next Steps ]
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tighter mb-8 max-w-3xl leading-[1.1]">
            Let&apos;s architect the next <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">big thing.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl">
            Currently available for remote full-stack roles and freelance opportunities. If you are building something ambitious, I&apos;d love to help you scale it.
          </p>
          <Link 
            href="mailto:tri.tcong@gmail.com" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-zinc-950 bg-zinc-100 rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            Start a Conversation <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Bottom Half: Utility Row */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800/80 gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <span className="text-zinc-500 text-sm font-mono">
              © {new Date().getFullYear()} Truong Cong Tri. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="https://github.com/TruongCongTri" target="_blank" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/trí-trương-công-35b174406" target="_blank" className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">
              LinkedIn
            </Link>
            <Link href="mailto:tri.tcong@gmail.com" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
              Email
            </Link>
          </div>
          
        </div>

      </div>
    </footer>
  );
};