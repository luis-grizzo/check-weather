'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container mx-auto px-4 py-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <X />
            </EmptyMedia>

            <EmptyTitle>Algo deu errado!</EmptyTitle>

            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="flex-row flex-wrap justify-center">
            <Button size="sm" asChild>
              <Link href="/">Voltar a home</Link>
            </Button>

            <Button size="sm" variant="ghost" onClick={reset}>
              Tentar novamente
            </Button>
          </EmptyContent>
        </Empty>
      </header>
    </main>
  )
}
