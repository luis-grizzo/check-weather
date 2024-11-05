'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 w-full bg-background/60 backdrop-blur">
      <div className="flex items-center justify-between h-14 container mx-auto px-4">
        <Button variant="link" asChild className="p-0">
          <Link href="https://luisgrizzo.dev" target="_blank">
            Developed by Luís Grizzo
          </Link>
        </Button>

        <span className="text-sm text-muted-foreground geist-mono">
          {currentYear}
        </span>
      </div>
    </footer>
  )
}
