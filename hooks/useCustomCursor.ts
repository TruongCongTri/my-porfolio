"use client";
import { useEffect } from "react";

export const useCustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    let animationFrameId: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateCursor = () => {
      cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
      animationFrameId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        ".nav-link, button, a, .project-row, .cursor-interact, .cursor-email, .cursor-spin",
      );

      if (target) {
        cursor.classList.add("active");
        let text = "SHOW";

        // ADDED: Logic for new hover texts
        if (target.closest(".cursor-close")) text = "CLOSE";
        else if (target.closest(".cursor-goto")) text = "GO TO";
        else if (target.closest(".project-row")) text = "OPEN";
        else if (target.closest(".cursor-email")) text = "EMAIL ME";
        else if (target.closest(".cursor-spin")) text = "SPIN ME";

        cursor.setAttribute("data-text", text);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      // Must match the exact string from onMouseOver
      const target = (e.target as HTMLElement).closest(
        ".nav-link, button, a, .project-row, .cursor-interact, .cursor-email, .cursor-spin",
      );
      if (target) {
        cursor.classList.remove("active");
        cursor.removeAttribute("data-text");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
};