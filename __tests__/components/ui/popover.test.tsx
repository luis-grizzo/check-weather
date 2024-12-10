import { render } from '@testing-library/react'

import { Popover } from '@/components/ui/popover'

describe('Popover', () => {
  it('should match snapshot', () => {
    const { container } = render(<Popover />)

    expect(container).toMatchSnapshot()
  })
})
