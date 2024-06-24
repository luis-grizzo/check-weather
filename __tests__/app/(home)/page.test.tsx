import { render } from '@testing-library/react'

import Home from '@/app/(home)/page'
import { LocationProvider } from '@/hooks/useLocation'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock
    }
  }
}))

describe('Home', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn()
      },
      writable: true
    })

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    const { container } = render(<Home />, { wrapper: LocationProvider })

    expect(container).toMatchSnapshot()
  })

  it('should redirect to location page with the correct imperial param when has the coordinates', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn()
      },
      writable: true
    })

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    jest
      .spyOn(navigator.geolocation, 'getCurrentPosition')
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

    render(<Home />, { wrapper: LocationProvider })

    expect(pushMock).toHaveBeenCalled()
  })

  it('should redirect to location page with the correct matric param when has the coordinates', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn()
      },
      writable: true
    })

    Object.defineProperty(navigator, 'language', {
      value: 'pt-BR',
      writable: true
    })

    jest
      .spyOn(navigator.geolocation, 'getCurrentPosition')
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

    render(<Home />, { wrapper: LocationProvider })

    expect(pushMock).toHaveBeenCalled()
  })

  it('should throw if useLocation returns error', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true
    })

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    expect(() => {
      render(<Home />, { wrapper: LocationProvider })
    }).toThrow()
  })
})
