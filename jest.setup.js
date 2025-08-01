import '@testing-library/jest-dom'

// Mock de Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, blurDataURL, ...imgProps } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={imgProps.alt || ''} />
  },
}))

// Mock de Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, initial, animate, transition, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, whileInView, initial, animate, transition, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, whileInView, initial, animate, transition, ...props }) => <p {...props}>{children}</p>,
    section: ({ children, whileInView, initial, animate, transition, ...props }) => <section {...props}>{children}</section>,
    nav: ({ children, whileInView, initial, animate, transition, ...props }) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock de Vercel Analytics
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})
global.localStorage = localStorageMock

// Mock de IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock de ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock de Performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
  },
})

// Mock de requestAnimationFrame y cancelAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 0)
  return 1
})

global.cancelAnimationFrame = jest.fn()

// Mock de fetch
global.fetch = jest.fn()

// Mock de console methods para evitar ruido en tests
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalConsoleError.call(console, ...args)
  }
  
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning:') || args[0].includes('Deprecation'))
    ) {
      return
    }
    originalConsoleWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
})

// Mock de scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
})

// Mock de getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn(() => ({
    getPropertyValue: jest.fn(() => ''),
  })),
})

// Mock de document.createRange
document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})

// Mock de window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn(),
})

// Mock de navigator
Object.defineProperty(window, 'navigator', {
  writable: true,
  value: {
    userAgent: 'jest',
    language: 'es-ES',
    languages: ['es-ES', 'en-US'],
    onLine: true,
  },
}) 