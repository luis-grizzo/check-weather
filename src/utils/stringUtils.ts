export const formatDate = (unixTimestamp: number) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeZone
  }).format(unixTimestamp * 1_000)
}

export const formatTime = (unixTimestamp: number) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  return new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
    timeZone
  }).format(unixTimestamp * 1_000)
}

export const formatTimer = (timestamp: number) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  const time = new Date(timestamp)

  return time.toLocaleTimeString('en', {
    minute: '2-digit',
    second: '2-digit',
    timeZone
  })
}

export const formatCountryName = (code: string | undefined) => {
  if (!code) return undefined

  const isTwoCapitalLetters = /^[A-Z]{2}$/g
  const isThreeDigits = /^\d{3}$/g

  if (!isTwoCapitalLetters.test(code) && !isThreeDigits.test(code))
    return undefined

  return new Intl.DisplayNames(['en'], { type: 'region', fallback: 'code' }).of(
    code
  )
}

export const truncateToOneDecimal = (decimal: number) => {
  if (!isFinite(decimal)) return '0.0'

  const decimalString = decimal.toString()
  const decimalIndex = decimalString.indexOf('.')

  if (decimalIndex === -1) {
    return `${decimalString}.0`
  }

  return decimalString.substring(0, decimalIndex + 2)
}

export const calculatePeriod = ({
  currentTime,
  sunrise,
  sunset
}: {
  currentTime: number
  sunrise: number
  sunset: number
}) => (currentTime > sunrise && currentTime < sunset ? 'day' : 'night')
