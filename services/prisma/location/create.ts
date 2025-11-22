import { type Location, prisma } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export async function createLocation(
  params: Pick<Location, 'latitude' | 'longitude' | 'placeId' | 'owner'>
) {
  try {
    const location = await prisma.location.create({
      data: {
        ...params
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        owner: true,
        consentedAt: true,
        createdAt: true,
        place: {
          select: {
            id: true,
            name: true,
            slug: true,
            state: true,
            country: true,
            latitude: true,
            longitude: true
          }
        }
      }
    })

    return location
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'createLocation',
      path: '@/services/prisma/location/create.ts',
      error
    })

    throw new Error(message)
  }
}
