import { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { timeUnits } from '@/constants/timeUnits'

import { Header } from '@/components'

import { FormattedFetchWeatherResponse } from '@/types/weather'

const unixTimestamp = new Date('June 17, 2024 16:00').getTime() / 1_000

jest.useFakeTimers()

const refreshMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      refresh: refreshMock
    }
  }
}))

const location: FormattedFetchWeatherResponse['location'] = {
  city: 'Jaú',
  country: 'BR'
}

describe('Header', () => {
  beforeEach(() => {
    jest.setSystemTime(new Date(unixTimestamp * 1_000 + timeUnits.hour - 5_000))

    render(<Header location={location} requestTimestamp={unixTimestamp} />)
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Header location={location} requestTimestamp={unixTimestamp} />
    )

    expect(container).toMatchSnapshot()
  })

  it('should update the timer', async () => {
    let eTimer = screen.getByRole('timer')

    expect(eTimer.textContent).toEqual('Next forecast in --:--')

    act(() => {
      jest.advanceTimersByTime(timeUnits.second)
    })

    await waitFor(() => {
      eTimer = screen.getByRole('timer')

      expect(eTimer.textContent).toEqual('Next forecast in 00:04')
    })
  })

  it('should call refresh when timer reaches zero', async () => {
    act(() => {
      jest.advanceTimersByTime(timeUnits.second * 5)
    })

    await waitFor(() => {
      expect(refreshMock).toHaveBeenCalled()
    })
  })

  it('should timer not be minor than zero', () => {
    act(() => {
      jest.advanceTimersByTime(timeUnits.second * 10)
    })

    const eTimer = screen.getByRole('timer')

    expect(eTimer.textContent).toEqual('Next forecast in 00:00')
  })
})
