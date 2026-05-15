"use client";
import React from "react";

interface Breakpoint {
  id: string;
  top: number;
}

interface DatumTrackerProps {
  scrollProgress: number;
  breakpoints: Breakpoint[];
  activeSection: string;
  isWrapping: boolean;
  activeBreakpointId?: string;
}

export const DatumTracker = ({
  scrollProgress,
  breakpoints,
  activeSection,
  isWrapping,
  activeBreakpointId,
}: DatumTrackerProps) => {
  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 w-8 pointer-events-none z-30 hidden lg:flex flex-col items-center justify-center py-32">
      <div className="h-full w-[1.5px] bg-[#E2D9C8] relative">
        {/* Static Breakpoint Dots */}
        {breakpoints.map((bp) => {
          const isThisNodeActive =
            activeSection === bp.id || (isWrapping && activeBreakpointId === bp.id);
          
          return (
            <div
              key={`bp-${bp.id}`}
              className={`absolute left-1/2 w-2.5 h-2.5 rounded-full transition-all duration-500 z-0 ${
                isThisNodeActive
                  ? "bg-[#1C1B1A] scale-100 shadow-[0_0_10px_rgba(28,27,26,0.1)]"
                  : "bg-[#D4C6B0] scale-75"
              }`}
              style={{
                top: `${bp.top}%`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          );
        })}

        {/* Dynamic Morphing Tracker */}
        <div
          className={`absolute left-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 flex items-center justify-center ${
            isWrapping
              ? "w-7 h-7 bg-transparent rounded-full border-[1.5px] border-[#1C1B1A]"
              : "w-[2.5px] h-12 bg-[#A38A5A] rounded-full border-0"
          }`}
          style={{
            top: `${scrollProgress * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={`w-[18px] h-[18px] border-[0.5px] border-[#1C1B1A] rounded-full border-dashed transition-all duration-700 delay-75 ${
              isWrapping ? "opacity-50 scale-100 rotate-90" : "opacity-0 scale-50 rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};