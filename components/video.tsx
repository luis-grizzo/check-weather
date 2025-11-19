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
    <figure className={cn('relative h-auto w-auto overflow-hidden', className)}>
      <video
        width={data.width}
        height={data.height}
        autoPlay
        muted
        loop
        preload="none"
        className="absolute top-0 left-0 object-cover object-center h-full w-full"
      >
        <source src={hdVideo.link} type={hdVideo.file_type} />
        Seu navegador não suporta a tag video.
      </video>
    </figure>
  )
}
