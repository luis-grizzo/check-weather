import { useTranslations } from 'next-intl'
import { Sparkles } from 'lucide-react'

export function AISeal() {
  const t = useTranslations('AISeal')

  return (
    <div className="flex items-center gap-2">
      <Sparkles className="h-5 w-5 text-emphasis" />

      <span className="text-sm text-muted-foreground">{t('description')}</span>
    </div>
  )
}
