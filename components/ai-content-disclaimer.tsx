import { Sparkles } from 'lucide-react'

export function AiContentDisclaimer() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="size-5 text-blue-500" />

      <strong className="text-sm font-normal text-pretty text-muted-foreground">
        Conteúdo gerado por IA. Pode conter erros.
      </strong>
    </div>
  )
}
