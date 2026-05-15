"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/index";
import { useParallax } from "@/hooks/useParallax";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

interface HomeSectionProps {
  isLoaded: boolean;
}

export const HomeSection = ({ isLoaded }: HomeSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ 
    dependencies: [isLoaded], 
    scope: containerRef 
  });

  // GSAP 3D Rotation Logic: Oscillating across the width (Y-axis)
  const handleMouseEnter = contextSafe(() => {
    gsap.killTweensOf(".parallax-img");
    
    gsap.fromTo(".parallax-img", 
      { rotationY: -15 }, // Start tilted to the left
      { 
        rotationY: 15,    // Tilt to the right
        duration: 2.2, 
        yoyo: true, 
        repeat: -1, 
        ease: "sine.inOut" // Smoother transition at the edges
      }
    );
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.killTweensOf(".parallax-img");
    
    // Settle back to center with a smooth spring effect
    gsap.to(".parallax-img", { 
      rotationY: 0, 
      duration: 1.2, 
      ease: "power2.out" 
    });
  });
    
  useParallax(isLoaded);

  return (
    <section
      id="home"
      className="min-h-[95vh] border-1.5 border-[#E2D9C8] rounded-3xl p-6 md:p-12 flex flex-col justify-between bg-white relative overflow-hidden"
    >
      {/* System Metadata Header */}
      <div className="flex justify-between items-start w-full font-mono text-xs uppercase tracking-widest text-[#4A4135] mb-8 md:mb-12">
        <div className="flex gap-4 items-center">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          <span>System Status: Online</span>
        </div>
        <div className="text-right">
          <span>
            {personalInfo.location.label}<br />
            Lat: {personalInfo.location.lat}° N<br />
            Long: {personalInfo.location.lng}° E
          </span>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-16">
        <div className="w-full lg:w-3/5 flex flex-col justify-center relative z-10">
          <h1 className="text-[15vw] lg:text-[9.5vw] leading-[0.85] font-bold tracking-tighter uppercase animate-chars">
            Full Stack
          </h1>
          <h1 className="text-[15vw] lg:text-[9vw] leading-[0.85] font-bold tracking-tighter uppercase text-[#C2A878] mt-2 md:mt-4 animate-chars">
            Developer
          </h1>
          <div className="max-w-md mt-6 md:mt-10 animate-lines">
            <p className="text-[#4A4135] text-lg md:text-xl font-medium leading-tight">
              I architect and build scalable systems, bridging the gap between
              Node.js backends and Next.js interfaces.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="border-1.5 border-[#1C1B1A] rounded-full px-4 py-1 text-sm font-medium">
                Node.js / Express
              </div>
              <div className="border-1.5 border-[#1C1B1A] rounded-full px-4 py-1 text-sm font-medium">
                TypeScript / Next.js
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative">
          {/* 3D CONTAINER: Added 'perspective-[1000px]' 
              This is CRITICAL for the rotation to look like it's in 3D space.
          */}
          <div 
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }} // Direct style to ensure browser treats it as 3D space
            className="parallax-container relative w-full max-w-[320px] md:max-w-[400px] aspect-[4/5] rounded-[2rem] border-1.5 border-[#E2D9C8] overflow-hidden bg-[#F0EBE1] group cursor-none cursor-spin"
          >
            <Image
              src="/portrait.png"
              alt={personalInfo.name}
              width={400}
              height={500}
              priority
              className="
                parallax-img
                object-cover grayscale
                group-hover:grayscale-0 
                /* Setup: Scale remains high to cover corners during 3D tilt */
                scale-125 -translate-y-[10%]
                will-change-transform
              "
            />
            {/* The Glass/Shadow Detail */}
            <div className="absolute inset-0 border-1.5 border-[#1C1B1A] rounded-[2rem] m-3 md:m-4 pointer-events-none mix-blend-overlay opacity-30"></div>
          </div>
        </div>
      </div>

      <div className="w-full border-t-1.5 border-[#E2D9C8] mt-12 pt-6 flex justify-between font-mono text-xs text-[#4A4135]">
        <span>SCROLL TO EXPLORE</span>
        <span>VOL. 01 / {new Date().getFullYear()}</span>
      </div>
    </section>
  );
};