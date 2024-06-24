import { render } from '@testing-library/react'

import Loading from '@/app/loading'

describe('Loading', () => {
  it('should match snapshot', () => {
    const { container } = render(<Loading />)

    expect(container).toMatchSnapshot()
  })
})
