import { prisma, type Place } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export async function updatePlace(params: Pick<Place, 'id' | 'about'>) {
  try {
    const place = await prisma.place.update({
      where: { id: params.id },
      data: {
        about: params.about
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
