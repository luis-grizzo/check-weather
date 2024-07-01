'use client'

import { useEffect } from 'react'
import Image from 'next/image'

import { Button, InfoPanel } from '@/components'

import cloud_off from '@public/cloud_off.svg'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <Image src={cloud_off} alt="" className="w-24 aspect-square" />

      <h2 className="text-lg">Something went wrong!</h2>

      <InfoPanel type="error">{error.message}</InfoPanel>

      <Button onClick={reset}>Try again</Button>
    </main>
  )
}
