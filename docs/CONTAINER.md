# Container Component

A responsive container wrapper component that provides consistent horizontal padding across different screen sizes using Tailwind CSS.

## Location
- `components/layout/Container.tsx`

## Purpose
The Container component serves as a wrapper that provides X-axis (horizontal) padding to maintain consistent content margins across different screen sizes. It ensures your content doesn't touch the edges of the viewport.

## Tech Stack
- **React**: Core component framework
- **TypeScript**: Type safety and interface definitions
- **Tailwind CSS**: Responsive padding utilities
- **forwardRef**: Allows parent components to access the DOM element

## Usage

### Basic Usage
```tsx
import Container from "@/components/layout/Container";

const MyComponent = () => {
  return (
    <Container>
      <h1>Your content here</h1>
    </Container>
  );
};
```

### With Custom Padding
```tsx
// Disable default padding
<Container padding={false}>
  <div className="px-4">Custom padding content</div>
</Container>

// Or use "none" (same as false)
<Container padding="none">
  <div>No padding content</div>
</Container>
```

### With Ref
```tsx
import { useRef } from "react";

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Container ref={containerRef} className="bg-gray-100">
      <p>Content with ref access</p>
    </Container>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | **Required.** Content to be wrapped |
| `padding` | `true \| false \| "none"` | `true` | Controls horizontal padding |
| `className` | `string` | - | Additional CSS classes |

## Responsive Padding Scale

When `padding={true}` (default), the component applies these responsive paddings:

| Breakpoint | Screen Size | Padding | Pixels (approx) |
|------------|-------------|---------|-----------------|
| Default | < 640px | `px-6` | 24px |
| `md:` | ≥ 768px | `px-8` | 32px |
| `lg:` | ≥ 1024px | `px-12` | 48px |
| `xl:` | ≥ 1280px | `px-14` | 56px |
| `2xl:` | ≥ 1536px | `px-16` | 64px |
| `3xl:` | ≥ 1728px | `px-20` | 80px |
| `4xl:` | ≥ 1920px | `px-24` | 96px |
| `5xl:` | ≥ 2560px | `px-28` | 112px |

## Features

### 1. Smart Class Merging
```tsx
// If you provide custom padding, it overrides the default
<Container className="px-2">
  <!-- Will use px-2 instead of responsive padding -->
</Container>

// Other classes work normally
<Container className="bg-blue-500 rounded-lg">
  <!-- Applies background and border radius -->
</Container>
```

### 2. Container Class
The component automatically applies the `container` class from Tailwind CSS, which:
- Centers the container horizontally
- Sets max-width based on breakpoints
- Automatically adjusts for responsive design

### 3. Forward Ref Support
```tsx
const MyParent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Direct DOM access for animations, measurements, etc.
      console.log(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <p>Content</p>
    </Container>
  );
};
```

## Example Use Cases

### 1. Basic Page Section
```tsx
const AboutSection = () => {
  return (
    <section>
      <Container>
        <h2>About Me</h2>
        <p>This content will have consistent padding on all screen sizes.</p>
      </Container>
    </section>
  );
};
```

### 2. Full-width Background with Contained Content
```tsx
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <Container className="flex items-center justify-center h-screen">
        <h1 className="text-white text-6xl">Welcome</h1>
      </Container>
    </section>
  );
};
```

### 3. Custom Padding for Special Cases
```tsx
const TightSection = () => {
  return (
    <Container padding={false} className="px-2">
      <div className="text-sm">
        This has minimal padding for mobile-first design
      </div>
    </Container>
  );
};
```

## Implementation Details

### Class Merge Logic
The component uses a smart class merging system:
1. Checks if `className` prop contains any `px-` classes
2. If custom padding is found, skips default responsive padding
3. If no custom padding, applies the responsive padding scale
4. Always applies the `container` base class

### TypeScript Interface
```tsx
interface ContainerProps {
  padding?: true | false | "none";
  children: React.ReactNode;
  className?: string;
}
```

## Benefits

1. **Consistency**: Ensures uniform spacing across your application
2. **Responsive**: Automatically adjusts padding for different screen sizes
3. **Flexible**: Easy to override when needed
4. **Accessible**: Maintains readability on all devices
5. **Performance**: Minimal runtime overhead with compile-time optimizations

## Best Practices

1. **Use as Default**: Wrap most page content in Container for consistency
2. **Override Sparingly**: Only disable padding when you need full-width content
3. **Combine with VStack**: Often used together for both X and Y axis spacing
4. **Test Responsive**: Always check how your content looks on different screen sizes

## Related Components
- [`VStack`](./VSTACK.md) - Provides Y-axis (vertical) padding
- [`Grid`](./GRID.md) - Layout grid system that works well inside Container
