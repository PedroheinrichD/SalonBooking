"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Reveals an element once it enters the viewport.
 * Respects prefers-reduced-motion by returning true immediately.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.2, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, inView]);

  return { ref, inView };
}
