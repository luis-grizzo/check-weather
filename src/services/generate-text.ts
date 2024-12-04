import { GoogleGenerativeAI } from '@google/generative-ai'

import { formatCountryName, formatDateTime } from '@/utils/string-utils'
import {
  kelvinToFahrenheit,
  metersPerSecondToMilesPerHour
} from '@/utils/number-utils'
import { FormattedFetchWeatherResponse } from '@/types/weather'

const genAI = new GoogleGenerativeAI(String(process.env.GOOGLE_AI_API_KEY))
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function generateText(prompt: string) {
  const { response } = await model.generateContent(prompt)

  return response.text()
}

export async function generateLocationHint({
  location,
  locale
}: {
  location: FormattedFetchWeatherResponse['location']
  locale: string
}) {
  if (location.country) {
    const formattedCountry = formatCountryName(location.country, { locale })

    const prompt = `generate a one-paragraph description in ${locale}, and no more than 200 characters about ${location.city}, ${formattedCountry}`

    const response = await generateText(prompt)

    return response
  }

  return null
}

export async function generateWeatherHint({
  weather,
  locale
}: {
  weather: Pick<
    FormattedFetchWeatherResponse,
    | 'location'
    | 'time'
    | 'curr_temp'
    | 'feels_like_temp'
    | 'wind_speed'
    | 'humidity'
    | 'description'
  >
  locale: string
}) {
  const formattedDate = formatDateTime(weather.time, {
    dateStyle: 'full',
    locale
  })
  const formattedTime = formatDateTime(weather.time, {
    timeStyle: 'short',
    locale
  })
  const formattedWindSpeed = metersPerSecondToMilesPerHour(weather.wind_speed)
  const formattedTemperature = kelvinToFahrenheit(weather.curr_temp)
  const formattedFeelsLikeTemperature = kelvinToFahrenheit(
    weather.feels_like_temp
  )

  const prompt = `Based on the user's current local weather conditions, in ${locale}, provide a practical and personalized well-being recommendation to maximize their comfort and health throughout the day. Consider the following data: location ${weather.location.city}, date ${formattedDate}, time ${formattedTime}}, temperature ${formattedTemperature}, feels like ${formattedFeelsLikeTemperature}, wind speed ${formattedWindSpeed}, humidity ${weather.humidity}%, and weather ${weather.description}. Do not mention the temperature. The recommendation should be brief and useful, addressing daily activities, suitable clothing, hydration, or any additional care appropriate for these conditions.`

  const response = await generateText(prompt)

  return response
}
