import { renderHook } from '@testing-library/react'
import { useActiveSection } from '../../hooks/seActiveSection'

// Mock de document.querySelector
const mockQuerySelector = jest.fn()
const mockGetBoundingClientRect = jest.fn()

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true
})

describe('useActiveSection Hook', () => {
  beforeEach(() => {
    mockQuerySelector.mockClear()
    mockGetBoundingClientRect.mockClear()
  })

  it('should initialize with empty active section', () => {
    const { result } = renderHook(() => useActiveSection(['#section1', '#section2']))
    expect(result.current).toBe('')
  })

  it('should add scroll event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    renderHook(() => useActiveSection(['#section1']))
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    addEventListenerSpy.mockRestore()
  })

  it('should update active section based on scroll position', () => {
    const mockSection = {
      getBoundingClientRect: mockGetBoundingClientRect
    }
    mockQuerySelector.mockReturnValue(mockSection)
    mockGetBoundingClientRect.mockReturnValue({
      top: 50,
      bottom: 200
    })

    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    renderHook(() => useActiveSection(['#section1']))
    
    const scrollHandler = addEventListenerSpy.mock.calls[0][1] as () => void
    scrollHandler()
    
    expect(mockQuerySelector).toHaveBeenCalledWith('#section1')
    expect(mockGetBoundingClientRect).toHaveBeenCalled()
    
    addEventListenerSpy.mockRestore()
  })

  it('should return cleanup function', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useActiveSection(['#section1']))
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
}) 