import type { Metadata } from 'next'

import { geistSans, geistMono } from './fonts'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import { Toaster } from '@/components/ui/sonner'

import { GeolocationProvider } from '@/shared/hooks/use-geolocation'

import './globals.css'

export const metadata: Metadata = {
  title: 'CheckWeather',
  description:
    'Consultor de clima rápido, prático e informativo, que ajuda a te preparar para o que for!'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
      >
        <Toaster />

        <GeolocationProvider>
          <Navbar />

          {children}

          <Footer />
        </GeolocationProvider>
      </body>
    </html>
  )
}
