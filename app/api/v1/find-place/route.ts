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
import { generatePlaceDescription } from '@/services/gemini/generate-place-description'
import { updatePlace } from '@/services/prisma/place/update'

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
      if (!place.description) {
        const placeDescription = await generatePlaceDescription({
          name: place.name,
          state: place.state,
          country: place.country
        })

        await updatePlace({ id: place.id, description: placeDescription })
      }

      const newLocation = await createLocation({
        placeId: place.id,
        latitude: String(contents.latitude),
        longitude: String(contents.longitude)
      })

      return successResponse({ data: newLocation, code: HttpsResponseCode.CREATED_201 })
    }

    const newPlaceDescription = await generatePlaceDescription({
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
      description: newPlaceDescription
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
