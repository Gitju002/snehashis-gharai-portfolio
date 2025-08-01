# Animation System

A comprehensive guide to the animation system used in the portfolio, covering GSAP animations, Framer Motion components, and custom animation utilities.

## Overview

The portfolio uses a multi-layered animation system:
1. **GSAP (GreenSock)** - High-performance scroll-triggered animations and complex interactions
2. **Framer Motion** - React-based animations for components and page transitions
3. **Custom Animation Utilities** - Reusable animation functions and configurations

## Technologies Used

### GSAP (GreenSock Animation Platform)
- **Version**: 3.13.0
- **Plugins**: ScrollTrigger, useGSAP hook
- **Use Cases**: Scroll-triggered animations, complex timelines, cursor interactions

### Framer Motion
- **Version**: 12.23.6
- **Use Cases**: Component animations, page transitions, micro-interactions

### Locomotive Scroll
- **Version**: 5.0.0-beta.21
- **Integration**: Works with GSAP ScrollTrigger for smooth scrolling

## Animation Files Structure

### Navigation Animations (`animations/nav-anim.ts`)

```typescript
import { Variants } from "framer-motion";

export const menuSlide: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: {
    x: "0",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};

export const slide: Variants = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i
    }
  }),
  exit: (i: number) => ({
    x: 80,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i
    }
  })
};
```

### Preloader Animations (`animations/preloader-anim.ts`)

```typescript
export const opacity: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
};

export const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};
```

### Text Reveal Animations (`animations/text-reveal-anim.ts`)

```typescript
export const createTextRevealAnimation = (
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  trigger: HTMLElement | null,
  options: TextRevealAnimationOptions = {}
) => {
  if (!trigger || refs.current.length === 0) return;

  const {
    start = "top 70%",
    end = "bottom 30%",
    scrub = true,
    opacity = 0.1,
    delay = 0.5,
    stagger = 0.008,
    ease = "none"
  } = options;

  gsap.fromTo(
    refs.current,
    { opacity },
    {
      opacity: 1,
      duration: 1,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub
      }
    }
  );
};
```

## GSAP Animations

### Hero Component Animations

#### 1. Text Movement with Cursor
```typescript
const handleMouseMove = (event: MouseEvent) => {
  if (!isMouseMoveEnabledRef.current) return;

  const depth = 20;
  const moveX = (event.pageX - window.innerWidth / 2) / depth;
  const moveY = (event.pageY - window.innerHeight / 2) / depth;

  gsap.to([".text-snehashis", ".text-gharai"], {
    x: -moveX,
    y: -moveY,
    ease: "expo",
    duration: 1,
    stagger: 0.003,
    overwrite: true
  });
};
```

#### 2. Text Reveal on Scroll
```typescript
// Desktop text animations
gsap.from(snehashisDesktopRef.current, {
  duration: 1,
  y: "25%",
  opacity: 0,
  ease: "sine",
  delay: 0.3,
  scrollTrigger: {
    trigger: snehashisDesktopRef.current
  }
});

gsap.from(gharaiDesktopRef.current, {
  duration: 1,
  y: "15%",
  opacity: 0,
  ease: "sine",
  delay: 0.6,
  scrollTrigger: {
    trigger: gharaiDesktopRef.current
  }
});
```

#### 3. Arrow Rotation Animation
```typescript
gsap.set(arrowRef.current, {
  rotate: -90,
  transformOrigin: "center center"
});

gsap.to(arrowRef.current, {
  duration: 1.5,
  rotate: 0,
  ease: "sine"
});
```

### Skills Component Scroll Reveals

```typescript
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Animate title first
  gsap.from(".skills-title", {
    duration: 0.8,
    x: -100,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".skills-title",
      start: "top 80%"
    }
  });

  // Animate skill categories with stagger
  gsap.from(".skill-category", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 70%"
    }
  });

  // Animate individual skill items
  gsap.from(".skill-item", {
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 60%"
    }
  });
}, []);
```

### Projects Modal Visibility

```typescript
// Modal container movement
const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
  duration: 0.8,
  ease: "power3"
});

const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
  duration: 0.8,
  ease: "power3"
});

// Cursor label movement
const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
  duration: 0.5,
  ease: "power3"
});

const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
  duration: 0.5,
  ease: "power3"
});

// Mouse move handler
const moveItems = (x: number, y: number) => {
  xMoveContainer(x);
  yMoveContainer(y);
  xMoveCursorLabel(x);
  yMoveCursorLabel(y);
};
```

## Framer Motion Animations

### Navigation Menu Slide
```typescript
// Menu container slide animation
<motion.div
  variants={menuSlide}
  initial="initial"
  animate="enter"
  exit="exit"
  className="menu"
>
  {/* Menu content */}
</motion.div>

// Individual menu items with stagger
<motion.div
  custom={index}
  variants={slide}
  initial="initial"
  animate="enter"
  exit="exit"
  className="menu-item"
>
  {item.title}
</motion.div>
```

### Preloader Animations
```typescript
// Background fade in
<motion.div
  variants={opacity}
  initial="initial"
  animate="enter"
  className="preloader-bg"
/>

// Slide up exit animation
<motion.div
  variants={slideUp}
  initial="initial"
  exit="exit"
  className="preloader-container"
/>

// SVG path morphing
<motion.path
  variants={curve}
  initial="initial"
  exit="exit"
  d={initialPath}
/>
```

### Modal Scale Animation
```typescript
const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
  }
};
```

