import { type Location, prisma } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export async function findFirstLocation(params: Pick<Location, 'latitude' | 'longitude'>) {
  try {
    const location = await prisma.location.findFirst({
      where: {
        latitude: {
          equals: params.latitude
        },
        longitude: {
          equals: params.longitude
        }
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
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
      alias: 'findFirstLocation',
      path: '@/services/prisma/location/find-first.ts',
      error
    })

    throw new Error(message)
  }
}
