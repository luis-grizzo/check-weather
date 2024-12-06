'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { useRouter } from '@/i18n/routing'

import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'

import { truncateToOneDecimal } from '@/utils/string-utils'

export default function GetLocation() {
  const router = useRouter()
  const { toast } = useToast()
  const translations = useTranslations('Home.GetLocation')

  const [error, setError] = useState({ isError: false, message: '' })
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const locationProvided = ({
    coords: { latitude, longitude }
  }: GeolocationPosition) => {
    const truncatedLatitude = truncateToOneDecimal(latitude)
    const truncatedLongitude = truncateToOneDecimal(longitude)

    const encodedCoordinates = encodeURIComponent(
      `${truncatedLatitude},${truncatedLongitude}`
    )

    router.push(`/${encodedCoordinates}`)
  }

  const locationRefused = ({ message }: GeolocationPositionError) => {
    setError({ isError: true, message })
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError({
        isError: true,
        message: 'Geolocation is not supported by your device'
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        locationProvided,
        locationRefused
      )
    }
  }

  const checkPermission = ({ state }: PermissionStatus) => {
    const actions = {
      denied: () => {
        setIsButtonDisabled(true)

        toast({
          title: 'Access to location is denied.',
          description:
            'To use the app, enable location permission in your browser settings.'
        })
      },
      granted: () => requestLocation()
    }

    if (Object.keys(actions).includes(state))
      actions[state as keyof typeof actions]()
  }

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(checkPermission)
  }, [])

  useEffect(() => {
    if (error.isError) throw new Error(error.message)
  }, [error])

  return (
    <Button onClick={requestLocation} disabled={isButtonDisabled}>
      {translations('button')}
    </Button>
  )
}
