import Image from 'next/image'

import { layoutIcons } from '@/constants/icons'

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <Image
        src={layoutIcons.progress_activity}
        alt=""
        className="w-24 aspect-square animate-spin"
      />
    </main>
  )
}
