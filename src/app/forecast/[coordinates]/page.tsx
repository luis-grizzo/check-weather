import { ForecastCards } from '@/components/client/forecast-cards'
import { ForecastChart } from '@/components/client/forecast-chart'
import { PageRevalidator } from '@/components/client/page-revalidator'
import { AISeal } from '@/components/server/ai-seal'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { timeUnits } from '@/constants/time-units'
import { fetchForecast } from '@/services/fetch-forecast'
import { formatCountryName, formatDateTime } from '@/utils/string-utils'

export default async function Forecast({
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

  const { requestUnixTimestamp, list, location } = await fetchForecast({
    latitude,
    longitude
  })

  const firstForecastDate = list.at(0)?.date

  const firstUnixTimestamp = list.at(0)?.forecasts.at(0)?.time ?? 0
  const lastUnixTimestamp = list.at(-1)?.forecasts.at(-1)?.time ?? 0

  const formatDateTimeConfig: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }

  return (
    <main className="flex flex-col gap-8 min-h-full container mx-auto px-4 py-[4.5rem]">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {location.country
            ? `${location.city}, ${formatCountryName(location.country)}`
            : 'International waters'}
        </h1>

        <span className="text-sm font-medium leading-none geist-mono text-pretty">
          {`${formatDateTime(firstUnixTimestamp, formatDateTimeConfig)} to ${formatDateTime(lastUnixTimestamp, formatDateTimeConfig)}`}
        </span>

        <PageRevalidator
          requestUnixTimestamp={requestUnixTimestamp}
          revalidateIn={timeUnits.hour * 3}
        />
      </div>

      <Tabs defaultValue={firstForecastDate} className="w-full">
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

                {/* <p className="text-pretty">{weatherHint}</p> */}

                {/* <AISeal /> */}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}
