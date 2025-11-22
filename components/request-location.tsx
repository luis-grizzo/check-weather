'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import { useGeolocation } from '@/shared/hooks/use-geolocation'
import { GeolocationPermissionStatus } from '@/shared/enums/geolocation-permission-status'
import { fetchLocation } from '@/services/fetch/location'
import { logError } from '@/shared/utils/log-error'
import { ErrorOrigin } from '@/shared/enums/error-origin'
import { UUID_STORAGE_KEY } from '@/shared/constants/storage'

export function RequestLocation() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { status, coords, requestLocation, resetCoords } = useGeolocation()

  useEffect(() => {
    async function initializeLocation() {
      if (!!coords) {
        try {
          setIsLoading(true)

          const UUID = localStorage.getItem(UUID_STORAGE_KEY)

          const location = await fetchLocation({
            owner: JSON.parse(String(UUID)),
            ...coords
          })

          router.push(`/${location.place.slug}`)

          resetCoords()
        } catch (error) {
          const message = logError({
            origin: ErrorOrigin.APP,
            alias: 'RequestLocation',
            path: '@/components/request-location.tsx',
            error
          })

          toast.error(message)
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
      {isLoading || status === GeolocationPermissionStatus.LOADING ? (
        <>
          <Spinner />
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
