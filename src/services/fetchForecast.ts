import { openWeatherUrl } from '@/constants/openWeather'

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
    cnt: '8',
    lang: 'en',
    units: 'imperial',
    appid: String(process.env.OPEN_WEATHER_API_KEY)
  })

  const res = await fetch(`${openWeatherUrl}/forecast?${params}`)

  if (!res.ok) {
    const { statusText } = res

    throw new Error(`Failed to fetch data - ${statusText}`)
  }

  const weather = formatForecastResponse(await res.json())

  return weather
}
