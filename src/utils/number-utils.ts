export const positiveOrZero = (number: number) => Math.max(0, number)

export const calculateRandomIndex = (array: Array<unknown>) =>
  Math.floor(Math.random() * array.length)

export const metersToKilometers = (meters: number) =>
  `${Math.round(meters / 1_000)} km`

export const metersToMiles = (meters: number) =>
  `${Math.round(meters * 0.000621371)} mi`

export const kelvinToCelcius = (kelvinDegrees: number) =>
  `${Math.round(kelvinDegrees - 273.15)}°C`

export const kelvinToFahrenheit = (kelvinDegrees: number) =>
  `${Math.round((kelvinDegrees - 273.15) * (9 / 5) + 32)}°F`

export const metersPerSecondToMilesPerHour = (metersPerSecond: number) =>
  `${Math.round(metersPerSecond * 2.237)} mi/h`

export const metersPerSecondToKilometersPerHour = (metersPerSecond: number) =>
  `${Math.round(metersPerSecond * 3.6)} km/h`
