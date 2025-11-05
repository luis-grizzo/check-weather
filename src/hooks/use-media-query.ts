'use client'

import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const updateMatches = () => setMatches(mediaQuery.matches)

    mediaQuery.addEventListener('change', updateMatches)

    updateMatches()

    return () => {
      mediaQuery.removeEventListener('change', updateMatches)
    }
  }, [query])

  return matches
}
