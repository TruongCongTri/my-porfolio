'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions extends IntersectionObserverInit {
  id?: string; // Add an ID property to sync the URL
}

export const useScrollReveal = (options?: UseScrollRevealOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false); // One-way (Entrance Animation)
  const [isActive, setIsActive] = useState(false);   // Two-way (URL Sync & Highlighting)

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // 1. Observer for Entrance Animation (Triggers early, fires once)
    const revealObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        revealObserver.unobserve(currentRef);
      }
    }, {
      threshold: options?.threshold || 0.1,
    });

    // 2. Observer for Active State & URL Sync (Triggers when in center of screen)
    const activeObserver = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting);
      
      if (entry.isIntersecting && options?.id) {
        // Silently updates the URL hash without causing a page jump
        window.history.replaceState(null, '', `#${options.id}`);
      }
    }, {
      // This margin means it only triggers when the section is in the middle 50% of the viewport
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0
    });

    revealObserver.observe(currentRef);
    activeObserver.observe(currentRef);

    return () => {
      if (currentRef) {
        revealObserver.unobserve(currentRef);
        activeObserver.unobserve(currentRef);
      }
    };
  }, [options?.id, options?.threshold]);

  return { ref, isVisible, isActive }; // Now returns isActive
};