import { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { hourInMilliseconds } from '@/constants/timeMarks'

import { Header } from '@/components'

import { FetchWeatherFactoredResponse } from '@/utils/weatherUtils'

const unixTimestamp = new Date('June 17, 2024 16:00').getTime() / 1_000
const secondInMilliseconds = 1_000

jest.useFakeTimers()

const refreshMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      refresh: refreshMock
    }
  }
}))

const location: FetchWeatherFactoredResponse['location'] = {
  city: 'Jaú',
  country: 'BR'
}

describe('Header', () => {
  beforeEach(() => {
    jest.setSystemTime(
      new Date(unixTimestamp * 1_000 + hourInMilliseconds - 5_000)
    )

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
      jest.advanceTimersByTime(secondInMilliseconds)
    })

    await waitFor(() => {
      eTimer = screen.getByRole('timer')

      expect(eTimer.textContent).toEqual('Next forecast in 00:04')
    })
  })

  it('should call refresh when timer reaches zero', async () => {
    act(() => {
      jest.advanceTimersByTime(5_000)
    })

    await waitFor(() => {
      expect(refreshMock).toHaveBeenCalled()
    })
  })

  it('should timer not be minor than zero', () => {
    act(() => {
      jest.advanceTimersByTime(10_000)
    })

    const eTimer = screen.getByRole('timer')

    expect(eTimer.textContent).toEqual('Next forecast in 00:00')
  })
})
