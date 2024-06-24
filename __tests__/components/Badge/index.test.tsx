import { render } from '@testing-library/react'

import { Badge } from '@/components/Badge'

describe('Badge', () => {
  it('should match snapshot', () => {
    const { container } = render(<Badge>test</Badge>)

    expect(container).toMatchSnapshot()
  })
})
