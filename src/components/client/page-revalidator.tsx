'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { timeUnits } from '@/constants/time-units'

import { formatTimer } from '@/utils/string-utils'
import { positiveOrZero } from '@/utils/number-utils'

export function PageRevalidator({
  requestUnixTimestamp,
  revalidateIn
}: {
  requestUnixTimestamp: number
  revalidateIn: number
}) {
  const router = useRouter()

  const [countdownTimer, setCountdownTimer] = useState('--:--')

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now()
      const revalidateTime = requestUnixTimestamp * 1_000 + revalidateIn

      const remainTime = revalidateTime - currentTime
      const validatedRemainTime = positiveOrZero(remainTime)

      const formattedTimer = formatTimer(validatedRemainTime)

      setCountdownTimer(formattedTimer)

      if (!validatedRemainTime) {
        router.refresh()

        clearInterval(timer)
      }
    }, timeUnits.second)

    return () => clearInterval(timer)
  }, [requestUnixTimestamp])

  return (
    <span className="text-sm text-muted-foreground geist-mono">
      {`Updating in ${countdownTimer}`}
    </span>
  )
}
