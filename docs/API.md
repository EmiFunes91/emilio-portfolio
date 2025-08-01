# API Documentation

This document provides comprehensive documentation for all components, hooks, utilities, and APIs available in the Emilio Funes Portfolio project.

## 📦 Components

### UI Components

#### ActionButton

A versatile button component that can render as either a button or link based on props.

```typescript
import ActionButton from '@/components/ui/ActionButton'

interface ActionButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'default' | 'demo' | 'video'
  className?: string
  title?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  style?: React.CSSProperties
}
```

**Usage Examples:**
```tsx
// As a button
<ActionButton onClick={handleClick}>Click Me</ActionButton>

// As an external link
<ActionButton href="https://example.com">External Link</ActionButton>

// As an internal link
<ActionButton href="#section">Internal Link</ActionButton>

// With custom styling
<ActionButton variant="demo" className="custom-class">
  Demo Button
</ActionButton>
```

**Features:**
- Automatic mobile detection
- Smooth scroll for internal links
- External link security attributes
- Multiple visual variants
- Full accessibility support

### Navigation Components

#### Navbar

Main navigation component with language and theme toggles.

```typescript
import Navbar from '@/components/navigation/Navbar'

interface NavbarProps {
  className?: string
}
```

**Features:**
- Responsive design
- Language toggle (ES/EN)
- Dark/light mode toggle
- Smooth animations
- Mobile menu

#### DarkModeToggle

Toggle component for switching between light and dark themes.

```typescript
import DarkModeToggle from '@/components/navigation/DarkModeToggle'

interface DarkModeToggleProps {
  className?: string
}
```

**Features:**
- System preference detection
- Persistent state
- Smooth transitions
- Accessible design

#### LanguageToggle

Toggle component for switching between languages.

```typescript
import LanguageToggle from '@/components/navigation/LanguageToggle'

interface LanguageToggleProps {
  className?: string
}
```

**Features:**
- Multiple language support
- Persistent selection
- Dynamic content updates
- SEO-friendly

### Feature Components

#### Hero

Main hero section component with animated content.

```typescript
import Hero from '@/components/Hero'

interface HeroProps {
  className?: string
}
```

**Features:**
- Animated text
- Call-to-action buttons
- Responsive design
- Performance optimized

#### About

About section component with personal information.

```typescript
import About from '@/components/About'

interface AboutProps {
  className?: string
}
```

**Features:**
- Multi-language content
- Animated sections
- Professional presentation
- Contact information

#### Projects

Projects showcase component with filtering and carousel.

```typescript
import Projects from '@/components/Projects'

interface ProjectsProps {
  className?: string
}
```

**Features:**
- Project filtering
- Image carousel
- External links
- Responsive grid

#### Contact

Contact form component with validation and submission.

```typescript
import Contact from '@/components/Contact'

interface ContactProps {
  className?: string
}
```

**Features:**
- Form validation
- reCAPTCHA integration
- Email submission
- Success/error states

#### Testimonials

Testimonials display component with carousel functionality.

```typescript
import Testimonials from '@/components/Testimonials'

interface TestimonialsProps {
  className?: string
}
```

**Features:**
- Auto-rotating carousel
- Platform information
- Multi-language support
- Responsive design

### Utility Components

#### FadeInSection

Animation wrapper component for fade-in effects.

```typescript
import FadeInSection from '@/components/FadeInSection'

interface FadeInSectionProps {
  children: ReactNode
  threshold?: number
  delay?: number
  duration?: number
  y?: number
  className?: string
}
```

**Usage:**
```tsx
<FadeInSection threshold={0.1} delay={0.2} duration={0.6} y={20}>
  <div>Content to animate</div>
</FadeInSection>
```

#### LoadingSpinner

Loading indicator component.

