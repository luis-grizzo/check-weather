'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { weatherIconsArray } from '@/constants/icons'

export function Navbar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // TODO: Resolver bug no useEffect onde não é disparado caso o index seja o mesmo do anterior.
    const timer = setTimeout(() => {
      const newIndex = Math.floor(Math.random() * weatherIconsArray.length)

      setIndex(newIndex)
    }, 2_000)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <nav className="sticky top-0 bg-neutral-100/60 border-b-1 border-neutral-600/10 backdrop-blur">
      <div className="flex items-center gap-2 container mx-auto px-8 py-6">
        <Image
          src={weatherIconsArray[index]}
          alt=""
          className="w-7 aspect-square"
        />

        <span className="text-lg">Check Weather</span>
      </div>
    </nav>
  )
}
