import { render } from '@testing-library/react'

import { FancyIcons } from '@/components/client/fancy-icons'

describe('FancyIcons', () => {
  it('should match snapshot', () => {
    const { container } = render(<FancyIcons />)

    expect(container).toMatchSnapshot()
  })
})
