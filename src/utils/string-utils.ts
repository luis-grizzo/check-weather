export const formatDateTime = (
  unixTimestamp: number,
  options: Intl.DateTimeFormatOptions & { locale: string }
) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  return new Intl.DateTimeFormat(options.locale, {
    ...options,
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

export const formatCountryName = (
  code: string,
  { locale }: { locale: string }
) => {
  const isTwoCapitalLetters = /^[A-Z]{2}$/g
  const isThreeDigits = /^\d{3}$/g

  if (!isTwoCapitalLetters.test(code) && !isThreeDigits.test(code))
    throw new Error('Invalid country code.')

  return new Intl.DisplayNames([locale], {
    type: 'region',
    fallback: 'code'
  }).of(code)
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
