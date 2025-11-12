'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { useGeolocation } from '@/shared/hooks/use-geolocation'
import { GeolocationPermissionStatus } from '@/shared/enums/geolocation-permission-status'
import { fetchLocation } from '@/services/fetch/location'

export function RequestLocation() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { status, coords, requestLocation, resetCoords } = useGeolocation()

  useEffect(() => {
    async function initializeLocation() {
      if (!!coords) {
        try {
          setIsLoading(true)

          const location = await fetchLocation(coords)

          router.push(`/place/${location.place.slug}`)

          resetCoords()
        } catch (error) {
          const message =
            (error as Error).message || 'Erro ao gerar interpretação. Tente novamente em instantes.'

          console.error(message)
        } finally {
          setIsLoading(false)
        }
      }
    }

    initializeLocation()
  }, [coords])

  return (
    <Button
      onClick={requestLocation}
      disabled={
        status === GeolocationPermissionStatus.DENIED ||
        status === GeolocationPermissionStatus.LOADING ||
        isLoading
      }
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Carregando
        </>
      ) : status === GeolocationPermissionStatus.LOADING ? (
        <>
          <Loader2 className="animate-spin" />
          Checando
        </>
      ) : status === GeolocationPermissionStatus.DENIED ? (
        'Permissão negada'
      ) : (
        'Consultar clima'
      )}
    </Button>
  )
}
