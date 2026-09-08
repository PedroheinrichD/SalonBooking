"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  as?: "div" | "li";
  delay?: number;
  className?: string;
  variant?: "up" | "fade" | "scale";
}

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
  variant = "up",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement & HTMLLIElement>();
  const sharedProps = {
    ref: ref as React.RefObject<HTMLDivElement & HTMLLIElement>,
    className: `reveal reveal-${variant} ${inView ? "is-in-view" : ""} ${className}`,
    style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
  };

  if (as === "li") {
    return <li {...sharedProps}>{children}</li>;
  }

  return <div {...sharedProps}>{children}</div>;
}
