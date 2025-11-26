import { type ICurrentWeatherResponse } from '@/services/open-weather'

import { WeatherConditions } from '@/shared/enums'
import { formatDateTime, formatNumber } from '@/shared/utils'

interface IStatistic {
  order: number
  name: string
  value: string
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

export function weatherFactory(raw: ICurrentWeatherResponse): IWeatherFactoryResponse {
  const statistics: IStatistic[] = [
    {
      order: 1,
      name: 'Sensação térmica',
      value: formatNumber(raw.main.feels_like, {
        style: 'unit',
        unit: 'celsius',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    {
      order: 6,
      name: 'Velocidade do vento',
      value: formatNumber(raw.wind.speed * 3.6, {
        style: 'unit',
        unit: 'kilometer-per-hour',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    {
      order: 8,
      name: 'Direção do vento',
      value: getWindDiretionValue(raw.wind.deg)
    },
    {
      order: 9,
      name: 'Nebulosidade',
      value: formatNumber(raw.clouds.all, {
        style: 'unit',
        unit: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    {
      order: 10,
      name: 'Umidade',
      value: formatNumber(raw.main.humidity, {
        style: 'unit',
        unit: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    {
      order: 11,
      name: 'Visibilidade',
      value: getVisibilityValue(raw.visibility)
    },
    {
      order: 12,
      name: 'Pressão atmosférica',
      value: `${raw.main.sea_level} hPa`
    },
    {
      order: 13,
      name: 'Nascer do sol',
      value: formatDateTime(new Date(raw.timezone * 1_000 + raw.sys.sunrise * 1_000), {
        timeStyle: 'short'
      })
    },
    {
      order: 14,
      name: 'Pôr do sol',
      value: formatDateTime(new Date(raw.timezone * 1_000 + raw.sys.sunset * 1_000), {
        timeStyle: 'short'
      })
    }
  ]

  if (raw.main.temp_min !== raw.main.temp_max)
    statistics.push(
      {
        order: 2,
        name: 'Ponto mais frio',
        value: formatNumber(raw.main.temp_min, {
          style: 'unit',
          unit: 'celsius',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      },
      {
        order: 3,
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
    statistics.push({
      order: 4,
      name: 'Chuva',
      value: formatNumber(raw.rain['1h'], {
        style: 'unit',
        unit: 'millimeter-per-hour',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    })

  if (!!raw.snow)
    statistics.push({
      order: 5,
      name: 'Neve',
      value: formatNumber(raw.snow['1h'], {
        style: 'unit',
        unit: 'millimeter-per-hour',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    })

  if (raw.wind.gust)
    statistics.push({
      order: 7,
      name: 'Rajada de vento',
      value: formatNumber(raw.wind.gust * 3.6, {
        style: 'unit',
        unit: 'kilometer-per-hour',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    })

  const weather: IWeatherFactoryResponse = {
    timestamp: raw.dt * 1_000,
    date: formatDateTime(new Date(raw.timezone * 1_000 + raw.dt * 1_000), {
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
    statistics: [...statistics].sort((a, b) => a.order - b.order)
  }

  return weather
}
