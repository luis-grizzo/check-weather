'use client'

import { useEffect } from 'react'
import { CloudOff } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const { toast } = useToast()

  useEffect(() => {
    console.error(error)

    toast({
      variant: 'destructive',
      title: 'Error.',
      description: error.message
    })
  }, [])

  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <div className="flex items-center gap-4">
        <CloudOff className="h-10 w-10 lg:h-12 lg:w-12" />

        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Oops
        </h1>
      </div>

      <p className="text-center text-xl text-muted-foreground">
        Something went wrong!
      </p>

      <Button onClick={reset}>Try again</Button>
    </main>
  )
}
