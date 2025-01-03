import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import messages from '@root/messages/en.json'

import { Footer } from '@/components/client/footer'

describe('Footer', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
