import type { Metadata } from 'next'

import { poppins } from './fonts'

import { LocationProvider } from '@/hooks/useLocation'

import { Footer, Navbar } from '@/components'

import './globals.css'

export const metadata: Metadata = {
  title: 'Check Weather',
  description: 'Consult your local weather info!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="flex flex-col w-dvw h-dvh overflow-hidden bg-neutral-50 text-neutral-950">
        <LocationProvider>
          <Navbar />

          {children}

          <Footer />
        </LocationProvider>
      </body>
    </html>
  )
}
