import { DisplayTime } from '@/components'
import { render } from '@testing-library/react'

describe('DisplayTime', () => {
  it('should match snapshot', () => {
    const timestamp = new Date('June 17, 2024 16:38:11').getTime() / 1000

    const { container } = render(
      <DisplayTime description="test" timestamp={timestamp} />
    )

    expect(container).toMatchSnapshot()
  })
})
