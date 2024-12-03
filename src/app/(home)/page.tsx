import { Sun } from 'lucide-react'

import GetLocation from '@/components/client/get-location'
import FancyIcons from '@/components/client/fancy-icons'

export default function Home() {
  return (
    <main className="relative h-full w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-8 h-full container mx-auto px-4 py-14">
        <div className="flex items-center gap-4">
          <Sun className="h-10 w-10 lg:h-12 lg:w-12 text-emphasis" />

          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-nowrap">
            Check Weather
          </h1>
        </div>

        <p className="text-center text-xl text-muted-foreground">
          Consult your local weather info!
        </p>

        <GetLocation />

        <FancyIcons />
      </div>
    </main>
  )
}
