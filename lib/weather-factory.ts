import { type ICurrentWeatherResponse } from '@/services/open-weather/current-weather'

import { WeatherSeverity } from '@/shared/enums/weather-severity'
import { WeatherConditions } from '@/shared/enums/weather-conditions'
import { formatDateTime, formatNumber } from '@/shared/utils/formatters'

interface IStatistic {
  name: string
  value: string
  description?: string
  status?: WeatherSeverity
}

export interface IWeatherFactoryResponse {
  timestamp: number
  date: string
  condition: WeatherConditions
  description: string
  temperature: string
  statistics: IStatistic[]
}

function getDescriptionValue(description: string) {
  const [firstLetter, ...rest] = description

  return `${firstLetter.toUpperCase()}${rest.join('')}`
}

function getVisibilityValue(visibility: number): string {
  if (visibility === 10_000) return '10 km ou mais'

  return formatNumber(visibility / 1_000, {
    style: 'unit',
    unit: 'kilometer',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  })
}

// function getVisibilityStatus(visibility: number): WeatherSeverity {
//   if (visibility >= 10_000) return WeatherSeverity.GOOD
//   if (visibility < 10_000 && visibility >= 4_000) return WeatherSeverity.MODERATE

//   return WeatherSeverity.SEVERE
// }

// function getHumidityStatus(humidity: number): WeatherSeverity {
//   if (humidity >= 30 && humidity <= 70) return WeatherSeverity.GOOD
//   if ((humidity >= 20 && humidity <= 30) || (humidity >= 70 && humidity <= 85))
//     return WeatherSeverity.MODERATE

//   return WeatherSeverity.SEVERE
// }

// function getPressureStatus(pressure: number): WeatherSeverity {
//   if (pressure > 1_005) return WeatherSeverity.GOOD
//   if (pressure >= 995 && pressure <= 1_005) return WeatherSeverity.MODERATE

//   return WeatherSeverity.SEVERE
// }

// function getWindSpeedStatus(speed: number) {
//   if (speed <= 5) return WeatherSeverity.GOOD
//   if (speed > 5 && speed <= 10) return WeatherSeverity.MODERATE

//   return WeatherSeverity.SEVERE
// }

// function getWindGustStatus(gust: number) {
//   if (gust <= 10) return WeatherSeverity.GOOD
//   if (gust > 10 && gust <= 17) return WeatherSeverity.MODERATE

//   return WeatherSeverity.SEVERE
// }

function getWindDiretionValue(degree: number): string {
  if (degree >= 337.5 || degree < 22.5) return 'Norte'
  if (degree >= 22.5 && degree < 67.5) return 'Nordeste'
  if (degree >= 67.5 && degree < 112.5) return 'Leste'
  if (degree >= 112.5 && degree < 157.5) return 'Sudeste'
  if (degree >= 157.5 && degree < 202.5) return 'Sul'
  if (degree >= 202.5 && degree < 247.5) return 'Sudoeste'
  if (degree >= 247.5 && degree < 292.5) return 'Oeste'
  if (degree >= 292.5 && degree < 337.5) return 'Noroeste'
  return 'Indefinido'
}

// function getRainStatus(volume: number) {
//   if (volume <= 2.5) return WeatherSeverity.GOOD
//   if (volume > 2.5 && volume <= 7.5) return WeatherSeverity.MODERATE

//   return WeatherSeverity.SEVERE
// }

export async function weatherFactory(
  raw: ICurrentWeatherResponse
): Promise<IWeatherFactoryResponse> {
  const weather: IWeatherFactoryResponse = {
    timestamp: raw.dt * 1_000,
    date: await formatDateTime(new Date(raw.dt * 1_000), {
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
    condition: raw.weather[0].main,
    description: getDescriptionValue(raw.weather[0].description),
    temperature: formatNumber(raw.main.temp, {
      style: 'unit',
      unit: 'celsius',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }),
    statistics: [
      {
        name: 'Sensação térmica',
        value: formatNumber(raw.main.feels_like, {
          style: 'unit',
          unit: 'celsius',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        name: 'Visibilidade',
        value: getVisibilityValue(raw.visibility)
      },
      {
        name: 'Nebulosidade',
        value: formatNumber(raw.clouds.all, {
          style: 'unit',
          unit: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        name: 'Umidade',
        value: formatNumber(raw.main.humidity, {
          style: 'unit',
          unit: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        name: 'Pressão atmosférica',
        value: `${raw.main.sea_level} hPa`
      },
      {
        name: 'Velocidade do vento',
        value: formatNumber(raw.wind.speed * 3.6, {
          style: 'unit',
          unit: 'kilometer-per-hour',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        name: 'Rajada de vento',
        value: formatNumber(raw.wind.gust * 3.6, {
          style: 'unit',
          unit: 'kilometer-per-hour',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        name: 'Direção do vento',
        value: getWindDiretionValue(raw.wind.deg)
      },
      {
        name: 'Nascer do sol',
        value: await formatDateTime(new Date(raw.sys.sunrise * 1_000), { timeStyle: 'short' })
      },
      {
        name: 'Pôr do sol',
        value: await formatDateTime(new Date(raw.sys.sunset * 1_000), { timeStyle: 'short' })
      }
    ]
  }

  if (raw.main.temp_min !== raw.main.temp_max)
    weather.statistics.unshift(
      {
        name: 'Ponto mais frio',
        value: formatNumber(raw.main.temp_min, {
          style: 'unit',
          unit: 'celsius',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        name: 'Ponto mais quente',
        value: formatNumber(raw.main.temp_max, {
          style: 'unit',
          unit: 'celsius',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      }
    )

  if (!!raw.rain)
    weather.statistics.unshift({
      name: 'Chuva',
      value: formatNumber(raw.rain['1h'], {
        style: 'unit',
        unit: 'millimeter-per-hour',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    })

  if (!!raw.snow)
    weather.statistics.unshift({
      name: 'Neve',
      value: formatNumber(raw.snow['1h'], {
        style: 'unit',
        unit: 'millimeter-per-hour',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    })

  return weather
}
