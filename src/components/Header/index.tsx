'use client'

import { useEffect, useState } from 'react'

import { hourInMilliseconds } from '@/constants/timeMarks'

import {
  formatCountryName,
  formatDate,
  formatTime,
  formatTimer
} from '@/lib/stringFormaters'

import type { FetchWeatherFactoredResponse } from '@/utils/weatherUtils'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  location: FetchWeatherFactoredResponse['location']
  requestTimestamp: number
}

export function Header({ location, requestTimestamp }: HeaderProps) {
  const router = useRouter()

  const [countdownTimer, setCountdownTimer] = useState('--:--')
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now()
      const revalidateTime = requestTimestamp * 1_000 + hourInMilliseconds

      const remainTime = revalidateTime - currentTime
      const validatedRemainTime = remainTime < 0 ? 0 : remainTime

      const formattedTimer = formatTimer(validatedRemainTime)

      setCountdownTimer(formattedTimer)

      if (!validatedRemainTime) {
        clearInterval(timer)

        setShouldRefresh(true)
      }
    }, 1_000)

    return () => clearInterval(timer)
  }, [requestTimestamp])

  useEffect(() => {
    if (shouldRefresh) {
      router.refresh()

      setShouldRefresh(false)
    }
  }, [shouldRefresh])

  return (
    <header className="flex items-center justify-between container mx-auto px-8 py-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs">{`Next forecast in ${countdownTimer}`}</span>

        {location.city && (
          <span className="text-lg">
            {`${location.city}, ${formatCountryName(location.country)}`}
          </span>
        )}

        <span className="text-xs">{`${formatTime(requestTimestamp)} - ${formatDate(requestTimestamp)}`}</span>
      </div>
    </header>
  )
}
