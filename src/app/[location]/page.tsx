import Image from 'next/image'

import { weathersCatalog } from '@/constants/weathersCatalog'
import { layoutIcons } from '@/constants/icons'
import { validMeasurementUnits } from '@/constants/measurementUnits'

import { fetchWeather } from '@/services/fetchWeather'

import { Badge, DisplayTime, Header } from '@/components'

import { calculatePeriod } from '@/lib/calculators'
import { metersToKilometers } from '@/lib/converters'
import { roundValue } from '@/lib/numberFormatters'

interface LocationProps {
  params: {
    location: string
  }
}

export default async function Location({
  params: { location }
}: LocationProps) {
  const decodedPath = decodeURIComponent(location)
  const [latitude, longitude, measurementUnit] = decodedPath.split(',')

  if (
    isNaN(parseInt(latitude)) ||
    isNaN(parseInt(longitude)) ||
    !validMeasurementUnits.includes(measurementUnit)
  ) {
    throw new Error('Invalid route')
  }

  const weather = await fetchWeather({ latitude, longitude, measurementUnit })

  const period = calculatePeriod(weather.time, weather.sunrise, weather.sunset)

  const color = weathersCatalog[weather.type].color
  const icon = weathersCatalog[weather.type].icon[period]

  const handleWindSpeedSulfix = () => {
    const sulfixes = {
      imperial: 'mi/h',
      metric: 'm/s'
    }

    return sulfixes[measurementUnit as keyof typeof sulfixes]
  }

  return (
    <>
      <Header location={weather.location} requestTimestamp={weather.time} />

      <main
        className={`relative flex flex-col items-center justify-center gap-8 h-full container mx-auto px-8 py-6 before:absolute before:w-3/4 before:max-w-96 before:aspect-square before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${color} before:to-transparent before:to-70%  before:rounded-full before:animate-pulse before:-z-50`}
      >
        <div className="flex items-center gap-4">
          <Image src={icon.src} alt={icon.alt} className="w-24 aspect-square" />

          <span className="text-8xl">{`${roundValue(weather.curr_temp)}°`}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge>{`Feels like ${roundValue(weather.feels_like_temp)}°`}</Badge>

          {weather.curr_min_temp !== weather.curr_max_temp && (
            <>
              <Badge>{`Min ${roundValue(weather.curr_min_temp)}°`}</Badge>

              <Badge>{`Max ${roundValue(weather.curr_max_temp)}°`}</Badge>
            </>
          )}

          <DisplayTime description="Sunrise" timestamp={weather.sunrise} />

          <DisplayTime description="Sunset" timestamp={weather.sunset} />
        </div>

        <span className="text-base capitalize">{weather.description}</span>

        <div className="flex items-center justify-between gap-8 p-8 bg-neutral-100/60 border-1 border-neutral-600/10 rounded-2xl backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={layoutIcons.air}
              alt="Wind speed icon"
              className="w-8 aspect-square"
            />

            <span className="text-lg text-nowrap">{`${roundValue(weather.wind_speed)} ${handleWindSpeedSulfix()}`}</span>

            <span className="text-xs">Wind</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              src={layoutIcons.water_drop}
              alt="Humidity icon"
              className="w-8 aspect-square"
            />

            <span className="text-lg text-nowrap">{`${weather.humidity}%`}</span>

            <span className="text-xs">Humidity</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Image
              src={layoutIcons.visibility}
              alt="Visibility icon"
              className="w-8 aspect-square"
            />

            <span className="text-lg text-nowrap">{`${metersToKilometers(weather.visibility)} km`}</span>

            <span className="text-xs">Visibility</span>
          </div>
        </div>
      </main>
    </>
  )
}
