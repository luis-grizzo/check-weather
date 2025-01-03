'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Info } from 'lucide-react'

import { AISeal } from '@/components/server/ai-seal'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { formatCountryName } from '@/utils/string-utils'

import type { FormattedFetchWeatherResponse } from '@/types/weather'

export function Location({
  location,
  description
}: {
  location: FormattedFetchWeatherResponse['location']
  description?: string
}) {
  const locale = useLocale()
  const translations = useTranslations('Coordinates.Location')

  if (location.country && description) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <h1 className="w-fit cursor-pointer text-4xl font-extrabold tracking-tight lg:text-5xl">
            {`${location.city}, ${formatCountryName(location.country, { locale })}`}

            <Info className="inline-flex align-text-top ml-2 h-5 w-5 text-emphasis" />
          </h1>
        </PopoverTrigger>

        <PopoverContent
          collisionPadding={16}
          className="w-[22rem] sm:w-96 z-40"
        >
          <div className="flex flex-col gap-2">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-pretty">
              {translations('title')}
            </h2>

            <p className="text-pretty">{description}</p>

            <AISeal />
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
      {translations('undefinedLocation')}
    </h1>
  )
}
