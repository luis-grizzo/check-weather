export const formatDate = (unixTimestamp: number) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(
    unixTimestamp * 1_000
  )

export const formatTime = (unixTimestamp: number) =>
  new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(
    unixTimestamp * 1_000
  )

export const truncateToOneDecimal = (number: number) => {
  if (!isFinite(number)) return '0.0'

  const numberString = number.toString()
  const decimalIndex = numberString.indexOf('.')

  if (decimalIndex === -1) {
    return `${numberString}.0`
  }

  return numberString.substring(0, decimalIndex + 2)
}
export const formatTimer = (timestamp: number) => {
  const time = new Date(timestamp)

  return time.toLocaleTimeString('en', {
    minute: '2-digit',
    second: '2-digit'
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
