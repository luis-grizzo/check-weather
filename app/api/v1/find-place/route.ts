import { z } from 'zod'

import { findFirstLocation } from '@/services/prisma'
import { reverseGeocode } from '@/services/open-weather/reverse-geocoding'

import { HttpsResponseCode } from '@/shared/enums/https-response-codes'
import { ErrorOrigin } from '@/shared/enums/error-origin'
import { errorResponse, successResponse } from '@/shared/utils/api-helpers'
import { logError } from '@/shared/utils/log-error'
import { createPlace } from '@/services/prisma/place/create'
import { createLocation } from '@/services/prisma/location/create'
import { findFirstPlace } from '@/services/prisma/place/find-first'

const FindPlaceSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number()
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
      latitude: String(contents.latitude),
      longitude: String(contents.longitude)
    })

    if (!!location) return successResponse({ data: location, code: HttpsResponseCode.OK_200 })

    const openWeatherPlace = await reverseGeocode({
      latitude: String(contents.latitude),
      longitude: String(contents.longitude)
    })

    if (!openWeatherPlace)
      return errorResponse({
        message: 'Não foi possível encontrar o local informado.',
        code: HttpsResponseCode.NOT_FOUND_404
      })

    const place = await findFirstPlace({
      latitude: String(openWeatherPlace.lat),
      longitude: String(openWeatherPlace.lon)
    })

    if (!!place) {
      const newLocation = await createLocation({
        placeId: place.id,
        latitude: String(contents.latitude),
        longitude: String(contents.longitude)
      })

      return successResponse({ data: newLocation, code: HttpsResponseCode.CREATED_201 })
    }

    const newPlace = await createPlace({
      name: openWeatherPlace.name,
      state: openWeatherPlace.state || null,
      country: openWeatherPlace.country,
      latitude: String(openWeatherPlace.lat),
      longitude: String(openWeatherPlace.lon)
    })

    const newLocation = await createLocation({
      placeId: newPlace.id,
      latitude: String(contents.latitude),
      longitude: String(contents.longitude)
    })

    return successResponse({ data: newLocation, code: HttpsResponseCode.CREATED_201 })
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.API,
      alias: 'POST',
      path: '@/app/api/v1/find-place/route.ts',
      error
    })

    return errorResponse({ message, code: HttpsResponseCode.INTERNAL_SERVER_ERROR_500 })
  }
}
