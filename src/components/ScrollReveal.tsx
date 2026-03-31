"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseStyle: React.CSSProperties = {
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    opacity: isVisible ? 1 : 0,
  };

  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    fade: "none",
  };

  if (!isVisible) {
    baseStyle.transform = transforms[direction];
  } else {
    baseStyle.transform = "none";
  }

  return (
    <div ref={ref} style={baseStyle} className={className}>
      {children}
    </div>
  );
}
