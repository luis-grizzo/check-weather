import {
  PEXELS_VIDEO_ID_ATMOSPHERE,
  PEXELS_VIDEO_ID_CLEAR,
  PEXELS_VIDEO_ID_CLOUDS,
  PEXELS_VIDEO_ID_DRIZZLE,
  PEXELS_VIDEO_ID_RAIN,
  PEXELS_VIDEO_ID_SNOW,
  PEXELS_VIDEO_ID_THUNDERSTORM
} from '@/shared/constants'

export enum WeatherConditions {
  CLEAR = 'Clear',
  CLOUDS = 'Clouds',
  SNOW = 'Snow',
  RAIN = 'Rain',
  DRIZZLE = 'Drizzle',
  THUNDERSTORM = 'Thunderstorm',
  ATMOSPHERE = 'Atmosphere'
}

export const weatherVideosIds = {
  [WeatherConditions.CLEAR]: PEXELS_VIDEO_ID_CLEAR,
  [WeatherConditions.CLOUDS]: PEXELS_VIDEO_ID_CLOUDS,
  [WeatherConditions.SNOW]: PEXELS_VIDEO_ID_SNOW,
  [WeatherConditions.RAIN]: PEXELS_VIDEO_ID_RAIN,
  [WeatherConditions.DRIZZLE]: PEXELS_VIDEO_ID_DRIZZLE,
  [WeatherConditions.THUNDERSTORM]: PEXELS_VIDEO_ID_THUNDERSTORM,
  [WeatherConditions.ATMOSPHERE]: PEXELS_VIDEO_ID_ATMOSPHERE
}
