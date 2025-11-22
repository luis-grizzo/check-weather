export function StatusCard({
  data
}: {
  data: {
    value: string
    description: string
  }
}) {
  return (
    <div className="flex gap-4 items-center justify-between p-8 bg-muted rounded-4xl">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">{data.value}</span>

        <span className="text-base text-muted-foreground">{data.description}</span>
      </div>
    </div>
  )
}
