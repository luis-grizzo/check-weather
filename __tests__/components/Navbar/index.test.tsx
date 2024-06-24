import { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { weatherIconsArray } from '@/constants/icons'

import { Navbar } from '@/components/Navbar'

jest.useFakeTimers()

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('should match snapshot', () => {
    const { container } = render(<Navbar />)

    expect(container).toMatchSnapshot()
  })

  it('should change the icon every 5 seconds', async () => {
    const possiblyAltTexts = weatherIconsArray.map((icon) => icon.alt)

    act(() => {
      jest.advanceTimersByTime(5_000)
    })

    await waitFor(() =>
      expect(
        possiblyAltTexts.includes(
          (screen.getByRole('img') as HTMLImageElement).alt
        )
      ).toBeTruthy()
    )
  })
})
