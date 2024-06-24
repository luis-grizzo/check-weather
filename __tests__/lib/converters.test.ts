import { metersToKilometers } from '@/lib/converters'

describe('metersToKilometers', () => {
  it('should return the correct rounded value', () => {
    expect(metersToKilometers(9_132)).toBe(9)

    expect(metersToKilometers(9_932)).toBe(10)
  })
})
