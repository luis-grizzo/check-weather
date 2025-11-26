import { OPEN_WEATHER_API_KEY } from '@/shared/constants'
import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'
import { type ICoordinates } from '@/shared/types/geolocation'

type TReverseGeocodingRequest = ICoordinates

interface IReverseGeocodeResponse {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export async function reverseGeocode(
  params: TReverseGeocodingRequest
): Promise<IReverseGeocodeResponse | undefined> {
  try {
    const searchParams = new URLSearchParams({
      lat: String(params.latitude),
      lon: String(params.longitude),
      limit: '1',
      appid: String(OPEN_WEATHER_API_KEY)
    })

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?${searchParams}`, {
      next: { revalidate: 0 }
    })

    if (!response.ok) {
      const error = await response.json()

      throw new Error(error)
    }

    const [place]: IReverseGeocodeResponse[] = await response.json()

    return place as IReverseGeocodeResponse | undefined
  } catch (error) {
    const message = ErrorMessage.OPEN_WEATHER_ERROR

    logError({
      alias: 'reverseGeocode',
      path: '@/services/open-weather/reverse-geocoding.ts',
      error
    })

    throw new Error(message)
  }
}
