# Development Guide

This document provides comprehensive guidelines for developing and contributing to the Emilio Funes Portfolio project, ensuring consistent code quality and development practices.

## 🚀 Development Setup

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn 1.22.0+)
- **Git**: 2.30.0 or higher
- **VS Code**: Recommended editor with extensions

### Required VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EmiFunes91/emilio-portfolio.git
   cd emilio-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to `http://localhost:3000`

## 🛠️ Development Workflow

### 1. Git Workflow

#### Branch Naming Convention
```
feature/component-name
bugfix/issue-description
hotfix/critical-fix
refactor/component-name
docs/documentation-update
```

#### Commit Message Format
```
type(scope): description

feat(components): add new ActionButton component
fix(hooks): resolve usePerformanceOptimization memory leak
docs(readme): update installation instructions
refactor(utils): optimize image processing functions
test(components): add comprehensive ActionButton tests
```

#### Pull Request Process
1. Create feature branch from `main`
2. Make changes following coding standards
3. Write/update tests
4. Update documentation
5. Create pull request with detailed description
6. Request code review
7. Address feedback and merge

### 2. Code Quality Standards

#### TypeScript Configuration
```typescript
// Strict TypeScript settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

#### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  }
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 📁 Project Structure

### Directory Organization

```
emilio-portfolio-final/
├── app/                     # Next.js app router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── styles/             # Global styles
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── navigation/         # Navigation components
│   └── [feature]/          # Feature-specific components
├── hooks/                  # Custom React hooks
├── context/                # React contexts
├── lib/                    # Utility functions
├── __tests__/             # Test files
├── public/                # Static assets
├── docs/                  # Documentation
└── scripts/               # Build and utility scripts
```

### Component Structure

#### Component Template
```typescript
// components/ComponentName.tsx
import React from 'react'
import { ComponentProps } from './types'

interface ComponentNameProps {
  // Define props interface
}

export default function ComponentName({ 
  // Destructure props
}: ComponentNameProps) {
  // Component logic
  
  return (
    // JSX
  )
}

// Export types
export type { ComponentNameProps }
```

#### Hook Template
```typescript
// hooks/useHookName.ts
import { useState, useEffect, useCallback } from 'react'

interface UseHookNameReturn {
  // Define return interface
}

export function useHookName(): UseHookNameReturn {
  // Hook logic
  
  return {
    // Return values
  }
}
```

## 🧪 Testing Guidelines

### Test Structure

#### Component Tests
```typescript
// __tests__/components/ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ComponentName from '../../components/ComponentName'

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup mocks and test data
  })

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

  it('displays correct content', () => {
    render(<ComponentName text="Test content" />)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
```

#### Hook Tests
```typescript
// __tests__/hooks/useHookName.test.ts
import { renderHook, act } from '@testing-library/react'
import { useHookName } from '../../hooks/useHookName'

describe('useHookName', () => {
  it('returns expected initial state', () => {
    const { result } = renderHook(() => useHookName())
    expect(result.current.value).toBe(initialValue)
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useHookName())
    
    act(() => {
      result.current.updateValue(newValue)
    })
    
    expect(result.current.value).toBe(newValue)
  })
})
```

### Testing Best Practices

1. **Test user behavior, not implementation**
2. **Use semantic queries** (`getByRole`, `getByLabelText`)
3. **Test accessibility** features
4. **Mock external dependencies**
5. **Test error scenarios**
6. **Keep tests independent**

## 🎨 Styling Guidelines

### Tailwind CSS Usage

#### Component Styling
```typescript
// Use Tailwind classes for styling
const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors"
const variantClasses = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
}

// Combine classes with twMerge
import { twMerge } from 'tailwind-merge'

const className = twMerge(baseClasses, variantClasses[variant], customClasses)
```

#### Responsive Design
```typescript
// Mobile-first approach
<div className="
  w-full 
  md:w-1/2 
  lg:w-1/3 
  xl:w-1/4
  p-4 
  md:p-6 
  lg:p-8
