import { useState } from 'react'
import { Home, List, Box, User, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "./button"

function NavigationTile({ destination, emblem, onActivate = null }) {
  return (
    <a href={destination} className="relative cluster" onClick={onActivate}>
      <div className="absolute inset-0 bg-neutral-100 rounded-full opacity-0 cluster-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white bg-opacity-50 shadow-inner border-2">
        <div className="text-neutral-400 cluster-hover:text-neutral-600 transition-colors duration-300">
          {emblem}
        </div>
      </div>
    </a>
  )
}

export default function Component() {
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [didBlockScroll, setDidBlockScroll] = useState(false)

  const togglePanelVisibility = () => {
    // Si el panel se está abriendo y el scroll NO está bloqueado, lo bloqueamos
    if (!isPanelVisible && document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden'
      setDidBlockScroll(true) // Marcamos que nosotros bloqueamos el scroll
    }
    // Si el panel se está cerrando y nosotros fuimos quienes bloqueamos el scroll, lo restauramos
    else if (isPanelVisible && didBlockScroll) {
      document.body.style.overflow = 'auto'
      setDidBlockScroll(false) // Restablecemos la bandera
    }

    // Alternamos la visibilidad del panel
    setIsPanelVisible(!isPanelVisible)
  }

  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 h-25">
      <nav className={`flex items-center justify-center gap-4 md:gap-6 lg:gap-8 bg-white bg-opacity-80 backdrop-blur-md rounded-full shadow-lg p-2 md:p-3 lg:p-4 border-2 border-neutral-200 transition-all duration-300 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <NavigationTile destination="/panel" emblem={<Home size={20} />} />
        <NavigationTile destination="/guides" emblem={<List size={20} />} />
        {/* <NavigationTile destination="/boxy" emblem={<Box size={20} />} /> */}
        <NavigationTile destination="/profile" emblem={<User size={20} />} />
      </nav>
      <Button
        variant="outline"
        size="icon"
        className="mt-4 rounded-full w-12 h-12 bg-white bg-opacity-80 backdrop-blur-md shadow-lg border-2 border-neutral-200 z-40 pointer-events-auto"
        onClick={togglePanelVisibility}
      >
        {isPanelVisible ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
      </Button>
    </div>
  )
}
