import { Sparkles } from 'lucide-react'

export function AISeal() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-emphasis" />

      <span className="text-sm text-muted-foreground">
        AI-generated content. May contain errors.
      </span>
    </div>
  )
}
