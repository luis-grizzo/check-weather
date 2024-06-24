import { fireEvent, render, screen } from '@testing-library/react'

import Error from '@/app/error'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock
    }
  }
}))

describe('Error', () => {
  beforeEach(() => {
    render(<Error error={{ name: 'error name', message: 'error message' }} />)
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Error error={{ name: 'error name', message: 'error message' }} />
    )

    expect(container).toMatchSnapshot()
  })

  it('should call router push on button click', () => {
    const eButton = screen.getByRole('button') as HTMLButtonElement

    fireEvent.click(eButton)

    expect(pushMock).toHaveBeenCalledWith('/')
  })
})
