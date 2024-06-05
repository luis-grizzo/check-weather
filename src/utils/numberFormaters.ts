export const roundValue = (number: number) => Math.round(number)

export const roundDown = (number: number) => Math.floor(number)

export const roundUp = (number: number) => Math.ceil(number)

export const metersToKilometers = (meters: number) => roundDown(meters / 1000)
