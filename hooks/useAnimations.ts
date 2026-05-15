"use client";
import { useEffect } from "react";

export const useAnimations = (isLoaded: boolean) => {
  useEffect(() => {
    if (!isLoaded) return;

    // 1. Split Text (Characters)
    document.querySelectorAll(".animate-chars").forEach((heading) => {
      if (heading.getAttribute("data-split") === "true") return;

      // Grab all child nodes (text AND html tags like <br/>) before clearing
      const nodes = Array.from(heading.childNodes);
      heading.innerHTML = "";

      let globalCharIndex = 0; // Keep track of delay across multiple text nodes

      nodes.forEach((node) => {
        // If it's plain text, split and animate it
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          text.split("").forEach((char) => {
            if (char === " " || char === "\n") {
              heading.appendChild(document.createTextNode(char));
              return;
            }
            const wrapper = document.createElement("span");
            wrapper.className =
              "char-wrapper inline-block overflow-hidden align-bottom";

            const charSpan = document.createElement("span");
            charSpan.className =
              "char inline-block transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]";
            charSpan.style.transitionDelay = `${globalCharIndex * 0.025}s`;
            charSpan.innerText = char;

            wrapper.appendChild(charSpan);
            heading.appendChild(wrapper);
            globalCharIndex++;
          });
        }
        // If it's a <br> tag, put it back exactly as it was!
        else if (node.nodeName === "BR") {
          heading.appendChild(document.createElement("br"));
        }
      });

      heading.setAttribute("data-split", "true");
    });

    // 2. Split Text (Lines)
    document.querySelectorAll(".animate-lines").forEach((para) => {
      if (para.getAttribute("data-split") === "true") return;
      const text = para.textContent || "";
      const words = text.trim().split(/\s+/);
      para.innerHTML = "";

      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "inline-block mr-[0.25em]";
        span.innerText = word;
        para.appendChild(span);
      });

      const lines: HTMLElement[][] = [];
      let currentLine: HTMLElement[] = [];
      let currentTop = -1;

      Array.from(para.children).forEach((span) => {
        const htmlSpan = span as HTMLElement;
        if (currentTop === -1 || htmlSpan.offsetTop > currentTop + 5) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [];
          currentTop = htmlSpan.offsetTop;
        }
        currentLine.push(htmlSpan);
      });
      if (currentLine.length > 0) lines.push(currentLine);

      para.innerHTML = "";

      lines.forEach((line, i) => {
        const wrapper = document.createElement("span");
        wrapper.className = "line-wrapper block overflow-hidden pb-[2px]";

        const lineInner = document.createElement("span");
        // FIX: Removed conflicting opacity-0 and transform. Relying strictly on globals.css .line
        lineInner.className =
          "line block transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]";
        lineInner.style.transitionDelay = `${i * 0.1}s`;

        line.forEach((word) => lineInner.appendChild(word));
        wrapper.appendChild(lineInner);
        para.appendChild(wrapper);
      });
      para.setAttribute("data-split", "true");
    });

    // 3. Clean Observer Engine
    const revealElements = document.querySelectorAll(".reveal, #home");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // FIX: Simply add '.active'. globals.css handles the rest natively.
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoaded]);
};
