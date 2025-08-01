# Hooks System

A comprehensive guide to the custom hooks used in the portfolio for responsive design and loading state management.

## Overview

The portfolio uses two main custom hooks:
1. **useMediaQuery** - Responsive screen detection and breakpoint utilities
2. **usePageLoading** - Advanced loading state management with image detection

## useMediaQuery Hook

### Location
- `hooks/media-query.ts`

### Purpose
Provides responsive utilities and screen dimension detection for creating adaptive user interfaces. Works seamlessly with Tailwind CSS breakpoints.

### Implementation

```tsx
import { useMediaQuery } from "@/hooks/media-query";

const MyComponent = () => {
  const { isMobile, isDesktop, width, height } = useMediaQuery();
  
  return (
    <div>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      <p>Screen: {width}x{height}</p>
    </div>
  );
};
```

### Features

#### 1. Screen Dimensions
```tsx
const { width, height } = useMediaQuery();

// Real-time screen dimensions
console.log(`Screen size: ${width}x${height}`);
```

#### 2. Predefined Breakpoints
```tsx
const {
  isMobile,          // < 768px
  isTablet,          // 768px - 1023px
  isDesktop,         // ≥ 1024px
  isSmallScreen,     // < 640px
  isMediumScreen,    // 640px - 767px
  isLargeScreen,     // 1024px - 1279px
  isExtraLargeScreen,    // 1280px - 1535px
  is2ExtraLargeScreen    // ≥ 1536px
} = useMediaQuery();
```

#### 3. Utility Functions
```tsx
const { isAbove, isBelow } = useMediaQuery();

// Check if screen is above a specific breakpoint
const isLargerThanTablet = isAbove('md'); // ≥ 768px
const isSmallerThanDesktop = isBelow('lg'); // < 1024px
```

### Breakpoint Configuration

```typescript
const breakpoints = {
  sm: 640,     // Small devices
  md: 768,     // Medium devices (tablets)
  lg: 1024,    // Large devices (desktops)
  xl: 1280,    // Extra large devices
  "2xl": 1536, // 2X Extra large devices
} as const;
```

### Usage Examples

#### 1. Responsive Component Rendering
```tsx
const Hero = () => {
  const { isDesktop, isMobile } = useMediaQuery();

  return (
    <section>
      {isDesktop && (
        <div className="desktop-hero">
          <h1 className="text-8xl">Large Desktop Title</h1>
        </div>
      )}
      
      {isMobile && (
        <div className="mobile-hero">
          <h1 className="text-4xl">Mobile Title</h1>
        </div>
      )}
    </section>
  );
};
```

#### 2. Conditional Animations
```tsx
const AnimatedComponent = () => {
  const { isDesktop } = useMediaQuery();

  useGSAP(() => {
    if (isDesktop) {
      // Complex desktop animations
      gsap.from(".desktop-element", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2
      });
    } else {
      // Simpler mobile animations
      gsap.from(".mobile-element", {
        opacity: 0,
        duration: 0.5
      });
    }
  }, [isDesktop]);
};
```

#### 3. Dynamic Grid Layouts
```tsx
const ProjectGrid = () => {
  const { isAbove, isBelow } = useMediaQuery();

  const gridCols = useMemo(() => {
    if (isAbove('2xl')) return 4;
    if (isAbove('lg')) return 3;
    if (isAbove('md')) return 2;
    return 1;
  }, [isAbove]);

  return (
    <div 
      className="grid gap-6"
      style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
    >
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

#### 4. Performance Optimization
```tsx
const HeavyComponent = () => {
  const { isDesktop } = useMediaQuery();

  // Only render expensive components on desktop
  if (!isDesktop) {
    return <LightweightMobileVersion />;
  }

  return (
    <div>
      <ExpensiveAnimations />
      <HighResolutionImages />
      <ComplexInteractions />
    </div>
  );
};
```

## usePageLoading Hook

### Location
- `hooks/use-page-loading.ts`

### Purpose
Manages comprehensive loading states including image loading detection, minimum/maximum load times, and route change handling for smooth user experience.

### Implementation

```tsx
import { usePageLoading } from "@/hooks/use-page-loading";

