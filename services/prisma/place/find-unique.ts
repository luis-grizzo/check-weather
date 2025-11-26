import { type Place, prisma } from '@/lib/prisma'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

export async function findUniquePlaceForMetadata(params: Pick<Place, 'slug'>) {
  try {
    const place = await prisma.place.findUnique({
      where: {
        slug: params.slug
      },
      select: {
        name: true,
        country: true
      }
    })

    return place
  } catch (error) {
    const message = ErrorMessage.PEXELS_ERROR

    logError({
      alias: 'findUniquePlaceForMetadata',
      path: '@/services/prisma/place/find-unique.ts',
      error
    })

    throw new Error(message)
  }
}

export async function findUniquePlace(params: Pick<Place, 'slug'>) {
  try {
    const place = await prisma.place.findUnique({
      where: {
        slug: params.slug
      },
      select: {
        latitude: true,
        longitude: true,
        name: true,
        country: true,
        about: true,
        createdAt: true
      }
    })

    return place
  } catch (error) {
    const message = ErrorMessage.PRISMA_ERROR

    logError({
      alias: 'findUniquePlace',
      path: '@/services/prisma/place/find-unique.ts',
      error
    })

    throw new Error(message)
  }
}
