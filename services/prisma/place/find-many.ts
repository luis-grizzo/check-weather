import { prisma } from '@/lib/prisma'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

export async function findManyPlaces() {
  try {
    const place = await prisma.place.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        country: true,
        createdAt: true,
        _count: {
          select: {
            locations: true
          }
        }
      }
    })

    return place
  } catch (error) {
    const message = ErrorMessage.PRISMA_ERROR

    logError({
      alias: 'findManyPlaces',
      path: '@/services/prisma/place/find-many.ts',
      error
    })

    throw new Error(message)
  }
}
