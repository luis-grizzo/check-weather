import { GoogleGenerativeAI } from '@google/generative-ai'

import { formatDateTime } from '@/utils/string-utils'

// import type { FormattedFetchForecastResponse } from '@/types/forecast'

const genAI = new GoogleGenerativeAI(String(process.env.GOOGLE_AI_API_KEY))
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function generateText(prompt: string) {
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

export const getWeatherHintPrompt = ({
  location,
  time,
  curr_temp,
  feels_like_temp,
  wind_speed,
  humidity,
  weather
}: {
  location: string
  time: number
  curr_temp: number
  feels_like_temp: number
  wind_speed: number
  humidity: number
  weather: string
}) => {
  const formattedDate = formatDateTime(time, { dateStyle: 'full' })
  const formattedTime = formatDateTime(time, { timeStyle: 'short' })

  return `Based on the user's current local weather conditions, provide a practical and personalized well-being recommendation to maximize their comfort and health throughout the day. Consider the following data: location (${location}) date (${formattedDate}), time (${formattedTime}}), temperature - add celcius degrees too (${curr_temp}°F), feels like - add celcius degrees too (${feels_like_temp}°F), wind speed (${wind_speed} m/s), humidity (${humidity}%), and weather (${weather}). The recommendation should be brief and useful, addressing daily activities, suitable clothing, hydration, or any additional care appropriate for these conditions.`
}
