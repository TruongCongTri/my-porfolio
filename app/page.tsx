"use client";
import React, { useState, useEffect, useRef } from "react";

import { CinematicIntro } from "@/components/ui/CinematicIntro";
import { DatumTracker } from "@/components/ui/DatumTracker";
import { FloatingNav } from "@/components/layouts/FloatingNav";
import { HomeSection } from "@/components/sections/HomeSection";
import { StackSection } from "@/components/sections/StackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSections";
import { IndexSection } from "@/components/sections/IndexSection";
import { Magnetic } from "@/components/ui/Magnetic";

import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useAnimations } from "@/hooks/useAnimations";

import { navLinks } from "@/data/index";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollData, setScrollData] = useState({
    progress: 0,
    pixel: 0,
    max: 1,
  });
  const [activeSection, setActiveSection] = useState("home");
  const [breakpoints, setBreakpoints] = useState<{ id: string; top: number }[]>(
    [],
  );

  const navRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useCustomCursor();
  useAnimations(isLoaded);

  // Scroll Tracking Logic
  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pixel = window.scrollY;
      // Guard against negative/zero max on initial render
      const progress = max > 0 ? Math.max(0, Math.min(pixel / max, 1)) : 0;
      setScrollData({ progress, pixel, max });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize immediately

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            window.history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { threshold: 0.3 },
    );

    document
      .querySelectorAll("section")
      .forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Breakpoint Calculation
  useEffect(() => {
    if (!isLoaded) return;

    const calculateBreakpoints = () => {
      const sections = ["home", "stack", "experience", "index", "contact"];
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const points = sections
        .map((id) => {
          const el = document.getElementById(id);
          if (el) {
            let top = maxScroll > 0 ? (el.offsetTop / maxScroll) * 100 : 0;
            top = Math.max(0, Math.min(100, top));
            return { id, top };
          }
          return null;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter(Boolean) as { id: string; top: number }[] as any;

      setBreakpoints(points);
    };

    const timer = setTimeout(calculateBreakpoints, 1200);
    window.addEventListener("resize", calculateBreakpoints);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateBreakpoints);
    };
  }, [isLoaded]);


  // Fluid Nav Pill Update
  useEffect(() => {
    const updatePill = () => {
      const activeEl = navRefs.current[activeSection];
      if (activeEl) {
        // Measure the static wrapper, ignoring magnetic transforms
        setPillStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      } else {
        // Hide the pill if "contact" is active (since it has a solid black button)
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePill();
    // Re-calculate after a tiny delay to ensure fonts have loaded and shaped the layout
    const timeout = setTimeout(updatePill, 300);
    window.addEventListener("resize", updatePill);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updatePill);
    };
  }, [activeSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  // Check if the tracker is visually close enough (within 2.5% screen distance) to a breakpoint to "snap" the animation
  const activeBreakpoint = breakpoints.find((bp) => {
    const diffPercent = Math.abs(bp.top - scrollData.progress * 100);
    return diffPercent < 2.5;
  });
  const isWrapping = !!activeBreakpoint;

  return (
    <div className="antialiased text-[#1C1B1A] bg-[#FAF8F5] selection:bg-[#1C1B1A] selection:text-[#FAF8F5] overflow-x-hidden min-h-screen">
      <CinematicIntro isLoaded={isLoaded} setIsLoaded={setIsLoaded} />

      <div className="noise"></div>
      <div className="cursor-dot" id="cursor"></div>

      <DatumTracker 
        scrollProgress={scrollData.progress}
        breakpoints={breakpoints}
        activeSection={activeSection}
        isWrapping={isWrapping}
        activeBreakpointId={activeBreakpoint?.id}
      />

      <FloatingNav 
        navLinks={navLinks}
        activeSection={activeSection}
        pillStyle={pillStyle}
        navRefs={navRefs}
        handleNavClick={handleNavClick}
      />

      {/* Main Application Content Body */}
      <main
        className={`px-4 py-4 max-w-[1400px] mx-auto space-y-4 relative z-10 transition-transform duration-[1200ms]
                ${isLoaded ? "pointer-events-auto" : "pointer-events-none translate-y-10"}
                `}
      >
        <HomeSection isLoaded />
        <StackSection />
        <ExperienceSection />
        <IndexSection />
        <ContactSection />
      </main>
    </div>
  );
}
