import { defaultLocale } from '@tests/constants'

import {
  calculatePeriod,
  formatCountryName,
  formatDateTime,
  truncateToOneDecimal,
  formatTimer
} from '@/utils/string-utils'

describe('stringFormatters', () => {
  beforeAll(() => {
    jest
      .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
      .mockImplementation(() => {
        return {
          timeZone: 'UTC',
          locale: 'locale',
          calendar: 'calendar',
          numberingSystem: 'numberingSystem'
        }
      })
  })

  describe('formatCountryName', () => {
    it('should throw when the code is not valid', () => {
      expect(() =>
        formatCountryName('test', { locale: defaultLocale })
      ).toThrow()
    })

    it("should return the valid code when the country doesn't exists", () => {
      expect(formatCountryName('ZL', { locale: defaultLocale })).toBe('ZL')
    })

    it('should return the correct english country name', () => {
      expect(formatCountryName('BR', { locale: defaultLocale })).toEqual(
        'Brazil'
      )

      expect(formatCountryName('US', { locale: defaultLocale })).toEqual(
        'United States'
      )
    })
  })

  describe('formatDateTime', () => {
    it('should return the formatted value', () => {
      const timestamp = new Date('2024-06-17T16:38:11Z').getTime()

      expect(
        formatDateTime(timestamp, {
          weekday: 'long',
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          locale: defaultLocale
        })
      ).toBe('Monday, June 17, 2024')
    })
  })

  describe('formatTimer', () => {
    it('should return the formatted time', () => {
      const timestamp = new Date('2024-06-17T16:38:11Z').getTime()

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

  describe('calculatePeriod', () => {
    it("should return 'day' when it is", () => {
      const currentTime = new Date('June 17, 2024 16:22:00').getTime()
      const sunrise = new Date('June 17, 2024 06:00:00').getTime()
      const sunset = new Date('June 17, 2024 18:00:00').getTime()

      const result = calculatePeriod({ currentTime, sunrise, sunset })

      expect(result).toBe('day')
    })

    it("should return 'night' when it is", () => {
      const currentTime = new Date('June 17, 2024 19:22:00').getTime()
      const sunrise = new Date('June 17, 2024 06:00:00').getTime()
      const sunset = new Date('June 17, 2024 18:00:00').getTime()

      const result = calculatePeriod({ currentTime, sunrise, sunset })

      expect(result).toBe('night')
    })
  })
})
