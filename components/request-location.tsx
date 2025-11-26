'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { fetchLocation } from '@/services/fetch'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import { useGeolocation } from '@/shared/hooks/use-geolocation'
import { UUID_STORAGE_KEY } from '@/shared/constants'
import { GeolocationPermissionStatus } from '@/shared/enums'
import { logError, getErrorMessage } from '@/shared/utils'

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
            owner: String(UUID),
            ...coords
          })

          router.push(`/${location.place.slug}`)

          resetCoords()
        } catch (error) {
          const message = getErrorMessage(error)

          logError({
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
