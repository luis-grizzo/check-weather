import { GoogleGenAI } from '@google/genai'

import { GOOGLE_GENAI_KEY } from '@/shared/constants/enviorement'

export { Type } from '@google/genai'

export const MODEL = 'gemini-2.5-flash-lite'

export const gemini = new GoogleGenAI({ apiKey: GOOGLE_GENAI_KEY })
