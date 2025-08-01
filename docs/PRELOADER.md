# PreLoader Component

A sophisticated loading screen component that displays animated greeting words in multiple languages while the website content loads. Built with Framer Motion for smooth animations and morphing SVG shapes.

## Location
- `components/PreLoader.tsx`

## Purpose
The PreLoader component creates an engaging loading experience by:
1. Showing animated greeting words in different languages
2. Using morphing SVG animations for visual appeal
3. Covering the entire screen until all website content is loaded
4. Automatically hiding when loading is complete

## Tech Stack
- **React**: Core component framework
- **TypeScript**: Type safety and interface definitions
- **Framer Motion**: Animation library for smooth transitions
- **SVG**: Vector graphics for morphing animations
- **Custom Animations**: Predefined animation variants from `animations/preloader-anim.ts`

## Usage

### Basic Implementation (Already configured in _app.tsx)
```tsx
import Preloader from "@/components/PreLoader";
import { useLoadingContext } from "@/contexts/LoadingContext";

const App = () => {
  const { isLoading } = useLoadingContext();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {/* Your app content */}
    </>
  );
};
```

## Features

### 1. Multi-language Greetings
The component cycles through greetings in 10 different languages:

```typescript
const words = [
  "Hello",      // English
  "নমস্কার",      // Bengali
  "नमस्ते",       // Hindi
  "Ciao",       // Italian
  "Olà",        // Portuguese
  "やあ",        // Japanese
  "Hola",       // Spanish
  "你好",        // Chinese
  "안녕하세요",      // Korean
  "Bonjour",    // French
];
```

### 2. Responsive Design
```tsx
// Automatically adapts to screen dimensions
useEffect(() => {
  setDimension({ width: window.innerWidth, height: window.innerHeight });
}, []);
```

### 3. Dynamic SVG Morphing
Creates complex wave patterns and geometric shape transformations:

```tsx
// Wave pattern that morphs during exit
const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} 
                     Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;

const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} 
                    Q${dimension.width / 6} ${dimension.height} 0 ${dimension.height} L0 0`;
```

## Animation Sequence

### 1. Word Animation
- **Initial**: First word ("Hello") displays for 1000ms
- **Subsequent**: Each word changes every 200ms
- **Final**: Stops at the last word ("Bonjour")

### 2. Exit Animation
```tsx
// Triggered when loading completes
const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};
```

### 3. Background Animation
```tsx
// Opacity animation for the background
const opacity: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 }
  }
};
```

## Example Implementation

### Complete Setup
```tsx
// _app.tsx
import { LoadingProvider, useLoadingContext } from "@/contexts/LoadingContext";
import Preloader from "@/components/PreLoader";
import { AnimatePresence } from "framer-motion";

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

export default function App(props: AppProps) {
  return (
    <LoadingProvider>
      <NavigationProvider>
        <AppContent {...props} />
      </NavigationProvider>
    </LoadingProvider>
  );
}
```

### Custom Loading Integration
```tsx
// If you want to trigger preloader manually
import { useLoadingContext } from "@/contexts/LoadingContext";

const MyComponent = () => {
  const { isLoading, hasLoadingCompleted } = useLoadingContext();

  // The preloader will show when isLoading is true
  // and hide when hasLoadingCompleted becomes true
};
```

## SVG Animations

### 1. Wave Morphing
```tsx
// Complex wave pattern with bezier curves
<motion.path
  variants={curve}
  initial="initial"
  exit="exit"
  d={initialPath}
/>
```

### 2. Circle to Square Transformation
```tsx
// Morphs from circle to square shape
const circleToSquare = {
  initial: {
    d: `M${dimension.width / 2 - 50} ${dimension.height / 2} 
        C${dimension.width / 2 - 50} ${dimension.height / 2 - 50} 
        ${dimension.width / 2 + 50} ${dimension.height / 2 - 50} 
        ${dimension.width / 2 + 50} ${dimension.height / 2}`
  },
  exit: {
    d: `M${dimension.width / 2 - 100} ${dimension.height / 2 - 100} 
        L${dimension.width / 2 + 100} ${dimension.height / 2 - 100} 
        L${dimension.width / 2 + 100} ${dimension.height / 2 + 100} 
        L${dimension.width / 2 - 100} ${dimension.height / 2 + 100} Z`
  }
};
```

## Styling

### Container Styles
```tsx
// Fixed positioning to cover entire screen
<motion.div 
  variants={slideUp} 
  initial="initial" 
  exit="exit" 
  className="introduction"
>
```

### CSS (in globals.css)
```css
.introduction {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #141516;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Word Styling
```tsx
<p className="words">
  <span className="word">{words[index]}</span>
</p>
```

## Integration with LoadingContext

The PreLoader automatically integrates with the LoadingContext system:

### 1. Shows when loading starts
```tsx
const { isLoading } = useLoadingContext();
// isLoading = true triggers preloader display
```

### 2. Hides when loading completes
```tsx
// LoadingContext manages:
// - Image loading detection
// - Minimum loading time (1500ms)
// - Maximum loading time (5000ms)
// - Content readiness checking
```

## Customization Options

### 1. Change Languages
```tsx
const words = [
  "Welcome",
  "Bienvenido", 
  "Willkommen",
  // Add your preferred languages
];
```

### 2. Adjust Timing
```tsx
useEffect(() => {
  if (index == words.length - 1) return;
  setTimeout(() => {
    setIndex(index + 1);
  }, index == 0 ? 2000 : 300); // First word: 2s, others: 300ms
}, [index]);
```

### 3. Custom Animations
```tsx
// Modify animations in animations/preloader-anim.ts
export const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { 
      duration: 1.2,  // Slower exit
      ease: [0.83, 0, 0.17, 1]  // Different easing
    }
  }
};
```

## Performance Considerations

### 1. Automatic Cleanup
- Component unmounts when loading completes
- SVG animations are cleaned up automatically
- Event listeners are properly removed

### 2. Responsive Calculations
- Dimensions are calculated once on mount
- SVG paths adapt to screen size
- Minimal re-renders during animation

### 3. Optimized Animations
- Uses Framer Motion's optimized animation engine
- Hardware-accelerated transforms
- Efficient SVG path interpolation

## Best Practices

1. **Keep It Short**: Don't make loading times artificially long
2. **Test on Slow Connections**: Ensure it works well on slow networks
3. **Accessible**: Consider users who prefer reduced motion
4. **Branded**: Customize colors and animations to match your brand
5. **Informative**: The multi-language approach shows global awareness

## Troubleshooting

### Common Issues

1. **Preloader doesn't hide**
   ```tsx
   // Check LoadingContext configuration
   const { isLoading, hasLoadingCompleted } = useLoadingContext();
   console.log({ isLoading, hasLoadingCompleted });
   ```

2. **SVG not rendering properly**
   ```tsx
   // Ensure dimensions are set
   useEffect(() => {
     setDimension({ width: window.innerWidth, height: window.innerHeight });
   }, []);
   ```

3. **Animation not smooth**
   ```tsx
   // Check for performance issues, consider reducing animation complexity
   // on lower-end devices
   ```

## Related Components
- [`LoadingContext`](./LOADING_CONTEXT.md) - Manages loading state
- [`ScrollWrapper`](./SCROLL_WRAPPER.md) - Handles post-loading scroll initialization
- [Animation Files](./ANIMATIONS.md) - Contains animation variants
