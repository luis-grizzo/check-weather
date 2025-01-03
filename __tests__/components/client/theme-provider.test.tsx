import { render } from '@testing-library/react'

import { ThemeProvider } from '@/components/client/theme-provider'

describe('ThemeProvider', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const { container } = render(
      <ThemeProvider>
        <span>test</span>
      </ThemeProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
