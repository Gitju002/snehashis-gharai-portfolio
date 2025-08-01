# GSAP Animations Guide

A comprehensive guide to GSAP (GreenSock Animation Platform) implementations in the portfolio, covering scroll-triggered animations, cursor interactions, and performance optimizations.

## Overview

GSAP is the primary animation engine for complex, high-performance animations in the portfolio. It handles:
- **Scroll-triggered animations** for revealing content
- **Cursor-following effects** for interactive elements
- **Complex timelines** for coordinated animations
- **Performance-optimized transforms** for smooth playback

## Key GSAP Features Used

### 1. ScrollTrigger Plugin
- Triggers animations based on scroll position
- Provides scrub animations tied to scroll progress
- Handles intersection-based reveals

### 2. useGSAP Hook
- React integration for GSAP animations
- Automatic cleanup and re-registration
- Dependency-based re-execution

### 3. Timeline Management
- Coordinate multiple animations
- Control timing and sequencing
- Label-based navigation

## Hero Component GSAP Animations

### Text Movement with Cursor

This creates a parallax effect where text follows the cursor movement with depth.

```typescript
// Hero.tsx - Cursor following animation
const handleMouseMove = (event: MouseEvent) => {
  if (!isMouseMoveEnabledRef.current) return;

  const depth = 20; // Controls sensitivity
  const moveX = (event.pageX - window.innerWidth / 2) / depth;
  const moveY = (event.pageY - window.innerHeight / 2) / depth;

  gsap.to([".text-snehashis", ".text-gharai"], {
    x: -moveX,          // Inverse movement for parallax effect
    y: -moveY,
    ease: "expo",       // Smooth exponential easing
    duration: 1,        // Animation duration in seconds
    stagger: 0.003,     // Slight delay between elements
    overwrite: true     // Cancel previous animations
  });
};
```

**How it works:**
1. **Calculate Movement**: `(mouseX - centerX) / depth` creates proportional movement
2. **Inverse Direction**: Negative values create parallax effect
3. **Stagger**: Small delay between text elements for organic feel
4. **Overwrite**: Prevents animation conflicts during rapid mouse movement

### Text Reveal on Scroll

Animates hero text elements as they enter the viewport.

```typescript
// Desktop text animations with different delays
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (isDesktop) {
    // First name animation
    gsap.from(snehashisDesktopRef.current, {
      duration: 1,
      y: "25%",           // Start 25% down from final position
      opacity: 0,         // Start transparent
      ease: "sine",       // Smooth sine wave easing
      delay: 0.3,         // Wait 300ms before starting
      scrollTrigger: {
        trigger: snehashisDesktopRef.current,
        start: "top 80%",  // Start when element is 80% down viewport
        toggleActions: "play none none reverse"
      }
    });

    // Last name animation with different timing
    gsap.from(gharaiDesktopRef.current, {
      duration: 1,
      y: "15%",           // Less movement for variety
      opacity: 0,
      ease: "sine",
      delay: 0.6,         // Longer delay for staggered effect
      scrollTrigger: {
        trigger: gharaiDesktopRef.current
      }
    });
  }
}, [isDesktop, hasLoadingCompleted]);
```

**Key Concepts:**
- **Percentage Y Values**: Relative to element height, more responsive
- **Staggered Delays**: Creates sequential reveal effect
- **Conditional Rendering**: Different animations for mobile/desktop

### Arrow Rotation Animation

Creates a smooth rotation effect for decorative elements.

```typescript
// Arrow animation with rotation
useGSAP(() => {
  // Set initial state
  gsap.set(arrowRef.current, {
    rotate: -90,                    // Start rotated 90 degrees left
    transformOrigin: "center center" // Rotate around center point
  });

  // Animate to final state
  gsap.to(arrowRef.current, {
    duration: 1.5,      // Longer duration for smooth rotation
    rotate: 0,          // End at 0 degrees (normal position)
    ease: "sine"        // Smooth sine easing
  });
}, [hasLoadingCompleted]);
```

## Skills Component Scroll Reveals

### Progressive Content Revelation

Animates skills section with coordinated timing for professional presentation.

```typescript
// Skills.tsx - Scroll-triggered reveal system
useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Title animation (first to appear)
  gsap.from(".skills-title", {
    duration: 0.8,
    x: -100,            // Slide in from left
    opacity: 0,
    ease: "power2.out", // Fast start, slow end
    scrollTrigger: {
      trigger: ".skills-title",
      start: "top 80%",
      end: "bottom 60%"
    }
  });

  // 2. Category headers with stagger
  gsap.from(".skill-category", {
    duration: 1,
    y: 50,              // Slide up from below
    opacity: 0,
    stagger: 0.2,       // 200ms delay between each category
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 70%"
    }
  });

  // 3. Individual skill items with bounce
  gsap.from(".skill-item", {
    duration: 0.6,
    scale: 0.8,         // Start smaller
    opacity: 0,
    stagger: 0.1,       // Quick succession
    ease: "back.out(1.7)", // Bounce effect
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 60%"
    }
  });
}, []);
```

