'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { weatherIcons } from '@/constants/icons'
import { imperialUnitLanguages } from '@/constants/measurementUnits'

import { useLocation } from '@/hooks/useLocation'

import { InfoPanel } from '@/components'

export default function Home() {
  const router = useRouter()

  const { coords, error } = useLocation()

  useEffect(() => {
    if (error) {
      throw new Error(error.message)
    }

    if (coords) {
      const measurementUnit = imperialUnitLanguages.includes(navigator.language)
        ? 'imperial'
        : 'metric'

      const path = encodeURIComponent(
        `${coords.latitude},${coords.longitude},${measurementUnit}`
      )

      router.push(`/${path}`)
    }
  }, [coords, error])

  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <Image
        src={weatherIcons.clear_day}
        alt="Random weather icon"
        className="w-24 aspect-square"
      />

      <h2 className="text-lg">Welcome to Check Weather!</h2>

      <InfoPanel type="info">
        Please provide access to your location to be able to use the app!
      </InfoPanel>
    </main>
  )
}
