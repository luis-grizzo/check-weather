'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { layoutIcons } from '@/constants/icons'
import { hourInMilliseconds } from '@/constants/timeMarks'
import { formatTimer } from '@/lib/stringFormaters'

interface RefreshButtonProps {
  unixTimestampOfLastRequest: number
}

export function RefreshButton({
  unixTimestampOfLastRequest
}: RefreshButtonProps) {
  const router = useRouter()

  const [isDisabled, setIsDisabled] = useState(true)
  const [countdownTimer, setCountdownTimer] = useState<string | undefined>(
    undefined
  )

  const refresh = () => router.refresh()

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now()
      const revalidateTime =
        unixTimestampOfLastRequest * 1_000 + hourInMilliseconds

      const remainTime = revalidateTime - currentTime
      const formattedTimer = formatTimer(remainTime)

      setCountdownTimer(formattedTimer)

      setIsDisabled(!!remainTime)
    }, 1_000)

    if (!isDisabled) clearInterval(timer)

    return () => clearInterval(timer)
  }, [unixTimestampOfLastRequest, isDisabled])

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        className="flex items-center justify-center p-2 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        onClick={refresh}
        disabled={isDisabled}
      >
        <Image
          src={
            countdownTimer ? layoutIcons.refresh : layoutIcons.progress_activity
          }
          alt={countdownTimer ? 'Refresh icon' : 'Loading icon'}
          className={`w-6 aspect-square ${!countdownTimer ? 'animate-spin' : ''}`}
        />
      </button>

      {countdownTimer && <span className="text-xs">{countdownTimer}</span>}
    </div>
  )
}
