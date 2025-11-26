'use client'

import { useEffect, useState, useCallback, createContext, type ReactNode, useContext } from 'react'

import { GeolocationPermissionStatus } from '@/shared/enums'

import { type ICoordinates } from '@/shared/types/geolocation'
import { toast } from 'sonner'

type TGeolocationContext = {
  status: GeolocationPermissionStatus
  coords: ICoordinates | null
  requestLocation: () => void
  resetCoords: () => void
}

const GeolocationContext = createContext<TGeolocationContext | undefined>(undefined)

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GeolocationPermissionStatus>(
    GeolocationPermissionStatus.LOADING
  )
  const [coords, setCoords] = useState<ICoordinates | null>(null)

  function handleSuccessLocation({ coords }: GeolocationPosition) {
    const { latitude, longitude } = coords

    setCoords({ latitude, longitude })
    setStatus(GeolocationPermissionStatus.GRANTED)

    toast.success('Localização obtida com sucesso!')
  }

  function handleErrorLocation(error: GeolocationPositionError) {
    if (error.code === error.TIMEOUT) {
      setStatus(GeolocationPermissionStatus.PROMPT)

      toast.warning('Tempo limite para obter localização exedido. Tente novamente!')
    }

    if (error.code === error.PERMISSION_DENIED) {
      setStatus(GeolocationPermissionStatus.DENIED)

      toast.error(
        'Permissão à localização negada. Habilite a permissão nas configurações do navegador.'
      )
    }

    if (error.code === error.POSITION_UNAVAILABLE) {
      setStatus(GeolocationPermissionStatus.UNSUPPORTED)

      toast.error('Seu navegador não suporta o serviço de geolocalização.')
    }
  }

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus(GeolocationPermissionStatus.UNSUPPORTED)
      return
    }

    setStatus(GeolocationPermissionStatus.LOADING)

    navigator.geolocation.getCurrentPosition(handleSuccessLocation, handleErrorLocation, {
      enableHighAccuracy: true,
      maximumAge: 300_000,
      timeout: 3_000
    })
  }, [])

  const checkPermission = useCallback(async () => {
    try {
      if (!navigator.permissions) {
        setStatus(GeolocationPermissionStatus.UNSUPPORTED)
        return
      }

      const permission = await navigator.permissions.query({ name: 'geolocation' })

      if (permission.state === 'granted') {
        setStatus(GeolocationPermissionStatus.GRANTED)
        return
      }

      if (permission.state === 'denied') {
        setStatus(GeolocationPermissionStatus.DENIED)
        return
      }

      if (permission.state === 'prompt') {
        setStatus(GeolocationPermissionStatus.PROMPT)
        return
      }
    } catch {
      setStatus(GeolocationPermissionStatus.UNSUPPORTED)
    }
  }, [])

  function resetCoords() {
    setCoords(null)
  }

  useEffect(() => {
    async function initializePermission() {
      await checkPermission()
    }

    initializePermission()
  }, [])

  return (
    <GeolocationContext.Provider value={{ status, coords, requestLocation, resetCoords }}>
      {children}
    </GeolocationContext.Provider>
  )
}

export function useGeolocation() {
  const context = useContext(GeolocationContext)

  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider')
  }

  return context
}
