'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { timeUnits } from '@/constants/time-units'

import { useRouter } from '@/i18n/routing'

import { formatTimer } from '@/utils/string-utils'
import { positiveOrZero } from '@/utils/number-utils'

export function PageRevalidator({
  requestTimestamp
}: {
  requestTimestamp: number
}) {
  const router = useRouter()
  const translations = useTranslations('Coordinates.PageRevalidator')

  const [countdownTimer, setCountdownTimer] = useState('--:--')

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now()
      const revalidateTime = requestTimestamp + timeUnits.hour

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
  }, [requestTimestamp])

  return (
    <span className="text-sm text-muted-foreground geist-mono">
      {translations('description', { timer: countdownTimer })}
    </span>
  )
}
