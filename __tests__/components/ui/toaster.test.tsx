import { act } from 'react'
import { render, renderHook, screen } from '@testing-library/react'

import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

describe('Toaster', () => {
  it('should match snapshot', () => {
    const { container } = render(<Toaster />)

    expect(container).toMatchSnapshot()
  })

  it('should render a toast when the function has been called', () => {
    const { result } = renderHook(() => useToast())

    render(<Toaster />)

    act(() => {
      result.current.toast({
        title: 'title',
        description: 'description',
        role: 'dialog'
      })
    })

    const eToast = screen.getByRole('dialog')

    expect(eToast).toBeInTheDocument()
  })
})
