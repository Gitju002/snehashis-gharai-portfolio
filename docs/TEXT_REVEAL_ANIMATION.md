# Text Reveal Animation

A reusable text reveal animation system built with GSAP and React.

## Files

- `animations/text-reveal-anim.ts` - Core animation utility functions
- `components/ui/TextReveal.tsx` - React component and hooks for text reveal
- `components/ui/ExampleTextReveal.tsx` - Example usage component

## Usage

### Option 1: Using the useTextReveal Hook (Recommended)

```tsx
import React, { useRef } from "react";
import { useTextReveal } from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { elements, createAnimation } = useTextReveal("Your text here", {
    letterClassName: "text-xl font-bold",
    wordClassName: "mr-2"
  });

  useGSAP(() => {
    createAnimation(containerRef.current, {
      start: "top 70%",
      end: "bottom 30%",
      stagger: 0.008,
      delay: 0.5
    });
  }, []);

  return (
    <div ref={containerRef}>
      {elements}
    </div>
  );
};
```

### Option 2: Using the TextReveal Component

```tsx
import TextReveal from "@/components/ui/TextReveal";

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <TextReveal
      text="Your text here"
      trigger={containerRef.current}
      letterClassName="text-xl font-bold"
      wordClassName="mr-2"
      animationOptions={{
        start: "top 70%",
        end: "bottom 30%",
        stagger: 0.008,
        delay: 0.5
      }}
    />
  );
};
```

### Option 3: Using Core Animation Functions

```tsx
import { createTextRevealAnimation } from "@/animations/text-reveal-anim";

// In your useGSAP or useEffect
createTextRevealAnimation(refsArray, triggerElement, {
  start: "top 70%",
  end: "bottom 30%",
  stagger: 0.008,
  delay: 0.5
});
```

## Props & Options

### useTextReveal Hook

```tsx
const { elements, refs, createAnimation } = useTextReveal(text, options);
```

**Parameters:**
- `text: string` - The text to animate
- `options?: object` - Optional styling options
  - `letterClassName?: string` - CSS classes for individual letters
  - `wordClassName?: string` - CSS classes for word containers

**Returns:**
- `elements: React.ReactElement[]` - Array of JSX elements with split text
- `refs: React.MutableRefObject<(HTMLSpanElement | null)[]>` - Refs to letter spans
- `createAnimation: function` - Function to create the animation

### TextReveal Component Props

- `text: string` - The text to animate
- `trigger?: HTMLElement | null` - Element that triggers the animation
- `className?: string` - CSS classes for the container
- `letterClassName?: string` - CSS classes for individual letters  
- `wordClassName?: string` - CSS classes for word containers
- `animationOptions?: TextRevealAnimationOptions` - Animation configuration
- `onRefsReady?: function` - Callback when refs are ready

### Animation Options

```tsx
interface TextRevealAnimationOptions {
  start?: string;           // ScrollTrigger start position (default: "top 70%")
  end?: string;             // ScrollTrigger end position (default: "bottom 30%")
  scrub?: boolean;          // Whether to scrub animation (default: true)
  opacity?: number;         // Initial opacity (default: 0.1)
  delay?: number;           // Animation delay (default: 0.5)
  stagger?: number;         // Stagger between letters (default: 0.008)
  ease?: string;            // GSAP easing (default: "none")
}
```

## Migration from About.tsx

The original `splitWords` and `splitLetters` functions have been refactored into reusable utilities. The About component now uses:

```tsx
const { elements: textElements, refs, createAnimation: createTextAnimation } = useTextReveal(phrase);

// In useGSAP:
createTextAnimation(textContainer.current);

// In JSX:
<div ref={body}>{textElements}</div>
```

## Benefits

1. **Reusable** - Use the same text reveal animation anywhere in your app
2. **Customizable** - Control styling, timing, and trigger conditions
3. **TypeScript Support** - Full type safety
4. **Performance** - Optimized GSAP animations with proper cleanup
5. **Flexible** - Multiple usage patterns to fit different needs