**Animation Hierarchy:**
1. **Title First**: Establishes section context
2. **Categories Second**: Shows organization
3. **Items Last**: Individual skill reveals with bounce

### Advanced Stagger Patterns

```typescript
// More complex stagger configurations
gsap.from(".skill-item", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: {
    each: 0.1,          // Base delay between items
    from: "center",     // Start from center and work outward
    grid: [4, 3],       // Define 4x3 grid layout
    ease: "power2.inOut"
  }
});

// Stagger with custom function
gsap.from(".skill-item", {
  opacity: 0,
  scale: 0.5,
  stagger: {
    each: 0.1,
    amount: 1.2,        // Total time for all staggers
    from: "random"      // Random order for organic feel
  }
});
```

## Experience Component Animations

### Timeline-style Reveals

Perfect for experience/timeline sections with progressive disclosure.

```typescript
// Experience timeline animation
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".experience-container",
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1            // Tie animation to scroll progress
    }
  });

  // Animate timeline line
  tl.fromTo(".timeline-line", 
    { scaleY: 0, transformOrigin: "top" },
    { scaleY: 1, duration: 1 }
  )
  // Animate experience items in sequence
  .from(".experience-item", {
    x: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3
  }, "-=0.5"); // Start 0.5s before previous animation ends

}, []);
```

## Projects Modal Visibility with GSAP

### Dynamic Cursor Following

Creates an interactive modal that follows cursor movement with smooth tracking.

```typescript
// Modal.tsx - Advanced cursor tracking
useGSAP(() => {
  // Quick movement functions for performance
  const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
    duration: 0.8,
    ease: "power3"
  });

  const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
    duration: 0.8,
    ease: "power3"
  });

  // Separate tracking for cursor label (faster)
  const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
    duration: 0.5,      // Faster than container
    ease: "power3"
  });

  const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
    duration: 0.5,
    ease: "power3"
  });

  // Unified movement function
  const moveItems = (x: number, y: number) => {
    xMoveContainer(x);
    yMoveContainer(y);
    xMoveCursorLabel(x);
    yMoveCursorLabel(y);
  };

  // Mouse event handler
  const handleMouseMove = (e: MouseEvent) => {
    moveItems(e.clientX, e.clientY);
  };

  window.addEventListener("mousemove", handleMouseMove);
  
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
```

**Performance Features:**
- **quickTo()**: Optimized for frequent updates
- **Separate Durations**: Different tracking speeds for layered effect
- **Event Cleanup**: Prevents memory leaks

### Modal Scale Animation

Combines GSAP with Framer Motion for hybrid animation approach.

```typescript
// Scale animation with GSAP timing
const scaleModal = (isVisible: boolean) => {
  gsap.to(modalRef.current, {
    scale: isVisible ? 1 : 0,
    duration: 0.4,
    ease: isVisible ? "back.out(1.7)" : "power2.in",
    transformOrigin: "center center"
  });
};

// Framer Motion variant for React integration
const modalVariants: Variants = {
  initial: { 
    scale: 0, 
    x: "-50%", 
    y: "-50%",
    rotateX: -15 
  },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    rotateX: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.76, 0, 0.24, 1],
      type: "spring",
      damping: 15
    }
  }
};
```

## Performance Optimization Techniques

### 1. Hardware Acceleration

```typescript
// Force hardware acceleration for smooth animations
gsap.set(".animated-element", {
  force3D: true,           // Enable 3D transforms
  willChange: "transform", // Hint to browser for optimization
  backfaceVisibility: "hidden" // Prevent flickering
});
```

### 2. Animation Cleanup

```typescript
// Proper cleanup with useGSAP
useGSAP(() => {
  const tl = gsap.timeline();
  
  tl.from(".element", { opacity: 0, duration: 1 });
  
  // useGSAP handles cleanup automatically, but for manual control:
  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [dependency]);
```

### 3. Responsive Animation Handling

