export const formatDate = (unixTimestamp: number) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(
    unixTimestamp * 1_000
  )

export const formatTime = (unixTimestamp: number) =>
  new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(
    unixTimestamp * 1_000
  )

export const formatDecimals = (number: number) =>
  number.toLocaleString('en', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })

export const formatTimer = (timestamp: number) => {
  const time = new Date(timestamp)

  return time.toLocaleTimeString('en', {
    minute: '2-digit',
    second: '2-digit'
  })
}

export const formatCountryName = (code: string | undefined) => {
  if (!code) return undefined

  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code)
}
