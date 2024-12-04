'use client'

import { useEffect, useState } from 'react'

import { imperialUnitLanguages } from '@/constants/measurement-units'
import {
  kelvinToCelcius,
  kelvinToFahrenheit,
  metersPerSecondToKilometersPerHour,
  metersPerSecondToMilesPerHour,
  metersToKilometers,
  metersToMiles
} from '@/utils/number-utils'

const defaultLanguage = 'en-US'

export function useTranslator() {
  const [locale, setLocale] = useState(navigator.language || defaultLanguage)

  const isImperialUnit = imperialUnitLanguages.includes(locale)

  const translateTemperature = isImperialUnit
    ? kelvinToFahrenheit
    : kelvinToCelcius

  const translateVelocity = isImperialUnit
    ? metersPerSecondToMilesPerHour
    : metersPerSecondToKilometersPerHour

  const translateDistance = isImperialUnit ? metersToMiles : metersToKilometers

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(navigator.language || 'en-US')
    }

    window.addEventListener('languagechange', handleLanguageChange)

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange)
    }
  }, [])

  return {
    locale,
    translateTemperature,
    translateVelocity,
    translateDistance
  }
}
