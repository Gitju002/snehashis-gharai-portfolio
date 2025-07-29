"use client";
import { useState, useEffect } from "react";

// Common breakpoints (you can adjust these to match your Tailwind config)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

interface UseMediaQueryReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isExtraLargeScreen: boolean;
  is2ExtraLargeScreen: boolean;
  isAbove: (breakpoint: Breakpoint) => boolean;
  isBelow: (breakpoint: Breakpoint) => boolean;
}

/**
 * Custom hook to check screen width and provide responsive utilities
 * @returns Object with screen dimensions and breakpoint utilities
 */
export const useMediaQuery = (): UseMediaQueryReturn => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = dimensions;

  // Helper functions
  const isAbove = (breakpoint: Breakpoint): boolean =>
    width >= breakpoints[breakpoint];
  const isBelow = (breakpoint: Breakpoint): boolean =>
    width < breakpoints[breakpoint];

  return {
    width,
    height,
    // Common responsive checks
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    // Specific breakpoint checks
    isSmallScreen: width >= breakpoints.sm,
    isMediumScreen: width >= breakpoints.md,
    isLargeScreen: width >= breakpoints.lg,
    isExtraLargeScreen: width >= breakpoints.xl,
    is2ExtraLargeScreen: width >= breakpoints["2xl"],
    // Utility functions
    isAbove,
    isBelow,
  };
};

/**
 * Simple hook to check if screen width is above a specific breakpoint
 * @param breakpoint - The breakpoint to check against
 * @returns boolean indicating if screen is above the breakpoint
 */
export const useIsAboveBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsAbove(window.innerWidth >= breakpoints[breakpoint]);
    };

    // Set initial value
    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return isAbove;
};

/**
 * Simple hook to check if screen width is below a specific breakpoint
 * @param breakpoint - The breakpoint to check against
 * @returns boolean indicating if screen is below the breakpoint
 */
export const useIsBelowBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsBelow(window.innerWidth < breakpoints[breakpoint]);
    };

    // Set initial value
    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return isBelow;
};

/**
 * Hook to get current screen width only
 * @returns Current screen width in pixels
 */
export const useScreenWidth = (): number => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
