'use client'

import { IS_PRODUCTION, BASE_URL } from '@/shared/constants/enviorement'

export const validateEnvironmentPath = () => {
  if (IS_PRODUCTION) {
    return `${BASE_URL}/api`
  }

  return `${location.origin}/api`
}
