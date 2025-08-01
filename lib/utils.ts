import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Extend the Window interface to include locomotiveScroll
declare global {
  interface Window {
    locomotiveScroll?: import("locomotive-scroll").default;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scroll utility that works with Locomotive Scroll v5
export function scrollToSection(sectionId: string, offset: number = 100) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Check if locomotive scroll is available on window
  const locomotiveScroll = window.locomotiveScroll;

  if (locomotiveScroll) {
    // Use Locomotive Scroll for smooth scrolling - try element-based approach first
    try {
      locomotiveScroll.scrollTo(element, { offset: -offset });
    } catch {
      // Fallback to position-based scrolling
      const targetPosition = element.offsetTop - offset;
      locomotiveScroll.scrollTo(targetPosition);
    }
  } else {
    // Fallback to native smooth scrolling
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Extract section ID from href
export function getSectionId(href: string): string | null {
  if (href.includes("#")) {
    return href.split("#")[1];
  }
  return null;
}
