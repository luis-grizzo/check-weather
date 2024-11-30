import { timeUnits } from '@/constants/time-units'

import { fetchForecast } from '@/services/fetch-forecast'
import { fetchWeather } from '@/services/fetch-weather'
import { generateWeatherHint } from '@/services/generate-text'

import { WeatherHeading } from '@/components/server/weather-heading'
import { AISeal } from '@/components/server/ai-seal'

import { ForecastChart } from '@/components/client/forecast-chart'
import { WeatherDisplay } from '@/components/client/weather-display'
import { ForecastCards } from '@/components/client/forecast-cards'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDateTime } from '@/utils/string-utils'

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
  const { list, location } = await fetchForecast({
    latitude,
    longitude
  })

  const weatherHint = await generateWeatherHint({
    location: location.city,
    curr_temp: weather.curr_temp,
    time: weather.time,
    feels_like_temp: weather.feels_like_temp,
    humidity: weather.humidity,
    weather: weather.description,
    wind_speed: weather.wind_speed
  })

  return (
    <main className="flex flex-col gap-16 min-h-full container mx-auto px-4 py-[4.5rem]">
      <div className="flex flex-col gap-8">
        <WeatherHeading location={location} weather={{ time: weather.time }} />

        <WeatherDisplay weather={weather} />

        <div className="flex flex-col gap-2">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
            Recommendation for well-being
          </h2>

          <p className="text-pretty">{weatherHint}</p>

          <AISeal />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-pretty">
            Forecast for the next 5 days
          </h2>

          <span className="text-sm font-medium leading-none geist-mono text-pretty">
            {`${formatDateTime(list.at(0)?.forecasts.at(0)?.time ?? 0, {
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })} to ${formatDateTime(list.at(-1)?.forecasts.at(-1)?.time ?? 0, {
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}`}
          </span>
        </div>

        <Tabs defaultValue={list.at(0)?.date} className="w-full">
          <ScrollArea className="mb-8">
            <TabsList>
              {list.map((group) => (
                <TabsTrigger key={group.date} value={group.date}>
                  {group.date}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {list.map((group) => (
            <TabsContent key={group.date} value={group.date}>
              <div className="flex flex-col gap-8 w-full">
                {group.forecasts.length > 1 && (
                  <ForecastChart forecasts={group.forecasts} />
                )}

                <ForecastCards forecasts={group.forecasts} />

                <div className="flex flex-col gap-2">
                  <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-pretty">
                    Recommendation on forecast
                  </h2>

                  <p className="text-pretty">{weatherHint}</p>

                  <AISeal />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}
