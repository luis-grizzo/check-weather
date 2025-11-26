import { type Place, prisma } from '@/lib/prisma'

import { ErrorMessage } from '@/shared/enums'
import { toKebabCase, logError } from '@/shared/utils'

export async function createPlace(
  params: Pick<Place, 'name' | 'state' | 'country' | 'latitude' | 'longitude' | 'about'>
) {
  try {
    const place = await prisma.place.create({
      data: {
        ...params,
        slug: toKebabCase(params.name)
      },
      select: {
        id: true
      }
    })

    return place
  } catch (error) {
    const message = ErrorMessage.PRISMA_ERROR

    logError({
      alias: 'createPlace',
      path: '@/services/prisma/place/create.ts',
      error
    })

    throw new Error(message)
  }
}
