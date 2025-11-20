import { gemini, MODEL } from '@/lib/gemini'
import { type Place } from '@/lib/prisma'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

type TGeneratePlaceDescriptionRequest = Pick<Place, 'name' | 'state' | 'country'>

type TGeneratePlaceDescriptionResponse = string

export async function generatePlaceDescription(
  params: TGeneratePlaceDescriptionRequest
): Promise<TGeneratePlaceDescriptionResponse> {
  try {
    const response = await gemini.models.generateContent({
      model: MODEL,
      contents: JSON.stringify(params),
      config: {
        temperature: 1,
        systemInstruction:
          "Você recebe um JSON com os campos 'name', 'state' e 'country'. Gere uma string que contenha uma descrição informativa e envolvente em português que apresente o local com informações relevantes, como pontos turísticos principais, fatos históricos ou curiosidades, e dicas breves quando aplicável. Mantenha o texto conciso e natural, sem instruções ao leitor. Não utilize Markdown; responda apenas com texto puro, sem nenhuma marcação."
      }
    })

    if (!response.text) {
      throw new Error(`Falha ao gerar a descrição de ${params.name}.`)
    }

    return response.text
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'generatePlaceDescription',
      path: '@/services/gemini/generate-place-description.ts',
      error
    })

    throw new Error(message)
  }
}
