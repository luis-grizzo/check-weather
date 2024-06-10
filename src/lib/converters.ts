import { roundDown, roundValue } from './numberFormaters'

export const metersToKilometers = (meters: number) =>
  `${roundDown(meters / 1000)} km`

export const metersToMiles = (meters: number) =>
  `${roundDown(meters * 0.000621371)} mi`

export const metersPerSecondToKilometersPerHour = (metersPerSecond: number) =>
  `${roundValue(metersPerSecond * 3.6)} km/h`
