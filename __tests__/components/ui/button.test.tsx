import { render, screen } from '@testing-library/react'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('should match snapshot', () => {
    const { container } = render(<Button />)

    expect(container).toMatchSnapshot()
  })

  it('should render as children when requested', () => {
    render(
      <Button asChild>
        <span>test</span>
      </Button>
    )

    const eSpan = screen.getByText(/test/gi)
    const eButton = screen.queryByRole('button')

    expect(eButton).not.toBeInTheDocument()
    expect(eSpan.tagName).toBe('SPAN')
  })
})
