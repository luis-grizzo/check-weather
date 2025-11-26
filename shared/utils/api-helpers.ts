import { HttpsResponseCode, httpsResponseCodeStatuses } from '@/shared/enums'

export function successResponse({
  data,
  code
}: {
  data: unknown
  code: HttpsResponseCode
}): Response {
  return Response.json(
    {
      success: true,
      code,
      data
    },
    { status: httpsResponseCodeStatuses[code], headers: { 'Content-Type': 'application/json' } }
  )
}

export function errorResponse({
  message,
  code
}: {
  message: string
  code: HttpsResponseCode
}): Response {
  return Response.json(
    {
      success: false,
      error: { message, code }
    },
    {
      status: httpsResponseCodeStatuses[code],
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
