# App Structure & Component Organization

A comprehensive guide to the application structure, component organization, and how all pieces work together in the portfolio.

## Application Architecture

### Overall Structure

```
portfolio/
├── components/          # React components
├── contexts/           # Global state management
├── hooks/              # Custom React hooks
├── animations/         # Animation definitions
├── pages/              # Next.js pages
├── styles/             # Global styles
├── public/             # Static assets
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── docs/               # Documentation
```

## Main App Flow (`pages/_app.tsx`)

The application entry point that sets up providers, fonts, and global components.

```tsx
// _app.tsx - Application Structure
export default function App(props: AppProps) {
  return (
    <LoadingProvider>           {/* Loading state management */}
      <NavigationProvider>      {/* Navigation state management */}
        <AppContent {...props} />
      </NavigationProvider>
    </LoadingProvider>
  );
}

function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading } = useLoadingContext();

  return (
    <div className={`${dmSans.variable} ${testManuka.variable} antialiased`}>
      {/* Preloader - Shows until content loads */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Main application wrapper */}
      <ScrollWrapper>
        <Header />                {/* Global navigation */}
        <Component {...pageProps} /> {/* Page content */}
      </ScrollWrapper>

      <ScrollToTop />            {/* Scroll to top button */}
    </div>
  );
}
```

### Key Features:
1. **Provider Hierarchy**: Context providers for global state
2. **Font Loading**: Custom and Google fonts with optimization
3. **Conditional Rendering**: Preloader based on loading state
4. **Global Components**: Header and scroll utilities

## Homepage Structure (`pages/index.tsx`)

The main page that combines all portfolio sections.

```tsx
// index.tsx - Page Structure
export default function Home() {
  return (
    <>
      <Head>
        {/* SEO meta tags, Open Graph, Twitter cards */}
      </Head>

      {/* Main content sections */}
      <Hero />        {/* Hero section with name and title */}
      <About />       {/* About me section with text reveal */}
      <Skills />      {/* Skills grid with scroll animations */}
      <Projects />    {/* Projects showcase with modal */}
      <Experience />  {/* Work experience timeline */}
      <Footer />      {/* Contact information and links */}
    </>
  );
}
```

### Section Flow:
Each section is wrapped in `VStack` for vertical spacing and `Container` for horizontal padding:

```tsx
// Typical section structure
const SectionComponent = () => {
  return (
    <section id="section-name">
      <VStack>              {/* Vertical padding */}
        <Container>         {/* Horizontal padding */}
          {/* Section content */}
        </Container>
      </VStack>
    </section>
  );
};
```

## Component Organization

### Layout Components (`components/layout/`)

#### Container Component
- **Purpose**: Provides consistent X-axis padding
- **Usage**: Wraps content to prevent edge-to-edge layout
- **Responsive**: Scales padding based on screen size

#### VStack Component
- **Purpose**: Provides consistent Y-axis spacing
- **Usage**: Creates section separation
- **Responsive**: Different spacing for mobile/desktop

#### Grid System (`components/layout/grid/`)
- **Grid**: Main grid container with responsive columns
- **GridItem**: Individual grid items with flexible sizing

### Navigation Components (`components/navigation/`)

#### Header Component
- **Sticky Navigation**: Always visible at top
- **Responsive**: Different layouts for mobile/desktop
- **State Management**: Uses NavigationContext

#### Nav Component
- **Mobile Menu**: Slide-out navigation
- **Animations**: Framer Motion slide animations
- **Context Integration**: Controlled by NavigationContext

#### Link Component
- **Animated Links**: Hover effects and transitions
- **Smooth Scrolling**: Integrates with Locomotive Scroll

#### Curve Component
- **SVG Animations**: Curved background for navigation
- **Dynamic**: Responds to navigation state

### UI Components (`components/ui/`)

#### ScrollWrapper
- **Global Scroll**: Initializes Locomotive Scroll
- **Performance**: Handles cleanup and reinitialization
- **Integration**: Works with GSAP ScrollTrigger

#### TextReveal
- **Text Animations**: Reveals text letter by letter
- **Reusable**: Hook-based implementation
- **Customizable**: Various animation options

#### Magnetic
- **Hover Effects**: Magnetic attraction effect
- **GSAP Powered**: Smooth magnetic animations
- **Interactive**: Responds to mouse movement

#### CircleButton & SwitchButton
- **Interactive Elements**: Animated buttons
- **Hover States**: GSAP-powered interactions
- **Accessibility**: Proper focus states

### Project Components (`components/project/`)

#### ProjectCard
- **Individual Projects**: Displays project information
- **Hover Effects**: Image scaling and overlay
- **Interactive**: Triggers modal on interaction

#### Modal
- **Project Details**: Detailed project information
- **Cursor Following**: Follows mouse movement
- **GSAP Animations**: Smooth show/hide transitions

#### ProjectDetails
- **Content Display**: Project descriptions and links
- **Responsive**: Adapts to different screen sizes

## Context System

