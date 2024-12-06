'use client'

import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { MoonStar, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const translations = useTranslations('ThemeToggle')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="dark:hidden" />

          <MoonStar className="hidden dark:block" />

          <span className="sr-only">{translations('description')}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {translations('light')}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {translations('dark')}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('system')}>
          {translations('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
