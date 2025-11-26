import { pexels, type Video } from '@/lib/pexels'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

interface IShowVideoRequest {
  id: string
}

type TShowVideoResponse = Video

export async function showVideo(params: IShowVideoRequest): Promise<TShowVideoResponse> {
  try {
    const video = await pexels.videos.show(params)

    return video
  } catch (error) {
    logError({
      alias: 'showVideo',
      path: '@/services/pexels/show-video.ts',
      error
    })

    const message = ErrorMessage.PEXELS_ERROR

    throw new Error(message)
  }
}
