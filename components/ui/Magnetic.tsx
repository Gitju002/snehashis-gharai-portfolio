import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Magnetic component that applies a magnetic effect to its children.
 * It uses GSAP for animations and mouse movement tracking.
 */

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = magnetic.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magnetic]);

  return (
    <div ref={magnetic} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}


