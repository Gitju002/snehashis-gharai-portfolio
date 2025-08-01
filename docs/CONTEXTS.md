# Context System

A comprehensive guide to the context system used in the portfolio for managing global state, specifically navigation and loading states.

## Overview

The portfolio uses React Context API to manage two critical pieces of global state:
1. **Navigation Context** - Manages mobile navigation menu state
2. **Loading Context** - Manages application loading state and preloader visibility

## Navigation Context

### Location
- `contexts/NavigationContext.tsx`

### Purpose
Manages the state of the mobile navigation menu, allowing components throughout the app to know if the navigation is open or closed and control its state.

### Implementation

```tsx
import { useNavigationContext } from "@/contexts/NavigationContext";

const MyComponent = () => {
  const { isNavOpen, setIsNavOpen } = useNavigationContext();
  
  return (
    <button onClick={() => setIsNavOpen(!isNavOpen)}>
      {isNavOpen ? 'Close Menu' : 'Open Menu'}
    </button>
  );
};
```

### Features

#### 1. Type-Safe Context
```tsx
type NavigationContextType = {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
};
```

#### 2. Error Handling
```tsx
export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    );
  }
  return context;
};
```

#### 3. Provider Setup
```tsx
export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};
```

### Usage Examples

#### Header Component
```tsx
const Header = () => {
  const { isNavOpen, setIsNavOpen } = useNavigationContext();

  return (
    <header>
      <button onClick={() => setIsNavOpen(!isNavOpen)}>
        Menu
      </button>
      
      {isNavOpen && <MobileNavigation />}
    </header>
  );
};
```

#### Navigation Component
```tsx
const MobileNav = () => {
  const { isNavOpen, setIsNavOpen } = useNavigationContext();

  return (
    <motion.nav
      initial={{ x: "100%" }}
      animate={{ x: isNavOpen ? 0 : "100%" }}
    >
      <button onClick={() => setIsNavOpen(false)}>
        Close
      </button>
      {/* Navigation links */}
    </motion.nav>
  );
};
```

## Loading Context

### Location
- `contexts/LoadingContext.tsx`

### Purpose
Manages the application's loading state, controlling when the preloader is shown and when it's hidden. Integrates with the `usePageLoading` hook for comprehensive loading management.

### Implementation

```tsx
import { useLoadingContext } from "@/contexts/LoadingContext";

const MyComponent = () => {
  const { isLoading, hasLoadingCompleted } = useLoadingContext();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return <div>Content loaded!</div>;
};
```

### Features

#### 1. Type-Safe Interface
```tsx
interface LoadingContextType {
  isLoading: boolean;
  hasLoadingCompleted: boolean;
}
```

#### 2. Hook Integration
```tsx
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const { isLoading, hasLoadingCompleted } = usePageLoading({
    minLoadTime: 1500,    // Minimum loading time
    maxLoadTime: 5000,    // Maximum loading time
    imageTimeout: 3000,   // Image loading timeout
  });

  return (
    <LoadingContext.Provider value={{ isLoading, hasLoadingCompleted }}>
      {children}
    </LoadingContext.Provider>
  );
};
```

#### 3. Error Boundary
```tsx
export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};
```

### Loading States

#### 1. Initial Loading
- `isLoading: true`
- `hasLoadingCompleted: false`
- Preloader is visible

#### 2. Loading Complete
- `isLoading: false`
- `hasLoadingCompleted: true`
- Preloader hides, content becomes interactive

#### 3. Route Changes
- Loading states reset for new pages
- Preloader may reappear for heavy content

### Usage Examples

#### App Component
```tsx
function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading } = useLoadingContext();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      <ScrollWrapper>
        <Header />
        <Component {...pageProps} />
      </ScrollWrapper>
    </>
  );
}
```

#### Hero Component (Animation Trigger)
```tsx
const Hero = () => {
  const { hasLoadingCompleted, isLoading } = useLoadingContext();

  useGSAP(() => {
    // Only start animations after loading completes
    if (hasLoadingCompleted && !isLoading) {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5
      });
    }
  }, [hasLoadingCompleted, isLoading]);
};
```

## Provider Setup in _app.tsx

