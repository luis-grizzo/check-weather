import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Info } from 'lucide-react'

import { findUniquePlace } from '@/services/prisma/place/find-unique'

import { StatusCard } from '@/components/status-card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { WeatherSeverity } from '@/shared/enums/weather-severity'
import { formatCountryName, formatDateTime } from '@/shared/utils/formatters'

// Imports a serem removidos

import placeholder from '@public/placeholder.jpg'
import { currentWeather } from '@/services/open-weather/current-weather'

export default async function Place({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const place = await findUniquePlace({ slug })

  if (!place) notFound()

  const weather = await currentWeather({
    latitude: parseFloat(place.latitude),
    longitude: parseFloat(place.longitude)
  })

  // console.log({ slug, place, weather })

  return (
    <main className="flex flex-col">
      <header className="flex gap-4 items-center justify-between px-4 py-4">
        <div className="flex flex-col">
          <span className="text-xl font-medium">
            {`${place.name}, ${place.state ? `${place.state}, ` : ''}${formatCountryName(place.country)}`}
          </span>

          <span className="text-base">{weather.timestamp}</span>
        </div>

        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </header>

      <section className="flex flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tighter text-balance">
            {weather.temperature.actual}
          </h1>

          <span className="text-xl">{weather.description}</span>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{weather.temperature.feelsLike}</Badge>

            <Badge variant="secondary">{weather.temperature.minimum}</Badge>

            <Badge variant="secondary">{weather.temperature.maximum}</Badge>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="recommendation">
          {/* <AccordionItem value="about-place">
            <AccordionTrigger>Sobre Jaú, Brasil</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil aut explicabo, vel
                deleniti illum, eveniet enim nam unde pariatur maxime eius quae? Inventore
                cupiditate iste error alias? Inventore, et assumenda.
              </p>
            </AccordionContent>
          </AccordionItem> */}

          <AccordionItem value="recommendation">
            <AccordionTrigger>Recomendação</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil aut explicabo, vel
                deleniti illum, eveniet enim nam unde pariatur maxime eius quae? Inventore
                cupiditate iste error alias? Inventore, et assumenda.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col gap-4">
          <Image
            src={placeholder}
            alt="Placeholder"
            className="object-fill object-center w-full aspect-square rounded-4xl"
          />

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
      </section>
    </main>
  )
}
