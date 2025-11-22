import { type Place, prisma } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { toKebabCase } from '@/shared/utils/formatters'
import { logError } from '@/shared/utils/log-error'

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
        id: true,
        name: true,
        slug: true,
        state: true,
        country: true,
        latitude: true,
        longitude: true
      }
    })

    return place
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'createPlace',
      path: '@/services/prisma/place/create.ts',
      error
    })

    throw new Error(message)
  }
}
