import { type Place, prisma } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export async function findUniquePlace(params: Pick<Place, 'slug'>) {
  try {
    const place = await prisma.place.findUnique({
      where: {
        slug: params.slug
      },
      select: {
        id: true,
        name: true,
        slug: true,
        state: true,
        country: true,
        latitude: true,
        longitude: true,
        about: true,
        createdAt: true
      }
    })

    return place
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'findUniquePlace',
      path: '@/services/prisma/place/find-unique.ts',
      error
    })

    throw new Error(message)
  }
}
