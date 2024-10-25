import type {
  FetchForecastResponse,
  FormattedFetchForecastResponse
} from '@/types/forecast'

import type { WeatherTypes } from '@/types/weather'

export function formatForecastResponse(
  response: FetchForecastResponse
): FormattedFetchForecastResponse {
  const forecasts: FormattedFetchForecastResponse['forecasts'] =
    response.list.map((forecast) => ({
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
      day_part: forecast.sys.pod
    }))

  return {
    forecasts,
    location: {
      city: response.city.name,
      coord: response.city.coord,
      population: response.city.population,
      country: response.city.country,
      timezone: response.city.timezone,
      sunset: response.city.sunset,
      sunrise: response.city.sunrise
    }
  }
}
