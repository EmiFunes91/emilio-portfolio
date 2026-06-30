# Testing Documentation

This document provides comprehensive information about the testing strategy, structure, and best practices implemented in the Emilio Funes Portfolio project.

## 📊 Test Coverage Overview

Current test coverage metrics:
- **Statements**: 77.94%
- **Branches**: 66.15%
- **Functions**: 75.58%
- **Lines**: 78.52%

## 🏗️ Testing Architecture

### Test Structure

```
__tests__/
├── components/              # Component tests
│   ├── ui/                 # UI component tests
│   ├── navigation/         # Navigation component tests
│   └── ...                 # Feature component tests
├── hooks/                  # Custom hooks tests
├── context/                # React context tests
├── lib/                    # Utility function tests
└── README.md              # This documentation
```

### Testing Technologies

- **Jest**: JavaScript testing framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation

## 🧪 Test Categories

### 1. Component Tests

Component tests focus on user behavior and component functionality rather than implementation details.

#### Test Structure
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import ComponentName from '../ComponentName'

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
})
```

#### Testing Principles
- **User-centric**: Test what users see and do
- **Accessibility**: Use semantic queries (getByRole, getByLabelText)
- **Behavior over implementation**: Focus on functionality, not internal state

### 2. Hook Tests

Custom hooks are tested using `renderHook` from React Testing Library.

#### Test Structure
```typescript
import { renderHook, act } from '@testing-library/react'
import { useCustomHook } from '../hooks/useCustomHook'

describe('useCustomHook', () => {
  it('returns expected initial state', () => {
    const { result } = renderHook(() => useCustomHook())
    expect(result.current.value).toBe(initialValue)
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useCustomHook())
    
    act(() => {
      result.current.updateValue(newValue)
    })
    
    expect(result.current.value).toBe(newValue)
  })
})
```

### 3. Context Tests

React contexts are tested by rendering providers and consumers.

#### Test Structure
```typescript
import { render, screen } from '@testing-library/react'
import { PreferencesProvider } from '../context/PreferencesContext'

describe('PreferencesContext', () => {
  it('provides default values', () => {
    render(
      <PreferencesProvider>
        <TestComponent />
      </PreferencesProvider>
    )
    
    expect(screen.getByText('default')).toBeInTheDocument()
  })
})
```

### 4. Utility Tests

Pure functions and utilities are tested with standard Jest assertions.

#### Test Structure
```typescript
import { utilityFunction } from '../lib/utility'

describe('utilityFunction', () => {
  it('returns expected result for valid input', () => {
    const result = utilityFunction('valid input')
    expect(result).toBe('expected output')
  })

  it('handles edge cases', () => {
    const result = utilityFunction('')
    expect(result).toBe('default output')
  })
})
```

## 🎯 Testing Best Practices

### 1. Test Organization

- **Describe blocks**: Group related tests
- **Clear test names**: Use descriptive test names that explain the behavior
- **Arrange-Act-Assert**: Structure tests in three clear sections

### 2. Mocking Strategy

#### API Calls
```typescript
// Mock fetch globally
global.fetch = jest.fn()

beforeEach(() => {
  (fetch as jest.Mock).mockClear()
})
```

#### Browser APIs
```typescript
// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
Object.defineProperty(window, 'IntersectionObserver', {
  value: mockIntersectionObserver,
  writable: true
})
```

#### Console Methods
```typescript
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

afterEach(() => {
  consoleSpy.mockRestore()
})
```

### 3. Accessibility Testing

- Use semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Test keyboard navigation
- Verify ARIA attributes
- Test screen reader compatibility

### 4. Error Handling

- Test error states and error boundaries
- Verify error messages are displayed correctly
- Test fallback UI components

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ComponentName.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders correctly"
```

### Debugging Tests

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests with coverage and watch
npm test -- --coverage --watchAll=false

# Debug specific test
npm test -- --testNamePattern="specific test name" --verbose
```

## 📈 Coverage Goals

### Current Targets
- **Statements**: 80% (Current: 77.94%)
- **Branches**: 70% (Current: 66.15%)
- **Functions**: 80% (Current: 75.58%)
- **Lines**: 80% (Current: 78.52%)

### Coverage Exclusions

Some files are excluded from coverage requirements:
- Configuration files
- Build scripts
- Type definitions
- Test utilities

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70,
    },
  },
}
```

### Test Setup (`jest.setup.js`)

```javascript
import '@testing-library/jest-dom'

// Global test utilities and mocks
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
```

## 🐛 Common Testing Issues

### 1. Async Operations

```typescript
// Use waitFor for async operations
import { waitFor } from '@testing-library/react'

it('loads data asynchronously', async () => {
  render(<AsyncComponent />)
  
  await waitFor(() => {
    expect(screen.getByText('Loaded data')).toBeInTheDocument()
  })
})
```

### 2. Component State Updates

```typescript
// Use act for state updates
import { act } from '@testing-library/react'

it('updates state on user interaction', () => {
  render(<StatefulComponent />)
  
  act(() => {
    fireEvent.click(screen.getByRole('button'))
  })
  
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

### 3. Mock Cleanup

```typescript
// Always clean up mocks
afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})
```

## 📚 Additional Resources

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://testing-library.com/docs/guide-accessibility/)

## 🤝 Contributing to Tests

When adding new features:

1. **Write tests first** (TDD approach)
2. **Test user behavior**, not implementation
3. **Maintain coverage** above 70%
4. **Update this documentation** if needed
5. **Follow existing patterns** and conventions

For questions or improvements to the testing strategy, please open an issue or submit a pull request. 