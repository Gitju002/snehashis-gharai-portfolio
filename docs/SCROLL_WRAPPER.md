# ScrollWrapper Component

A global Locomotive Scroll initializer component that provides smooth scrolling functionality throughout the entire website. It wraps your app content and manages Locomotive Scroll instances for enhanced scrolling experiences.

## Location
- `components/ui/ScrollWrapper.tsx`

## Purpose
The ScrollWrapper component serves as a global scroll manager that:
1. Initializes Locomotive Scroll for smooth scrolling effects
2. Provides a global reference for scroll-triggered animations
3. Handles scroll instance cleanup on route changes
4. Manages scroll recalculation when content changes

## Tech Stack
- **React**: Core component framework
- **TypeScript**: Type safety and interface definitions
- **Locomotive Scroll**: Advanced smooth scrolling library
- **Next.js**: Router integration for page changes
- **GSAP Integration**: Works seamlessly with GSAP ScrollTrigger

## Usage

### Basic Implementation (Already configured in _app.tsx)
```tsx
import ScrollWrapper from "@/components/ui/ScrollWrapper";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ScrollWrapper>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ScrollWrapper>
  );
};
```

### Accessing Global Scroll Instance
```tsx
// Access the global Locomotive Scroll instance
useEffect(() => {
  if (window.locomotiveScroll) {
    // Use the scroll instance
    window.locomotiveScroll.scrollTo(0, {
      duration: 1000,
      easing: [0.25, 0.0, 0.35, 1.0]
    });
  }
}, []);
```

## Features

### 1. Automatic Initialization
```tsx
useEffect(() => {
  if (!containerRef.current) return;

  // Destroy existing instance if it exists
  if (scrollRef.current) {
    scrollRef.current.destroy();
    scrollRef.current = null;
  }

  const locomotiveScroll = new LocomotiveScroll();
  scrollRef.current = locomotiveScroll;
  
  // Make globally accessible
  window.locomotiveScroll = locomotiveScroll;
}, [pathname]);
```

### 2. Route Change Handling
- Automatically reinitializes on page navigation
- Cleans up previous scroll instances
- Recalculates scroll positions for new content

### 3. Global Access
```tsx
// Extended Window interface for TypeScript
declare global {
  interface Window {
    locomotiveScroll?: LocomotiveScroll;
  }
}
```

### 4. Automatic Cleanup
```tsx
return () => {
  if (scrollRef.current) {
    scrollRef.current.destroy();
    scrollRef.current = null;
  }
  
  // Clean up global reference
  if (window.locomotiveScroll === locomotiveScroll) {
    delete window.locomotiveScroll;
  }
};
```

## Configuration

### Default Settings
The component uses Locomotive Scroll's default configuration, which includes:
- Smooth scrolling enabled
- Hardware acceleration
- Touch device support
- Scroll-triggered events

### Custom Configuration Example
```tsx
// If you need custom settings, modify the component:
const locomotiveScroll = new LocomotiveScroll({
  el: containerRef.current,
  smooth: true,
  smoothMobile: true,
  lerp: 0.1, // Linear interpolation factor (0-1)
  multiplier: 1, // Scroll speed multiplier
  class: 'is-revealed', // Class added to elements when in view
  scrollbarContainer: false,
  scrollFromAnywhere: false
});
```

## Integration with GSAP

### ScrollTrigger Integration
```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AnimatedComponent = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // ScrollTrigger automatically works with Locomotive Scroll
    gsap.from(".animate-element", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".animate-element",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });
  }, []);
};
```

### Manual Scroll Control
```tsx
const scrollToSection = (target: string) => {
  if (window.locomotiveScroll) {
    window.locomotiveScroll.scrollTo(target, {
      duration: 1500,
      easing: [0.25, 0.0, 0.35, 1.0],
      disableLerp: false
    });
  }
};
```

## Locomotive Scroll Attributes

### Data Attributes for Elements
```tsx
// Basic scroll speed
<div data-scroll data-scroll-speed="0.5">
  Slow scrolling element
</div>

// Horizontal scroll
<div data-scroll data-scroll-direction="horizontal" data-scroll-speed="1">
  Horizontal movement
</div>

// Sticky element
<div data-scroll data-scroll-sticky data-scroll-target="#container">
  Sticky element
</div>

// Parallax effect
<div data-scroll data-scroll-speed="-1">
  Parallax background
</div>

// Delayed animation
<div data-scroll data-scroll-delay="0.5">
  Delayed reveal
</div>
```

