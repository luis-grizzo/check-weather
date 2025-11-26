import { IWeatherFactoryResponse, weatherFactory } from '@/lib/weather-factory'

import { OPEN_WEATHER_API_KEY } from '@/shared/constants'
import { ErrorMessage, WeatherConditions } from '@/shared/enums'
import { logError } from '@/shared/utils'
import { type ICoordinates } from '@/shared/types/geolocation'

type TCurrentWeatherRequest = ICoordinates

export interface ICurrentWeatherResponse {
  weather: Array<{
    main: WeatherConditions
    description: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    sea_level: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  rain?: {
    '1h': number
  }
  snow?: {
    '1h': number
  }
  dt: number
  sys: {
    sunrise: number
    sunset: number
  }
  timezone: number
}

export async function currentWeather(
  params: TCurrentWeatherRequest
): Promise<IWeatherFactoryResponse> {
  try {
    const searchParams = new URLSearchParams({
      lat: String(params.latitude),
      lon: String(params.longitude),
      units: 'metric',
      lang: 'pt_br',
      appid: String(OPEN_WEATHER_API_KEY)
    })

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${searchParams}`)

    if (!response.ok) {
      const error = await response.json()

      throw new Error(error)
    }

    const raw: ICurrentWeatherResponse = await response.json()

    const weather = await weatherFactory(raw)

    return weather
  } catch (error) {
    const message = ErrorMessage.OPEN_WEATHER_ERROR

    logError({
      alias: 'currentWeather',
      path: '@/services/open-weather/current-weather.ts',
      error
    })

    throw new Error(message)
  }
}
