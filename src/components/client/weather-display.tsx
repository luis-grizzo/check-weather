'use client'

import { CloudRain, CloudSnow, Droplets, Eye, Wind } from 'lucide-react'

import { imperialUnitLanguages } from '@/constants/measurement-units'
import { climateCatalog } from '@/constants/climate-catalog'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { calculatePeriod, formatDateTime } from '@/utils/string-utils'
import {
  kelvinToCelcius,
  kelvinToFahrenheit,
  metersPerSecondToKilometersPerHour,
  metersPerSecondToMilesPerHour,
  metersToKilometers,
  metersToMiles
} from '@/utils/number-utils'

import type { FormattedFetchWeatherResponse } from '@/types/weather'

export function WeatherDisplay({
  weather
}: {
  weather: FormattedFetchWeatherResponse
}) {
  const { language } = navigator
  const isImperialUnit = imperialUnitLanguages.includes(language)

  const formatTemperature = isImperialUnit
    ? kelvinToFahrenheit
    : kelvinToCelcius

  const formatVelocity = isImperialUnit
    ? metersPerSecondToMilesPerHour
    : metersPerSecondToKilometersPerHour

  const formatDistance = isImperialUnit ? metersToMiles : metersToKilometers

  const period = calculatePeriod({
    currentTime: weather.time,
    sunrise: weather.sunrise,
    sunset: weather.sunset
  })
  const Icon = climateCatalog[weather.type].icon[period]

  return (
    <div className="relative flex flex-col items-center gap-4">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-transparent to-70% rounded-full -z-50"></span>

      <div className="flex items-center justify-center gap-4">
        <Icon className="h-[3.75rem] w-[3.75rem] lg:h-[4.5rem] lg:w-[4.5rem]" />

        <span className="text-6xl font-extrabold tracking-tight lg:text-7xl">
          {formatTemperature(weather.curr_temp)}
        </span>
      </div>

      <span className="capitalize text-lg font-semibold">
        {weather.description}
      </span>

      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="outline">
          {`Sunrise ${formatDateTime(weather.sunrise, { timeStyle: 'short' })}`}
        </Badge>

        <Badge variant="outline">
          {`Sunset ${formatDateTime(weather.sunset, { timeStyle: 'short' })}`}
        </Badge>

        <Badge variant="outline">
          {`Feels Like ${formatTemperature(weather.feels_like_temp)}`}
        </Badge>

        <Badge variant="outline">
          {`Minimal ${formatTemperature(weather.curr_min_temp)}`}
        </Badge>

        <Badge variant="outline">
          {`Maximum ${formatTemperature(weather.curr_max_temp)}`}
        </Badge>
      </div>

      <ScrollArea className="max-w-2xl w-full">
        <div className="flex items-center justify-evenly gap-4 w-full">
          {weather.rain_1h && (
            <>
              <div className="flex flex-col items-center gap-2">
                <CloudRain className="h-7 w-7" />

                <span className="text-sm font-medium leading-none">Rain</span>

                <span className="geist-mono">{`${weather.rain_1h} mm/h`}</span>
              </div>

              <Separator orientation="vertical" className="h-12" />
            </>
          )}

          {weather.snow_1h && (
            <>
              <div className="flex flex-col items-center gap-2">
                <CloudSnow className="h-7 w-7" />

                <span className="text-sm font-medium leading-none">Snow</span>

                <span className="geist-mono">{`${weather.snow_1h} mm/h`}</span>
              </div>

              <Separator orientation="vertical" className="h-12" />
            </>
          )}

          <div className="flex flex-col items-center gap-2">
            <Wind className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">Wind</span>

            <span className="geist-mono">
              {formatVelocity(weather.wind_speed)}
            </span>
          </div>

          <Separator orientation="vertical" className="h-12" />

          <div className="flex flex-col items-center gap-2">
            <Droplets className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">Humidity</span>

            <span className="geist-mono">{`${weather.humidity}%`}</span>
          </div>

          <Separator orientation="vertical" className="h-12" />

          <div className="flex flex-col items-center gap-2">
            <Eye className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">Visibility</span>

            <span className="geist-mono">
              {formatDistance(weather.visibility)}
            </span>
          </div>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
