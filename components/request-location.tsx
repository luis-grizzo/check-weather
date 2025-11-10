'use client'

import { Button } from '@/components/ui/button'

import { useGeolocation } from '@/shared/hooks/use-geolocation'
import { GeolocationPermissionStatus } from '@/shared/enums/geolocation-permission-status'
import { Loader2 } from 'lucide-react'

export function RequestLocation() {
  const { status, requestLocation } = useGeolocation()

  return (
    <Button
      onClick={requestLocation}
      disabled={
        status === GeolocationPermissionStatus.DENIED ||
        status === GeolocationPermissionStatus.LOADING
      }
    >
      {status === GeolocationPermissionStatus.LOADING ? (
        <>
          <Loader2 className="animate-spin" />
          Carregando
        </>
      ) : status === GeolocationPermissionStatus.DENIED ? (
        'Permissão negada'
      ) : (
        'Consultar clima'
      )}
    </Button>
  )
}
