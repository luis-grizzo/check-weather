import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container mx-auto px-4 py-16">
        <Spinner className="size-10 lg:size-12" />

        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-center text-balance">
          CheckWeather
        </h1>
      </header>
    </main>
  )
}
