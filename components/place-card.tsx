import Link from 'next/link'

import { type Place } from '@/lib/prisma'

import { formatCountryName } from '@/shared/utils/formatters'

export function PlaceCard({
  data
}: {
  data: Pick<Place, 'slug' | 'name' | 'state' | 'country'> & { _count: { locations: number } }
}) {
  const fullPlace = `${data.name}, ${data.state ? `${data.state}, ` : ''}${formatCountryName(data.country)}`

  return (
    <Link
      href={`/${data.slug}`}
      className="flex gap-4 items-center justify-between p-8 bg-muted rounded-4xl hover:bg-muted/60 transition-colors"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xl font-medium">{fullPlace}</span>

        <span className="text-base text-muted-foreground">
          {data._count.locations === 1
            ? 'Em 1 local'
            : `Em ${data._count.locations} locais diferentes`}
        </span>
      </div>
    </Link>
  )
}
