import { render } from '@testing-library/react'

import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('should match snapshot', () => {
    const { container } = render(<Badge />)

    expect(container).toMatchSnapshot()
  })
})
