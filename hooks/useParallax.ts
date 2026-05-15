"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useParallax = (isLoaded: boolean) => {
  useGSAP(() => {
    if (!isLoaded) return;

    const containers = gsap.utils.toArray(".parallax-container");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    containers.forEach((container: any) => {
      const img = container.querySelector(".parallax-img");

      if (img) {
        gsap.to(img, {
          yPercent: 20, // Moves the image 20% relative to its size
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom", // Starts when container top hits viewport bottom
            end: "bottom top",   // Ends when container bottom hits viewport top
            scrub: true,         // Links animation to scroll position
          },
        });
      }
    });

    // Clean up and refresh ScrollTrigger when logic changes
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoaded]);
};