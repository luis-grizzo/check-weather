import { calculatePeriod, calculateRandomIndex } from '@/lib/calculators'

describe('calculatePeriod', () => {
  it("should return 'day' when it is", () => {
    const currentTime = new Date('June 17, 2024 16:22:00').getTime()
    const sunrise = new Date('June 17, 2024 06:00:00').getTime()
    const sunset = new Date('June 17, 2024 18:00:00').getTime()

    const result = calculatePeriod(currentTime, sunrise, sunset)

    expect(result).toBe('day')
  })

  it("should return 'night' when it is", () => {
    const currentTime = new Date('June 17, 2024 19:22:00').getTime()
    const sunrise = new Date('June 17, 2024 06:00:00').getTime()
    const sunset = new Date('June 17, 2024 18:00:00').getTime()

    const result = calculatePeriod(currentTime, sunrise, sunset)

    expect(result).toBe('night')
  })
})

describe('calculateRandomIndex', () => {
  it('should return a valid index based on array lenght', () => {
    const arr = [1, 2, 3, 4, 5]

    const index = calculateRandomIndex(arr)

    expect(arr[index]).toBeTruthy()
  })
})
