import { ErrorOrigin } from '@/shared/enums/error-origin'

interface LogErrorProps {
  alias: string
  path: string
  error: unknown
  origin: ErrorOrigin
}

export function logError({ alias, path, error, origin }: LogErrorProps) {
  const message = error instanceof Error ? error.message || origin : origin

  console.error(alias, path, { message })

  return message
}
