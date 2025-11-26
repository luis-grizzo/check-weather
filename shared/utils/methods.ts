import { ErrorMessage } from '@/shared/enums'

export function getNow() {
  return Date.now()
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  return ErrorMessage.UNKNOWN_ERROR
}
