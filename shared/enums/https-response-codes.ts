export enum HttpsResponseCode {
  OK_200 = 'OK_200', // The request has succeeded.
  CREATED_201 = 'CREATED_201', // The request has been fulfilled and resulted in a new resource being created.
  BAD_REQUEST_400 = 'BAD_REQUEST_400', // The server could not understand the request due to invalid syntax.
  UNAUTHORIZED_401 = 'UNAUTHORIZED_401', // The client must authenticate itself to get the requested response.
  NOT_FOUND_404 = 'NOT_FOUND_404', // The server can not find the requested resource.
  TOO_MANY_REQUESTS_429 = 'TOO_MANY_REQUESTS_429', // The user has sent too many requests in a given amount of time (rate limiting).
  INTERNAL_SERVER_ERROR_500 = 'INTERNAL_SERVER_ERROR_500' // The server has encountered a situation it doesn't know how to handle.
}

export const httpsResponseCodeStatuses: Record<HttpsResponseCode, number> = {
  [HttpsResponseCode.OK_200]: 200,
  [HttpsResponseCode.CREATED_201]: 201,
  [HttpsResponseCode.BAD_REQUEST_400]: 400,
  [HttpsResponseCode.UNAUTHORIZED_401]: 401,
  [HttpsResponseCode.NOT_FOUND_404]: 404,
  [HttpsResponseCode.TOO_MANY_REQUESTS_429]: 429,
  [HttpsResponseCode.INTERNAL_SERVER_ERROR_500]: 500
}
