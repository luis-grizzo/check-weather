'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

import { Button } from './ui/button'

export function RevalidatePath({ data }: { data: { timestamp: number } }) {
  const router = useRouter()

  const [isDisabled, setIsDisabled] = useState(true)

  function revalidate() {
    router.refresh()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.timestamp + 3_600_000 < Date.now()) {
        setIsDisabled(false)
        clearInterval(interval)
      } else setIsDisabled(true)
    }, 1_000)

    return () => {
      clearInterval(interval)
    }
  }, [data.timestamp])

  return (
    <Button variant="ghost" size="icon" disabled={isDisabled} onClick={revalidate}>
      <RefreshCw />
    </Button>
  )
}
