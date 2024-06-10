'use client'

import { useEffect, useState } from 'react'

import { LocationContext, UseLocationData } from './use-location'

import { formatDecimals } from '@/lib/stringFormaters'

interface LocationProviderProps {
  children: React.ReactNode
}

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
