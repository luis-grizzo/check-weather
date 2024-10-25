import { openWeatherUrl } from '@/constants/openWeather'
import { timeUnits } from '@/constants/timeUnits'

import { formatForecastResponse } from '@/lib/forecastFormatter'

interface FetchForecastProps {
  latitude: string
  longitude: string
}

export async function fetchForecast({
  latitude,
  longitude
}: FetchForecastProps) {
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    lang: 'en',
    appid: String(process.env.OPEN_WEATHER_API_KEY)
  })

  const res = await fetch(`${openWeatherUrl}/forecast?${params}`, {
    next: { revalidate: (timeUnits.hour / 1_000) * 3 }
  })

  if (!res.ok) {
    const { statusText } = res

    throw new Error(`Failed to fetch data - ${statusText}`)
  }

  const weather = formatForecastResponse(await res.json())

  return weather
}
