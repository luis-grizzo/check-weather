import { timeUnits } from '@/constants/time-units'

import { fetchWeather } from '@/services/fetch-weather'
import {
  generateWeatherHint,
  generateLocationHint
} from '@/services/generate-text'

import { AISeal } from '@/components/server/ai-seal'

import { WeatherDisplay } from '@/components/client/weather-display'
import { PageRevalidator } from '@/components/client/page-revalidator'

import { formatCountryName, formatDateTime } from '@/utils/string-utils'

export default async function Current({
  params
}: {
  params: { coordinates: string }
}) {
  const { coordinates } = await params

  const decodedPath = decodeURIComponent(coordinates)
  const [latitude, longitude] = decodedPath.split(',')

  if (isNaN(parseInt(latitude)) || isNaN(parseInt(longitude))) {
    throw new Error('Invalid route')
  }

  const weather = await fetchWeather({ latitude, longitude })

  const weatherHint = await generateWeatherHint(weather)
  const locationHint = await generateLocationHint(weather.location)

  return (
    <main className="flex flex-col justify-center gap-8 min-h-full container mx-auto px-4 py-[4.5rem]">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {weather.location.country
            ? `${weather.location.city}, ${formatCountryName(weather.location.country)}`
            : 'International waters'}
        </h1>

        <span className="text-sm font-medium leading-none geist-mono text-pretty">
          {formatDateTime(weather.time, {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h12'
          })}
        </span>

        <PageRevalidator
          requestUnixTimestamp={weather.time}
          revalidateIn={timeUnits.hour}
        />
      </div>

      <WeatherDisplay weather={weather} />

      <div className="flex flex-col gap-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
          Recommendation for well-being
        </h2>

        <p className="text-pretty">{weatherHint}</p>

        <AISeal />
      </div>

      {weather.location.country && (
        <div className="flex flex-col gap-2">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
            About the place you are
          </h2>

          <p className="text-pretty">{locationHint}</p>

          <AISeal />
        </div>
      )}
    </main>
  )
}
