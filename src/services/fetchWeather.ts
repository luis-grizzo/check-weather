import { imperialUnitLanguages } from '@/constants/imperialUnitLanguages'
import { hourInSeconds } from '@/constants/timeMarks'

import { formatWeatherResponse } from '@/utils/weatherUtils'

import type { WeatherTypes } from '@/types/weatherTypes'

interface FetchWeatherProps {
  latitude: string
  longitude: string
  language: string
}

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

export async function fetchWeather({
  latitude,
  longitude,
  language
}: FetchWeatherProps) {
  const units = imperialUnitLanguages.includes(language) ? 'imperial' : 'metric'

  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    lang: 'en',
    units,
    appid: String(process.env.OPEN_WEATHER_API_KEY)
  })

  const res = await fetch(`${process.env.OPEN_WEATHER_URL}?${params}`, {
    next: { revalidate: hourInSeconds }
  })

  if (!res.ok) {
    const { statusText } = res

    throw new Error(`Failed to fetch data - ${statusText}`)
  }

  const weather = formatWeatherResponse(await res.json())

  return weather
}
