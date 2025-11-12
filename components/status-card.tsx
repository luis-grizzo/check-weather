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
            className="size-4 rounded-full data-[status=GOOD]:bg-green-500 data-[status=AVERAGE]:bg-yellow-500 data-[status=BAD]:bg-red-500"
          />
        )}

        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </div>
    </div>
  )
}
