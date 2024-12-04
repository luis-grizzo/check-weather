'use client'

import { cloneElement } from 'react'
import { useTranslations } from 'next-intl'
import { CloudRain, CloudSnow, Droplets, Eye, Wind } from 'lucide-react'

import { climateCatalog } from '@/constants/climate-catalog'

import { useTranslator } from '@/hooks/use-translator'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { calculatePeriod, formatDateTime } from '@/utils/string-utils'

import type { FormattedFetchWeatherResponse } from '@/types/weather'

export function WeatherDisplay({
  weather
}: {
  weather: FormattedFetchWeatherResponse
}) {
  const { locale, translateDistance, translateTemperature, translateVelocity } =
    useTranslator()

  const period = calculatePeriod({
    currentTime: weather.time,
    sunrise: weather.sunrise,
    sunset: weather.sunset
  })
  const icon = climateCatalog[weather.type].icon[period]

  const t = useTranslations('Coordinates.Weather')

  return (
    <div className="relative flex flex-col items-center gap-4">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-transparent to-70% rounded-full -z-50"></span>

      <div className="flex items-center justify-center gap-4">
        {cloneElement(icon, {
          className:
            'h-[3.75rem] w-[3.75rem] lg:h-[4.5rem] lg:w-[4.5rem] text-emphasis'
        })}

        <span className="text-6xl font-extrabold tracking-tight lg:text-7xl">
          {translateTemperature(weather.curr_temp)}
        </span>
      </div>

      <span className="capitalize text-lg font-semibold">
        {weather.description}
      </span>

      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="outline">
          {`${t('sunrise')} ${formatDateTime(weather.sunrise, { timeStyle: 'short', locale })}`}
        </Badge>

        <Badge variant="outline">
          {`${t('sunset')} ${formatDateTime(weather.sunset, { timeStyle: 'short', locale })}`}
        </Badge>

        <Badge variant="outline">
          {`${t('feelsLike')} ${translateTemperature(weather.feels_like_temp)}`}
        </Badge>

        <Badge variant="outline">
          {`${t('minimal')} ${translateTemperature(weather.curr_min_temp)}`}
        </Badge>

        <Badge variant="outline">
          {`${t('maximum')} ${translateTemperature(weather.curr_max_temp)}`}
        </Badge>
      </div>

      <ScrollArea className="max-w-2xl w-full">
        <div className="flex items-center justify-evenly gap-6 w-full">
          {weather.rain_1h && (
            <>
              <div className="flex flex-col items-center gap-2">
                <CloudRain className="h-7 w-7" />

                <span className="text-sm font-medium leading-none">
                  {t('rain')}
                </span>

                <span className="geist-mono text-nowrap">{`${weather.rain_1h} mm/h`}</span>
              </div>

              <Separator orientation="vertical" className="h-12" />
            </>
          )}

          {weather.snow_1h && (
            <>
              <div className="flex flex-col items-center gap-2">
                <CloudSnow className="h-7 w-7" />

                <span className="text-sm font-medium leading-none">
                  {t('snow')}
                </span>

                <span className="geist-mono text-nowrap">{`${weather.snow_1h} mm/h`}</span>
              </div>

              <Separator orientation="vertical" className="h-12" />
            </>
          )}

          <div className="flex flex-col items-center gap-2">
            <Wind className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">
              {t('wind')}
            </span>

            <span className="geist-mono text-nowrap">
              {translateVelocity(weather.wind_speed)}
            </span>
          </div>

          <Separator orientation="vertical" className="h-12" />

          <div className="flex flex-col items-center gap-2">
            <Droplets className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">
              {t('humidity')}
            </span>

            <span className="geist-mono text-nowrap">{`${weather.humidity}%`}</span>
          </div>

          <Separator orientation="vertical" className="h-12" />

          <div className="flex flex-col items-center gap-2">
            <Eye className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">
              {t('visibility')}
            </span>

            <span className="geist-mono text-nowrap">
              {translateDistance(weather.visibility)}
            </span>
          </div>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
