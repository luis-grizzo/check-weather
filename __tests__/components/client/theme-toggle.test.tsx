import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import messages from '@root/messages/en.json'

import { defaultLocale } from '@tests/constants'

import { ThemeToggle } from '@/components/client/theme-toggle'
import { act } from 'react'

describe('ThemeToggle', () => {
  const setThemeMock = jest.fn()

  beforeAll(() => {
    window.PointerEvent = MouseEvent as typeof PointerEvent

    jest.mock('next-themes', () => ({
      useTheme() {
        return {
          setTheme: setThemeMock
        }
      }
    }))
  })

  beforeEach(() => {
    render(
      <NextIntlClientProvider locale={defaultLocale} messages={messages}>
        <ThemeToggle />
      </NextIntlClientProvider>
    )
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(
      <NextIntlClientProvider locale={defaultLocale} messages={messages}>
        <ThemeToggle />
      </NextIntlClientProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('should set the dark theme when selected', async () => {
    const eTrigger = screen.getByRole('button')

    fireEvent.pointerDown(eTrigger)

    const eDarkThemeButton = screen.getByText(/dark/i)

    fireEvent.click(eDarkThemeButton)

    await waitFor(() => {
      expect(setThemeMock).toHaveBeenCalledWith('dark')
    })
  })
})
