import { imperialUnitLanguages } from '@/constants/imperialUnitLanguages'

import {
  metersPerSecondToKilometersPerHour,
  metersToKilometers,
  metersToMiles
} from './converters'

import { roundValue } from './numberFormaters'

export const calculateVisibility = (
  country: string | undefined,
  meters: number
) => {
  if (country && imperialUnitLanguages.includes(country))
    return metersToMiles(meters)

  return metersToKilometers(meters)
}

export const calculateWindSpeed = (
  country: string | undefined,
  value: number
) => {
  if (country && !imperialUnitLanguages.includes(country))
    return metersPerSecondToKilometersPerHour(value)

  return `${roundValue(value)} mi/h`
}

export const calculatePeriod = (
  currentTime: number,
  sunrise: number,
  sunset: number
) => (currentTime > sunrise && currentTime < sunset ? 'day' : 'night')
