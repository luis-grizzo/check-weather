import { gemini, MODEL } from '@/lib/gemini'
import { type Place } from '@/lib/prisma'
import { IWeatherFactoryResponse } from '@/lib/weather-factory'

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

type TWeatherRecommendationRequest = {
  place: Pick<Place, 'name'>
  weather: IWeatherFactoryResponse
}

type TWeatherRecommendationResponse = string

export async function generateWeatherRecommendation(
  params: TWeatherRecommendationRequest
): Promise<TWeatherRecommendationResponse> {
  try {
    const response = await gemini.models.generateContent({
      model: MODEL,
      contents: JSON.stringify(params),
      config: {
        temperature: 2,
        systemInstruction:
          "Você recebe um JSON com 'place' (com 'name') e 'weather' contendo informações atuais do clima (por exemplo: temperature, feels_like, condition, precipitation, wind_speed, humidity, uv_index, visibility, etc.). Em português, gere uma recomendação prática e voltada à preparação e ao bem-estar diante do clima atual. Deve incluir: 1) breve síntese do estado do tempo, 2) dicas acionáveis e específicas (roupa adequada, hidratação, proteção solar, guarda-chuva/impermeável, cuidado com vento/estradas), e 3) precauções especiais quando aplicável. Mantenha o texto conciso (2-4 frases), natural e direto, sem instruções ao leitor sobre como usar a resposta, sem perguntas e sem mencionar que recebeu JSON. Não utilize Markdown; responda apenas com texto puro, sem nenhuma marcação."
      }
    })

    if (!response.text) {
      throw new Error('Falha ao gerar a recomendação sobre o clima.')
    }

    return response.text
  } catch (error) {
    const message = logError({
      origin: ErrorOrigin.APP,
      alias: 'generateWeatherRecommendation',
      path: '@/services/gemini/generate-weather-recommendation.ts',
      error
    })

    throw new Error(message)
  }
}
