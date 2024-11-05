import { Droplets, Eye, Sparkles, Wind } from 'lucide-react'

import { timeUnits } from '@/constants/timeUnits'
import { weathersCatalog } from '@/constants/weathersCatalog'

import { fetchWeather } from '@/services/fetchWeather'
import { fetchForecast } from '@/services/fetchForecast'
import { generateText, getWeatherHintPromp } from '@/services/generateText'

import { CoordinatesUpdater } from '@/components/client/CoordinatesUpdater'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import {
  calculatePeriod,
  formatCountryName,
  formatDateTime
} from '@/utils/stringUtils'
import {
  fahrenheitToCelcius,
  metersToKilometers
  // milesPerHourToMetersPerSecond
} from '@/utils/numberUtils'
import { ForecastChart } from '@/components/client/forecast-chart'

interface LocationProps {
  params: {
    coordinates: string
  }
}

export const revalidate = timeUnits.hour / 1_000

export default async function Location({ params }: LocationProps) {
  const { coordinates } = await params

  const decodedPath = decodeURIComponent(coordinates)
  const [latitude, longitude] = decodedPath.split(',')

  if (isNaN(parseInt(latitude)) || isNaN(parseInt(longitude))) {
    throw new Error('Invalid route')
  }

  const weather = await fetchWeather({ latitude, longitude })
  const { forecasts, location } = await fetchForecast({
    latitude,
    longitude
  })

  const weatherHintPrompt = getWeatherHintPromp({
    location: location.city,
    curr_temp: weather.curr_temp,
    time: weather.time,
    feels_like_temp: weather.feels_like_temp,
    humidity: weather.humidity,
    weather: weather.description,
    wind_speed: weather.wind_speed
  })
  const weatherHint = generateText(weatherHintPrompt)

  const period = calculatePeriod({
    currentTime: weather.time,
    sunrise: weather.sunrise,
    sunset: weather.sunset
  })

  const Icon = weathersCatalog[weather.type].icon[period]

  return (
    <main className="flex flex-col gap-8 min-h-full container mx-auto px-4 py-[4.5rem]">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{`${location.city}, ${formatCountryName(location.country)}`}</h1>

        <span className="text-sm font-medium leading-none geist-mono">
          {formatDateTime(weather.time, { dateStyle: 'full' })}
        </span>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium leading-none geist-mono">
            {formatDateTime(weather.time, { timeStyle: 'short' })}
          </span>

          <CoordinatesUpdater requestTimestamp={weather.time} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4 w-full p-8">
          <div className={`flex items-center justify-center gap-4 `}>
            <Icon className="h-[3.75rem] w-[3.75rem] lg:h-[4.5rem] lg:w-[4.5rem]" />

            <span className="text-6xl font-extrabold tracking-tight lg:text-7xl">{`${Math.round(weather.curr_temp)}°F`}</span>

            <span className="text-xl text-muted-foreground">{`${fahrenheitToCelcius(weather.curr_temp)}°C`}</span>
          </div>

          <span className="capitalize text-lg font-semibold">
            {weather.description}
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="default">{`Feels like ${Math.round(weather.feels_like_temp)}°F (${fahrenheitToCelcius(weather.feels_like_temp)}°C)`}</Badge>

            <Badge variant="default">{`Current Minimal ${Math.round(weather.curr_min_temp)}°F (${fahrenheitToCelcius(weather.curr_min_temp)}°C)`}</Badge>

            <Badge variant="default">{`Current Maximum ${Math.round(weather.curr_max_temp)}°F (${fahrenheitToCelcius(weather.curr_max_temp)}°C)`}</Badge>

            <Badge variant="default">{`Sunrise ${formatDateTime(weather.sunrise, { timeStyle: 'short' })}`}</Badge>

            <Badge variant="default">{`Sunset ${formatDateTime(weather.sunset, { timeStyle: 'short' })}`}</Badge>
          </div>
        </div>

        <div className="flex items-center justify-evenly max-w-2xl w-full">
          <div className="flex flex-col items-center gap-2">
            <Wind className="h-7 w-7" />

            <span className="text-sm font-medium leading-none">Wind</span>

            <span className="geist-mono">{`${Math.round(weather.wind_speed)} M/s`}</span>
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

            <span className="geist-mono">{`${metersToKilometers(weather.visibility)} Km`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
          Recommendation for well-being
        </h2>

        <p className="text-pretty">{weatherHint}</p>

        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-lime-600 dark:text-lime-400 animate-pulse" />

          <span className="text-sm text-muted-foreground">
            AI-generated content. May contain errors.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
          Forecast for the next 24 hours
        </h2>

        <ForecastChart forecasts={forecasts} />
      </div>
    </main>
  )
}
