import { Home, MapPinMinus } from 'lucide-react'
import { Button } from './ui/button'

export function Navbar() {
  return (
    <nav className="w-full bg-background">
      <div className="flex justify-between items-center h-14 container mx-auto px-4">
        <span className="text-lg font-medium">CheckWeather</span>

        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon">
            <Home />
          </Button>

          <Button variant="ghost" size="icon">
            <MapPinMinus />
          </Button>
        </div>
      </div>
    </nav>
  )
}
