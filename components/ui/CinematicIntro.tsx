"use client";
import React, { useRef, useEffect, useState } from "react";
import { personalInfo } from "@/data/index";

export const CinematicIntro = ({
  isLoaded,
  setIsLoaded,
}: {
  isLoaded: boolean;
  setIsLoaded: (v: boolean) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<SVGTextElement>(null);
  const textCoverRef = useRef<SVGTextElement>(null);
  const bgRef = useRef<SVGRectElement>(null);

  // We use a ref for progress to keep the animation loop at 60fps without React re-renders
  const progress = useRef(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    // 1. Lock the body scroll immediately
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      if (isLoaded) return;
      // Sensitivity: adjust the 0.001 to make the zoom faster or slower
      targetProgress.current += e.deltaY * 0.001;
      targetProgress.current = Math.max(
        0,
        Math.min(1.2, targetProgress.current),
      );
    };

    const handleTouch = (e: TouchEvent) => {
      // Basic touch support for mobile
      // Real-world usage would need start/move tracking for delta
    };

    const animate = () => {
      // Smooth "Lerp" (Linear Interpolation) for that buttery feel
      progress.current += (targetProgress.current - progress.current) * 0.07;

      if (textMaskRef.current && textCoverRef.current && bgRef.current) {
        // 1. DISSOLVE EFFECT: White text fades to 0 opacity in the first 25% of scroll
        const dissolveOpacity = Math.max(0, 1 - progress.current * 4);
        textCoverRef.current.style.opacity = dissolveOpacity.toString();

        // 2. SCALE EFFECT: Using an exponential curve for a "cinematic" push
        // Math.pow(p, 3) makes the zoom start very slowly and finish very fast
        const scalePower = Math.pow(progress.current, 3);
        const scale = 1 + scalePower * 180;

        const transform = `scale(${scale})`;
        textMaskRef.current.style.transform = transform;
        textCoverRef.current.style.transform = transform;

        // 3. CURTAIN FADE: The dark background disappears at the very end
        const curtainFade = 1 - Math.max(0, (progress.current - 0.85) * 6.6);
        bgRef.current.style.opacity = curtainFade.toString();
      }

      if (progress.current > 0.99 && !isLoaded) {
        finishIntro();
      }

      if (!isLoaded) {
        requestAnimationFrame(animate);
      }
    };

    const finishIntro = () => {
      // 1. IMMEDIATELY restore scroll to both tags
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.height = "auto";

      // 2. Wake up the main site
      setIsLoaded(true);

      if (containerRef.current) {
        // We fade the container quickly since the text is already "gone"
        containerRef.current.style.transition =
          "opacity 0.4s ease-out, visibility 0.4s";
        containerRef.current.style.opacity = "0";
        containerRef.current.style.visibility = "hidden";
        containerRef.current.style.pointerEvents = "none";

        setTimeout(() => {
          if (containerRef.current) containerRef.current.style.display = "none";
        }, 400);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animId);
      document.body.style.overflow = "auto";
    };
  }, [isLoaded, setIsLoaded]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none"
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <mask id="hollow-mask">
            {/* White = Solid Wall */}
            <rect width="100%" height="100%" fill="white" />

            {/* Black = The Hollow Hole */}
            <text
              ref={textMaskRef}
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="black"
              style={{ transformOrigin: "center", willChange: "transform" }}
              className="font-editorial italic capitalize text-[14vw] md:text-[10vw] font-bold"
            >
              {personalInfo.name}
            </text>
          </mask>
        </defs>

        {/* 
                  LAYER 1: The White Cover Text. 
                  This sits BEHIND the hole and blocks the view of the site at first.
                */}
        <text
          ref={textCoverRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          style={{
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
          className="font-editorial italic capitalize text-[14vw] md:text-[10vw] font-bold"
        >
          {personalInfo.name}
        </text>

        {/* 
                  LAYER 2: The Dark Curtain.
                  The mask punches a hole that shows either the White Text (Layer 1) 
                  or the actual Website (if Layer 1 is transparent).
                */}
        <rect
          ref={bgRef}
          width="100%"
          height="100%"
          fill="#1C1B1A"
          mask="url(#hollow-mask)"
        />
      </svg>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#FAF8F5] font-mono text-xs tracking-widest animate-bounce z-20 mix-blend-difference">
        SCROLL TO DIVE
      </div>
    </div>
  );
};
