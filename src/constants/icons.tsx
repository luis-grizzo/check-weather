import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Haze,
  CloudHail,
  CloudFog,
  Waves,
  CloudRainWind,
  Tornado
} from 'lucide-react'

export const weatherIcons = {
  clear_day: Sun,
  clear_night: Moon,
  partly_cloudy_day: CloudSun,
  partly_cloudy_night: CloudMoon,
  rainy: CloudRain,
  thunderstorm: CloudLightning,
  weather_snowy: CloudSnow,
  mist: Haze,
  weather_mix: CloudHail,
  foggy: CloudFog,
  airwave: Waves,
  storm: CloudRainWind,
  tornado: Tornado
}

export const weatherIconsArray = Object.values(weatherIcons)
