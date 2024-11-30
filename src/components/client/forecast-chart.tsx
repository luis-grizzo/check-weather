'use client'

import {
  Area,
  Line,
  // AreaChart,
  ComposedChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

import { formatDateTime } from '@/utils/string-utils'

import type { FormattedForecast } from '@/types/forecast'
import { imperialUnitLanguages } from '@/constants/measurement-units'
import { kelvinToCelcius, kelvinToFahrenheit } from '@/utils/number-utils'

interface ForecastChartProps {
  forecasts: FormattedForecast[]
}

export function ForecastChart({ forecasts }: ForecastChartProps) {
  const chartConfig = {
    temp: {
      label: 'Temperature',
      color: 'hsl(var(--chart-current-temperature))'
    },
    feelsLike: {
      label: 'Feels Like',
      color: 'hsl(var(--chart-feels-like-temperature))'
    },
    min: {
      label: 'Minimal',
      color: 'hsl(var(--chart-minimal-temperature))'
    },
    max: {
      label: 'Maximum',
      color: 'hsl(var(--chart-maximum-temperature))'
    }
  } satisfies ChartConfig

  const { language } = navigator
  const isImperialUnit = imperialUnitLanguages.includes(language)

  const formatTemperature = isImperialUnit
    ? kelvinToFahrenheit
    : kelvinToCelcius

  const chartData = forecasts.map((forecast) => {
    return {
      hour: formatDateTime(forecast.time, { hour: '2-digit' }).replace(
        / /gi,
        ''
      ),
      temp: formatTemperature(forecast.temp).replace(/\D/gi, ''),
      feelsLike: formatTemperature(forecast.feels_like_temp).replace(
        /\D/gi,
        ''
      ),
      min: formatTemperature(forecast.min_temp).replace(/\D/gi, ''),
      max: formatTemperature(forecast.max_temp).replace(/\D/gi, '')
    }
  })

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[150px] w-full lg:max-h-[350px]"
    >
      <ComposedChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} horizontal={false} />

        <YAxis
          hide={true}
          tickCount={2}
          tickLine={false}
          axisLine={false}
          padding={{ top: 16 }}
        />

        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          padding={{ left: 16, right: 16 }}
          className="geist-mono tracking-tighter"
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              className="geist-mono"
              labelFormatter={(_, [payload]) => {
                if (payload) {
                  const hour = payload.payload.hour

                  return hour
                }
              }}
              valueFormatter={(value) =>
                isImperialUnit ? `${value}°F` : `${value}°C`
              }
            />
          }
        />

        <defs>
          <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-temp)" stopOpacity={0.8} />

            <stop
              offset="95%"
              stopColor="var(--color-temp)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Line
          dataKey="feelsLike"
          type="natural"
          stroke="var(--color-feelsLike)"
          strokeWidth={2}
          dot={false}
        />

        <Line
          dataKey="min"
          type="natural"
          stroke="var(--color-min)"
          strokeWidth={2}
          dot={false}
        />

        <Line
          dataKey="max"
          type="natural"
          stroke="var(--color-max)"
          strokeWidth={2}
          dot={false}
        />

        <Area
          dataKey="temp"
          type="natural"
          fill="url(#fillTemp)"
          fillOpacity={0.4}
          stroke="var(--color-temp)"
          stackId={1}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground geist-mono"
            fontSize={12}
            formatter={(value: string) =>
              isImperialUnit ? `${value}°F` : `${value}°C`
            }
          />
        </Area>
      </ComposedChart>
    </ChartContainer>
  )
}
