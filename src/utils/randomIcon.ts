import { weatherIconsArray } from '@/constants/icons'

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * weatherIconsArray.length)

  return weatherIconsArray[randomIndex]
}

export const randomIcon = getRandomIcon()
