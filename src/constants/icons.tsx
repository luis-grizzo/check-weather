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

import refresh from '@public/refresh.svg'
import cloud_off from '@public/cloud_off.svg'
import air from '@public/air.svg'
import visibility from '@public/visibility.svg'
import water_drop from '@public/water_drop.svg'
import error from '@public/error.svg'
import progress_activity from '@public/progress_activity.svg'

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

export const layoutIcons = {
  refresh,
  cloud_off,
  air,
  visibility,
  water_drop,
  error,
  progress_activity
}

export const weatherIconsArray = Object.values(weatherIcons)
