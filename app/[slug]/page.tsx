'use cache'

import { type Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'

import { findUniquePlace, findUniquePlaceForMetadata } from '@/services/prisma'
import { currentWeather } from '@/services/open-weather'
import { generateWeatherRecommendation } from '@/services/gemini'
import { showVideo } from '@/services/pexels'

import { StatusCard } from '@/components/status-card'
import { Video } from '@/components/video'
import { AiContentDisclaimer } from '@/components/ai-content-disclaimer'
import { AboutPlacePopover } from '@/components/about-place-popover'

import { Badge } from '@/components/ui/badge'

import { IS_NEW_PERIOD } from '@/shared/constants'
import { weatherVideosIds } from '@/shared/enums'
import { formatCountryName, getNow } from '@/shared/utils'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const place = await findUniquePlaceForMetadata({ slug })

  if (!place)
    return {
      title: 'Local não encontrado',
      description: 'Não foi possível encontrar o local informado.'
    }

  const fullPlace = `${place.name}, ${formatCountryName(place.country)}`

  return {
    title: `Previsão em ${fullPlace}`,
    description: `Veja como está o clima agora em ${fullPlace}!`
  }
}

export default async function Place({ params }: { params: Promise<{ slug: string }> }) {
  cacheLife('hours')

  const { slug } = await params

  const place = await findUniquePlace({ slug })

  if (!place) notFound()

  const weather = await currentWeather({
    latitude: parseFloat(place.latitude),
    longitude: parseFloat(place.longitude)
  })

  const video = await showVideo({ id: String(weatherVideosIds[weather.condition]) })

  const recommendation = await generateWeatherRecommendation({
    name: place.name,
    weather
  })

  const fullPlace = `${place.name}, ${formatCountryName(place.country)}`

  const isNew = new Date(place.createdAt).getTime() < getNow() + IS_NEW_PERIOD

  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex gap-4 items-center justify-between container mx-auto px-4 py-4">
        <div className="flex flex-col">
          {isNew ? (
            <div className="flex gap-2 items-center">
              <span className="text-xl font-medium">{fullPlace}</span>

              <Badge>Novidade</Badge>
            </div>
          ) : (
            <span className="text-xl font-medium">{fullPlace}</span>
          )}

          <span className="text-base">{weather.date}</span>
        </div>

        <AboutPlacePopover data={{ fullPlace, description: place.about }} />
      </header>

      <section className="grid grid-cols-1 auto-rows-auto lg:grid-cols-2 gap-8 container mx-auto px-4 py-8">
        <div className="relative overflow-hidden lg:sticky lg:top-22 flex flex-col justify-end w-full aspect-square md:aspect-video rounded-4xl before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-full before:bg-linear-to-b before:from-50% before:to-black/80">
          <div className="z-30 flex flex-col gap-2 justify-end p-8">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-balance text-white">
              {weather.temperature}
            </h1>

            <p className="text-base lg:text-xl text-balance text-white">{weather.description}</p>
          </div>

          <Video
            data={{ height: video.height, width: video.width, video_files: video.video_files }}
            className="absolute top-0 left-0 -z-10 h-full w-full"
          />
        </div>

        <div className="@container flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-4">
            <AiContentDisclaimer />

            <h2 className="text-3xl font-semibold text-balance">{recommendation.title}</h2>

            <p className="text-base text-pretty">{recommendation.description}</p>
          </div>

          <div className="grid gap-4 grid-cols-1 auto-rows-auto @md:grid-cols-2">
            {weather.statistics.map((statistic) => (
              <StatusCard
                key={statistic.name}
                data={{
                  value: statistic.value,
                  description: statistic.name
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
