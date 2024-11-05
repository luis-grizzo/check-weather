'use client'

import { motion } from 'framer-motion'
import {
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRainWind,
  Haze,
  Moon,
  Sun,
  Waves
} from 'lucide-react'

export default function FancyIcons() {
  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0, rotate: -48 }}
        animate={{ y: 0, opacity: 1, rotate: -24 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[calc(76px_-_96px)] -left-24 -z-50"
      >
        <Sun className="w-52 h-52 animate-vibrate delay-100 fill-mode-backwards" />
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0, translateX: '-50%' }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:block absolute top-[calc(76px_-_96px)] left-1/2 -z-50"
      >
        <CloudHail className="w-52 h-52 animate-vibrate delay-300" />
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0, rotate: 24 }}
        animate={{ y: 0, opacity: 1, rotate: 12 }}
        transition={{ delay: 0.1 }}
        className="absolute top-[calc(76px_-_96px)] -right-24 -z-50"
      >
        <Haze className="w-52 h-52 animate-vibrate fill-mode-backwards" />
      </motion.div>

      <motion.div
        initial={{ x: -100, opacity: 0, translateY: '-50%' }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:block absolute top-1/2 -left-24 -z-50"
      >
        <Waves className="w-52 h-52 animate-vibrate delay-300" />
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0, translateY: '-50%' }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden md:block absolute top-1/2 -right-24 w-52 h-52 -z-50"
      >
        <CloudLightning className="w-52 h-52 animate-vibrate delay-200 fill-mode-backwards" />
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0, rotate: 24 }}
        animate={{ y: 0, opacity: 1, rotate: 12 }}
        className="absolute bottom-[calc(76px_-_96px)] -left-24 w-52 h-52 -z-50"
      >
        <CloudFog className="w-52 h-52 animate-vibrate delay-300" />
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0, translateX: '-50%' }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="hidden md:block absolute bottom-[calc(76px_-_96px)] left-1/2 w-52 h-52 -z-50"
      >
        <CloudRainWind className="w-52 h-52 animate-vibrate fill-mode-backwards" />
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0, rotate: -48 }}
        animate={{ y: 0, opacity: 1, rotate: -24 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-[calc(76px_-_96px)] -right-24 w-52 h-52 -z-50"
      >
        <Moon className="w-52 h-52 animate-vibrate delay-200" />
      </motion.div>
    </>
  )
}
