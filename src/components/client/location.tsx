'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Info } from 'lucide-react'

import { useMediaQuery } from '@/hooks/use-media-query'

import { AISeal } from '@/components/server/ai-seal'

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover'

import { formatCountryName } from '@/utils/string-utils'

import type { FormattedFetchWeatherResponse } from '@/types/weather'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '../ui/drawer'

export function Location({
  location,
  description
}: {
  location: FormattedFetchWeatherResponse['location']
  description?: string
}) {
  const locale = useLocale()
  const translations = useTranslations('Coordinates.Location')

  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (location.country && description) {
    if (isDesktop) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <h1 className="w-fit cursor-pointer text-4xl font-extrabold tracking-tight lg:text-5xl">
              {`${location.city}, ${formatCountryName(location.country, { locale })}`}

              <Info className="inline-flex align-text-top ml-2 h-5 w-5 text-emphasis" />
            </h1>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {location.country
                  ? translations('title', {
                      location: `${location.city}, ${formatCountryName(location.country, { locale })}`
                    })
                  : translations('undefinedLocation')}
              </DialogTitle>

              <DialogDescription>description</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <p className="text-pretty">{description}</p>

              <AISeal />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    } else {
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <h1 className="w-fit cursor-pointer text-4xl font-extrabold tracking-tight lg:text-5xl">
              {`${location.city}, ${formatCountryName(location.country, { locale })}`}

              <Info className="inline-flex align-text-top ml-2 h-5 w-5 text-emphasis" />
            </h1>
          </DrawerTrigger>

          <DrawerContent>
            <div className="max-h-[550px] md:max-h-[750px] overflow-auto w-full max-w-sm md:max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle>{`${location.city}, ${formatCountryName(location.country, { locale })}`}</DrawerTitle>

                <DrawerDescription>
                  Deixe seu pedido com a sua cara editando os igredientes e
                  quantidades!
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex flex-col gap-2 p-4">
                <p className="text-pretty">{description}</p>

                <AISeal />
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )
    }

    // return (
    //   <Popover>
    //     <PopoverTrigger asChild>
    //       <h1 className="w-fit cursor-pointer text-4xl font-extrabold tracking-tight lg:text-5xl">
    //         {`${location.city}, ${formatCountryName(location.country, { locale })}`}

    //         <Info className="inline-flex align-text-top ml-2 h-5 w-5 text-emphasis" />
    //       </h1>
    //     </PopoverTrigger>

    //     <PopoverContent
    //       collisionPadding={16}
    //       className="w-[22rem] sm:w-96 z-40"
    //     >
    //       <div className="flex flex-col gap-2">
    //         <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-pretty">
    //           {translations('title')}
    //         </h2>

    //         <p className="text-pretty">{description}</p>

    //         <AISeal />
    //       </div>
    //     </PopoverContent>
    //   </Popover>
    // )
  }

  return (
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
      {translations('undefinedLocation')}
    </h1>
  )
}
