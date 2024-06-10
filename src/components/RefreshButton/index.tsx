'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { layoutIcons } from '@/constants/icons'
import { hourInMilliseconds } from '@/constants/timeMarks'

interface RefreshButtonProps {
  unixLastRequestTime: number
}

export function RefreshButton({ unixLastRequestTime }: RefreshButtonProps) {
  const router = useRouter()

  const [isDisabled, setIsDisabled] = useState(true)

  const refresh = () => router.refresh()

  useEffect(() => {
    const timer = setTimeout(() => {
      const actualTimestamp = Date.now()
      const revalidateTime = unixLastRequestTime * 1_000 + hourInMilliseconds

      if (revalidateTime < actualTimestamp) setIsDisabled(false)
      else setIsDisabled(true)
    }, 1_000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center justify-center p-2 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={refresh}
        disabled={isDisabled}
      >
        <Image src={layoutIcons.refresh} alt="" className="w-6 h-6" />
      </button>

      <span className="text-xs"></span>
    </div>
  )
}
