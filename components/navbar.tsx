'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'

import { PermissionStatusPopover } from './permission-status-popover'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'

import { IS_VERCEL_PREVIEW } from '@/shared/constants'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 bg-linear-to-b from-background to-background/80 backdrop-blur z-50">
      <div className="flex justify-between items-center h-14 container mx-auto px-4">
        <div className="flex gap-2 items-center">
          {IS_VERCEL_PREVIEW && <Badge>Preview</Badge>}

          <span className="text-lg font-medium">CheckWeather</span>
        </div>

        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon" disabled={pathname === '/'} asChild>
            <Link
              href="/"
              data-disabled={pathname === '/'}
              className="data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
            >
              <Home />
            </Link>
          </Button>

          <Suspense fallback={<Spinner />}>
            <PermissionStatusPopover />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}
