import { render } from '@testing-library/react'

import { InfoPanel } from '@/components/InfoPanel'

describe('InfoPanel', () => {
  it('should match snapshot', () => {
    const { container } = render(<InfoPanel type="info">test</InfoPanel>)

    expect(container).toMatchSnapshot()
  })

  it('should render info variant correctly', () => {
    const { getByRole } = render(<InfoPanel type="info">test</InfoPanel>)

    const eInfoPanel = getByRole('dialog')

    expect(
      eInfoPanel.className.includes(
        'text-blue-950 bg-blue-100/60 border-blue-600/10'
      )
    ).toBeTruthy()
  })

  it('should render error variant correctly', () => {
    const { getByRole } = render(<InfoPanel type="error">test</InfoPanel>)

    const eInfoPanel = getByRole('dialog')

    expect(
      eInfoPanel.className.includes(
        'text-red-950 bg-red-100/60 border-red-600/10'
      )
    ).toBeTruthy()
  })
})
