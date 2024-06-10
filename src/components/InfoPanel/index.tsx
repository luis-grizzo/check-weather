import Image from 'next/image'

import { layoutIcons } from '@/constants/icons'

interface InfoPanelProps {
  type: 'info' | 'error'
  children: React.ReactNode
}

export function InfoPanel({ type, children }: InfoPanelProps) {
  const types = {
    info: {
      icon: layoutIcons.info,
      color: 'text-blue-950 bg-blue-100/60 border-blue-600/10'
    },
    error: {
      icon: layoutIcons.error,
      color: 'text-red-950 bg-red-100/60 border-red-600/10'
    }
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 text-sm ${types[type].color} border-1 rounded-2xl backdrop-blur`}
    >
      <Image src={types[type].icon} alt="" className="w-5 aspect-square" />

      {children}
    </div>
  )
}
