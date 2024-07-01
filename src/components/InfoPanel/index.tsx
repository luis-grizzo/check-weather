import Image from 'next/image'

import { layoutIcons } from '@/constants/icons'

interface InfoPanelProps {
  children: React.ReactNode
}

export function InfoPanel({ children }: InfoPanelProps) {
  return (
    <div
      role="dialog"
      className="flex items-start gap-4 p-4 text-sm text-red-950 bg-red-100/60 border-red-600/10 border-1 rounded-xl"
    >
      <Image src={layoutIcons.error} alt="" className="w-5 aspect-square" />

      {children}
    </div>
  )
}
