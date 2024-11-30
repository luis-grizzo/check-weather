export type WeatherTypes =
  | 'clear'
  | 'clouds'
  | 'drizzle'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'smoke'
  | 'haze'
  | 'dust'
  | 'fog'
  | 'sand'
  | 'ash'
  | 'squall'
  | 'tornado'

export interface FetchWeatherResponse {
  weather: Array<{
    main: WeatherTypes
    description: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
  }
  dt: number
  sys: {
    country?: string
    sunrise: number
    sunset: number
  }
  rain?: {
    '1h': number
  }
  snow?: {
    '1h': number
  }
  name: string
}

export interface FormattedFetchWeatherResponse {
  type: WeatherTypes
  description: string
  time: number
  sunrise: number
  sunset: number
  curr_temp: number
  feels_like_temp: number
  curr_min_temp: number
  curr_max_temp: number
  visibility: number
  wind_speed: number
  humidity: number
  rain_1h?: number
  snow_1h?: number
  location: {
    country?: string
    city: string
  }
}
