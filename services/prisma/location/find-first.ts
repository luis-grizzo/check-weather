import { type Location, prisma } from '@/lib/prisma'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

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
        place: {
          select: {
            slug: true
          }
        }
      }
    })

    return location
  } catch (error) {
    const message = ErrorMessage.PRISMA_ERROR

    logError({
      alias: 'findFirstLocation',
      path: '@/services/prisma/location/find-first.ts',
      error
    })

    throw new Error(message)
  }
}
