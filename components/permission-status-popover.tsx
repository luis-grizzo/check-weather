'use client'

import { MapPinCheckInside, MapPinMinusInside, MapPinOff, MapPinXInside } from 'lucide-react'

import { useGeolocation } from '@/shared/hooks/use-geolocation'
import { GeolocationPermissionStatus } from '@/shared/enums/geolocation-permission-status'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'

export function PermissionStatusPopover() {
  const { status } = useGeolocation()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={status === GeolocationPermissionStatus.LOADING}
        >
          {status === GeolocationPermissionStatus.LOADING && <Spinner />}

          {status === GeolocationPermissionStatus.GRANTED && (
            <MapPinCheckInside className="text-green-500" />
          )}

          {status === GeolocationPermissionStatus.PROMPT && (
            <MapPinMinusInside className="text-yellow-500" />
          )}

          {status === GeolocationPermissionStatus.DENIED && (
            <MapPinXInside className="text-red-500" />
          )}

          {status === GeolocationPermissionStatus.UNSUPPORTED && (
            <MapPinOff className="text-purple-500" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="text-sm">
        {status === GeolocationPermissionStatus.GRANTED &&
          'CheckWeather tem acesso a sua localização.'}

        {status === GeolocationPermissionStatus.PROMPT &&
          'CheckWeather ainda não tem permissão para acessar sua localização.'}

        {status === GeolocationPermissionStatus.DENIED &&
          'CheckWeather não tem permissão para acessar sua localização. Por favor, habilite nas configurações do navegador.'}

        {status === GeolocationPermissionStatus.UNSUPPORTED &&
          'Seu navegador não suporta geolocalização.'}
      </PopoverContent>
    </Popover>
  )
}
