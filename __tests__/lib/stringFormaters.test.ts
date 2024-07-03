import {
  formatCountryName,
  formatDate,
  truncateToOneDecimal,
  formatTime,
  formatTimer
} from '@/lib/stringFormaters'

describe('formatCountryName', () => {
  it('should return undefined when the code is undefined', () => {
    expect(formatCountryName(undefined)).toBe(undefined)
  })

  it('should return undefined when the code is not valid', () => {
    expect(formatCountryName('test')).toBe(undefined)
  })

  it("should return the valid code when the country doesn't exists", () => {
    expect(formatCountryName('ZL')).toBe('ZL')
  })

  it('should return the correct english country name', () => {
    expect(formatCountryName('BR')).toEqual('Brazil')

    expect(formatCountryName('US')).toEqual('United States')
  })
})

describe('formatDate', () => {
  it('should return the formatted date', () => {
    const unixTimestamp = new Date('June 17, 2024').getTime() / 1_000

    expect(formatDate(unixTimestamp)).toBe('Monday, June 17, 2024')
  })
})

describe('formatTime', () => {
  it('should return the formatted time', () => {
    const unixTimestamp = new Date('June 17, 2024 16:38').getTime() / 1_000

    expect(formatTime(unixTimestamp)).toBe('4:38 PM')
  })
})

describe('formatTimer', () => {
  it('should return the formatted time', () => {
    const timestamp = new Date('June 17, 2024 16:38:11').getTime()

    expect(formatTimer(timestamp)).toBe('38:11')
  })
})

describe('truncateToOneDecimal', () => {
  it('should return the formatted value', () => {
    expect(truncateToOneDecimal(1.123)).toBe('1.1')

    expect(truncateToOneDecimal(-11.098)).toBe('-11.0')

    expect(truncateToOneDecimal(0)).toBe('0.0')

    expect(truncateToOneDecimal(1)).toBe('1.0')
  })

  it('should handle Inifinity values', () => {
    expect(truncateToOneDecimal(Infinity)).toBe('0.0')

    expect(truncateToOneDecimal(-Infinity)).toBe('0.0')
  })
})
