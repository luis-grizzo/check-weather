import { render, screen } from '@testing-library/react'

import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  it('should match snapshot', () => {
    const { container } = render(<Separator />)

    expect(container).toMatchSnapshot()
  })

  it('should render on vertical when requested', () => {
    render(<Separator role="separator" orientation="vertical" />)

    const eSeparator = screen.getByRole('separator')

    expect(eSeparator).toHaveClass('h-full w-[1px]')
  })
})
