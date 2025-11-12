import { OPEN_WEATHER_API_KEY } from '@/shared/constants/enviorement'
import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

interface IReverseGeocodeResponse {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export async function reverseGeocode({
  latitude,
  longitude
}: {
  latitude: string
  longitude: string
}): Promise<IReverseGeocodeResponse | undefined> {
  try {
    const params = new URLSearchParams({
      lat: latitude,
      lon: longitude,
      limit: '1',
      appid: String(OPEN_WEATHER_API_KEY)
    })

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?${params}`)

    if (!response.ok) {
      const error = await response.json()

      throw new Error(error)
    }

    const [place]: IReverseGeocodeResponse[] = await response.json()

    return place as IReverseGeocodeResponse | undefined
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'reverseGeocode',
      path: '@/services/open-weather/reverse-geocoding.ts',
      error
    })

    throw new Error(message)
  }
}
