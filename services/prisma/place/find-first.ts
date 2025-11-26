import { type Place, prisma } from '@/lib/prisma'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

export async function findFirstPlace(params: Pick<Place, 'latitude' | 'longitude'>) {
  try {
    const place = await prisma.place.findFirst({
      where: {
        latitude: {
          equals: params.latitude
        },
        longitude: {
          equals: params.longitude
        }
      },
      select: {
        id: true
      }
    })

    return place
  } catch (error) {
    const message = ErrorMessage.PRISMA_ERROR

    logError({
      alias: 'findFirstPlace',
      path: '@/services/prisma/place/find-first.ts',
      error
    })

    throw new Error(message)
  }
}
