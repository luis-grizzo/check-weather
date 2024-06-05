'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useLocation } from '@/hooks/useLocation'
import { randomIcon } from '@/utils'

export default function Home() {
  const router = useRouter()

  const { coords, error } = useLocation()

  useEffect(() => {
    if (error) {
      throw new Error(error.message)
    }

    if (coords) {
      const path = encodeURIComponent(`${coords.latitude},${coords.longitude}`)

      router.push(`/${path}`)
    }
  }, [coords, error])

  return (
    <main className="flex items-center justify-center h-dvh w-dvw">
      <Image src={randomIcon} alt="" className="w-24 aspect-square" />
    </main>
  )
}
