import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { GITHUB_REPO_URL, LINKEDIN_URL } from '@/shared/constants'

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="flex justify-between items-center h-14 container mx-auto px-4">
        <span className="text-sm text-muted-foreground">Desenvolvido por Luís Grizzo.</span>

        <div className="flex gap-1 iems-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href={String(LINKEDIN_URL)} target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href={String(GITHUB_REPO_URL)} target="_blank" rel="noopener noreferrer">
              <Github />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
