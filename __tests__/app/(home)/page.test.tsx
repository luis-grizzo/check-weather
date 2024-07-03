import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Home from '@/app/(home)/page'

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

  it('should match snapshot', async () => {
    Object.defineProperty(navigator, 'permissions', {
      value: {
        query: jest.fn().mockResolvedValue({ state: 'prompt' })
      },
      writable: true
    })

    const { container } = render(<Home />)

    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })

  it('should try auto redirect if the permission is granted or denied', async () => {
    Object.defineProperty(navigator, 'permissions', {
      value: {
        query: jest.fn().mockResolvedValue({ state: 'granted' })
      },
      writable: true
    })

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest
          .fn()
          .mockImplementation((success: PositionCallback) => {
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
      },
      writable: true
    })

    render(<Home />)

    const mockResponse = encodeURIComponent('10.1,10.1,imperial')

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(`/${mockResponse}`)
    })
  })

  it('should redirect to location page with the correct imperial params', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest
          .fn()
          .mockImplementation((success: PositionCallback) => {
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
      },
      writable: true
    })

    render(<Home />)

    const eButton = screen.getByRole('button')
    fireEvent.click(eButton)

    const mockResponse = encodeURIComponent('10.1,10.1,imperial')

    expect(pushMock).toHaveBeenCalledWith(`/${mockResponse}`)
  })

  it('should redirect to location page with the correct metric params', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'pt-BR',
      writable: true
    })

    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest
          .fn()
          .mockImplementation((success: PositionCallback) => {
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
      },
      writable: true
    })

    render(<Home />)

    const eButton = screen.getByRole('button')
    fireEvent.click(eButton)

    const mockResponse = encodeURIComponent('10.1,10.1,metric')

    expect(pushMock).toHaveBeenCalledWith(`/${mockResponse}`)
  })

  it('should throw if geolocation is denied', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest
          .fn()
          .mockImplementation((_, error: PositionErrorCallback) => {
            error?.({
              code: 1,
              message: 'message',
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3
            })
          })
      },
      writable: true
    })

    expect(() => {
      render(<Home />)

      const eButton = screen.getByRole('button')
      fireEvent.click(eButton)
    }).toThrow()
  })

  it('should throw if geolocation is undefined', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true
    })

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      writable: true
    })

    expect(() => {
      render(<Home />)

      const eButton = screen.getByRole('button')
      fireEvent.click(eButton)
    }).toThrow()
  })
})