const App = () => {
  const { isLoading, hasLoadingCompleted } = usePageLoading({
    minLoadTime: 2000,    // Minimum 2 seconds
    maxLoadTime: 8000,    // Maximum 8 seconds
    imageTimeout: 4000,   // Image timeout after 4 seconds
  });

  return (
    <>
      {isLoading && <Preloader />}
      <MainContent />
    </>
  );
};
```

### Configuration Options

```typescript
interface UsePageLoadingOptions {
  minLoadTime?: number;      // Default: 1500ms
  maxLoadTime?: number;      // Default: 5000ms
  imageTimeout?: number;     // Default: 3000ms
  onLoadingComplete?: () => void;  // Callback when loading finishes
}
```

### Features

#### 1. Image Loading Detection
```typescript
// Automatically detects and waits for all images to load
const images = document.querySelectorAll("img");
const imagePromises = Array.from(images).map((img) => {
  if (img.complete && img.naturalHeight !== 0) {
    return Promise.resolve("already-loaded");
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve("timeout"), imageTimeout);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve("loaded");
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve("error");
    };
  });
});
```

#### 2. Route Change Handling
```typescript
const router = useRouter();

useEffect(() => {
  const handleRouteChangeStart = () => {
    setIsLoading(true);
    setHasLoadingCompleted(false);
  };

  const handleRouteChangeComplete = () => {
    // Loading logic starts here
  };

  router.events.on('routeChangeStart', handleRouteChangeStart);
  router.events.on('routeChangeComplete', handleRouteChangeComplete);
}, [router]);
```

#### 3. Timing Controls
```typescript
// Ensures minimum loading time for smooth UX
const elapsedTime = Date.now() - startTime;
const remainingMinTime = Math.max(0, minLoadTime - elapsedTime);

