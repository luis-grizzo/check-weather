import { Github, Linkedin } from 'lucide-react'

import { Button } from './ui/button'

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="flex justify-between items-center h-14 container mx-auto px-4">
        <span className="text-sm text-muted-foreground">Desenvolvido por Luís Grizzo.</span>

        <div className="flex gap-1 iems-center">
          <Button variant="ghost" size="icon">
            <Linkedin />
          </Button>

          <Button variant="ghost" size="icon">
            <Github />
          </Button>
        </div>
      </div>
    </footer>
  )
}
