import type { Metadata, Viewport } from 'next'

import { poppins } from './fonts'

import { LocationProvider } from '@/hooks/useLocation'

import { Footer, Navbar } from '@/components'

import './globals.css'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Check Weather',
  description: 'Consult your local weather info!',
  metadataBase: new URL('https://go-check-weather.vercel.app/'),
  openGraph: {
    title: 'Check Weather',
    description: 'Consult your local weather info!',
    url: new URL('https://go-check-weather.vercel.app/'),
    siteName: 'Check Weather'
  },
  twitter: {
    title: 'Check Weather',
    description: 'Consult your local weather info!'
  }
}

export const viewport: Viewport = {
  themeColor: '#fafafa'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="flex flex-col w-dvw h-dvh bg-neutral-50 text-neutral-950">
        <LocationProvider>
          <Navbar />

          {children}

          <Footer />
        </LocationProvider>
      </body>
    </html>
  )
}
