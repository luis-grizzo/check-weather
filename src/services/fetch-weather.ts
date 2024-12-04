import { formatWeatherResponse } from '@/lib/format-weather-response'

export async function fetchWeather({
  latitude,
  longitude,
  locale
}: {
  latitude: string
  longitude: string
  locale: string
}) {
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    lang: locale.replace(/-/gi, '_'),
    appid: String(process.env.OPEN_WEATHER_API_KEY)
  })

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`
  )

  if (!res.ok) {
    const { statusText } = res

    throw new Error(`Failed to fetch data - ${statusText}`)
  }

  const weather = formatWeatherResponse(await res.json())

  return weather
}
