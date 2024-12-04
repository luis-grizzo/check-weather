import { getTranslations } from 'next-intl/server'

import { timeUnits } from '@/constants/time-units'

import { fetchWeather } from '@/services/fetch-weather'
import {
  generateWeatherHint,
  generateLocationHint
} from '@/services/generate-text'

import { AISeal } from '@/components/server/ai-seal'

import { Location } from '@/components/client/location'
import { PageRevalidator } from '@/components/client/page-revalidator'
import { WeatherDisplay } from '@/components/client/weather-display'

import { formatDateTime } from '@/utils/string-utils'

export default async function Current({
  params
}: {
  params: { locale: string; coordinates: string }
}) {
  const { locale, coordinates } = await params

  const decodedPath = decodeURIComponent(coordinates)
  const [latitude, longitude] = decodedPath.split(',')

  if (isNaN(parseInt(latitude)) || isNaN(parseInt(longitude))) {
    throw new Error('Invalid route')
  }

  const t = await getTranslations('Coordinates')

  const weather = await fetchWeather({ latitude, longitude, locale })

  const weatherHint = await generateWeatherHint({ weather, locale })
  const locationHint = await generateLocationHint({
    location: weather.location,
    locale
  })

  return (
    <main className="flex flex-col md:items-center justify-center gap-12 md:gap-24 min-h-full container mx-auto px-4 py-[4.5rem]">
      <div className="flex flex-col md:items-center gap-2">
        <Location location={weather.location} description={locationHint} />

        <span className="text-sm font-medium leading-none geist-mono text-pretty">
          {formatDateTime(weather.time, {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            locale
          })}
        </span>

        <PageRevalidator
          requestUnixTimestamp={weather.time}
          revalidateIn={timeUnits.hour}
        />
      </div>

      <WeatherDisplay weather={weather} />

      <div className="flex flex-col gap-2 md:items-center">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
          {t('Recomendation.title')}
        </h2>

        <p className="text-pretty md:text-center md:max-w-[750px] md:text-balance">
          {weatherHint}
        </p>

        <AISeal />
      </div>
    </main>
  )
}
