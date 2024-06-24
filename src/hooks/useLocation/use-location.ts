'use client'

import { createContext, useContext } from 'react'

export interface UseLocationData {
  coords?: {
    latitude: string
    longitude: string
  }
  error?: {
    message: string
  }
}

export const LocationContext = createContext<UseLocationData | undefined>(
  undefined
)

export function useLocation(): UseLocationData {
  const context = useContext(LocationContext)

  if (!context)
    throw new Error(
      'useLocation can only be called inside of a LocationProvider component'
    )

  return context
}