### Complete Integration
```tsx
// _app.tsx
import { LoadingProvider } from "@/contexts/LoadingContext";
import { NavigationProvider } from "@/contexts/NavigationContext";

export default function App(props: AppProps) {
  return (
    <LoadingProvider>
      <NavigationProvider>
        <AppContent {...props} />
      </NavigationProvider>
    </LoadingProvider>
  );
}

function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading } = useLoadingContext();
  
  return (
    <div className={`${dmSans.variable} ${testManuka.variable} antialiased`}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <ScrollWrapper>
        <Header />
        <Component {...pageProps} />
      </ScrollWrapper>

      <ScrollToTop />
    </div>
  );
}
```

## Advanced Usage Patterns

### 1. Conditional Rendering
```tsx
const ConditionalComponent = () => {
  const { isLoading, hasLoadingCompleted } = useLoadingContext();
  const { isNavOpen } = useNavigationContext();

  // Don't render heavy components during loading
  if (isLoading) return null;

  // Don't render background animations when nav is open
  if (isNavOpen) return <SimpleVersion />;

  return <FullFeaturedComponent />;
};
```

### 2. Animation Coordination
```tsx
const AnimatedSection = () => {
  const { hasLoadingCompleted } = useLoadingContext();
  const { isNavOpen } = useNavigationContext();

  useGSAP(() => {
    // Only animate after loading and when nav is closed
    if (hasLoadingCompleted && !isNavOpen) {
      gsap.from(".content", {
        opacity: 0,
        y: 50,
        duration: 1
      });
    }
  }, [hasLoadingCompleted, isNavOpen]);
};
```

### 3. Route-Based Loading
```tsx
const useRouteLoading = () => {
  const { isLoading } = useLoadingContext();
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setRouteLoading(true);
    const handleComplete = () => setRouteLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return {
    isLoading: isLoading || routeLoading,
    isRouteLoading: routeLoading
  };
};
```

## Best Practices

### 1. Context Composition
- Keep contexts focused on single responsibilities
- Use multiple providers for different concerns
- Avoid deeply nested context consumers

### 2. Performance Optimization
```tsx
// Minimize context re-renders by memoizing values
const NavigationProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const value = useMemo(() => ({
    isNavOpen,
    setIsNavOpen
  }), [isNavOpen]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
```

### 3. Error Handling
```tsx
// Always provide error boundaries
const SafeContextConsumer = () => {
  try {
    const { isNavOpen } = useNavigationContext();
    return <div>Nav is {isNavOpen ? 'open' : 'closed'}</div>;
  } catch (error) {
    return <div>Navigation context not available</div>;
  }
};
```

### 4. Testing
```tsx
// Provide test utilities
export const TestNavigationProvider = ({ 
  children, 
  initialNavState = false 
}) => {
  const [isNavOpen, setIsNavOpen] = useState(initialNavState);
  
  return (
    <NavigationContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};
```

## Common Patterns

### 1. Context + Hook Pattern
Each context has a corresponding hook that handles error checking and provides type safety.

### 2. Provider Composition
Multiple contexts are composed in the main app file for clean separation of concerns.

### 3. Loading Coordination
Loading context coordinates with various systems (images, routes, animations) for smooth user experience.

### 4. State Persistence
Navigation state resets on route changes, while loading state persists across the session.

## Troubleshooting

### 1. Context Not Available Error
```tsx
// Ensure component is wrapped in provider
<NavigationProvider>
  <MyComponent /> {/* Can use useNavigationContext */}
</NavigationProvider>
```

### 2. Loading State Stuck
```tsx
// Check usePageLoading configuration
const { isLoading } = usePageLoading({
  minLoadTime: 1500,  // Ensure reasonable minimum
  maxLoadTime: 5000,  // Ensure maximum timeout
});
```

### 3. Navigation State Not Updating
```tsx
// Verify state updates are called correctly
const handleToggle = useCallback(() => {
  setIsNavOpen(prev => !prev);
}, [setIsNavOpen]);
```

## Related Components
- [`PreLoader`](./PRELOADER.md) - Uses LoadingContext
- [`Header`](./HEADER.md) - Uses NavigationContext
- [`usePageLoading`](./USE_PAGE_LOADING.md) - Powers LoadingContext
- [App Structure](./APP_STRUCTURE.md) - Shows provider setup
