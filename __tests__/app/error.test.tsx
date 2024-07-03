import { fireEvent, render, screen } from '@testing-library/react'

import Error from '@/app/error'

const resetMock = jest.fn()

describe('Error', () => {
  beforeEach(() => {
    render(
      <Error
        error={{ name: 'error name', message: 'error message' }}
        reset={resetMock}
      />
    )
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Error
        error={{ name: 'error name', message: 'error message' }}
        reset={resetMock}
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('should call reset function on button click', () => {
    const eButton = screen.getByRole('button') as HTMLButtonElement

    fireEvent.click(eButton)

    expect(resetMock).toHaveBeenCalled()
  })
})
