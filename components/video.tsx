import { Video as IVideo } from 'pexels'

import { cn } from '@/lib/utils'

export function Video({
  data,
  className
}: {
  data: Pick<IVideo, 'height' | 'width' | 'video_files'>
  className?: string
}) {
  const hdVideo = data.video_files.find((video) => video.quality === 'hd') || data.video_files[0]

  return (
    <video
      width={data.width}
      height={data.height}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={cn('object-cover object-center h-full w-full', className)}
    >
      <source src={hdVideo.link} type={hdVideo.file_type} />
      Seu navegador não suporta a tag video.
    </video>
  )
}
