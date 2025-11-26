import { gemini, MODEL, Type } from '@/lib/gemini'
import { type Place } from '@/lib/prisma'
import { IWeatherFactoryResponse } from '@/lib/weather-factory'

import { ErrorMessage } from '@/shared/enums'
import { logError } from '@/shared/utils'

interface IWeatherRecommendationRequest extends Pick<Place, 'name'> {
  weather: IWeatherFactoryResponse
}

interface IWeatherRecommendationResponse {
  title: string
  description: string
}

export async function generateWeatherRecommendation(
  params: IWeatherRecommendationRequest
): Promise<IWeatherRecommendationResponse> {
  try {
    const response = await gemini.models.generateContent({
      model: MODEL,
      contents: JSON.stringify(params),
      config: {
        temperature: 2,
        systemInstruction:
          "Com base em 'place' (com 'name') e 'weather' (por exemplo: temperature, feels_like, condition, precipitation, wind_speed, humidity, uv_index, visibility, etc.), gere em português uma recomendação prática, bem-humorada e voltada à preparação e ao bem-estar diante do clima atual. Deve incluir: 1) breve síntese do estado do tempo, 2) dicas acionáveis e específicas (roupa adequada, hidratação, proteção solar, guarda-chuva/impermeável, cuidado com vento/estradas), 3) sugestões de atividades condizentes com o clima atual (por exemplo: passeio ao ar livre, leitura em casa, esportes, café em cafeteria) e 4) precauções especiais quando aplicável. Mantenha o texto conciso (2-4 frases), natural, direto e com tom leve e bem-humorado. Não faça perguntas, não instrua o leitor sobre como usar a resposta e não mencione que recebeu JSON. Não utilize Markdown; responda apenas com texto puro, sem nenhuma marcação.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING
            },
            description: {
              type: Type.STRING
            }
          },
          required: ['title', 'description']
        }
      }
    })

    if (!response.text) {
      throw new Error('Falha ao gerar a recomendação sobre o clima.')
    }

    const parsedResponse: IWeatherRecommendationResponse = JSON.parse(response.text)

    return parsedResponse
  } catch (error) {
    const message = ErrorMessage.GEMINI_ERROR

    logError({
      alias: 'generateWeatherRecommendation',
      path: '@/services/gemini/generate-weather-recommendation.ts',
      error
    })

    throw new Error(message)
  }
}
