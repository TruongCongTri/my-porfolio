/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import React, { useEffect, useRef } from "react";

import {
  personalInfo,
} from "@/data/index";
import Link from "next/link";

export const ContactSection = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let currentScroll = window.scrollY;
    let velocity = 0;
    let position = 0;
    let animationId: number;

    const animate = () => {
      const newScroll = window.scrollY;
      const delta = newScroll - currentScroll;
      currentScroll = newScroll;

      // 1. Calculate Velocity:
      // Scrolling down (positive delta) pushes velocity negative (moves left)
      // Scrolling up (negative delta) pushes velocity positive (moves right)
      velocity -= delta * 0.12;

      // 2. Apply Friction:
      // Smoothly dampens the speed back to 0 over time
      velocity *= 0.9;

      // 3. Update Position:
      // Add velocity, plus a constant base crawl of -0.05 (always slowly moving left)
      position += velocity - 0.05;

      // 4. Seamless Infinite Loop Math:
      // Since our array is massive, we snap the position back by exactly 50%
      // before it runs out of text. It happens so fast the human eye can't see the jump.
      if (position <= -50) {
        position += 50;
      } else if (position > 0) {
        position -= 50;
      }

      // 5. Apply Hardware-Accelerated Transform
      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translate3d(${position}%, 0, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section
      id="contact"
      className="reveal border-1.5 border-[#E2D9C8] rounded-3xl bg-[#1C1B1A] text-[#FAF8F5] overflow-hidden mb-24 relative z-10"
    >
      <div className="border-b-1.5 border-[#4A4135] py-4 overflow-hidden relative">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap will-change-transform w-max"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <React.Fragment key={i}>
              <span className="text-2xl font-bold uppercase tracking-widest mx-4 text-[#C2A878]">
                OPEN FOR OPPORTUNITIES
              </span>
              <span className="text-2xl font-bold uppercase tracking-widest mx-4 text-[#C2A878]">
                ///
              </span>
              <span className="text-2xl font-bold uppercase tracking-widest mx-4 text-[#C2A878]">
                LET&apos;S BUILD SOMETHING
              </span>
              <span className="text-2xl font-bold uppercase tracking-widest mx-4 text-[#C2A878]">
                ///
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-8 md:p-16 flex flex-col items-center text-center">
        <p className="font-mono text-sm text-[#C2A878] mb-8 uppercase tracking-widest animate-lines">
          Initiate Connection
        </p>
        <a
          href="mailto:hello@developer.com"
          className="cursor-email nav-link text-[8vw] md:text-[6vw] font-bold tracking-tighter hover:text-[#D4C6B0] transition-colors leading-none border-b-2 border-transparent hover:border-[#D4C6B0] mb-12 animate-chars"
        >
          {personalInfo.email}
        </a>
        <div className="w-full max-w-2xl flex flex-wrap justify-center gap-4">
          <Link
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-6 py-3 border-1.5 border-[#4A4135] rounded-full hover:bg-[#4A4135] transition-colors text-sm font-medium"
          >
            GitHub
          </Link>
          <Link
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-6 py-3 border-1.5 border-[#4A4135] rounded-full hover:bg-[#4A4135] transition-colors text-sm font-medium"
          >
            LinkedIn
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-6 py-3 border-1.5 border-[#4A4135] rounded-full hover:bg-[#4A4135] transition-colors text-sm font-medium"
          >
            Read.cv
          </a>
        </div>
      </div>

      <div className="border-t-1.5 border-[#4A4135] p-6 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-[#A38A5A]">
        <p>&copy; 2026 Developer Portfolio. Flat Design Ed.</p>
        <p>Designed outside the grid.</p>
      </div>
    </section>
  );
};
