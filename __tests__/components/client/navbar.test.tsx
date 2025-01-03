import { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import { timeUnits } from '@/constants/time-units'
import { weatherIconsArray } from '@/constants/icons'

import messages from '@root/messages/en.json'

import { Navbar } from '@/components/client/navbar'

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    )
  })

  it('should match snapshot', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    )

    expect(container).toMatchSnapshot()
  })

  // it('should change the icon every 5 seconds', async () => {
  //   const test = weatherIconsArray.map((icon) =>
  //     render(<>{icon}</>).container.querySelector('svg')
  //   )

  //   console.log({ test })

  //   act(() => {
  //     jest.advanceTimersByTime(timeUnits.second * 5)
  //   })

  //   expect(1 + 1).toBe(2)

  //   await waitFor(() =>
  //     expect(
  //       test.includes(screen.getByRole('figure') as SVGSVGElement)
  //     ).toBeTruthy()
  //   )
  // })
})
