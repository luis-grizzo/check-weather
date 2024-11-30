import { Sun } from 'lucide-react'

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 h-dvh container mx-auto p-8">
      <Sun className="h-24 w-24 animate-pulse" />
    </main>
  )
}
