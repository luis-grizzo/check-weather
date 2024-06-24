import { act } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { hourInMilliseconds } from '@/constants/timeMarks'

import { RefreshButton } from '@/components/RefreshButton'

const unixTimestamp = 1718729676
const secondInMilliseconds = 1_000

jest.useFakeTimers()
jest.setSystemTime(
  new Date(unixTimestamp * 1_000 + hourInMilliseconds - secondInMilliseconds)
)

const refreshMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      refresh: refreshMock
    }
  }
}))

describe('RefreshButton', () => {
  afterAll(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  beforeEach(() => {
    render(<RefreshButton unixTimestampOfLastRequest={unixTimestamp} />)
  })

  it('should match snapshot', () => {
    const { container } = render(
      <RefreshButton unixTimestampOfLastRequest={unixTimestamp} />
    )

    expect(container).toMatchSnapshot()
  })

  it('should enable button when the timer reaches zero', async () => {
    const eButton = screen.getByRole('button') as HTMLButtonElement

    expect(eButton.disabled).toBeTruthy()

    act(() => {
      jest.advanceTimersByTime(2_000)
    })

    await waitFor(() => {
      const eButton = screen.getByRole('button') as HTMLButtonElement

      expect(eButton.disabled).toBeFalsy()
    })
  })

  it('should call router refresh on button click', async () => {
    act(() => {
      jest.advanceTimersByTime(2_000)
    })

    await waitFor(() => {
      const eButton = screen.getByRole('button') as HTMLButtonElement

      fireEvent.click(eButton)

      expect(refreshMock).toHaveBeenCalled()
    })
  })
})
