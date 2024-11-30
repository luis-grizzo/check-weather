import { Sparkles } from 'lucide-react'

export function AISeal() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-lime-600 dark:text-lime-400 animate-pulse" />

      <span className="text-sm text-muted-foreground">
        AI-generated content. May contain errors.
      </span>
    </div>
  )
}
