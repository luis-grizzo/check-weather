import { Info } from 'lucide-react'

import { AiContentDisclaimer } from './ai-content-disclaimer'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function AboutPlacePopover({
  data
}: {
  data: { fullPlace: string; description: string | null }
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="z-40 flex flex-col gap-2 sm:w-sm md:w-md lg:w-lg xl:w-xl"
      >
        <AiContentDisclaimer />

        <h3 className="text-2xl font-semibold text-balance">{`Sobre ${data.fullPlace}`}</h3>

        <p className="text-base text-pretty">{data.description}</p>
      </PopoverContent>
    </Popover>
  )
}
