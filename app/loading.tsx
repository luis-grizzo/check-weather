import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container mx-auto px-4 py-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>

            <EmptyTitle>Um momento</EmptyTitle>

            <EmptyDescription>
              Em breve sua pagina será carregada, obrigado por utilizar o CheckWeather!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </header>
    </main>
  )
}
