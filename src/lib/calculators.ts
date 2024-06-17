export const calculatePeriod = (
  currentTime: number,
  sunrise: number,
  sunset: number
) => (currentTime > sunrise && currentTime < sunset ? 'day' : 'night')

export const calculateRandomIndex = (array: Array<unknown>) =>
  Math.floor(Math.random() * array.length)
