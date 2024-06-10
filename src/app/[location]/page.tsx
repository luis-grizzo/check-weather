import Image from 'next/image'

import { fetchWeather } from '@/services/fetchWeather'

import { Badge, RefreshButton } from '@/components'

import { weathersCatalog } from '@/constants/weathersCatalog'
import { layoutIcons } from '@/constants/icons'

interface LocationProps {
  params: {
    location: string
  }
}

export default async function Location({
  params: { location }
}: LocationProps) {
  const decodedPath = decodeURIComponent(location)
  const [latitude, longitude, language] = decodedPath.split(',')

  if (isNaN(parseInt(latitude)) || isNaN(parseInt(longitude))) {
    throw new Error('Invalid coordinates')
  }

  const weather = await fetchWeather({ latitude, longitude, language })

  const color = weathersCatalog[weather.type].color
  const icon = weathersCatalog[weather.type].icon[weather.period]

  return (
    <>
      <header className="flex items-center justify-between container mx-auto px-8 py-6">
        <div className="flex flex-col gap-2">
          {weather.location.city && (
            <span className="text-lg">
              {weather.location.city}, {weather.location.country}
            </span>
          )}

          <span className="text-xs">{weather.time}</span>

          <div className="flex flex-wrap gap-2">
            {weather.forecast_times.map((time) => (
              <Badge key={time.description}>
                {`${time.description} ${time.value}`}
              </Badge>
            ))}
          </div>
        </div>

        <RefreshButton unixLastRequestTime={weather.unixTimestamp} />
      </header>

      <main
        className={`relative flex flex-col items-center justify-center gap-8 h-full container mx-auto px-8 py-6 before:absolute before:w-3/4 before:max-w-96 before:aspect-square before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${color} before:to-transparent before:to-70%  before:rounded-full before:animate-pulse before:-z-50`}
      >
        <div className="flex items-center gap-4">
          <Image src={icon} alt=" " className="w-24 aspect-square" />

          <span className="text-8xl">{weather.temperature}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {weather.forecast_temperatures.map((temperature) => (
            <Badge key={temperature.description}>
              {`${temperature.description} ${temperature.value}`}
            </Badge>
          ))}
        </div>

        <span className="text-base capitalize">{weather.description}</span>

        <div className="flex items-center justify-between gap-8 p-8 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-2xl backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            <Image src={layoutIcons.air} alt="" className="w-8 h-8" />

            <span className="text-lg text-nowrap">{weather.wind_speed}</span>

            <span className="text-xs">Wind</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image src={layoutIcons.water_drop} alt="" className="w-8 h-8" />

            <span className="text-lg text-nowrap">{weather.humidity}</span>

            <span className="text-xs">Humidity</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image src={layoutIcons.visibility} alt="" className="w-8 h-8" />

            <span className="text-lg text-nowrap">{weather.visibility}</span>

            <span className="text-xs">Visibility</span>
          </div>
        </div>
      </main>
    </>
  )
}
