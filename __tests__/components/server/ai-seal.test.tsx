import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import messages from '@root/messages/en.json'

import { AISeal } from '@/components/server/ai-seal'

describe('AISeal', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AISeal />
      </NextIntlClientProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
