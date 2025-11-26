import { type Location, prisma } from '@/lib/prisma'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

export async function createLocation(
  params: Pick<Location, 'latitude' | 'longitude' | 'placeId' | 'owner'>
) {
  try {
    const location = await prisma.location.create({
      data: {
        ...params
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
      alias: 'createLocation',
      path: '@/services/prisma/location/create.ts',
      error
    })

    throw new Error(message)
  }
}
