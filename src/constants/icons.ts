import clear_day from '@public/clear_day.svg'
import clear_night from '@public/clear_night.svg'
import partly_cloudy_day from '@public/partly_cloudy_day.svg'
import partly_cloudy_night from '@public/partly_cloudy_night.svg'
import rainy from '@public/rainy.svg'
import thunderstorm from '@public/thunderstorm.svg'
import weather_snowy from '@public/weather_snowy.svg'
import mist from '@public/mist.svg'
import weather_mix from '@public/weather_mix.svg'
import foggy from '@public/foggy.svg'
import airwave from '@public/airwave.svg'
import storm from '@public/storm.svg'
import tornado from '@public/tornado.svg'

import refresh from '@public/refresh.svg'
import cloud_off from '@public/cloud_off.svg'
import air from '@public/air.svg'
import visibility from '@public/visibility.svg'
import water_drop from '@public/water_drop.svg'
import info from '@public/info.svg'
import error from '@public/error.svg'
import progress_activity from '@public/progress_activity.svg'

export const weatherIcons = {
  clear_day: {
    src: clear_day,
    alt: 'Clear day icon'
  },
  clear_night: {
    src: clear_night,
    alt: 'Clear night icon'
  },
  partly_cloudy_day: {
    src: partly_cloudy_day,
    alt: 'Partly cloudy day icon'
  },
  partly_cloudy_night: {
    src: partly_cloudy_night,
    alt: 'Partly cloudy night icon'
  },
  rainy: {
    src: rainy,
    alt: 'Rainy icon'
  },
  thunderstorm: {
    src: thunderstorm,
    alt: 'Thunderstorm icon'
  },
  weather_snowy: {
    src: weather_snowy,
    alt: 'Weather snowy icon'
  },
  mist: {
    src: mist,
    alt: 'Mist icon'
  },
  weather_mix: {
    src: weather_mix,
    alt: 'Weather mix icon'
  },
  foggy: {
    src: foggy,
    alt: 'Foggy icon'
  },
  airwave: {
    src: airwave,
    alt: 'Airwave icon'
  },
  storm: {
    src: storm,
    alt: 'Storm icon'
  },
  tornado: {
    src: tornado,
    alt: 'Tornado icon'
  }
}

export const layoutIcons = {
  refresh,
  cloud_off,
  air,
  visibility,
  water_drop,
  info,
  error,
  progress_activity
}

export const weatherIconsArray = Object.values(weatherIcons)
