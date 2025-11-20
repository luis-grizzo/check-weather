import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { findUniquePlace } from '@/services/prisma/place/find-unique'
import { currentWeather } from '@/services/open-weather/current-weather'
import { generateWeatherRecommendation } from '@/services/gemini/generate-weather-recommendation'
import { getVideo } from '@/services/pexels/get-video'

import { StatusCard } from '@/components/status-card'
import { RevalidatePath } from '@/components/revalidate-path'
import { Video } from '@/components/video'

import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { weatherVideosIds } from '@/shared/enums/weather-conditions'
import { formatCountryName } from '@/shared/utils/formatters'

export const revalidate = 3_600

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const place = await findUniquePlace({ slug })

  if (!place)
    return {
      title: 'Local não encontrado',
      description: 'Não foi possível encontrar o local informado.'
    }

  const fullPlace = `${place.name}, ${place.state ? `${place.state}, ` : ''}${formatCountryName(place.country)}`

  return {
    title: `Previsão em ${fullPlace}`,
    description: `Veja como está o clima agora em ${fullPlace}!`
  }
}

export default async function Place({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const place = await findUniquePlace({ slug })

  if (!place) notFound()

  const weather = await currentWeather({
    latitude: parseFloat(place.latitude),
    longitude: parseFloat(place.longitude)
  })

  const video = await getVideo({ id: String(weatherVideosIds[weather.condition]) })

  const recommendation = await generateWeatherRecommendation({
    place: { name: place.name },
    weather
  })

  const fullPlace = `${place.name}, ${place.state ? `${place.state}, ` : ''}${formatCountryName(place.country)}`

  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex gap-4 items-center justify-between container mx-auto px-4 py-4">
        <div className="flex flex-col">
          <span className="text-xl font-medium">{fullPlace}</span>

          <span className="text-base">{weather.date}</span>
        </div>

        <RevalidatePath data={{ timestamp: weather.timestamp }} />
      </header>

      <section className="flex flex-col gap-8 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-center text-balance">
            {weather.temperature.actual}
          </h1>

          <span className="text-lg lg:text-xl text-center">{weather.description}</span>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">{weather.temperature.feelsLike}</Badge>

            <Badge variant="secondary">{weather.temperature.minimum}</Badge>

            <Badge variant="secondary">{weather.temperature.maximum}</Badge>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="recommendation">
          {place.description && (
            <AccordionItem value="about-place">
              <AccordionTrigger>{`Sobre ${fullPlace}`}</AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="text-sm">{place.description}</p>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="recommendation">
            <AccordionTrigger>Recomendação</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm">{recommendation}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-2 gap-4">
          <Video
            data={{ height: video.height, width: video.width, video_files: video.video_files }}
            className="w-full aspect-square md:aspect-video lg:aspect-21/9 rounded-4xl"
          />

          <div className="grid gap-4 grid-cols-1 auto-rows-auto xl:grid-cols-2">
            {weather.statistics.map((statistic) => (
              <StatusCard
                key={statistic.name}
                data={{
                  value: statistic.value,
                  description: statistic.name,
                  status: statistic.status
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
