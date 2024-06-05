'use client'

import { useEffect, useState } from 'react'

import { LocationContext } from './use-location'

import { LocationProviderProps, UseLocationData } from './useLocation.types'
import { formatDecimals } from '@/utils/stringFormaters'

export function LocationProvider({
  children
}: LocationProviderProps): React.ReactElement {
  const [location, setLocation] = useState<UseLocationData>({})

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        error: {
          message: 'Geolocation is not supported by your device.'
        }
      })

      return
    }

    const onSuccess = ({
      coords: { latitude, longitude }
    }: GeolocationPosition) => {
      setLocation({
        coords: {
          latitude: formatDecimals(latitude),
          longitude: formatDecimals(longitude)
        }
      })
    }

    const onError = ({ message }: GeolocationPositionError) => {
      setLocation({
        error: {
          message
        }
      })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return (
    <LocationContext.Provider
      value={{ coords: location?.coords, error: location?.error }}
    >
      {children}
    </LocationContext.Provider>
  )
}
