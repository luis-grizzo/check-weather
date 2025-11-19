'use client'

import { useEffect } from 'react'
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

import { ErrorOrigin } from '@/shared/enums/error-origin'
import { logError } from '@/shared/utils/log-error'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logError({ origin: ErrorOrigin.APP, alias: 'Error', path: '@/app/error.tsx', error })
  }, [error])

  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container mx-auto px-4 py-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <X />
            </EmptyMedia>

            <EmptyTitle>Algo deu errado!</EmptyTitle>

            <EmptyDescription>
              Não foi possível carregar a página. Por favor, tente novamente mais tarde.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="flex-row flex-wrap">
            <Button asChild>
              <Link href="/">Voltar a home</Link>
            </Button>

            <Button variant="ghost" onClick={reset}>
              Tentar novamente
            </Button>
          </EmptyContent>
        </Empty>
      </header>
    </main>
  )
}
