import { render } from '@testing-library/react'

import { Toast, ToastProvider } from '@/components/ui/toast'

describe('Toast', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <ToastProvider>
        <Toast />
      </ToastProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