```typescript
import LoadingSpinner from '@/components/LoadingSpinner'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

#### OptimizedImage

Optimized image component with lazy loading.

```typescript
import OptimizedImage from '@/components/OptimizedImage'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  quality?: number
  className?: string
}
```

#### LazyProjectImage

Specialized image component for project screenshots.

```typescript
import LazyProjectImage from '@/components/LazyProjectImage'

interface LazyProjectImageProps {
  src: string
  alt: string
  projectName: string
  className?: string
}
```

## 🪝 Custom Hooks

### usePerformanceOptimization

Collection of performance optimization hooks.

#### useOptimizedScroll

Optimized scroll event handler with throttling.

```typescript
import { useOptimizedScroll } from '@/hooks/usePerformanceOptimization'

function useOptimizedScroll(
  callback: (event: Event) => void,
  delay?: number
): void
```

**Usage:**
```tsx
const handleScroll = useCallback((event: Event) => {
  // Handle scroll event
}, [])

useOptimizedScroll(handleScroll, 16) // 60fps throttling
```

#### useOptimizedResize

Optimized resize event handler with debouncing.

```typescript
import { useOptimizedResize } from '@/hooks/usePerformanceOptimization'

function useOptimizedResize(
  callback: (event: Event) => void,
  delay?: number
): void
```

**Usage:**
```tsx
const handleResize = useCallback((event: Event) => {
  // Handle resize event
}, [])

useOptimizedResize(handleResize, 100) // 100ms debounce
```

#### useOptimizedAnimation

Animation hook using requestAnimationFrame.

```typescript
import { useOptimizedAnimation } from '@/hooks/usePerformanceOptimization'

function useOptimizedAnimation(callback: () => void): {
  startAnimation: () => void
  stopAnimation: () => void
}
```

**Usage:**
```tsx
const { startAnimation, stopAnimation } = useOptimizedAnimation(() => {
  // Animation frame callback
})

// Start animation
startAnimation()

// Stop animation
stopAnimation()
```

#### useLazyLoad

Lazy loading hook for dynamic imports.

```typescript
import { useLazyLoad } from '@/hooks/usePerformanceOptimization'

function useLazyLoad<T>(
  importFunc: () => Promise<{ default: T }>,
  deps?: any[]
): {
  Component: T | null
  loading: boolean
}
```

**Usage:**
```tsx
const { Component, loading } = useLazyLoad(
  () => import('./HeavyComponent'),
  [dependency]
)

if (loading) return <LoadingSpinner />
if (Component) return <Component />
```

#### useIntersectionObserver

Intersection Observer hook for visibility detection.

```typescript
import { useIntersectionObserver } from '@/hooks/usePerformanceOptimization'

function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): {
  observe: (element: Element) => void
  unobserve: (element: Element) => void
}
```

**Usage:**
```tsx
const { observe, unobserve } = useIntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element is visible
    }
  })
})

// Observe element
observe(elementRef.current)

// Unobserve element
unobserve(elementRef.current)
```

### useActiveSection

Hook for tracking active section during scroll.

```typescript
import { useActiveSection } from '@/hooks/useActiveSection'

function useActiveSection(sections: string[]): string
```

**Usage:**
```tsx
const activeSection = useActiveSection(['hero', 'about', 'projects', 'contact'])
```

### useSmoothScroll

Hook for smooth scrolling functionality.

```typescript
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

function useSmoothScroll(): (target: string | Element) => void
```

**Usage:**
```tsx
const scrollTo = useSmoothScroll()

// Scroll to element
scrollTo('#section')

// Scroll to DOM element
scrollTo(elementRef.current)
```

## 🏪 Context

### PreferencesContext

Global context for user preferences (language and theme).

```typescript
import { PreferencesProvider, usePreferences } from '@/context/PreferencesContext'

interface PreferencesContextType {
  language: 'es' | 'en'
  setLanguage: (language: 'es' | 'en') => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}
```

**Usage:**
```tsx
// Provider
<PreferencesProvider>
  <App />
</PreferencesProvider>

