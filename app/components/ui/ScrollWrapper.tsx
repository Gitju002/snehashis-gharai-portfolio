"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";

export default function ScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy existing instance if it exists
    if (scrollRef.current) {
      scrollRef.current.destroy();
      scrollRef.current = null;
    }

    const locomotiveScroll = new LocomotiveScroll();

    scrollRef.current = locomotiveScroll;

    // Force a resize event to recalculate dimensions
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
}
