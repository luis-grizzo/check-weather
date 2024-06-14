export const calculatePeriod = (
  currentTime: number,
  sunrise: number,
  sunset: number
) => (currentTime > sunrise && currentTime < sunset ? 'day' : 'night')
