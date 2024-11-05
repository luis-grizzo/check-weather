export const positiveOrZero = (number: number) => Math.max(0, number)

export const metersToKilometers = (meters: number) => Math.round(meters / 1_000)

export const calculateRandomIndex = (array: Array<unknown>) =>
  Math.floor(Math.random() * array.length)

// export const kelvinToCelcius = (kelvinDegrees: number) =>
//   Math.round(kelvinDegrees - 273.15)

// export const celciusToFahrenheit = (celciusDegrees: number) =>
//   Math.round(celciusDegrees * 1.8 + 32)

export const milesPerHourToMetersPerSecond = (milesPerHour: number) =>
  Math.round(milesPerHour * 0.44704)

export const fahrenheitToCelcius = (fahrenheitDegrees: number) =>
  Math.round((fahrenheitDegrees - 32) / 1.8)

export const formatNumberSeparators = (value: number) => {
  return value.toLocaleString('en-US')
}
