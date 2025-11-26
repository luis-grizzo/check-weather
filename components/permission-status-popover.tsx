'use client'

import { type JSX } from 'react'
import { MapPinCheckInside, MapPinMinusInside, MapPinOff, MapPinXInside } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'

import { useIsMounted, useGeolocation } from '@/shared/hooks'
import { GeolocationPermissionStatus } from '@/shared/enums'

interface IPermissionStatusPopoverContent {
  icon: JSX.Element
  title: string
  description: string
}

export function PermissionStatusPopover() {
  const { isMounted } = useIsMounted()

  const { status } = useGeolocation()

  const contents: Record<GeolocationPermissionStatus, IPermissionStatusPopoverContent> = {
    [GeolocationPermissionStatus.LOADING]: {
      icon: <Spinner />,
      title: 'Carregando status',
      description: 'Estamos checando a permissão de localização'
    },
    [GeolocationPermissionStatus.GRANTED]: {
      icon: <MapPinCheckInside className="text-green-500" />,
      title: 'Permissão concedida',
      description: 'Você consentiu em compartilhar sua localização com o CheckWeather.'
    },
    [GeolocationPermissionStatus.PROMPT]: {
      icon: <MapPinMinusInside className="text-yellow-500" />,
      title: 'Compartilhe sua localização',
      description: 'CheckWeather ainda não tem permissão para acessar sua localização.'
    },
    [GeolocationPermissionStatus.DENIED]: {
      icon: <MapPinXInside className="text-red-500" />,
      title: 'Permissão negada',
      description:
        'CheckWeather não tem permissão para acessar sua localização. Por favor, habilite nas configurações do navegador.'
    },
    [GeolocationPermissionStatus.UNSUPPORTED]: {
      icon: <MapPinOff className="text-blue-500" />,
      title: 'Não disponível',
      description: 'Seu navegador não suporta geolocalização.'
    }
  }

  if (!isMounted) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          {contents[status].icon}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="flex flex-col gap-2 sm:w-sm md:w-md lg:w-lg xl:w-xl">
        <h3 className="text-xl font-medium text-balance">{contents[status].title}</h3>

        <p className="text-base text-pretty">{contents[status].description}</p>
      </PopoverContent>
    </Popover>
  )
}
