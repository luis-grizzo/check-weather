export const formatDate = (unixTimestamp: number) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(
    unixTimestamp * 1000
  )

export const formatTime = (unixTimestamp: number) =>
  new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(
    unixTimestamp * 1000
  )

export const formatDecimals = (number: number) =>
  number.toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })

export const formatCountryName = (name: string | undefined) => {
  if (!name) return undefined

  return new Intl.DisplayNames(['en'], { type: 'region' }).of(name)
}
