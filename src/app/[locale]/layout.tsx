import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import type { Metadata, Viewport } from 'next'

import { geistMono, geistSans } from '../fonts'

import { routing } from '@/i18n/routing'

import { Toaster } from '@/components/ui/toaster'
import { DrawerCSSProvider } from '@/components/ui/drawer'

import { ThemeProvider } from '@/components/client/theme-provider'
import { Navbar } from '@/components/client/navbar'
import { Footer } from '@/components/client/footer'

import '../globals.css'

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

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: ReactNode
  params: { locale: string }
}>) {
  const { locale } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="relative h-dvh w-full">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <DrawerCSSProvider> */}
            <Navbar />

            {children}

            <Footer />

            <Toaster />
            {/* </DrawerCSSProvider> */}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
