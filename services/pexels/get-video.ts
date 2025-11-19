import { pexels, Video } from '@/lib/pexels'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

interface IShowVideoRequest {
  id: string
}

export async function getVideo(params: IShowVideoRequest): Promise<Video> {
  try {
    const video = await pexels.videos.show({ id: params.id })

    return video
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'getImage',
      path: '@/services/unsplash/get-image.ts',
      error
    })

    throw new Error(message)
  }
}
