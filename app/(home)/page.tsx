import Link from 'next/link'

import { getVideo } from '@/services/pexels/get-video'
import { findManyPlaces } from '@/services/prisma'

import { RequestLocation } from '@/components/request-location'
import { Video } from '@/components/video'
import { PlaceCard } from '@/components/place-card'

import { Button } from '@/components/ui/button'

import { PEXELS_VIDEO_ID_HOME } from '@/shared/constants/enviorement'

const PLACE_SECTION_ID = 'locais'

export const revalidate = 3_600

export default async function Home() {
  const video = await getVideo({ id: String(PEXELS_VIDEO_ID_HOME) })

  const places = await findManyPlaces()

  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container md:max-w-sm lg:max-w-lg mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-center text-balance">
            Consulte o clima de onde estiver.
          </h1>

          <p className="text-base lg:text-xl text-center text-balance">
            Consultor de clima rápido, prático e informativo, que ajuda a te preparar para o que
            for!
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <RequestLocation />

          {!!places.length && (
            <Button variant="ghost">
              <Link href={`#${PLACE_SECTION_ID}`}>Locais já consultados</Link>
            </Button>
          )}
        </div>
      </header>

      <section className="flex flex-col gap-8 container mx-auto px-4 py-8">
        <Video
          data={{ height: video.height, width: video.width, video_files: video.video_files }}
          className="w-full aspect-square md:aspect-video lg:aspect-21/9 rounded-4xl"
        />

        {!!places.length && (
          <div
            id={PLACE_SECTION_ID}
            className="scroll-m-22 grid gap-4 grid-cols-1 auto-rows-auto xl:grid-cols-2"
          >
            {places.map((place) => (
              <PlaceCard key={place.id} data={place} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
