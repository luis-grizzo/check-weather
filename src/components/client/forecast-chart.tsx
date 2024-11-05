'use client'

import {
  Area,
  AreaChart,
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
import { fahrenheitToCelcius } from '@/utils/number-utils'

import type { FormattedFetchForecastResponse } from '@/types/forecast'

export function ForecastChart({
  forecasts
}: {
  forecasts: FormattedFetchForecastResponse['forecasts']
}) {
  const chartData = forecasts.map((forecast) => ({
    forecast: forecast.time,
    temp: forecast.temp
  }))

  const chartConfig = {
    temp: {
      label: 'Temperature',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full lg:max-h-[500px]"
    >
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid />

        <YAxis
          hide={true}
          tickCount={3}
          tickLine={false}
          axisLine={false}
          padding={{ top: 16, bottom: 16 }}
        />

        <XAxis
          dataKey="forecast"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          padding={{ left: 16, right: 16 }}
          tickFormatter={(value) =>
            `${formatDateTime(value, { hour: '2-digit', hour12: false })}h`
          }
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(value) =>
                `${value}°F (${fahrenheitToCelcius(value as number)}°C)`
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
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) => `${value}°C`}
          />
        </Area>
      </AreaChart>
    </ChartContainer>
  )
}
