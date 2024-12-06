'use client'

import { useLocale } from 'next-intl'

import { imperialUnitLanguages } from '@/constants/measurement-units'
import {
  kelvinToCelcius,
  kelvinToFahrenheit,
  metersPerSecondToKilometersPerHour,
  metersPerSecondToMilesPerHour,
  metersToKilometers,
  metersToMiles
} from '@/utils/number-utils'

export function useMeasurementsTranslators() {
  const locale = useLocale()

  const isImperialUnit = imperialUnitLanguages.includes(locale)

  const translateTemperature = isImperialUnit
    ? kelvinToFahrenheit
    : kelvinToCelcius

  const translateVelocity = isImperialUnit
    ? metersPerSecondToMilesPerHour
    : metersPerSecondToKilometersPerHour

  const translateDistance = isImperialUnit ? metersToMiles : metersToKilometers

  return {
    translateTemperature,
    translateVelocity,
    translateDistance
  }
}
