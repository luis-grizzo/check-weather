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
            <MapPinOff className="text-blue-500" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="flex flex-col gap-2 sm:w-sm md:w-md lg:w-lg xl:w-xl">
        {status === GeolocationPermissionStatus.GRANTED && (
          <>
            <h3 className="text-2xl font-semibold text-balance">Permissão concedida</h3>

            <p className="text-base text-pretty">
              Você consentiu em compartilhar sua localização com o CheckWeather.
            </p>
          </>
        )}

        {status === GeolocationPermissionStatus.PROMPT && (
          <>
            <h3 className="text-2xl font-semibold text-balance">Compartilhe sua localização</h3>

            <p className="text-base text-pretty">
              CheckWeather ainda não tem permissão para acessar sua localização.
            </p>
          </>
        )}

        {status === GeolocationPermissionStatus.DENIED && (
          <>
            <h3 className="text-2xl font-semibold text-balance">Permissão negada</h3>

            <p className="text-base text-pretty">
              CheckWeather não tem permissão para acessar sua localização. Por favor, habilite nas
              configurações do navegador.
            </p>
          </>
        )}

        {status === GeolocationPermissionStatus.UNSUPPORTED && (
          <>
            <h3 className="text-2xl font-semibold text-balance">Não disponível</h3>

            <p className="text-base text-pretty">Seu navegador não suporta geolocalização.</p>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
