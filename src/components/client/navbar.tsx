'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

import { weatherIconsArray } from '@/constants/icons'
import { timeUnits } from '@/constants/time-units'

import { Button } from '@/components/ui/button'

import { ThemeToggle } from '@/components/client/theme-toggle'

import { calculateRandomIndex } from '@/utils/number-utils'

export function Navbar() {
  const [stateIndex, setStateIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let newIndex!: number

      do {
        newIndex = calculateRandomIndex(weatherIconsArray)
      } while (newIndex === stateIndex)

      setStateIndex(newIndex)
    }, timeUnits.second * 5)

    return () => clearTimeout(timer)
  }, [stateIndex])

  return (
    <nav className="fixed top-0 w-full bg-background/60 backdrop-blur z-50">
      <div className="flex items-center justify-between h-14 container mx-auto px-4 overflow-hidden">
        <Link href="/" className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {weatherIconsArray.map((Icon, index) => {
              const MotionIcon = motion(Icon)

              if (stateIndex === index)
                return (
                  <MotionIcon
                    key={index}
                    initial={{ opacity: 0, y: -32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 32 }}
                    className="h-7 w-7"
                  />
                )
            })}
          </AnimatePresence>

          <span className="text-lg font-bold text-nowrap">Check Weather</span>
        </Link>

        <div className="flex items-center h-full">
          <Button asChild variant="ghost" size="icon">
            <Link
              href="https://github.com/luis-grizzo/check-weather"
              target="_blank"
            >
              <GitHubLogoIcon />
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
