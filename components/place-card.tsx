import Link from 'next/link'

import { type Place } from '@/lib/prisma'

import { formatCountryName } from '@/shared/utils/formatters'

export function PlaceCard({ data }: { data: Pick<Place, 'slug' | 'name' | 'state' | 'country'> }) {
  return (
    <Link
      href={`/${data.slug}`}
      className="flex gap-4 items-center justify-between p-8 bg-muted rounded-4xl hover:bg-muted/60 transition-colors"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">{`${data.name}${data.state && `, ${data.state}`}`}</span>

        <span className="text-base text-muted-foreground">{formatCountryName(data.country)}</span>
      </div>
    </Link>
  )
}
