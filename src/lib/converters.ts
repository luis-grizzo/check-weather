import { roundValue } from './numberFormatters'

export const metersToKilometers = (meters: number) => roundValue(meters / 1_000)
