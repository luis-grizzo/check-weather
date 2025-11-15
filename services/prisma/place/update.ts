import { prisma, type Place } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export async function updatePlace(params: Pick<Place, 'id' | 'description'>) {
  try {
    const place = await prisma.place.update({
      where: { id: params.id },
      data: {
        description: params.description
      }
    })

    return place
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'updatePlace',
      path: '@/services/prisma/place/update.ts',
      error
    })

    throw new Error(message)
  }
}
