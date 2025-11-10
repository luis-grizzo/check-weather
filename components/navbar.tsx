import { Home } from 'lucide-react'

import { PermissionStatusPopover } from './permission-status-popover'

import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-0 bg-linear-to-b from-background to-background/60 backdrop-blur z-50">
      <div className="flex justify-between items-center h-14 container mx-auto px-4">
        <span className="text-lg font-medium">CheckWeather</span>

        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon">
            <Home />
          </Button>

          <PermissionStatusPopover />
        </div>
      </div>
    </nav>
  )
}
