'use cache'

import { cacheLife } from 'next/cache'
import Link from 'next/link'

import { showVideo } from '@/services/pexels'
import { findManyPlaces } from '@/services/prisma'

import { RequestLocation } from '@/components/request-location'
import { Video } from '@/components/video'
import { PlaceCard } from '@/components/place-card'

import { Button } from '@/components/ui/button'

import { PEXELS_VIDEO_ID_HOME } from '@/shared/constants'

const PLACES_SECTION_ID = 'cidades-visitadas'

export default async function Home() {
  cacheLife('hours')

  const video = await showVideo({ id: String(PEXELS_VIDEO_ID_HOME) })

  const places = await findManyPlaces()

  return (
    <main className="flex flex-col justify-center min-h-[calc(100svh-7rem)]">
      <header className="flex flex-col gap-8 items-center container md:max-w-sm lg:max-w-lg mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter text-center text-balance">
            Consulte o clima de onde estiver.
          </h1>

          <p className="text-base lg:text-xl text-center text-balance">
            Saiba o que te espera lá fora. Rápido, prático e informativo!
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <RequestLocation />

          {!!places.length && (
            <Button variant="ghost">
              <Link href={`#${PLACES_SECTION_ID}`}>Cidades visitadas</Link>
            </Button>
          )}
        </div>
      </header>

      <section className="flex flex-col gap-8 container mx-auto px-4 py-8">
        <Video
          data={{ height: video.height, width: video.width, video_files: video.video_files }}
          className="w-full aspect-square md:aspect-video rounded-4xl"
        />

        {!!places.length && (
          <div
            id={PLACES_SECTION_ID}
            className="scroll-m-22 flex flex-col gap-4 items-center mt-8 md:mt-16 lg:mt-24"
          >
            <h2 className="text-3xl font-semibold">Cidades visitadas</h2>

            <div className="grid gap-4 grid-cols-1 auto-rows-auto md:grid-cols-2 lg:grid-cols-3 w-full">
              {places.map((place) => (
                <PlaceCard key={place.id} data={place} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
