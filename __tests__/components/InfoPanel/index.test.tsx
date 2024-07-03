import { render } from '@testing-library/react'

import { InfoPanel } from '@/components/InfoPanel'

describe('InfoPanel', () => {
  it('should match snapshot', () => {
    const { container } = render(<InfoPanel>test</InfoPanel>)

    expect(container).toMatchSnapshot()
  })
})
