import { cn } from '@/utils/shadcn-utils'

describe('cn', () => {
  it('should return the correct value', () => {
    expect(cn(['test', 'class'])).toBe('test class')
  })
})