## Custom Animation Utilities

### Text Reveal Hook
```typescript
export const useTextReveal = (
  text: string,
  options: TextRevealOptions = {}
) => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const elements = useMemo(() => {
    const words = text.split(' ');
    let letterIndex = 0;
    
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className={options.wordClassName}>
        {word.split('').map((letter, letterIdx) => (
          <span
            key={`${wordIndex}-${letterIdx}`}
            ref={(el) => (refs.current[letterIndex++] = el)}
            className={options.letterClassName}
          >
            {letter}
          </span>
        ))}
      </span>
    ));
  }, [text, options]);

  const createAnimation = useCallback((trigger: HTMLElement | null) => {
    createTextRevealAnimation(refs, trigger, options.animationOptions);
  }, [options]);

  return { elements, refs, createAnimation };
};
```

### Loading State Coordination
```typescript
// Disable animations during loading
useGSAP(() => {
  if (isLoading) {
    // Reset positions
    gsap.set([".text-snehashis", ".text-gharai"], {
      x: 0,
      y: 0
    });
    isMouseMoveEnabledRef.current = false;
  }

  // Enable with delay after loading
  if (hasLoadingCompleted && !isLoading) {
    timeoutRef.current = setTimeout(() => {
      isMouseMoveEnabledRef.current = true;
    }, 1500);
  }
}, [hasLoadingCompleted, isLoading]);
```

## Animation Best Practices

### 1. Performance Optimization
```typescript
// Use will-change for frequently animated elements
gsap.set(".animated-element", { willChange: "transform" });

// Use transforms instead of changing layout properties
gsap.to(".element", {
  x: 100,        // ✅ Good: uses transform
  y: 50,         // ✅ Good: uses transform
  rotation: 45   // ✅ Good: uses transform
  // left: 100   // ❌ Bad: triggers layout
});
```

### 2. Responsive Animations
```typescript
const { isDesktop, isMobile } = useMediaQuery();

useGSAP(() => {
  if (isDesktop) {
    // Complex desktop animations
    gsap.timeline()
      .from(".hero-title", { y: 100, duration: 1 })
      .from(".hero-subtitle", { y: 50, duration: 0.8 }, "-=0.5")
      .from(".hero-cta", { scale: 0, duration: 0.6 }, "-=0.3");
  } else {
    // Simpler mobile animations
    gsap.from(".hero-content", {
      opacity: 0,
      y: 30,
      duration: 0.8
    });
  }
}, [isDesktop, isMobile]);
```

### 3. Animation Cleanup
```typescript
useGSAP(() => {
  const tl = gsap.timeline();
  
  tl.from(".element", { opacity: 0, duration: 1 });
  
  // Cleanup is handled automatically by useGSAP
  return () => {
    tl.kill(); // Manual cleanup if needed
  };
}, []);
```

### 4. Scroll Trigger Management
```typescript
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  const animation = gsap.from(".scroll-element", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".scroll-element",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      onEnter: () => console.log("Animation started"),
      onLeave: () => console.log("Animation ended")
    }
  });

  return () => {
    animation.scrollTrigger?.kill();
  };
}, []);
```

## Integration Examples

### Complete Hero Animation System
```typescript
const Hero = () => {
  const { isDesktop } = useMediaQuery();
  const { hasLoadingCompleted, isLoading } = useLoadingContext();
  
  // Text reveal animation
  const { elements, createAnimation } = useTextReveal(
    "Frontend Developer & Designer",
    {
      letterClassName: "text-reveal-letter",
      animationOptions: {
        start: "top 70%",
        stagger: 0.008
      }
    }
  );

  // GSAP animations
  useGSAP(() => {
    if (!hasLoadingCompleted) return;

    const tl = gsap.timeline({ delay: 0.5 });

    if (isDesktop) {
      tl.from(".hero-title", { y: 100, opacity: 0, duration: 1 })
        .from(".hero-image", { scale: 0.8, opacity: 0, duration: 1.2 }, "-=0.8")
        .add(() => createAnimation(containerRef.current), "-=0.5");
    }
  }, [hasLoadingCompleted, isDesktop]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: hasLoadingCompleted ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero content */}
    </motion.section>
  );
};
```

## Debugging Animations

### 1. GSAP DevTools
```typescript
// Add to development environment
if (process.env.NODE_ENV === 'development') {
  gsap.registerPlugin(GSDevTools);
  GSDevTools.create();
}
```

### 2. Animation Markers
```typescript
gsap.from(".element", {
  y: 100,
  scrollTrigger: {
    trigger: ".element",
    markers: process.env.NODE_ENV === 'development', // Show markers in dev
    start: "top 80%",
    end: "bottom 20%"
  }
});
```

### 3. Timeline Labels
```typescript
const tl = gsap.timeline();

tl.addLabel("start")
  .from(".element1", { opacity: 0, duration: 1 })
  .addLabel("middle")
  .from(".element2", { y: 50, duration: 0.8 })
  .addLabel("end");

// Jump to specific points
tl.play("middle");
```

## Related Components
- [`Hero`](./HERO.md) - Complex GSAP animations with cursor interaction
- [`Skills`](./SKILLS.md) - Scroll-triggered reveal animations
- [`Projects`](./PROJECTS.md) - Modal visibility with GSAP
- [`PreLoader`](./PRELOADER.md) - Framer Motion SVG morphing
- [`Navigation`](./NAVIGATION.md) - Slide animations with Framer Motion
