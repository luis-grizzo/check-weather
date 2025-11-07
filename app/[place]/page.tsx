import Image from 'next/image'
import { Info } from 'lucide-react'

import { StatusCard } from '@/components/status-card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

// Imports a serem removidos

import placeholder from '@public/placeholder.jpg'

import { Status } from '@/shared/enums/status'

export default function Place() {
  return (
    <main className="flex flex-col">
      <header className="flex gap-4 items-center justify-between px-4 py-4">
        <div className="flex flex-col">
          <span className="text-xl font-medium">Jaú, Brasil</span>

          <span className="text-base">3 de nov. de 2025 às 13:48</span>
        </div>

        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </header>

      <section className="flex flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tighter text-balance">26°C</h1>

          <span className="text-xl">nuvens dispersas</span>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Sensação 26°C</Badge>

            <Badge variant="secondary">Mínima 26°C</Badge>

            <Badge variant="secondary">Máxima 26°C</Badge>
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

          <StatusCard value="10 km ou mais" description="Visibilidade" status={Status.GOOD} />

          <StatusCard value="100%" description="Nebulosidade" />

          <StatusCard value="67%" description="Umidade" status={Status.GOOD} />

          <StatusCard value="948 hPa" description="Pressão atmosférica" status={Status.GOOD} />

          <StatusCard value="17 km/h" description="Velocidade do vento" status={Status.AVERAGE} />

          <StatusCard value="23 km/h" description="Rajadas de vento" status={Status.BAD} />

          <StatusCard value="Noroeste" description="Direção do vento" />
        </div>
      </section>
    </main>
  )
}
