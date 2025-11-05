import { GoogleGenerativeAI } from '@google/generative-ai'

import { formatDateTime } from '@/utils/string-utils'
import {
  kelvinToFahrenheit,
  metersPerSecondToMilesPerHour
} from '@/utils/number-utils'
import { FormattedFetchWeatherResponse } from '@/types/weather'

// import type { FormattedFetchForecastResponse } from '@/types/forecast'

const genAI = new GoogleGenerativeAI(String(process.env.GOOGLE_AI_API_KEY))
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

async function generateText(prompt: string) {
  const { response } = await model.generateContent(prompt)

  return response.text()
}

// export const getCityDescriptionPrompt = ({
//   city,
//   country,
//   latitude,
//   longitude,
//   timezone,
//   population
// }: FormattedFetchForecastResponse['location']) =>
//   `Generate a brief description of the location and its climate based on the following fields: City (${city}), Country (${country}), Coordinates (${latitude}, ${longitude}), Time Zone (${timezone}), and Population (${population}). Use coordinates and time zone only to locate the place and its regional climate, without directly mentioning these details in the final description. If the population is greater than 0, it should be used as an estimate; if it is 0, it should not be mentioned. If any information is invalid (such as 0, undefined, '', or null), disregard it in the description.`

export async function generateWeatherHint(
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
) {
  const { location } = weather

  const formattedDate = formatDateTime(weather.time, { dateStyle: 'full' })
  const formattedTime = formatDateTime(weather.time, { timeStyle: 'short' })
  const formattedWindSpeed = metersPerSecondToMilesPerHour(weather.wind_speed)
  const formattedFahrenheitTemperature = kelvinToFahrenheit(weather.curr_temp)
  const formattedFahrenheitFeelsLikeTemperature = kelvinToFahrenheit(
    weather.feels_like_temp
  )

  const prompt = `Based on the user's current local weather conditions, provide a practical and personalized well-being recommendation to maximize their comfort and health throughout the day. Consider the following data: location ${location.city}, date ${formattedDate}, time ${formattedTime}}, temperature ${formattedFahrenheitTemperature}, feels like ${formattedFahrenheitFeelsLikeTemperature}, wind speed ${formattedWindSpeed}, humidity ${weather.humidity}%, and weather ${weather.description}. Do not mention the temperature. The recommendation should be brief and useful, addressing daily activities, suitable clothing, hydration, or any additional care appropriate for these conditions.`

  const response = await generateText(prompt)

  return response
}

export async function generateProjectDescription() {
  const prompt =
    "Generate a one-paragraph description of no more than 90 characters to be displayed on the application's home page. The application is a system that provides information about the current weather based on the user's location and also a forecast for the next 5 days also for the user's location. The name of the application is check weather. Do not mention the name of the project at the beginning of the text."

  const response = await generateText(prompt)

  return response
}

// export function getForecastHintPrompt({
//   forecasts
// }: {
//   forecasts: FormattedFetchForecastResponse['forecasts']
// }) {

//   const formattedDate = formatDateTime(time, { dateStyle: 'full' })
//   const formattedTime = formatDateTime(time, { timeStyle: 'short' })
//   const formattedFahrenheitTemperature = `${Math.round(curr_temp)}°F`
//   const formattedFahrenheitFeelsLikeTemperature = `${Math.round(feels_like_temp)}°F`

//   return `Based on the user's current local weather conditions, provide a practical and personalized well-being recommendation to maximize their comfort and health throughout the forecast period. Consider the following data: location ${location}, date ${formattedDate}, time ${formattedTime}}, temperature ${formattedFahrenheitTemperature}, feels like ${formattedFahrenheitFeelsLikeTemperature}, wind speed ${wind_speed} m/s, humidity ${humidity}%, and weather ${weather}. The recommendation should be brief and useful, addressing daily activities, suitable clothing, hydration, or any additional care appropriate for these conditions.`
// }
