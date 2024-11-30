import type { Metadata, Viewport } from 'next'

import { geistMono, geistSans } from './fonts'

import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

import { ThemeProvider } from '@/components/client/theme-provider'

import { Navbar } from '@/components/client/navbar'
import { Footer } from '@/components/client/footer'

import './globals.css'
import React from 'react'

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
  themeColor: '#f5f5f5'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="relative h-dvh w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <Navbar />

            {children}

            <Footer />

            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
