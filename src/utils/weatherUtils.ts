import {
  formatCountryName,
  formatDate,
  formatTime
} from '@/lib/stringFormaters'

import {
  calculatePeriod,
  calculateVisibility,
  calculateWindSpeed
} from '@/lib/calculators'

import { roundDown, roundUp, roundValue } from '@/lib/numberFormaters'

import type { FetchWeatherResponse } from '@/services/fetchWeather'
import type { GenericWeatherInfo, WeatherTypes } from '@/types/weatherTypes'

export interface FetchWeatherFactoredResponse {
  type: WeatherTypes
  description: string
  temperature: string
  forecast_temperatures: GenericWeatherInfo[]
  time: string
  unixTimestamp: number
  forecast_times: GenericWeatherInfo[]
  period: 'day' | 'night'
  visibility: string
  wind_speed: string
  humidity: string
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
    temperature: `${roundValue(response.main.temp)}°`,
    forecast_temperatures: [
      {
        description: 'Feels like',
        value: `${roundValue(response.main.feels_like)}°`
      },
      {
        description: 'Min',
        value: `${roundDown(response.main.temp_min)}°`
      },
      {
        description: 'Max',
        value: `${roundUp(response.main.temp_max)}°`
      }
    ],
    time: `${formatTime(response.dt)} - ${formatDate(response.dt)}`,
    unixTimestamp: response.dt,
    forecast_times: [
      {
        description: 'Sunrise',
        value: formatTime(response.sys.sunrise)
      },
      {
        description: 'Sunset',
        value: formatTime(response.sys.sunset)
      }
    ],
    period: calculatePeriod(
      response.dt,
      response.sys.sunrise,
      response.sys.sunset
    ),
    visibility: calculateVisibility(response.sys.country, response.visibility),
    wind_speed: calculateWindSpeed(response.sys.country, response.wind.speed),
    humidity: `${response.main.humidity}%`,
    location: {
      city: response.name,
      country: formatCountryName(response.sys.country)
    }
  }
}
