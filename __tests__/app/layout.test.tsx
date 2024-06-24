import { render } from '@testing-library/react'

import RootLayout from '@/app/layout'

describe('RootLayout', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <RootLayout>
        <main>children</main>
      </RootLayout>
    )

    expect(container).toMatchSnapshot()
  })
})