// Consumer
const { language, setLanguage, theme, toggleTheme } = usePreferences()
```

## 🛠️ Utilities

### SEO Utilities

#### generateStructuredData

Generate structured data for SEO.

```typescript
import { generateStructuredData } from '@/lib/seo'

function generateStructuredData(data?: Partial<PersonData>): PersonSchema
```

**Usage:**
```tsx
const structuredData = generateStructuredData({
  name: 'Emilio Funes',
  jobTitle: 'Backend Developer',
  url: 'https://emiliofunes-portfolio.vercel.app'
})
```

#### generateMetadata

Generate dynamic metadata for pages.

```typescript
import { generateMetadata } from '@/lib/seo'

function generateMetadata(
  title: string,
  description: string,
  options?: MetadataOptions
): Metadata
```

### Performance Utilities

#### throttle

Throttle function execution.

```typescript
import { throttle } from '@/hooks/usePerformanceOptimization'

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T
```

**Usage:**
```tsx
const throttledFunction = throttle((value) => {
  // Expensive operation
}, 100)
```

#### debounce

Debounce function execution.

```typescript
import { debounce } from '@/hooks/usePerformanceOptimization'

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T
```

**Usage:**
```tsx
const debouncedFunction = debounce((value) => {
  // API call
}, 300)
```

### Translation Utilities

#### translations

Translation management system.

```typescript
import { translations } from '@/lib/translations'

interface Translations {
  [key: string]: {
    [language: string]: string
  }
}
```

**Usage:**
```tsx
const t = translations.hero.title
// Returns: { es: 'Título en español', en: 'Title in English' }
```

## 📱 Responsive Design

### Breakpoints

The project uses Tailwind CSS breakpoints:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Mobile-First Approach

All components are designed with a mobile-first approach:

```tsx
<div className="
  w-full          // Mobile: full width
  md:w-1/2        // Tablet: half width
  lg:w-1/3        // Desktop: third width
  p-4             // Mobile: small padding
  md:p-6          // Tablet: medium padding
  lg:p-8          // Desktop: large padding
">
  Content
</div>
```

## 🎨 Theming

### Color Scheme

The project supports both light and dark themes:

```tsx
// Light theme colors
bg-white text-gray-900 border-gray-200

// Dark theme colors
dark:bg-gray-800 dark:text-white dark:border-gray-700
```

### Theme Variables

CSS custom properties for consistent theming:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --background-color: #ffffff;
  --text-color: #111827;
}

[data-theme="dark"] {
  --background-color: #1f2937;
  --text-color: #f9fafb;
}
```

## ♿ Accessibility

### ARIA Attributes

All interactive components include proper ARIA attributes:

```tsx
<button
  aria-label="Toggle dark mode"
  aria-pressed={isDarkMode}
  role="switch"
>
  Toggle
</button>
```

### Keyboard Navigation

Components support full keyboard navigation:

- Tab navigation
- Enter/Space activation
- Escape key handling
- Arrow key navigation

### Screen Reader Support

- Semantic HTML structure
- Descriptive alt text
- ARIA labels and descriptions
- Focus management

## 🔧 Configuration

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
}
```

### Tailwind Configuration

```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
```

## 📊 Performance Metrics

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# View bundle composition
npm run build -- --analyze
```

### Core Web Vitals

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimization Features

- Code splitting
- Image optimization
- Lazy loading
- Tree shaking
- Minification
- Compression

## 🧪 Testing

### Component Testing

All components include comprehensive tests:

```typescript
// Example test structure
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    const handleClick = jest.fn()
    render(<ComponentName onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Hook Testing

Custom hooks are tested using `renderHook`:

```typescript
describe('useHookName', () => {
  it('returns expected initial state', () => {
    const { result } = renderHook(() => useHookName())
    expect(result.current.value).toBe(initialValue)
  })
})
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Documentation](https://testing-library.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

For questions about the API or component usage, please refer to the individual component files or open an issue. 