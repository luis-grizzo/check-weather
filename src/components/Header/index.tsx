'use client'

import Image from 'next/image'

import useWeather from '@/hooks/useWeather'
import { useLocation } from '@/hooks/useLocation'

import { formatTime } from '@/utils/formatTime'
import { formatDecimals } from '@/utils/formatDecimals'
import { formatDate } from '@/utils/formatDate'

import refresh from '@public/refresh.svg'

export function Header() {
  const { coords } = useLocation()

  const { weather, isLoading } = useWeather({
    latitude: formatDecimals(coords?.latitude),
    longitude: formatDecimals(coords?.longitude)
  })

  console.log({ weather })

  if (isLoading) return <span>Loading...</span>

  if (weather)
    return (
      <header className="flex items-center justify-between p-8">
        <div className="flex flex-col">
          <span className="text-lg">
            {weather.name}, {weather.sys.country}
          </span>
          <span className="text-xs">
            {formatTime(weather.dt)} - {formatDate(weather.dt)}
          </span>
        </div>

        <button className="flex items-center justify-center p-2 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-full">
          <Image src={refresh} alt=" " className="w-6 h-6" />
        </button>
      </header>
    )
}
