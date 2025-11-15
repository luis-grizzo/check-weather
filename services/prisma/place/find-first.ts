import { type Place, prisma } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

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
        id: true,
        name: true,
        state: true,
        country: true,
        description: true
      }
    })

    return place
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'findFirstPlace',
      path: '@/services/prisma/place/find-first.ts',
      error
    })

    throw new Error(message)
  }
}
