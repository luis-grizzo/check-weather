import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import messages from '@root/messages/en.json'

import { Location } from '@/components/client/location'

describe('Location', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Location
          location={{ city: 'Jaú', country: 'BR' }}
          description="test description"
        />
      </NextIntlClientProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('should return the default value if no location data is provided', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Location location={{ city: '' }} />
      </NextIntlClientProvider>
    )

    const eDefault = screen.getByText(/international waters/gi)

    expect(eDefault).toBeInTheDocument()
  })
})
