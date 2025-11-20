import type { Metadata } from 'next'

import { geistSans, geistMono } from './fonts'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import { Toaster } from '@/components/ui/sonner'

import { BASE_URL } from '@/shared/constants/enviorement'
import { GeolocationProvider } from '@/shared/hooks/use-geolocation'

import './globals.css'

export const metadata: Metadata = {
  title: 'CheckWeather',
  description:
    'Consultor de clima rápido, intuitivo e confiável. Fornece previsões locais detalhadas (temperatura, umidade, vento), alertas em tempo real e informações práticas para você se planejar com segurança.',
  keywords: [
    'CheckWeather',
    'previsão do tempo',
    'clima',
    'meteorologia',
    'previsão do tempo online',
    'tempo local',
    'clima hoje',
    'clima agora',
    'temperatura',
    'umidade',
    'vento',
    'alerta de chuva',
    'radar meteorológico',
    'previsão 7 dias',
    'aplicativo de clima',
    'weather',
    'weather forecast',
    'local weather',
    'weather app',
    'climate'
  ],
  openGraph: {
    siteName: 'CheckWeather',
    url: new URL(String(BASE_URL)),
    images: [`${BASE_URL}/images/opengraph-image.jpg`]
  },
  twitter: {
    images: [`${BASE_URL}/images/opengraph-image.jpg`]
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
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
