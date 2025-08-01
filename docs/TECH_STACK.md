# Technology Stack

A comprehensive overview of the technologies, libraries, and tools used in the portfolio project.

## Core Technologies

### Next.js (v15.3.5)
- **Framework**: React-based full-stack framework
- **Router**: Pages Router (not App Router)
- **Features Used**:
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - API Routes for sitemap and robots.txt
  - Image optimization
  - Font optimization
  - TypeScript support

**Why Next.js?**
- SEO optimization out of the box
- Performance optimizations (image loading, code splitting)
- Developer experience with hot reloading
- Production-ready with minimal configuration

### React (v19.0.0)
- **UI Library**: Component-based architecture
- **Hooks Used**:
  - `useState`, `useEffect`, `useRef`
  - `useCallback`, `useMemo`
  - `useContext` for global state
  - Custom hooks for reusable logic

### TypeScript (v5)
- **Type Safety**: Full TypeScript implementation
- **Benefits**:
  - Compile-time error checking
  - Better IDE support and autocomplete
  - Interface definitions for props and data
  - Enhanced refactoring capabilities

## Styling & UI

### Tailwind CSS (v4)
- **Utility-First CSS**: Modern styling approach
- **Features Used**:
  - Responsive design utilities
  - Custom color schemes
  - Typography scaling
  - Grid and flexbox layouts
  - Animation utilities

**Configuration:**
```typescript
// Custom breakpoints and utilities
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['var(--font-dm-sans)'],
        'test-manuka': ['var(--font-test-manuka)']
      },
      screens: {
        '3xl': '1728px',
        '4xl': '1920px',
        '5xl': '2560px'
      }
    }
  }
}
```

### Custom Fonts
1. **DM Sans** (Google Fonts)
   - Variable font with display: swap
   - Used for body text and UI elements
   - Optimized loading with Next.js font optimization

2. **Test Manuka** (Local Font)
   - Custom display font for headings
   - Regular (400) and Bold (700) weights
   - Loaded via next/font/local

## Animation Libraries

### GSAP (GreenSock) v3.13.0
- **High-Performance Animations**: Industry-standard animation library
- **Plugins Used**:
  - `@gsap/react` (v2.1.2) - React integration
  - `ScrollTrigger` - Scroll-based animations
- **Use Cases**:
  - Complex timeline animations
  - Scroll-triggered reveals
  - Cursor-following effects
  - SVG morphing and transforms

**Example Implementation:**
```typescript
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.from(".animate-element", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".animate-element",
      start: "top 80%"
    }
  });
}, []);
```

### Framer Motion (v12.23.6)
- **React Animation Library**: Declarative animations
- **Use Cases**:
  - Page transitions
  - Component mount/unmount animations
  - Gesture-based interactions
  - SVG path animations

**Example Implementation:**
```typescript
import { motion, Variants } from "framer-motion";

const slideVariants: Variants = {
  initial: { x: "100%" },
  animate: { 
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};

<motion.div variants={slideVariants} initial="initial" animate="animate">
  Content
</motion.div>
```

## Smooth Scrolling

### Locomotive Scroll (v5.0.0-beta.21)
- **Advanced Smooth Scrolling**: Hardware-accelerated smooth scrolling
- **Features**:
  - Parallax effects
  - Speed-based animations
  - Direction detection
  - Mobile touch support
  - Integration with GSAP ScrollTrigger

**Implementation:**
```typescript
import LocomotiveScroll from "locomotive-scroll";

const locomotiveScroll = new LocomotiveScroll({
  el: containerRef.current,
  smooth: true,
  smoothMobile: true,
  lerp: 0.1
});

// Data attributes for elements
<div data-scroll data-scroll-speed="0.5">
  Parallax element
</div>
```

## Utility Libraries

### clsx (v2.1.1)
- **Conditional Class Names**: Clean className composition
```typescript
import clsx from "clsx";

const buttonClass = clsx(
  'base-button',
  isActive && 'active',
  isDisabled && 'disabled'
);
```

### tailwind-merge (v3.3.1)
- **Tailwind Class Merging**: Intelligent class conflict resolution
```typescript
import { cn } from "@/lib/utils";

const merged = cn(
  'px-4 py-2',    // Base classes
  'px-6',         // Override: px-6 wins over px-4
  className       // User classes take precedence
);
```