">
  Content
</div>
```

#### Dark Mode Support
```typescript
// Support both light and dark themes
<div className="
  bg-white 
  dark:bg-gray-800 
  text-gray-900 
  dark:text-white
  border-gray-200 
  dark:border-gray-700
">
  Content
</div>
```

## 🔧 Development Scripts

### Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Run TypeScript type checking

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:ci          # Run tests in CI environment

# Code Quality
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run analyze          # Analyze bundle size

# Optimization
npm run optimize:images  # Optimize project images
npm run optimize:build   # Optimize build output
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

## 📱 Performance Guidelines

### Component Optimization

#### React.memo Usage
```typescript
// Use React.memo for pure components
const OptimizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})
```

#### useMemo and useCallback
```typescript
// Optimize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// Optimize event handlers
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies])
```

#### Lazy Loading
```typescript
// Lazy load heavy components
const LazyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

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

## 🔍 Debugging

### Development Tools

#### React DevTools
- Install React Developer Tools browser extension
- Use Profiler for performance analysis
- Inspect component tree and props

#### Next.js Debugging
```bash
# Enable Next.js debugging
DEBUG=* npm run dev

# Debug specific areas
DEBUG=next:*,next:server* npm run dev
```

#### TypeScript Debugging
```bash
# Check TypeScript errors
npm run type-check

# Generate TypeScript declaration files
npm run build:types
```

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear npm cache
npm cache clean --force
npm install
```

#### Test Failures
```bash
# Run tests with verbose output
npm test -- --verbose

# Debug specific test
npm test -- --testNamePattern="ComponentName"
```

## 📚 Documentation Standards

### Code Documentation

#### JSDoc Comments
```typescript
/**
 * Custom hook for managing performance optimizations
 * @param callback - Function to be optimized
 * @param delay - Throttle delay in milliseconds
 * @returns Object with optimized functions
 */
export function usePerformanceOptimization(
  callback: () => void,
  delay: number = 16
) {
  // Implementation
}
```

#### Component Documentation
```typescript
/**
 * ActionButton component for handling user interactions
 * 
 * @example
 * ```tsx
 * <ActionButton href="/contact" variant="primary">
 *   Contact Me
 * </ActionButton>
 * ```
 */
export default function ActionButton({ 
  href,
  variant = 'default',
  children,
  ...props 
}: ActionButtonProps) {
  // Implementation
}
```

### README Updates

- Update README.md for new features
- Document breaking changes
- Include usage examples
- Update installation instructions

## 🤝 Contributing Guidelines

### Before Contributing

1. **Read the documentation**
2. **Check existing issues**
3. **Discuss major changes**
4. **Follow coding standards**

### Pull Request Checklist

- [ ] Code follows project standards
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or documented)
- [ ] Performance impact considered
- [ ] Accessibility features tested

### Code Review Process

1. **Automated checks pass**
2. **Code review by maintainers**
3. **Address feedback**
4. **Final approval and merge**

## 🚀 Deployment

### Environment Setup

```bash
# Production environment variables
NEXT_PUBLIC_SITE_URL=https://emiliofunes-portfolio.vercel.app
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Build Process

```bash
# Build for production
npm run build

# Analyze bundle size
npm run analyze

# Test production build
npm start
```

### Deployment Platforms

#### Vercel (Recommended)
- Automatic deployments from GitHub
- Preview deployments for PRs
- Built-in analytics and monitoring

#### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 📞 Support

### Getting Help

1. **Check documentation** first
2. **Search existing issues**
3. **Create detailed issue report**
4. **Contact maintainers**

### Issue Reporting

```markdown
## Bug Report

**Description:**
Clear description of the issue

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Node.js: [e.g., 18.0.0]

**Additional Context:**
Any other relevant information
```

For development questions or improvements, please open an issue or submit a pull request. 