setTimeout(() => {
  setIsLoading(false);
  setHasLoadingCompleted(true);
}, remainingMinTime);
```

### Usage Examples

#### 1. Basic Loading Management
```tsx
const LoadingProvider = () => {
  const { isLoading, hasLoadingCompleted } = usePageLoading();

  return (
    <LoadingContext.Provider value={{ isLoading, hasLoadingCompleted }}>
      {children}
    </LoadingContext.Provider>
  );
};
```

#### 2. Custom Loading Configuration
```tsx
const CustomLoadingApp = () => {
  const { isLoading, isInitialLoad } = usePageLoading({
    minLoadTime: 3000,     // Longer minimum for brand impact
    maxLoadTime: 10000,    // Longer maximum for slow connections
    imageTimeout: 5000,    // More time for high-res images
    onLoadingComplete: () => {
      console.log("Loading complete!");
      // Analytics tracking
    }
  });
};
```

#### 3. Animation Coordination
```tsx
const Hero = () => {
  const { hasLoadingCompleted, isLoading } = usePageLoading();

  useGSAP(() => {
    // Wait for loading to complete before animating
    if (hasLoadingCompleted && !isLoading) {
      gsap.timeline()
        .from(".hero-title", { y: 100, opacity: 0, duration: 1 })
        .from(".hero-subtitle", { y: 50, opacity: 0, duration: 0.8 }, "-=0.5");
    }
  }, [hasLoadingCompleted, isLoading]);
};
```

#### 4. Loading State Monitoring
```tsx
const LoadingDebugger = () => {
  const { 
    isLoading, 
    hasLoadingCompleted, 
    isInitialLoad 
  } = usePageLoading();

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-2 text-xs">
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Completed: {hasLoadingCompleted ? 'Yes' : 'No'}</div>
      <div>Initial: {isInitialLoad ? 'Yes' : 'No'}</div>
    </div>
  );
};
```

## Advanced Patterns

### 1. Responsive Animations
```tsx
const ResponsiveAnimations = () => {
  const { isDesktop, isMobile } = useMediaQuery();
  const { hasLoadingCompleted } = usePageLoading();

  useGSAP(() => {
    if (!hasLoadingCompleted) return;

    const timeline = gsap.timeline();

    if (isDesktop) {
      timeline
        .from(".desktop-hero", { scale: 0.8, opacity: 0, duration: 1 })
        .from(".desktop-nav", { y: -100, opacity: 0, duration: 0.8 }, "-=0.5");
    } else {
      timeline
        .from(".mobile-hero", { y: 50, opacity: 0, duration: 0.6 })
        .from(".mobile-nav", { y: -30, opacity: 0, duration: 0.5 }, "-=0.3");
    }
  }, [isDesktop, isMobile, hasLoadingCompleted]);
};
```

### 2. Conditional Hook Usage
```tsx
const useConditionalAnimations = () => {
  const { isDesktop } = useMediaQuery();
  const { hasLoadingCompleted } = usePageLoading();

  return useMemo(() => {
    if (!hasLoadingCompleted) return { animate: false };
    
    return {
      animate: true,
      duration: isDesktop ? 1 : 0.5,
      stagger: isDesktop ? 0.2 : 0.1,
      complexity: isDesktop ? 'high' : 'low'
    };
  }, [isDesktop, hasLoadingCompleted]);
};
```

### 3. Performance Monitoring
```tsx
const usePerformanceOptimization = () => {
  const { width, isDesktop } = useMediaQuery();
  const { isLoading } = usePageLoading();

  return useMemo(() => ({
    enableComplexAnimations: isDesktop && !isLoading,
    enableParallax: width > 1200 && !isLoading,
    enableParticles: isDesktop && width > 1400,
    maxImages: isDesktop ? 20 : 10,
    imageQuality: isDesktop ? 'high' : 'medium'
  }), [width, isDesktop, isLoading]);
};
```

## Performance Considerations

### 1. Debounced Resize Handling
```typescript
// useMediaQuery automatically debounces resize events
const handleResize = useCallback(
  debounce(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 100),
  []
);
```

### 2. Memory Management
```typescript
// Cleanup event listeners on unmount
useEffect(() => {
  const handleResize = () => {
    // Update dimensions
  };

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### 3. SSR Compatibility
```typescript
// Handle server-side rendering
const [dimensions, setDimensions] = useState({
  width: 0,
  height: 0,
});

useEffect(() => {
  // Only run on client side
  if (typeof window !== 'undefined') {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
}, []);
```

## Best Practices

### 1. Hook Composition
```tsx
const useResponsiveLoading = () => {
  const mediaQuery = useMediaQuery();
  const pageLoading = usePageLoading({
    minLoadTime: mediaQuery.isMobile ? 1000 : 1500,
    maxLoadTime: mediaQuery.isMobile ? 3000 : 5000,
  });

  return {
    ...mediaQuery,
    ...pageLoading,
    shouldShowComplexUI: mediaQuery.isDesktop && pageLoading.hasLoadingCompleted
  };
};
```

### 2. Memoization
```tsx
const optimizedBreakpoints = useMemo(() => ({
  isMobile: !isAbove('md'),
  isTablet: isAbove('md') && isBelow('lg'),
  isDesktop: isAbove('lg')
}), [isAbove, isBelow]);
```

### 3. Error Handling
```tsx
const safeUseMediaQuery = () => {
  try {
    return useMediaQuery();
  } catch (error) {
    console.warn('Media query failed, using defaults');
    return {
      width: 1024,
      height: 768,
      isMobile: false,
      isDesktop: true,
      // ... other defaults
    };
  }
};
```

## Related Components
- [`Hero`](./HERO.md) - Uses both hooks for responsive animations
- [`Container`](./CONTAINER.md) - Could benefit from media query integration
- [`PreLoader`](./PRELOADER.md) - Controlled by usePageLoading
- [`LoadingContext`](./CONTEXTS.md) - Wraps usePageLoading