### LoadingContext
```tsx
// Global loading state management
const LoadingProvider = ({ children }) => {
  const { isLoading, hasLoadingCompleted } = usePageLoading({
    minLoadTime: 1500,
    maxLoadTime: 5000,
    imageTimeout: 3000,
  });

  return (
    <LoadingContext.Provider value={{ isLoading, hasLoadingCompleted }}>
      {children}
    </LoadingContext.Provider>
  );
};
```

**Used by:**
- `Preloader` - Controls visibility
- `Hero` - Delays animations
- Various components - Coordinates timing

### NavigationContext
```tsx
// Navigation state management
const NavigationProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};
```

**Used by:**
- `Header` - Toggle button
- `Nav` - Menu visibility
- Other components - Disable features when nav is open

## Custom Hooks

### useMediaQuery
```tsx
// Responsive design utilities
const { 
  isMobile,         // < 768px
  isTablet,         // 768px - 1023px  
  isDesktop,        // >= 1024px
  width,            // Current screen width
  height,           // Current screen height
  isAbove,          // Check if above breakpoint
  isBelow           // Check if below breakpoint
} = useMediaQuery();
```

**Usage Pattern:**
```tsx
const MyComponent = () => {
  const { isDesktop, isMobile } = useMediaQuery();

  return (
    <>
      {isDesktop && <DesktopLayout />}
      {isMobile && <MobileLayout />}
    </>
  );
};
```

### usePageLoading
```tsx
// Advanced loading state management
const { 
  isLoading,              // Currently loading
  hasLoadingCompleted,    // Loading finished
  isInitialLoad          // First page load
} = usePageLoading({
  minLoadTime: 1500,     // Minimum loading time
  maxLoadTime: 5000,     // Maximum loading time
  imageTimeout: 3000,    // Image loading timeout
});
```

## Animation System Integration

### GSAP Integration
- **useGSAP Hook**: React integration with automatic cleanup
- **ScrollTrigger**: Scroll-based animations
- **Timeline Management**: Coordinated animation sequences

### Framer Motion Integration
- **Component Animations**: Enter/exit animations
- **Page Transitions**: Smooth page changes
- **Gesture Handling**: Touch and mouse interactions

### Animation Coordination
```tsx
const AnimatedComponent = () => {
  const { hasLoadingCompleted } = useLoadingContext();
  const { isDesktop } = useMediaQuery();

  useGSAP(() => {
    // Only animate after loading completes
    if (hasLoadingCompleted) {
      const timeline = gsap.timeline();
      
      if (isDesktop) {
        // Complex desktop animations
      } else {
        // Simplified mobile animations
      }
    }
  }, [hasLoadingCompleted, isDesktop]);
};
```

## State Management Flow

### 1. Initial Load
```
App Loads → LoadingProvider → usePageLoading → 
Image Detection → Timer Management → Loading Complete → 
Preloader Exit → Content Animations Start
```

### 2. Navigation Interaction
```
User Clicks Menu → NavigationContext → Header Updates → 
Nav Component Animates → Background Interactions Pause
```

### 3. Scroll Interaction
```
User Scrolls → Locomotive Scroll → GSAP ScrollTrigger → 
Section Animations → Text Reveals → Image Parallax
```

### 4. Responsive Changes
```
Screen Resize → useMediaQuery → Components Re-render → 
Animation Adjustments → Layout Updates
```

## Performance Optimizations

### 1. Component Lazy Loading
```tsx
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Client-side only if needed
});
```

### 2. Animation Performance
```tsx
// Conditional animations based on device capabilities
const { isDesktop } = useMediaQuery();

useGSAP(() => {
  if (isDesktop) {
    // Complex animations for desktop
  } else {
    // Simplified animations for mobile
  }
}, [isDesktop]);
```

### 3. Memory Management
- **useGSAP**: Automatic animation cleanup
- **Event Listeners**: Proper cleanup in useEffect
- **Context Optimization**: Memoized context values

## File Organization Best Practices

### 1. Component Co-location
```
components/
├── Hero/
│   ├── index.tsx       # Main component
│   ├── Hero.types.ts   # TypeScript types
│   └── Hero.module.css # Component styles (if needed)
```

### 2. Index Files for Clean Imports
```tsx
// components/index.ts
export { default as Hero } from './Hero';
export { default as About } from './About';
export { default as Skills } from './Skills';

// Usage
import { Hero, About, Skills } from '@/components';
```

### 3. Type Definitions
```tsx
// types/index.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
}
```

## Development Workflow

### 1. Component Development
1. Create component in appropriate folder
2. Add TypeScript interfaces
3. Implement responsive behavior
4. Add animations if needed
5. Test across devices
6. Document component usage

### 2. Adding New Sections
1. Create section component
2. Add to main page
3. Update navigation if needed
4. Add scroll triggers
5. Test animations and performance

### 3. Performance Monitoring
1. Check Core Web Vitals
2. Monitor bundle size
3. Test on various devices
4. Optimize animations
5. Review loading times

## Related Documentation
- [`Container`](./CONTAINER.md) - Layout component details
- [`VStack`](./VSTACK.md) - Spacing component details
- [`Contexts`](./CONTEXTS.md) - State management details
- [`Hooks`](./HOOKS.md) - Custom hook implementations
- [`Animations`](./ANIMATIONS.md) - Animation system details
