import { createClient } from 'pexels'

import { PEXELS_API_KEY } from '@/shared/constants/enviorement'

export const pexels = createClient(String(PEXELS_API_KEY))

export { type Video } from 'pexels'
