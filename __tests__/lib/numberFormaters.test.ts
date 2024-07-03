import { positiveOrZero, roundValue } from '@/lib/numberFormaters'

describe('roundValue', () => {
  it('should return the correct rounded value', () => {
    expect(roundValue(9.132)).toBe(9)

    expect(roundValue(9.932)).toBe(10)
  })
})

describe('positiveOrZero', () => {
  it('should return the correct value', () => {
    expect(positiveOrZero(10)).toBe(10)

    expect(positiveOrZero(-10)).toBe(0)
  })
})
