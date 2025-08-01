# VStack Component

A responsive vertical spacing component that provides consistent Y-axis (vertical) padding across different screen sizes using Tailwind CSS.

## Location
- `components/layout/VStack.tsx`

## Purpose
The VStack component serves as a vertical spacing wrapper that provides Y-axis (vertical) padding to create consistent section spacing throughout your application. It's commonly used to separate different sections of a page.

## Tech Stack
- **React**: Core component framework
- **TypeScript**: Type safety and interface definitions
- **Tailwind CSS**: Responsive padding utilities
- **forwardRef**: Allows parent components to access the DOM element

## Usage

### Basic Usage
```tsx
import VStack from "@/components/layout/VStack";

const MySection = () => {
  return (
    <VStack>
      <h2>Section Title</h2>
      <p>Section content with vertical padding</p>
    </VStack>
  );
};
```

### With Container (Common Pattern)
```tsx
import Container from "@/components/layout/Container";
import VStack from "@/components/layout/VStack";

const AboutSection = () => {
  return (
    <section>
      <VStack>
        <Container>
          <h2>About Me</h2>
          <p>Content with both vertical and horizontal padding</p>
        </Container>
      </VStack>
    </section>
  );
};
```

### Without Padding
```tsx
// Disable default padding
<VStack padding={false}>
  <div className="py-4">Custom vertical spacing</div>
</VStack>

// Or use "none" (same as false)
<VStack padding="none">
  <div>No vertical padding</div>
</VStack>
```

### With Ref
```tsx
import { useRef } from "react";

const MyComponent = () => {
  const vstackRef = useRef<HTMLDivElement>(null);

  return (
    <VStack ref={vstackRef} className="bg-gray-50">
      <p>Content with ref access for animations</p>
    </VStack>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | **Required.** Content to be wrapped |
| `padding` | `true \| false \| "none"` | `true` | Controls vertical padding |
| `className` | `string` | - | Additional CSS classes |

## Responsive Padding Scale

When `padding={true}` (default), the component applies these responsive vertical paddings:

| Breakpoint | Screen Size | Padding | Pixels (approx) |
|------------|-------------|---------|-----------------|
| Default | < 1024px | `py-8` | 32px top/bottom |
| `lg:` | ≥ 1024px | `py-24` | 96px top/bottom |

## Features

### 1. Smart Class Merging
```tsx
// If you provide custom vertical padding, it overrides the default
<VStack className="py-2">
  <!-- Will use py-2 instead of responsive padding -->
</VStack>

// Other classes work normally
<VStack className="bg-blue-50 border-t border-gray-200">
  <!-- Applies background and border -->
</VStack>
```

### 2. Full Width
The component automatically applies `w-full` class to ensure it takes the full width of its container.

### 3. Forward Ref Support
```tsx
const AnimatedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      }
    });
  }, []);

  return (
    <VStack ref={sectionRef}>
      <h2>Animated Section</h2>
    </VStack>
  );
};
```

## Example Use Cases

### 1. Page Sections
```tsx
const HomePage = () => {
  return (
    <>
      <VStack>
        <Container>
          <Hero />
        </Container>
      </VStack>
      
      <VStack>
        <Container>
          <About />
        </Container>
      </VStack>
      
      <VStack>
        <Container>
          <Projects />
        </Container>
      </VStack>
    </>
  );
};
```

### 2. Custom Spacing for Special Sections
```tsx
const HeroSection = () => {
  return (
    <VStack padding={false} className="py-32 min-h-screen">
      <Container>
        <h1>Large hero section with custom spacing</h1>
      </Container>
    </VStack>
  );
};
```

### 3. Scroll-triggered Animations
```tsx
const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".skill-item", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 70%"
      }
    });
  }, []);

  return (
    <VStack ref={skillsRef}>
      <Container>
        <h2>My Skills</h2>
        <div className="skill-item">React</div>
        <div className="skill-item">TypeScript</div>
        <div className="skill-item">GSAP</div>
      </Container>
    </VStack>
  );
};
```

## Implementation Details

### Class Merge Logic
The component uses a smart class merging system:
1. Always applies `w-full` for full width
2. Checks if `className` prop contains any `py-` classes
3. If custom vertical padding is found, skips default responsive padding
4. If no custom padding, applies the responsive padding scale

### TypeScript Interface
```tsx
interface VStackProps {
  padding?: true | false | "none";
  children: React.ReactNode;
  className?: string;
}
```

### Display Name
The component sets `displayName = "Section"` for better debugging in React DevTools.

## Responsive Behavior

### Mobile (< 1024px)
- `py-8` = 32px top and bottom padding
- Provides adequate spacing without wasting precious mobile screen space

### Desktop (≥ 1024px)  
- `py-24` = 96px top and bottom padding
- Creates generous spacing that looks professional on larger screens

## Common Patterns

### 1. Standard Section
```tsx
<VStack>
  <Container>
    {/* Your section content */}
  </Container>
</VStack>
```

### 2. Background Section
```tsx
<VStack className="bg-gray-100">
  <Container>
    {/* Content with background */}
  </Container>
</VStack>
```

### 3. Animated Section
```tsx
<VStack ref={animationRef}>
  <Container>
    {/* Content that animates on scroll */}
  </Container>
</VStack>
```

## Best Practices

1. **Use with Container**: Almost always pair VStack with Container for proper spacing
2. **Consistent Sections**: Use VStack to wrap each major page section
3. **Custom Spacing**: Override padding only when default spacing doesn't fit the design
4. **Animation Target**: Use VStack ref for scroll-triggered animations
5. **Background Sections**: Apply background colors to VStack, not Container

## Benefits

1. **Consistency**: Ensures uniform vertical spacing across your application
2. **Responsive**: Automatically adjusts for mobile and desktop
3. **Performance**: Minimal runtime overhead with Tailwind optimizations
4. **Flexible**: Easy to override when needed
5. **Animation-Friendly**: Perfect target for scroll-triggered animations

## Integration with Other Components

### With Container
```tsx
// Most common pattern
<VStack>
  <Container>
    <YourContent />
  </Container>
</VStack>
```

### With Grid
```tsx
<VStack>
  <Container>
    <Grid>
      <GridItem>Content 1</GridItem>
      <GridItem>Content 2</GridItem>
    </Grid>
  </Container>
</VStack>
```

### With GSAP Animations
```tsx
const AnimatedVStack = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%"
        }
      }
    );
  }, []);

  return (
    <VStack ref={ref}>
      <Container>
        <h2>Animated Content</h2>
      </Container>
    </VStack>
  );
};
```

## Related Components
- [`Container`](./CONTAINER.md) - Provides X-axis (horizontal) padding
- [`Grid`](./GRID.md) - Layout grid system that works well inside VStack + Container
- [`TextReveal`](./TEXT_REVEAL_ANIMATION.md) - Often used within VStack for animated text
