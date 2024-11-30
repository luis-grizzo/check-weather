import { PageRevalidator } from '@/components/client/page-revalidator'
import { FormattedFetchForecastResponse } from '@/types/forecast'
import { FormattedFetchWeatherResponse } from '@/types/weather'

import { formatCountryName, formatDateTime } from '@/utils/string-utils'

export function WeatherHeading({
  location,
  weather
}: {
  location: FormattedFetchForecastResponse['location']
  weather: Pick<FormattedFetchWeatherResponse, 'time'>
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        {location.country
          ? `${location.city}, ${formatCountryName(location.country)}`
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

      <PageRevalidator requestUnixTimestamp={weather.time} />
    </div>
  )
}
