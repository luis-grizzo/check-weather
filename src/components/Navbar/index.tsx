'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import { weatherIconsArray } from '@/constants/icons'
import { calculateRandomIndex } from '@/lib/calculators'

export function Navbar() {
  const [stateIndex, setStateIndex] = useState(0)

  const MotionImage = motion(Image)

  useEffect(() => {
    const timer = setTimeout(() => {
      let newIndex = stateIndex

      while (newIndex === stateIndex)
        newIndex = calculateRandomIndex(weatherIconsArray)

      setStateIndex(newIndex)
    }, 5_000)

    return () => clearTimeout(timer)
  }, [stateIndex])

  return (
    <nav className="sticky top-0 min-h-[76px] bg-neutral-100/60 border-b-1 border-neutral-600/10 backdrop-blur overflow-hidden z-50">
      <div className="flex items-center gap-2 container mx-auto px-8 py-6">
        <AnimatePresence mode="popLayout">
          {weatherIconsArray.map(
            (icon, index) =>
              stateIndex === index && (
                <MotionImage
                  key={index}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  src={icon}
                  alt="Random weather icon"
                  className="w-7 aspect-square"
                />
              )
          )}
        </AnimatePresence>

        <span className="text-lg">Check Weather</span>
      </div>
    </nav>
  )
}
