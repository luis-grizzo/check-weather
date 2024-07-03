import { Button } from '@/components'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('should match snapshot', () => {
    const { container } = render(<Button>test</Button>)

    expect(container).toMatchSnapshot()
  })
})
