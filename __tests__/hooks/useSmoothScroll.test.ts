import { renderHook } from '@testing-library/react'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

// Mock de document.getElementById
const mockGetElementById = jest.fn()
const mockScrollIntoView = jest.fn()

Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true
})

describe('useSmoothScroll Hook', () => {
  beforeEach(() => {
    mockGetElementById.mockClear()
    mockScrollIntoView.mockClear()
  })

  it('should initialize without errors', () => {
    const { result } = renderHook(() => useSmoothScroll())
    expect(result.current).toBeUndefined()
  })

  it('should add event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    renderHook(() => useSmoothScroll())
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
    addEventListenerSpy.mockRestore()
  })

  it('should handle anchor click with hash href', () => {
    const mockElement = {
      scrollIntoView: mockScrollIntoView
    }
    mockGetElementById.mockReturnValue(mockElement)

    const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
    renderHook(() => useSmoothScroll())
    
    const clickHandler = addEventListenerSpy.mock.calls[0][1] as (event: MouseEvent) => void
    
    const mockEvent = {
      target: {
        tagName: 'A',
        closest: () => ({
          getAttribute: () => '#test-section'
        })
      },
      preventDefault: jest.fn()
    } as any

    clickHandler(mockEvent)
    
    expect(mockGetElementById).toHaveBeenCalledWith('test-section')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    
    addEventListenerSpy.mockRestore()
  })
}) 