## Development Tools

### ESLint (v9)
- **Code Linting**: Code quality and consistency
- **Configuration**: Next.js ESLint config with custom rules
- **Integration**: Real-time linting in VS Code

### PostCSS & Tailwind
- **CSS Processing**: Modern CSS toolchain
- **@tailwindcss/postcss** (v4): Latest Tailwind processing

### TypeScript Types
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions
- **@types/locomotive-scroll**: Locomotive Scroll types

## Project Structure

### Architecture Patterns

1. **Component-Based Architecture**
   ```
   components/
   ├── layout/          # Layout components (Container, VStack)
   ├── navigation/      # Navigation components
   ├── project/         # Project-specific components
   └── ui/              # Reusable UI components
   ```

2. **Custom Hooks Pattern**
   ```
   hooks/
   ├── media-query.ts   # Responsive utilities
   └── use-page-loading.ts # Loading state management
   ```

3. **Context Pattern**
   ```
   contexts/
   ├── LoadingContext.tsx     # Global loading state
   └── NavigationContext.tsx  # Navigation state
   ```

4. **Animation Organization**
   ```
   animations/
   ├── nav-anim.ts         # Navigation animations
   ├── preloader-anim.ts   # Preloader animations
   └── text-reveal-anim.ts # Text reveal utilities
   ```

### Pages Structure
```
pages/
├── _app.tsx        # App wrapper with providers
├── _document.tsx   # HTML document structure
├── index.tsx       # Homepage with all sections
├── contact/        # Contact page
└── api/           # API routes for SEO
```

## Performance Optimizations

### 1. Image Optimization
- Next.js Image component with lazy loading
- Responsive images with multiple sizes
- WebP format with fallbacks

### 2. Font Optimization
- Variable fonts for smaller file sizes
- Font display: swap for faster rendering
- Preloading critical fonts

### 3. Code Splitting
- Automatic code splitting by Next.js
- Dynamic imports for heavy components
- Lazy loading of non-critical features

### 4. Animation Performance
- Hardware acceleration with CSS transforms
- GSAP's optimized animation engine
- Conditional animations based on device capabilities

## Build & Deployment

### Scripts
```json
{
  "dev": "next dev --turbopack",     // Development with Turbopack
  "build": "next build",             // Production build
  "start": "next start",             // Production server
  "lint": "next lint"                // Code linting
}
```

### Build Optimizations
- **Turbopack**: Next.js's faster bundler for development
- **Static Generation**: Pre-built pages for better performance
- **Image Optimization**: Automatic image optimization and resizing
- **Tree Shaking**: Unused code elimination

## Browser Support

### Modern Browser Features
- **CSS Grid & Flexbox**: Layout systems
- **CSS Custom Properties**: Dynamic theming
- **ES6+ Features**: Modern JavaScript
- **WebP Images**: Modern image formats
- **Intersection Observer**: Scroll detection

### Polyfills & Fallbacks
- Automatic polyfills via Next.js
- Graceful degradation for older browsers
- Progressive enhancement approach

## Development Environment

### Required Node.js Version
- **Node.js**: v18+ recommended
- **npm/yarn**: Package management
- **TypeScript**: v5 for type checking

### VS Code Extensions (Recommended)
- Tailwind CSS IntelliSense
- TypeScript Hero
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier - Code formatter

### Environment Variables
```bash
NODE_ENV=development          # Development mode
NEXT_PUBLIC_SITE_URL=...     # Public site URL
```

## Future Considerations

### Potential Upgrades
1. **Next.js App Router**: Migration to newer routing system
2. **React Server Components**: Better performance
3. **Tailwind v4**: When stable release is available
4. **Three.js**: 3D animations and interactions
5. **Framer Motion Layout**: Advanced layout animations

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: Regular bundle size monitoring
- **Performance Audits**: Lighthouse scoring
- **Real User Monitoring**: User experience tracking

## Learning Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Locomotive Scroll Documentation](https://locomotivemtl.github.io/locomotive-scroll/)

### Best Practices Followed
1. **Semantic HTML**: Proper HTML structure for accessibility
2. **Progressive Enhancement**: Works without JavaScript
3. **Mobile-First Design**: Responsive from small screens up
4. **Performance Budget**: Optimized asset sizes
5. **SEO Optimization**: Meta tags, structured data, sitemaps
