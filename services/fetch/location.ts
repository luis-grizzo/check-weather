import { type Location, type Place } from '@/lib/prisma'
import { validateEnvironmentPath } from '@/lib/validate-enviroment-path'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { HttpsResponseCode } from '@/shared/enums/https-response-codes'
import { logError } from '@/shared/utils/log-error'
import { type ICoordinates } from '@/shared/types/geolocation'

export interface IFetchLocationRequest extends ICoordinates {
  owner: string
}

export interface IFetchLocationResponse
  extends Pick<Location, 'id' | 'latitude' | 'longitude' | 'createdAt'> {
  place: Pick<Place, 'name' | 'slug' | 'state' | 'country' | 'latitude' | 'longitude'>
}

export async function fetchLocation(
  params: IFetchLocationRequest
): Promise<IFetchLocationResponse> {
  try {
    const originPath = validateEnvironmentPath()

    const res = await fetch(`${originPath}/v1/find-place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (!res.ok) {
      const { error }: { error: { message: string; code: HttpsResponseCode }; success: boolean } =
        await res.json()

      throw new Error(error.message)
    }

    const { data }: { sucess: boolean; code: HttpsResponseCode; data: IFetchLocationResponse } =
      await res.json()

    return data
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'fetchLocation',
      path: '@/services/fetch/location.ts',
      error
    })

    throw new Error(message)
  }
}
