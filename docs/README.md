# Portfolio Documentation

Welcome to the comprehensive documentation for Snehashis Gharai's portfolio website. This documentation covers all aspects of the project from basic components to advanced animation systems.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Basic knowledge of React, TypeScript, and Next.js

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Documentation Index

### 🏗️ Core Architecture
- **[App Structure](./APP_STRUCTURE.md)** - Overall application organization and component hierarchy
- **[Tech Stack](./TECH_STACK.md)** - Technologies, libraries, and tools used

### 📦 Layout Components
- **[Container](./CONTAINER.md)** - Horizontal padding and responsive containers
- **[VStack](./VSTACK.md)** - Vertical spacing and section separation

### 🎯 State Management
- **[Contexts](./CONTEXTS.md)** - Global state management (Navigation & Loading)
- **[Hooks](./HOOKS.md)** - Custom hooks for responsive design and loading

### 🎨 Animation System
- **[Animations Overview](./ANIMATIONS.md)** - Complete animation system guide
- **[GSAP Animations](./GSAP_ANIMATIONS.md)** - GSAP implementations and techniques
- **[Text Reveal Animation](./TEXT_REVEAL_ANIMATION.md)** - Reusable text reveal system

### 🚀 Core Components
- **[PreLoader](./PRELOADER.md)** - Loading screen with multi-language greetings
- **[ScrollWrapper](./SCROLL_WRAPPER.md)** - Locomotive Scroll implementation

## Project Overview

### What This Portfolio Includes

**🎨 Visual Features:**
- Smooth scrolling with Locomotive Scroll
- Complex GSAP animations triggered by scroll
- Cursor-following text effects
- Multi-language preloader
- Responsive design across all devices

**⚡ Performance Features:**
- Optimized image loading
- Hardware-accelerated animations
- Code splitting and lazy loading
- SEO optimization

**🛠️ Technical Features:**
- TypeScript for type safety
- Custom hook system for reusability
- Context-based state management
- Modular component architecture

### Key Sections

1. **Hero Section** - Animated name with cursor-following effects
2. **About Section** - Text reveal animations and personal story
3. **Skills Section** - Animated skill cards with category organization
4. **Projects Section** - Interactive project cards with modal details
5. **Experience Section** - Timeline-based work experience
6. **Contact Section** - Contact form and social links

## Component Philosophy

### Design Principles

1. **Reusability**: Components are designed to be reused across the application
2. **Responsiveness**: Every component adapts to different screen sizes
3. **Performance**: Animations are optimized for smooth 60fps performance
4. **Accessibility**: Proper semantic HTML and keyboard navigation
5. **Type Safety**: Full TypeScript implementation with proper interfaces

### Component Categories

#### Layout Components
- **Purpose**: Provide consistent spacing and structure
- **Examples**: Container, VStack, Grid
- **Usage**: Building blocks for page layouts

#### UI Components  
- **Purpose**: Interactive elements and utilities
- **Examples**: TextReveal, Magnetic, ScrollToTop
- **Usage**: Enhanced user interactions

#### Section Components
- **Purpose**: Complete page sections
- **Examples**: Hero, About, Skills, Projects
- **Usage**: Main content areas

#### Navigation Components
- **Purpose**: Site navigation and menu systems
- **Examples**: Header, Nav, Link
- **Usage**: User navigation through the site

## Animation Philosophy

### Animation Layers

1. **GSAP Layer**: High-performance scroll triggers and complex animations
2. **Framer Motion Layer**: React-based component animations
3. **CSS Layer**: Simple transitions and hover effects

### Animation Principles

- **Purposeful**: Every animation serves a functional purpose
- **Performant**: Hardware-accelerated transforms for smooth playback
- **Responsive**: Different animation complexity based on device capabilities
- **Accessible**: Respect user's reduced motion preferences

## Development Guidelines

### File Organization
```
src/
├── components/
│   ├── layout/      # Structural components
│   ├── ui/          # Reusable UI elements
│   ├── navigation/  # Navigation components
│   └── project/     # Project-specific components
├── contexts/        # Global state
├── hooks/           # Custom React hooks
├── animations/      # Animation definitions
└── lib/            # Utility functions
```

### Naming Conventions

- **Components**: PascalCase (`Hero`, `TextReveal`)
- **Files**: kebab-case (`text-reveal-anim.ts`)
- **Functions**: camelCase (`createAnimation`)
- **CSS Classes**: kebab-case (`hero-container`)

### Code Standards

- **TypeScript**: Full type coverage with proper interfaces
- **ESLint**: Consistent code formatting and quality
- **Comments**: Comprehensive documentation for complex logic
- **Error Handling**: Proper error boundaries and fallbacks

## Performance Guidelines

### Loading Optimization
- Images are optimized with Next.js Image component
- Fonts are preloaded with display: swap
- Critical CSS is inlined
- Non-critical features are lazy-loaded

### Animation Performance
- Use transform properties instead of layout-triggering properties
- Enable hardware acceleration with will-change
- Limit concurrent animations
- Provide simplified animations for mobile devices

### Bundle Optimization
- Tree shaking for unused code elimination
- Code splitting by route and component
- Dynamic imports for heavy features
- Compression and minification in production

## Browser Support

### Target Browsers
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions  
- Safari: Last 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced features layer on top
- Graceful degradation for older browsers
- Responsive design from mobile-first approach

## Deployment

### Production Build
```bash
npm run build  # Creates optimized production build
npm run start  # Serves production build locally
```

### Environment Variables
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Performance Checklist
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals pass
- [ ] Images optimized
- [ ] Animations smooth at 60fps
- [ ] Mobile performance tested

## Contributing

### Adding New Components
1. Create component in appropriate folder
2. Add TypeScript interfaces
3. Implement responsive behavior
4. Add animations if needed
5. Write documentation
6. Test across devices

### Adding New Animations
1. Define animation in appropriate file
2. Use useGSAP for GSAP animations
3. Consider mobile performance
4. Add cleanup logic
5. Test on various devices

## Learning Resources

### Documentation Links
- [Next.js Docs](https://nextjs.org/docs)
- [GSAP Docs](https://greensock.com/docs/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Locomotive Scroll Docs](https://locomotivemtl.github.io/locomotive-scroll/)

### Key Concepts to Understand
- React Hooks and Context
- GSAP animations and ScrollTrigger
- Framer Motion variants
- Tailwind CSS utilities
- TypeScript interfaces
- Next.js features (SSG, Image optimization, etc.)

## Getting Help

### Common Issues
1. **Animations not working**: Check useGSAP dependencies and refs
2. **Layout issues**: Verify Container and VStack usage
3. **Type errors**: Ensure proper TypeScript interfaces
4. **Performance issues**: Check animation complexity and image optimization

### Debug Mode
Enable development markers for GSAP:
```typescript
if (process.env.NODE_ENV === 'development') {
  ScrollTrigger.defaults({ markers: true });
}
```

## Project Structure Summary

This portfolio is built with a modular, scalable architecture that prioritizes:
- **Performance**: Optimized animations and loading
- **Maintainability**: Clear component organization
- **Reusability**: Flexible, configurable components
- **Type Safety**: Full TypeScript implementation
- **User Experience**: Smooth interactions and responsive design

Each piece of documentation provides detailed examples and implementation guidance for building similar projects or extending this one.

---

*For specific implementation details, refer to the individual documentation files linked above.*
