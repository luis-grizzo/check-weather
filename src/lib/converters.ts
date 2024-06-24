import { roundValue } from './numberFormaters'

export const metersToKilometers = (meters: number) => roundValue(meters / 1_000)
