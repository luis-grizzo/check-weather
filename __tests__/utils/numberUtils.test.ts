import {
  calculateRandomIndex,
  kelvinToCelcius,
  kelvinToFahrenheit,
  metersToKilometers,
  positiveOrZero
} from '@/utils/number-utils'

describe('calculateRandomIndex', () => {
  it('should return a valid index based on array lenght', () => {
    const arr = [1, 2, 3, 4, 5]

    const index = calculateRandomIndex(arr)

    expect(arr[index]).toBeTruthy()
  })
})

describe('metersToKilometers', () => {
  it('should return the correct rounded value', () => {
    expect(metersToKilometers(9_132)).toBe(9)

    expect(metersToKilometers(9_932)).toBe(10)
  })
})

describe('positiveOrZero', () => {
  it('should return the correct value', () => {
    expect(positiveOrZero(10)).toBe(10)

    expect(positiveOrZero(-10)).toBe(0)
  })
})

describe('kelvinToCelcius', () => {
  it('should return the correct value', () => {
    expect(kelvinToCelcius(300)).toBe(27)
  })
})

describe('kelvinToFahrenheit', () => {
  it('should return the correct value', () => {
    expect(kelvinToFahrenheit(300)).toBe(80)
  })
})
