import type {
  FetchForecastResponse,
  FormattedFetchForecastResponse,
  FormattedForecast
} from '@/types/forecast'

import type { WeatherTypes } from '@/types/weather'
import { formatDateTime } from '@/utils/string-utils'

export function formatForecastResponse(
  response: FetchForecastResponse
): FormattedFetchForecastResponse {
  const grouped: {
    [date: string]: {
      date: string
      forecasts: FormattedForecast[]
    }
  } = {}

  for (const forecast of response.list) {
    const dateKey = formatDateTime(forecast.dt, { dateStyle: 'short' })
    const formattedDate = formatDateTime(forecast.dt, {
      month: 'short',
      day: '2-digit'
    })

    if (!grouped[dateKey]) {
      grouped[dateKey] = { date: formattedDate, forecasts: [] }
    }

    const formattedForecast: FormattedForecast = {
      time: forecast.dt,
      type: forecast.weather[0].main.toLowerCase() as WeatherTypes,
      description: forecast.weather[0].description,
      temp: forecast.main.temp,
      feels_like_temp: forecast.main.feels_like,
      min_temp: forecast.main.temp_min,
      max_temp: forecast.main.temp_max,
      visibility: forecast.visibility,
      precipitation_prob: forecast.pop,
      rain_last_3h: forecast.rain?.['3h'],
      snow_last_3h: forecast.snow?.['3h'],
      day_part: forecast.sys.pod,
      wind_speed: forecast.wind.speed
    }

    grouped[dateKey].forecasts.push(formattedForecast)
  }

  const list = Object.values(grouped)

  const requestUnixTimestamp = Date.now()

  return {
    requestUnixTimestamp,
    list,
    location: {
      city: response.city.name,
      latitude: response.city.coord.lat,
      longitude: response.city.coord.lon,
      population: response.city.population,
      country: response.city.country,
      timezone: response.city.timezone,
      sunset: response.city.sunset,
      sunrise: response.city.sunrise
    }
  }
}
