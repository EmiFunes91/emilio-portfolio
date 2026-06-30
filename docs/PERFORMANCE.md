# Performance Optimization Guide

This document outlines the performance optimization strategies and implementations used in the Emilio Funes Portfolio project to ensure fast loading times, smooth user interactions, and excellent Core Web Vitals scores.

## 📊 Performance Metrics

### Current Performance Scores
- **Lighthouse Performance**: 95+
- **Lighthouse Accessibility**: 95+
- **Lighthouse Best Practices**: 95+
- **Lighthouse SEO**: 95+

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🚀 Optimization Strategies

### 1. Next.js App Router Optimizations

#### Server-Side Rendering (SSR)
```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}

// Static generation for better performance
export const dynamic = 'force-static'
```

#### Image Optimization
```typescript
import Image from 'next/image'

// Optimized image loading
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Code Splitting and Bundle Optimization

#### Dynamic Imports
```typescript
// Lazy load heavy components
const LazyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

#### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# View bundle composition
npm run build -- --analyze
```

### 3. Custom Performance Hooks

#### usePerformanceOptimization Hook
```typescript
// hooks/usePerformanceOptimization.ts
export function useOptimizedScroll(callback: (event: Event) => void, delay = 16) {
  const throttledCallback = useCallback(
    throttle(callback, delay),
    [callback, delay]
  )

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true })
    return () => window.removeEventListener('scroll', throttledCallback)
  }, [throttledCallback])
}
```

#### Throttle and Debounce Functions
```typescript
// Optimize event handlers
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}
```

### 4. Image and Asset Optimization

#### Image Compression Strategy
```bash
# Optimize project images
npm run optimize:images

# Optimize specific project images
npm run optimize:project-images
```

#### WebP Format Support
```typescript
// Automatic WebP conversion
<Image
  src="/projects/project1.webp"
  alt="Project screenshot"
  width={800}
  height={600}
  format="webp"
/>
```

### 5. Caching Strategies

#### Static Asset Caching
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

#### Service Worker (Future Implementation)
```typescript
// public/sw.js
const CACHE_NAME = 'portfolio-cache-v1'
const urlsToCache = [
  '/',
  '/styles/globals.css',
  '/images/hero.webp',
]
```

## 🎯 Component-Level Optimizations

### 1. React.memo for Pure Components
```typescript
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})
```

### 2. useMemo for Expensive Calculations
```typescript
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])
```

### 3. useCallback for Event Handlers
```typescript
const handleClick = useCallback(() => {
  // Handle click event
}, [dependencies])
```

### 4. Intersection Observer for Lazy Loading
```typescript
const { observe, unobserve } = useIntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load content when visible
    }
  })
})
```

## 📱 Mobile Performance

### 1. Responsive Images
```typescript
// Different image sizes for different devices
<Image
  src="/images/hero-mobile.webp"
  alt="Hero"
  sizes="(max-width: 768px) 100vw, 50vw"
  fill
/>
```

### 2. Touch Event Optimization
```typescript
// Optimize touch events for mobile
const handleTouchStart = useCallback((e: TouchEvent) => {
  // Handle touch with passive listeners
}, [])
```

### 3. Mobile-First CSS
```css
/* Mobile-first approach */
.component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* Desktop styles */
  }
}
```

## 🔍 SEO Performance

### 1. Structured Data
```typescript
// lib/seo.ts
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Emilio Funes",
    "jobTitle": "Backend Developer",
    "url": "https://emiliofunes-portfolio.vercel.app"
  }
}
```

### 2. Dynamic Metadata
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Emilio Funes',
    default: 'Emilio Funes - Backend Developer',
  },
  description: 'Professional portfolio of Emilio Funes, backend developer',
  openGraph: {
    title: 'Emilio Funes - Backend Developer',
    description: 'Professional portfolio showcasing backend development expertise',
  },
}
```

### 3. Sitemap Generation
```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://emiliofunes-portfolio.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

## 🛠️ Performance Monitoring

### 1. Web Vitals Monitoring
```typescript
// lib/performance.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') {
    console.log(metric)
    // Send to analytics service
  }
}
```

### 2. Performance Budgets
```json
// .bundle-analyzer.js
module.exports = {
  budgets: [
    {
      type: 'initial',
      maximumWarning: '500kb',
      maximumError: '1mb',
    },
  ],
}
```

### 3. Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: npm run lighthouse
```

## 📈 Performance Testing

### 1. Lighthouse Testing
```bash
# Run Lighthouse locally
npm run lighthouse

# Run Lighthouse CI
npm run lighthouse:ci
```

### 2. Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Compare bundle sizes
npm run analyze:compare
```

### 3. Performance Regression Testing
```bash
# Run performance tests
npm run test:performance

# Generate performance report
npm run report:performance
```

## 🔧 Performance Configuration

### 1. Next.js Configuration
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

### 2. Tailwind CSS Optimization
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Purge unused styles
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  },
}
```

## 🚨 Performance Anti-Patterns to Avoid

### 1. Large Bundle Sizes
- ❌ Import entire libraries
- ✅ Import specific functions
- ✅ Use tree shaking

### 2. Render Blocking Resources
- ❌ Inline critical CSS
- ✅ Use Next.js built-in optimization
- ✅ Defer non-critical resources

### 3. Unoptimized Images
- ❌ Use large images without optimization
- ✅ Use Next.js Image component
- ✅ Implement lazy loading

### 4. Inefficient Re-renders
- ❌ Create new objects/functions in render
- ✅ Use useMemo and useCallback
- ✅ Implement React.memo

## 📚 Performance Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/core-web-vitals/)
- [Performance Budgets](https://web.dev/performance-budgets-101/)

## 🤝 Contributing to Performance

When contributing to the project:

1. **Measure first**: Always measure performance impact
2. **Optimize images**: Use appropriate formats and sizes
3. **Minimize bundle size**: Avoid unnecessary dependencies
4. **Test on mobile**: Ensure mobile performance
5. **Monitor Core Web Vitals**: Keep scores above 90

For performance improvements or questions, please open an issue or submit a pull request. 