import { createClient } from 'pexels'

import { PEXELS_API_KEY } from '@/shared/constants'

export const pexels = createClient(String(PEXELS_API_KEY))

export { type Video, type Videos, type PaginationParams, type VideoFilterParams } from 'pexels'
