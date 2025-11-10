import { Info } from 'lucide-react'

import { Button } from './ui/button'

import { WeatherConditionStatus } from '@/shared/enums/weatherConditionStatus'

export function StatusCard(props: {
  value: string
  description: string
  status?: WeatherConditionStatus
}) {
  return (
    <div className="flex gap-4 items-center justify-between p-8 bg-muted rounded-4xl">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">{props.value}</span>

        <span className="text-base text-muted-foreground">{props.description}</span>
      </div>

      <div className="flex gap-1 items-center justify-center">
        {!!props.status && (
          <div
            data-status={WeatherConditionStatus[props.status]}
            className="size-4 rounded-full data-[status=GOOD]:bg-green-500 data-[status=AVERAGE]:bg-yellow-500 data-[status=BAD]:bg-red-500"
          ></div>
        )}

        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </div>
    </div>
  )
}
