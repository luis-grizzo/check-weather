import { WeatherTypes } from '@/types/weather'

export interface FetchForecastResponse {
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
    }
    weather: Array<{
      main: WeatherTypes
      description: string
    }>
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    visibility: number
    pop: number
    rain?: {
      '3h': number
    }
    snow?: {
      '3h': number
    }
    sys: {
      pod: 'n' | 'd'
    }
  }>
  city: {
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface FormattedFetchForecastResponse {
  requestUnixTimestamp: number
  list: FormattedForecastsList[]
  location: {
    city: string
    latitude: number
    longitude: number
    country?: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface FormattedForecastsList {
  date: string
  forecasts: FormattedForecast[]
}

export interface FormattedForecast {
  time: number
  type: WeatherTypes
  description: string
  temp: number
  feels_like_temp: number
  min_temp: number
  max_temp: number
  visibility: number
  precipitation_prob: number
  rain_last_3h?: number
  snow_last_3h?: number
  day_part: 'n' | 'd'
  wind_speed: number
}
