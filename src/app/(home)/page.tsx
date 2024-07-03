'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { weatherIcons } from '@/constants/icons'
import { imperialUnitLanguages } from '@/constants/measurementUnits'

import { Button } from '@/components'

import { truncateToOneDecimal } from '@/lib/stringFormaters'

export default function Home() {
  const router = useRouter()

  const [error, setError] = useState({ isError: false, message: '' })

  const locationProvided = ({
    coords: { latitude, longitude }
  }: GeolocationPosition) => {
    const truncatedLatitude = truncateToOneDecimal(latitude)
    const truncatedLongitude = truncateToOneDecimal(longitude)

    const measurementUnit = imperialUnitLanguages.includes(navigator.language)
      ? 'imperial'
      : 'metric'

    const path = encodeURIComponent(
      `${truncatedLatitude},${truncatedLongitude},${measurementUnit}`
    )

    router.push(`/${path}`)
  }

  const locationRefused = ({ message }: GeolocationPositionError) => {
    setError({ isError: true, message })
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError({
        isError: true,
        message: 'Geolocation is not supported by your device'
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        locationProvided,
        locationRefused
      )
    }
  }

  const checkPermission = ({ state }: PermissionStatus) => {
    if (state !== 'prompt') requestLocation()
  }

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(checkPermission)
  }, [])

  useEffect(() => {
    if (error.isError) throw new Error(error.message)
  }, [error])

  const MotionImage = motion(Image)

  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <div className="flex items-center gap-4">
        <Image
          priority
          src={weatherIcons.clear_day.src}
          alt={weatherIcons.clear_day.alt}
          className="w-8 xs:w-9 sm:w-10 md:w-12 lg:w-[60px] xl:w-[72px] aspect-square"
        />

        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Check Weather
        </h1>
      </div>

      <p className="text-base text-center">Consult your local weather info!</p>

      <Button onClick={requestLocation}>Let&apos;s start!</Button>

      <MotionImage
        initial={{ y: -100, opacity: 0, rotate: -48 }}
        animate={{ y: 0, opacity: 1, rotate: -24 }}
        transition={{ delay: 0.2 }}
        src={weatherIcons.clear_day.src}
        alt={weatherIcons.clear_day.alt}
        className="absolute top-[calc(76px_-_96px)] -left-24 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ y: -100, opacity: 0, translateX: '-50%' }}
        animate={{ y: 0, opacity: 1 }}
        src={weatherIcons.weather_mix.src}
        alt={weatherIcons.weather_mix.alt}
        className="hidden md:block absolute top-[calc(76px_-_96px)] left-1/2 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ y: -100, opacity: 0, rotate: 24 }}
        animate={{ y: 0, opacity: 1, rotate: 12 }}
        transition={{ delay: 0.1 }}
        src={weatherIcons.mist.src}
        alt={weatherIcons.mist.alt}
        className="absolute top-[calc(76px_-_96px)] -right-24 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ x: -100, opacity: 0, translateY: '-50%' }}
        animate={{ x: 0, opacity: 1 }}
        src={weatherIcons.airwave.src}
        alt={weatherIcons.airwave.alt}
        className="hidden md:block absolute top-1/2 -left-24 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ x: 100, opacity: 0, translateY: '-50%' }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        src={weatherIcons.thunderstorm.src}
        alt={weatherIcons.thunderstorm.alt}
        className="hidden md:block absolute top-1/2 -right-24 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ y: 100, opacity: 0, rotate: 24 }}
        animate={{ y: 0, opacity: 1, rotate: 12 }}
        src={weatherIcons.foggy.src}
        alt={weatherIcons.foggy.alt}
        className="absolute bottom-[calc(76px_-_96px)] -left-24 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ y: 100, opacity: 0, translateX: '-50%' }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        src={weatherIcons.storm.src}
        alt={weatherIcons.storm.alt}
        className="hidden md:block absolute bottom-[calc(76px_-_96px)] left-1/2 w-52 aspect-square -z-50"
      />

      <MotionImage
        initial={{ y: 100, opacity: 0, rotate: -48 }}
        animate={{ y: 0, opacity: 1, rotate: -24 }}
        transition={{ delay: 0.3 }}
        src={weatherIcons.clear_night.src}
        alt={weatherIcons.clear_night.alt}
        className="absolute bottom-[calc(76px_-_96px)] -right-24 w-52 aspect-square -z-50"
      />
    </main>
  )
}
