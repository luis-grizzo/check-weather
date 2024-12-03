'use client'

import { cloneElement } from 'react'

import { weatherIconsArray } from '@/constants/icons'
import { calculateRandomIndex } from '@/utils/number-utils'
import { motion } from 'framer-motion'

export default function FancyIcons() {
  function getRandomIcons() {
    const newArray = [...weatherIconsArray]
    const response = []

    for (let i = 0; i < 8; i++) {
      const randomIndex = calculateRandomIndex(newArray)

      response.push(newArray[randomIndex])
      newArray.splice(randomIndex, 1)
    }

    return response
  }

  const randomIcons = getRandomIcons()

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0, rotate: -48 }}
        animate={{ y: 0, opacity: 1, rotate: -24 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[calc(76px_-_96px)] -left-24 -z-50"
      >
        {cloneElement(randomIcons[0], {
          className: 'w-52 h-52 animate-vibrate delay-100 fill-mode-backwards'
        })}
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0, translateX: '-50%' }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:block absolute top-[calc(76px_-_96px)] left-1/2 -z-50"
      >
        {cloneElement(randomIcons[1], {
          className: 'w-52 h-52 animate-vibrate delay-300'
        })}
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0, rotate: 24 }}
        animate={{ y: 0, opacity: 1, rotate: 12 }}
        transition={{ delay: 0.1 }}
        className="absolute top-[calc(76px_-_96px)] -right-24 -z-50"
      >
        {cloneElement(randomIcons[2], {
          className: 'w-52 h-52 animate-vibrate fill-mode-backwards'
        })}
      </motion.div>

      <motion.div
        initial={{ x: -100, opacity: 0, translateY: '-50%' }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:block absolute top-1/2 -left-24 -z-50"
      >
        {cloneElement(randomIcons[3], {
          className: 'w-52 h-52 animate-vibrate delay-300'
        })}
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0, translateY: '-50%' }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden md:block absolute top-1/2 -right-24 w-52 h-52 -z-50"
      >
        {cloneElement(randomIcons[4], {
          className: 'w-52 h-52 animate-vibrate delay-200 fill-mode-backwards'
        })}
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0, rotate: 24 }}
        animate={{ y: 0, opacity: 1, rotate: 12 }}
        className="absolute bottom-[calc(76px_-_96px)] -left-24 w-52 h-52 -z-50"
      >
        {cloneElement(randomIcons[5], {
          className: 'w-52 h-52 animate-vibrate delay-300'
        })}
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0, translateX: '-50%' }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="hidden md:block absolute bottom-[calc(76px_-_96px)] left-1/2 w-52 h-52 -z-50"
      >
        {cloneElement(randomIcons[6], {
          className: 'w-52 h-52 animate-vibrate fill-mode-backwards'
        })}
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0, rotate: -48 }}
        animate={{ y: 0, opacity: 1, rotate: -24 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-[calc(76px_-_96px)] -right-24 w-52 h-52 -z-50"
      >
        {cloneElement(randomIcons[7], {
          className: 'w-52 h-52 animate-vibrate delay-200'
        })}
      </motion.div>
    </>
  )
}
