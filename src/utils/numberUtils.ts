export const positiveOrZero = (number: number) => Math.max(0, number)

export const metersToKilometers = (meters: number) => Math.round(meters / 1_000)

export const calculateRandomIndex = (array: Array<unknown>) =>
  Math.floor(Math.random() * array.length)

export const kelvinToCelcius = (kelvinDegrees: number) =>
  Math.round(kelvinDegrees - 273.15)

export const kelvinToFahrenheit = (kelvinDegrees: number) =>
  Math.round((kelvinDegrees - 273.15) * (9 / 5) + 32)
