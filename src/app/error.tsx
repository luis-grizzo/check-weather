'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { InfoPanel } from '@/components'

import cloud_off from '@public/cloud_off.svg'

interface ErrorProps {
  error: Error & { digest?: string }
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter()

  const returnHome = () => {
    router.push('/')

    return () => {}
  }

  useEffect(() => {
    console.error(error)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <Image src={cloud_off} alt="" className="w-24 aspect-square" />

      <h2 className="text-lg">Something went wrong!</h2>

      <InfoPanel type="error">
        Please check your browser&apos;s location access permissions and refresh
        the page or try again.
      </InfoPanel>

      <button
        onClick={returnHome}
        className="flex items-center justify-center py-3 px-4 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-lg"
      >
        Try again
      </button>
    </main>
  )
}
