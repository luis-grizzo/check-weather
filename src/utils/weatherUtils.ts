import type { FetchWeatherResponse } from '@/services/fetchWeather'
import type { WeatherTypes } from '@/types/weatherTypes'

export interface FetchWeatherFactoredResponse {
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

export function formatWeatherResponse(
  response: FetchWeatherResponse
): FetchWeatherFactoredResponse {
  return {
    type: response.weather[0].main.toLowerCase() as FetchWeatherFactoredResponse['type'],
    description: response.weather[0].description,
    curr_temp: response.main.temp,
    feels_like_temp: response.main.feels_like,
    curr_min_temp: response.main.temp_min,
    curr_max_temp: response.main.temp_max,
    time: response.dt,
    sunrise: response.sys.sunrise,
    sunset: response.sys.sunset,
    visibility: response.visibility,
    wind_speed: response.wind.speed,
    humidity: response.main.humidity,
    location: {
      city: response.name,
      country: response.sys.country
    }
  }
}
