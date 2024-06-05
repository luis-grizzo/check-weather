'use client'

import { createContext, useContext } from 'react'

import { UseLocationData } from './useLocation.types'

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
