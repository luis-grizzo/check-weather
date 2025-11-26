import { type Place } from '@/lib/prisma'
import { validateEnvironmentPath } from '@/lib/validate-enviroment-path'

import { HttpsResponseCode } from '@/shared/enums'
import { logError, getErrorMessage } from '@/shared/utils'
import { type ICoordinates } from '@/shared/types/geolocation'

export interface IFetchLocationRequest extends ICoordinates {
  owner: string
}

export interface IFetchLocationResponse {
  place: Pick<Place, 'slug'>
}

export async function fetchLocation(
  params: IFetchLocationRequest
): Promise<IFetchLocationResponse> {
  try {
    const originPath = validateEnvironmentPath()

    const res = await fetch(`${originPath}/v1/find-first-location`, {
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
    const message = getErrorMessage(error)

    logError({
      alias: 'fetchLocation',
      path: '@/services/fetch/location.ts',
      error
    })

    throw new Error(message)
  }
}
