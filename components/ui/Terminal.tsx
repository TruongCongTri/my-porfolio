'use client';

import { Fira_Code } from 'next/font/google';

const firaCode = Fira_Code({ subsets: ['latin'] });

export const Terminal = () => {
  return (
    <div className={`w-full max-w-lg bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md ${firaCode.className}`}>
      {/* Terminal Header */}
      <div className="bg-zinc-900/50 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">tri.tsx — 128 lines</div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 text-sm leading-relaxed overflow-x-auto">
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">1</span>
          <p>
            <span className="text-pink-500">import</span> {'{'} <span className="text-cyan-400">Developer</span> {'}'} <span className="text-pink-500">from</span> <span className="text-emerald-400">&apos;@/core&apos;</span>;
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">2</span>
          <p>
            <span className="text-pink-500">const</span> <span className="text-zinc-100">tri</span> = <span className="text-pink-500">new</span> <span className="text-cyan-400">Developer</span>();
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">3</span>
          <p>&nbsp;</p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">4</span>
          <p>
            <span className="text-zinc-100">tri</span>.<span className="text-blue-400">focus</span> = [
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">5</span>
          <p className="pl-4">
            <span className="text-emerald-400">&apos;Scalable Architecture&apos;</span>,
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">6</span>
          <p className="pl-4">
            <span className="text-emerald-400">&apos;Clean Code&apos;</span>,
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">7</span>
          <p className="pl-4">
            <span className="text-emerald-400">&apos;AI-First Workflow&apos;</span>
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">8</span>
          <p>
            ];
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">9</span>
          <p>&nbsp;</p>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-600 select-none">10</span>
          <p>
            <span className="text-zinc-100">tri</span>.<span className="text-blue-400">status</span>(); <span className="text-zinc-500">Available for work</span>
          </p>
        </div>
        
        {/* Blinking Cursor */}
        <div className="flex gap-4 mt-1">
          <span className="text-zinc-600 select-none">11</span>
          <span className="w-2 h-5 bg-cyan-500 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};