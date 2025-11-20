export const toKebabCase = (input: string) => {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const formatCountryName = (code: string | undefined) => {
  if (!code) return undefined

  const isTwoCapitalLetters = /^[A-Z]{2}$/g
  const isThreeDigits = /^\d{3}$/g

  if (!isTwoCapitalLetters.test(code) && !isThreeDigits.test(code)) return undefined

  return new Intl.DisplayNames(['pt-BR'], { type: 'region', fallback: 'code' }).of(code)
}

export const formatDateTime = (timestamp: Date, options: Intl.DateTimeFormatOptions) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  const timestampNumber = new Date(timestamp).getTime()

  return new Intl.DateTimeFormat('pt-BR', {
    ...options,
    timeZone
  }).format(timestampNumber)
}

export const formatNumber = (value: number, options: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('pt-BR', options).format(value)
}
