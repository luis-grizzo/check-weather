import { openWeatherUrl } from '@/constants/openWeather'

import { formatWeatherResponse } from '@/lib/weatherFormatter'

interface FetchWeatherProps {
  latitude: string
  longitude: string
}

export async function fetchWeather({ latitude, longitude }: FetchWeatherProps) {
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    lang: 'en',
    units: 'imperial',
    appid: String(process.env.OPEN_WEATHER_API_KEY)
  })

  const res = await fetch(`${openWeatherUrl}/weather?${params}`)

  if (!res.ok) {
    const { statusText } = res

    throw new Error(`Failed to fetch data - ${statusText}`)
  }

  const weather = formatWeatherResponse(await res.json())

  return weather
}
