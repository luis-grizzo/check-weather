'use client'

import Image from 'next/image'

import { Badge } from '@/components/Badge'

import useWeather from '@/hooks/useWeather'
import { useLocation } from '@/hooks/useLocation'

import { formatDecimals } from '@/utils/formatDecimals'
import { roundValue } from '@/utils/roundValue'
import { formatTime } from '@/utils/formatTime'

import { weathers } from '@/constants/weathers'

import air from '@public/air.svg'
import water_drop from '@public/water_drop.svg'
import visibility from '@public/visibilit.svg'

export function Main() {
  const { coords } = useLocation()

  const { weather } = useWeather({
    latitude: formatDecimals(coords?.latitude),
    longitude: formatDecimals(coords?.longitude)
  })

  if (weather) {
    const isDay =
      weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset

    const color =
      weathers[weather.weather[0].main.toLowerCase() as keyof typeof weathers]
        .color
    const icon =
      weathers[weather.weather[0].main.toLowerCase() as keyof typeof weathers]
        .icon[isDay ? 'day' : 'night']

    return (
      <main
        className={`relative flex flex-col items-center justify-center gap-8 h-full p-8 overflow-hidden before:absolute before:w-3/4 before:max-w-96 before:aspect-square before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${color} before:to-transparent before:to-70%  before:rounded-full before:animate-pulse before:-z-50`}
      >
        <div className="flex items-center gap-4">
          <Image src={icon} alt=" " className="w-24 aspect-square" />

          <span className="text-8xl">{roundValue(weather.main.temp)}°</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge>Fells Like {roundValue(weather.main.feels_like)}°</Badge>
          <Badge>Min {roundValue(weather.main.temp_min)}°</Badge>
          <Badge>Max {roundValue(weather.main.temp_max)}°</Badge>
          <Badge>Sunrise {formatTime(weather.sys.sunrise)}</Badge>
          <Badge>Sunset {formatTime(weather.sys.sunset)}</Badge>
        </div>

        <span className="text-base capitalize">
          {weather.weather[0].description}
        </span>

        <div className="flex items-center justify-between gap-8 p-8 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-2xl backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            <Image src={air} alt="" className="w-8 h-8" />

            <span className="text-lg text-nowrap">
              {roundValue(weather.wind.speed)} km/h
            </span>

            <span className="text-xs">Wind</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image src={water_drop} alt="" className="w-8 h-8" />

            <span className="text-lg text-nowrap">
              {weather.main.humidity}%
            </span>

            <span className="text-xs">Humidity</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image src={visibility} alt="" className="w-8 h-8" />

            <span className="text-lg text-nowrap">
              {weather.visibility / 1000} km
            </span>

            <span className="text-xs">Visibility</span>
          </div>
        </div>
      </main>
    )
  }
}
