import { useLocation, LocationProvider } from '@/hooks/useLocation'
import { renderHook } from '@testing-library/react'

describe('useLocation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use context initial value', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn()
      },
      writable: true
    })

    jest
      .spyOn(global.navigator.geolocation, 'getCurrentPosition')
      .mockImplementation((success) => {
        success({
          timestamp: 0,
          coords: {
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            latitude: 10.101,
            longitude: 10.101
          }
        })
      })

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider
    })

    expect(result.current).toEqual({
      coords: { latitude: '10.1', longitude: '10.1' },
      error: undefined
    })
  })

  it('should use context initial error when geolocation is not available', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true
    })

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider
    })

    expect(result.current).toEqual({
      coords: undefined,
      error: {
        message: 'Geolocation is not supported by your device.'
      }
    })
  })

  it('should use context initial error when user denies access', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn()
      },
      writable: true
    })

    jest
      .spyOn(global.navigator.geolocation, 'getCurrentPosition')
      .mockImplementation((_, error) => {
        error?.({
          code: 1,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3
        })
      })

    const { result } = renderHook(() => useLocation(), {
      wrapper: LocationProvider
    })

    expect(result.current).toEqual({
      coords: undefined,
      error: {
        message: 'User denied Geolocation'
      }
    })
  })

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useLocation())
    }).toThrow()
  })
})
