import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface TextRevealAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean;
  opacity?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
}

// Animation utility function
export const createTextRevealAnimation = (
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  trigger: HTMLElement | null,
  options?: TextRevealAnimationOptions
) => {
  if (!trigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Set initial opacity
  gsap.set(refs.current, {
    opacity: options?.opacity || 0.1,
  });

  gsap.to(refs.current, {
    scrollTrigger: {
      trigger,
      scrub: options?.scrub ?? true,
      start: options?.start || "top 70%",
      end: options?.end || "bottom 30%",
    },
    opacity: 1,
    delay: options?.delay || 0.5,
    ease: options?.ease || "none",
    stagger: options?.stagger || 0.008,
  });
};
