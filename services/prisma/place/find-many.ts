import { prisma } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export async function findManyPlaces() {
  try {
    const place = await prisma.place.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        state: true,
        country: true,
        description: true
      }
    })

    return place
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'findManyPlaces',
      path: '@/services/prisma/place/find-many.ts',
      error
    })

    throw new Error(message)
  }
}
