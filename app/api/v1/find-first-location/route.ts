import { z } from 'zod'

import { findFirstLocation, createPlace, createLocation, findFirstPlace } from '@/services/prisma'
import { reverseGeocode } from '@/services/open-weather'
import { generateAboutPlace } from '@/services/gemini'

import { HttpsResponseCode } from '@/shared/enums'
import {
  errorResponse,
  successResponse,
  logError,
  formatNumber,
  getErrorMessage
} from '@/shared/utils'

const FindPlaceSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
    owner: z.string()
  })
  .strict()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { success: isBodyValid, data: contents } = FindPlaceSchema.safeParse(body)

    if (!isBodyValid)
      return errorResponse({
        message: 'Corpo da requisição inválido.',
        code: HttpsResponseCode.BAD_REQUEST_400
      })

    const location = await findFirstLocation({
      latitude: formatNumber(contents.latitude, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }),
      longitude: formatNumber(contents.longitude, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })
    })

    if (!!location) return successResponse({ data: location, code: HttpsResponseCode.OK_200 })

    const openWeatherPlace = await reverseGeocode({
      latitude: contents.latitude,
      longitude: contents.longitude
    })

    if (!openWeatherPlace)
      return errorResponse({
        message: 'Não foi possível identificar sua localização.',
        code: HttpsResponseCode.NOT_FOUND_404
      })

    const place = await findFirstPlace({
      latitude: String(openWeatherPlace.lat),
      longitude: String(openWeatherPlace.lon)
    })

    if (!!place) {
      const newLocation = await createLocation({
        placeId: place.id,
        owner: contents.owner,
        latitude: formatNumber(contents.latitude, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4
        }),
        longitude: formatNumber(contents.longitude, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4
        })
      })

      return successResponse({ data: newLocation, code: HttpsResponseCode.CREATED_201 })
    }

    const newAboutPlace = await generateAboutPlace({
      name: openWeatherPlace.name,
      state: openWeatherPlace.state || null,
      country: openWeatherPlace.country
    })

    const newPlace = await createPlace({
      name: openWeatherPlace.name,
      state: openWeatherPlace.state || null,
      country: openWeatherPlace.country,
      latitude: String(openWeatherPlace.lat),
      longitude: String(openWeatherPlace.lon),
      about: newAboutPlace
    })

    const newLocation = await createLocation({
      placeId: newPlace.id,
      owner: contents.owner,
      latitude: formatNumber(contents.latitude, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }),
      longitude: formatNumber(contents.longitude, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })
    })

    return successResponse({ data: newLocation, code: HttpsResponseCode.CREATED_201 })
  } catch (error) {
    const message = getErrorMessage(error)

    logError({
      alias: 'POST',
      path: '@/app/api/v1/find-place/route.ts',
      error
    })

    return errorResponse({
      message,
      code: HttpsResponseCode.INTERNAL_SERVER_ERROR_500
    })
  }
}
