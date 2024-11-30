'use client'

import { Sparkles } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export function AIBadge() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Sparkles className="cursor-pointer inline align-text-top h-4 w-4 text-lime-600 dark:text-lime-400 animate-pulse" />
      </PopoverTrigger>

      <PopoverContent className="p-2 w-fit" collisionPadding={16}>
        <span className="text-sm font-medium leading-none">
          AI-generated content. May contain errors.
        </span>
      </PopoverContent>
    </Popover>
  )
}
