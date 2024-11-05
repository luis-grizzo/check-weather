import { weatherIcons } from './icons'

export const weathersCatalog = {
  clear: {
    color: 'before:from-sky-300 dark:before:from-sky-700',
    icon: {
      day: weatherIcons.clear_day,
      night: weatherIcons.clear_night
    }
  },
  clouds: {
    color: 'before:from-blue-300 dark:before:from-blue-900',
    icon: {
      day: weatherIcons.partly_cloudy_day,
      night: weatherIcons.partly_cloudy_night
    }
  },
  drizzle: {
    color: 'before:from-indigo-300',
    icon: {
      day: weatherIcons.rainy,
      night: weatherIcons.rainy
    }
  },
  rain: {
    color: 'before:from-violet-300',
    icon: {
      day: weatherIcons.rainy,
      night: weatherIcons.rainy
    }
  },
  thunderstorm: {
    color: 'before:from-purple-300',
    icon: {
      day: weatherIcons.thunderstorm,
      night: weatherIcons.thunderstorm
    }
  },
  snow: {
    color: 'before:from-teal-300',
    icon: {
      day: weatherIcons.weather_snowy,
      night: weatherIcons.weather_snowy
    }
  },
  mist: {
    color: 'before:from-slate-300',
    icon: {
      day: weatherIcons.mist,
      night: weatherIcons.mist
    }
  },
  haze: {
    color: 'before:from-slate-300',
    icon: {
      day: weatherIcons.weather_mix,
      night: weatherIcons.weather_mix
    }
  },
  fog: {
    color: 'before:from-slate-300',
    icon: {
      day: weatherIcons.foggy,
      night: weatherIcons.foggy
    }
  },
  smoke: {
    color: 'before:from-slate-300',
    icon: {
      day: weatherIcons.foggy,
      night: weatherIcons.foggy
    }
  },
  dust: {
    color: 'before:from-yellow-300',
    icon: {
      day: weatherIcons.airwave,
      night: weatherIcons.airwave
    }
  },
  sand: {
    color: 'before:from-orange-300',
    icon: {
      day: weatherIcons.airwave,
      night: weatherIcons.airwave
    }
  },
  ash: {
    color: 'before:from-red-300',
    icon: {
      day: weatherIcons.mist,
      night: weatherIcons.mist
    }
  },
  squall: {
    color: 'before:from-pink-300',
    icon: {
      day: weatherIcons.storm,
      night: weatherIcons.storm
    }
  },
  tornado: {
    color: 'before:from-pink-300',
    icon: {
      day: weatherIcons.tornado,
      night: weatherIcons.tornado
    }
  }
}
