import Image from 'next/image'

import { RequestLocation } from '@/components/request-location'

import { Button } from '@/components/ui/button'

import placeholder from '@public/placeholder.jpg'

export default function Home() {
  return (
    <main className="flex flex-col">
      <header className="flex gap-8 flex-col px-4 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tighter text-balance">
            Consulte o clima de onde estiver.
          </h1>

          <p className="text-base text-balance">
            Consultor de clima rápido, prático e informativo, que te ajuda a se preparar para o que
            for!
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <RequestLocation />

          <Button variant="ghost">Locais já consultados</Button>
        </div>
      </header>

      <section className="flex gap-8 flex-col px-4 py-8">
        <Image
          src={placeholder}
          alt="Placeholder"
          className="object-fill object-center w-full aspect-square rounded-4xl"
        />
      </section>
    </main>
  )
}
