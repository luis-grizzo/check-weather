import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Info } from 'lucide-react'

import { findUniquePlace } from '@/services/prisma/place/find-unique'
import { currentWeather } from '@/services/open-weather/current-weather'

import { StatusCard } from '@/components/status-card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { formatCountryName } from '@/shared/utils/formatters'

// Imports a serem removidos

import placeholder from '@public/placeholder.jpg'
import { generateWeatherRecommendation } from '@/services/gemini/generate-weather-recommendation'

export default async function Place({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const place = await findUniquePlace({ slug })

  if (!place) notFound()

  const weather = await currentWeather({
    latitude: parseFloat(place.latitude),
    longitude: parseFloat(place.longitude)
  })

  const recommendation = await generateWeatherRecommendation({
    place: { name: place.name },
    weather
  })

  const fullPlace = `${place.name}, ${place.state ? `${place.state}, ` : ''}${formatCountryName(place.country)}`

  return (
    <main className="flex flex-col">
      <header className="flex gap-4 items-center justify-between container mx-auto px-4 py-4">
        <div className="flex flex-col">
          <span className="text-xl font-medium">{fullPlace}</span>

          <span className="text-base">{weather.timestamp}</span>
        </div>

        <Button variant="ghost" size="icon">
          <Info />
        </Button>
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
          <Image
            src={placeholder}
            alt="Placeholder"
            className="object-fill object-center w-full aspect-square rounded-4xl md:aspect-video lg:sticky lg:top-18 xl:h-full xl:aspect-auto"
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
