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
  name: string
}

export interface FormattedFetchWeatherResponse {
  type: WeatherTypes
  description: string
  curr_temp: number
  feels_like_temp: number
  curr_min_temp: number
  curr_max_temp: number
  time: number
  sunrise: number
  sunset: number
  visibility: number
  wind_speed: number
  humidity: number
  location: {
    city: string
    country?: string
  }
}
