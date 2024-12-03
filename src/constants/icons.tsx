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
  mist: <Haze />,
  airwave: <Waves />,
  clear_day: <Sun />,
  partly_cloudy_day: <CloudSun />,
  clear_night: <Moon />,
  partly_cloudy_night: <CloudMoon />,
  weather_snowy: <CloudSnow />,
  tornado: <Tornado />,
  weather_mix: <CloudHail />,
  foggy: <CloudFog />,
  rainy: <CloudRain />,
  storm: <CloudRainWind />,
  thunderstorm: <CloudLightning />
}

export const weatherIconsArray = Object.values(weatherIcons)
