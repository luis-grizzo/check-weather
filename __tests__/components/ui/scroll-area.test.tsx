import { render } from '@testing-library/react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

describe('ScrollArea', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <div className="w-24">
        <ScrollArea>
          <div className="w-96"></div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    )

    expect(container).toMatchSnapshot()
  })
})
