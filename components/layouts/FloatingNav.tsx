"use client";
import React from "react";
import { Magnetic } from "../ui/Magnetic";

interface NavLink {
  id: string;
  label: string;
}

interface FloatingNavProps {
  navLinks: NavLink[];
  activeSection: string;
  pillStyle: { left: number; width: number; opacity: number };
  navRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export const FloatingNav = ({
  navLinks,
  activeSection,
  pillStyle,
  navRefs,
  handleNavClick,
}: FloatingNavProps) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-[#FAF8F5]/90 backdrop-blur-md border-1.5 border-[#E2D9C8] rounded-full px-2 py-2 flex items-center gap-1 w-max max-w-[90vw] overflow-x-auto no-scrollbar cursor-none relative">
        {/* Fluid Sliding Pill */}
        <div
          className="absolute top-2 bottom-2 bg-[#E2D9C8] rounded-full shadow-inner transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 pointer-events-none"
          style={{
            left: `${pillStyle.left}px`,
            width: `${pillStyle.width}px`,
            opacity: pillStyle.opacity,
          }}
        />

        {/* Standard Nav Items */}
        {navLinks.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              navRefs.current[item.id] = el;
            }}
            className="relative z-10 shrink-0"
          >
            <Magnetic>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link block cursor-goto px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id ? "text-[#1C1B1A]" : "text-[#4A4135]"
                }`}
              >
                {item.label}
              </a>
            </Magnetic>
          </div>
        ))}

        {/* Ping Me Button */}
        <div className="relative z-10 shrink-0 ml-1 md:ml-2">
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={`nav-link block cursor-email px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 active:scale-90 ${
                activeSection === "contact"
                  ? "bg-[#A38A5A] text-[#FAF8F5]"
                  : "bg-[#1C1B1A] text-[#FAF8F5] hover:bg-[#4A4135]"
              }`}
            >
              Ping Me
            </a>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
};