### Advanced Scroll Triggers
```tsx
// Call function when element enters view
<div data-scroll data-scroll-call="myFunction">
  Trigger function on scroll
</div>

// Repeat animation
<div data-scroll data-scroll-repeat>
  Repeating animation
</div>

// Element appears only on specific direction
<div data-scroll data-scroll-direction="vertical">
  Vertical scroll only
</div>
```

## Example Implementations

### 1. Hero Section with Parallax
```tsx
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div 
        data-scroll 
        data-scroll-speed="0.1" 
        className="hero-background"
      >
        <img src="/hero-bg.jpg" alt="Hero Background" />
      </div>
      
      <div 
        data-scroll 
        data-scroll-speed="0.3" 
        className="hero-content"
      >
        <h1>Welcome</h1>
      </div>
    </section>
  );
};
```

### 2. Scroll-triggered Animations
```tsx
const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".skill-item", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 70%",
        end: "bottom 30%"
      }
    });
  }, []);

  return (
    <div ref={skillsRef} data-scroll>
      <div className="skill-item">React</div>
      <div className="skill-item">TypeScript</div>
      <div className="skill-item">GSAP</div>
    </div>
  );
};
```

### 3. Smooth Navigation
```tsx
const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    if (window.locomotiveScroll) {
      window.locomotiveScroll.scrollTo(`#${sectionId}`, {
        duration: 1000,
        easing: [0.25, 0.0, 0.35, 1.0]
      });
    }
  };

  return (
    <nav>
      <button onClick={() => scrollToSection('about')}>
        About
      </button>
      <button onClick={() => scrollToSection('projects')}>
        Projects
      </button>
      <button onClick={() => scrollToSection('contact')}>
        Contact
      </button>
    </nav>
  );
};
```

## Performance Optimization

### 1. Resize Handling
```tsx
// Force recalculation after content changes
setTimeout(() => {
  window.dispatchEvent(new Event("resize"));
}, 100);
```

### 2. Image Loading
```tsx
// Recalculate after images load
useEffect(() => {
  const images = document.querySelectorAll('img');
  let loadedCount = 0;

  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length && window.locomotiveScroll) {
          window.locomotiveScroll.update();
        }
      };
    }
  });
}, []);
```

### 3. Route Change Optimization
```tsx
// The component automatically handles route changes
const pathname = usePathname();

useEffect(() => {
  // Scroll instance is recreated on route change
  // This ensures clean state for new pages
}, [pathname]);
```

## CSS Requirements

### Basic Smooth Scrolling Styles
```css
/* Enable hardware acceleration */
html.has-scroll-smooth {
  overflow: hidden;
}

html.has-scroll-dragging {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.has-scroll-smooth body {
  overflow: hidden;
}

.has-scroll-smooth [data-scroll-container] {
  min-height: 100vh;
}

/* Scrollbar styling */
[data-scroll-container]::-webkit-scrollbar {
  display: none;
}
```

## Best Practices

### 1. Data Attributes
- Use `data-scroll` on elements you want to animate
- Set appropriate `data-scroll-speed` values (-2 to 2 range)
- Use `data-scroll-direction` for specific scroll directions

### 2. Performance
- Don't animate too many elements simultaneously
- Use `will-change: transform` for frequently animated elements
- Optimize images and content that will be scrolled

### 3. Accessibility
- Provide option to disable smooth scrolling for users who prefer reduced motion
- Ensure keyboard navigation still works
- Test with screen readers

### 4. Mobile Considerations
- Test smooth scrolling on various mobile devices
- Consider disabling on low-end devices
- Ensure touch interactions work properly

## Troubleshooting

### Common Issues

1. **Scroll not working after route change**
   ```tsx
   // Check if pathname dependency is included
   useEffect(() => {
     // Scroll initialization
   }, [pathname]);
   ```

2. **GSAP ScrollTrigger conflicts**
   ```tsx
   // Ensure GSAP is properly configured with Locomotive
   ScrollTrigger.refresh();
   ```

3. **Content height calculation issues**
   ```tsx
   // Manually trigger update after content loads
   if (window.locomotiveScroll) {
     window.locomotiveScroll.update();
   }
   ```

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with some iOS quirks)
- Mobile browsers: Good support with touch events

## Related Components
- [`Hero`](./HERO.md) - Uses scroll-triggered animations
- [`Skills`](./SKILLS.md) - Implements scroll reveal effects
- [`Projects`](./PROJECTS.md) - Uses scroll-based interactions
- [GSAP Animations](./GSAP_ANIMATIONS.md) - Integration with scroll triggers