```typescript
// Conditional animations based on screen size
const { isDesktop, isMobile } = useMediaQuery();

useGSAP(() => {
  // Clear any existing animations
  gsap.killTweensOf(".responsive-element");

  if (isDesktop) {
    // Complex desktop animation
    gsap.timeline()
      .from(".element", { y: 100, duration: 1 })
      .from(".sub-element", { opacity: 0, stagger: 0.2 });
  } else {
    // Simplified mobile animation
    gsap.from(".element", {
      opacity: 0,
      y: 30,
      duration: 0.6
    });
  }
}, [isDesktop, isMobile]);
```

### 4. Loading State Coordination

```typescript
// Coordinate animations with loading state
useGSAP(() => {
  if (isLoading) {
    // Disable mouse interactions during loading
    isMouseMoveEnabledRef.current = false;
    
    // Reset positions
    gsap.set([".animated-text"], {
      x: 0,
      y: 0,
      clearProps: "transform" // Remove all transforms
    });
  }

  // Re-enable with delay after loading
  if (hasLoadingCompleted && !isLoading) {
    setTimeout(() => {
      isMouseMoveEnabledRef.current = true;
    }, 1500);
  }
}, [hasLoadingCompleted, isLoading]);
```

## Advanced GSAP Techniques

### 1. Custom Easing Functions

```typescript
// Custom bounce easing
gsap.registerEase("customBounce", function(progress) {
  return progress < 0.5 
    ? 4 * progress * progress * progress 
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
});

// Use custom easing
gsap.to(".element", {
  y: 0,
  duration: 1,
  ease: "customBounce"
});
```

### 2. Morphing SVG Paths

```typescript
// SVG path morphing for complex shapes
gsap.to(".svg-path", {
  attr: { 
    d: "M0,100 Q50,0 100,100 T200,100" // Target path
  },
  duration: 2,
  ease: "power2.inOut"
});
```

### 3. Text Animation Utilities

```typescript
// Split text into animatable spans
const splitText = (element: HTMLElement) => {
  const text = element.textContent || '';
  element.innerHTML = text
    .split('')
    .map(char => `<span class="char">${char}</span>`)
    .join('');
};

// Animate individual characters
gsap.from(".char", {
  opacity: 0,
  y: 50,
  rotation: 10,
  duration: 0.8,
  stagger: 0.02,
  ease: "back.out(1.7)"
});
```

## ScrollTrigger Advanced Features

### 1. Scrub Animations

```typescript
// Tie animation progress to scroll position
gsap.to(".parallax-bg", {
  yPercent: -50,
  scrollTrigger: {
    trigger: ".parallax-container",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,      // Smooth lag for natural feel
    invalidateOnRefresh: true // Recalculate on resize
  }
});
```

### 2. Pin and Unpin Effects

```typescript
// Pin element during scroll
ScrollTrigger.create({
  trigger: ".sticky-section",
  start: "top top",
  end: "bottom bottom",
  pin: ".sticky-content",
  pinSpacing: false,   // Don't add spacing
  onUpdate: (self) => {
    // Update based on scroll progress
    gsap.to(".pinned-element", {
      rotation: self.progress * 360,
      duration: 0.3
    });
  }
});
```

### 3. Batch Animations

```typescript
// Animate multiple elements efficiently
ScrollTrigger.batch(".batch-item", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8
    });
  },
  onLeave: (elements) => {
    gsap.to(elements, {
      opacity: 0.3,
      duration: 0.5
    });
  },
  onEnterBack: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      duration: 0.5
    });
  }
});
```

## Debugging GSAP Animations

### 1. Development Tools

```typescript
// Add markers in development
if (process.env.NODE_ENV === 'development') {
  ScrollTrigger.defaults({
    markers: true,
    toggleActions: "play pause resume reverse"
  });
}
```

### 2. Animation Logging

```typescript
// Log animation states
gsap.to(".element", {
  x: 100,
  duration: 1,
  onStart: () => console.log("Animation started"),
  onUpdate: () => console.log("Animation updating"),
  onComplete: () => console.log("Animation completed")
});
```

## Best Practices

1. **Use useGSAP Hook**: Automatic cleanup and React integration
2. **Enable Hardware Acceleration**: Set `force3D: true` for smooth performance
3. **Optimize for Mobile**: Simpler animations on smaller screens
4. **Coordinate with Loading**: Wait for content to load before animating
5. **Clean Up Properly**: Kill animations and ScrollTriggers on unmount
6. **Test Performance**: Monitor frame rates and optimize accordingly

## Related Documentation
- [`Animations Overview`](./ANIMATIONS.md) - Complete animation system guide
- [`Hero Component`](./HERO.md) - Cursor interaction implementation
- [`Skills Component`](./SKILLS.md) - Scroll reveal examples
- [`Projects Component`](./PROJECTS.md) - Modal animation system
