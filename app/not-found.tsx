import Link from 'next/link'
import { MapPinX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container mx-auto px-4 py-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MapPinX />
            </EmptyMedia>

            <EmptyTitle>Página não encontrada</EmptyTitle>

            <EmptyDescription>
              A página que você está procurando não existe ou foi movida.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button asChild>
              <Link href="/">Voltar a home</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </header>
    </main>
  )
}
