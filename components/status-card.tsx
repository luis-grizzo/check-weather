import { Info } from 'lucide-react'

import { Button } from './ui/button'

import { WeatherSeverity } from '@/shared/enums/weather-severity'

export function StatusCard({
  data
}: {
  data: {
    value: string
    description: string
    status?: WeatherSeverity
  }
}) {
  return (
    <div className="flex gap-4 items-center justify-between p-8 bg-muted rounded-4xl">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">{data.value}</span>

        <span className="text-base text-muted-foreground">{data.description}</span>
      </div>

      <div className="flex gap-1 items-center justify-center">
        {!!data.status && (
          <span
            data-status={WeatherSeverity[data.status]}
            className="relative size-4 rounded-full data-[status=GOOD]:bg-green-500 data-[status=MODERATE]:bg-yellow-500 data-[status=SEVERE]:bg-red-500 before:absolute before:top-0 before:left-0 before:size-4 before:bg-inherit before:rounded-full before:animate-ping"
          />
        )}

        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </div>
    </div>
  )
}
