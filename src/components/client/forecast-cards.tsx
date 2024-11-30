'use client'

import { climateCatalog } from '@/constants/climate-catalog'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { formatDateTime } from '@/utils/string-utils'
import {
  formatPrecipitationProbability,
  metersPerSecondToKilometersPerHour,
  metersPerSecondToMilesPerHour,
  metersToKilometers,
  metersToMiles
} from '@/utils/number-utils'

import type { FormattedForecast } from '@/types/forecast'
import { imperialUnitLanguages } from '@/constants/measurement-units'

export function ForecastCards({
  forecasts
}: {
  forecasts: FormattedForecast[]
}) {
  const { language } = navigator
  const isImperialUnit = imperialUnitLanguages.includes(language)

  const translateVelocity = isImperialUnit
    ? metersPerSecondToMilesPerHour
    : metersPerSecondToKilometersPerHour
  const translateDistance = isImperialUnit ? metersToMiles : metersToKilometers

  return (
    <ScrollArea className="w-full">
      <div className="flex items-stretch gap-4">
        {forecasts.map((forecast) => {
          const period = forecast.day_part === 'd' ? 'day' : 'night'
          const Icon = climateCatalog[forecast.type].icon[period]

          return (
            <div
              key={forecast.time}
              className="flex flex-shrink-0 flex-col items-center gap-4 p-4 border rounded-lg bg-background text-foreground"
            >
              <span className="tracking-tight text-sm font-normal geist-mono">
                {formatDateTime(forecast.time, {
                  weekday: 'short',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hourCycle: 'h12'
                })}
              </span>

              <Icon className="h-[3.75rem] w-[3.75rem] lg:h-[4.5rem] lg:w-[4.5rem]" />

              <span className="capitalize text-lg font-semibold">
                {forecast.description}
              </span>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Precipitation
                  </span>

                  <span className="text-sm geist-mono">
                    {formatPrecipitationProbability(
                      forecast.precipitation_prob
                    )}
                  </span>
                </div>

                {forecast.rain_last_3h && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Rain volume
                    </span>

                    <span className="text-sm geist-mono">
                      {`${forecast.rain_last_3h} mm/h`}
                    </span>
                  </div>
                )}

                {forecast.snow_last_3h && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Snow volume
                    </span>

                    <span className="text-sm geist-mono">
                      {`${forecast.snow_last_3h} mm/h`}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Wind speed
                  </span>

                  <span className="text-sm geist-mono">
                    {translateVelocity(forecast.wind_speed)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Visibility
                  </span>

                  <span className="text-sm geist-mono">
                    {translateDistance(forecast.visibility)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
