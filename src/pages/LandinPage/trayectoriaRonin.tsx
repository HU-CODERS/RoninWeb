import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

type Event = {
  id: number
  year: string
  title: string
  description: string
  videoUrl?: string
}

const events: Event[] = [
  { id: 1, year: '2021', title: 'Fundación del Clan', description: 'El clan Ronin se establece durante el período de disolución de DC, marcando el inicio de una era de honor y tradición samurái .' },
  { id: 2, year: '2022', title: 'Primera Batalla', description: 'El clan participa en su primera batalla importante, demostrando su valentía y habilidad en el campo de batalla.', videoUrl: '/placeholder.mp4' },
  { id: 3, year: '2023', title: 'Alianza Estratégica', description: 'Se forma una alianza crucial con el clan vecino, fortaleciendo la posición política y militar de los Ronin.' },
  { id: 4, year: '2024', title: 'Gran Migración', description: 'El clan se traslada a nuevas tierras en busca de prosperidad, enfrentando desafíos y oportunidades en su viaje.',videoUrl: '/placeholder.mp4' },
]

export default function TrayectoriaClanRonin() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    setSelectedEvent(events[0])
  }, [])

  const selectEvent = (event: Event, newDirection: number) => {
    setDirection(newDirection)
    setSelectedEvent(event)
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br  text-gray-100 overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-10"  />

      <div className="relative w-full max-w-[90vw] mx-auto p-4 sm:p-8">
        <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r text-white">
          Trayectoria del Clan Ronin
        </h2>
        
        <div className="relative mb-8 sm:mb-16">
          {/* Línea base */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-y-1/2" />
          
          {/* Eventos */}
          <div className="flex justify-between items-center relative h-16 sm:h-24">
            {events.map((event) => (
              <motion.button
                key={event.id}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full relative z-10 focus:outline-none
                           ${selectedEvent?.id === event.id ? 'bg-cyan-400' : 'bg-blue-500'}`}
                whileHover={{ scale: 1.2 }}
                onClick={() => selectEvent(event, event.id > (selectedEvent?.id || 0) ? 1 : -1)}
              >
                <span className="absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-semibold text-gray-200">
                  {event.year}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contenido del evento */}
        <AnimatePresence mode="wait">
          {selectedEvent && (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg p-6 sm:p-8 shadow-2xl border border-gray-700"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-cyan-300">{selectedEvent.title}</h3>
                  <p className="text-lg sm:text-xl text-blue-300 mb-2 sm:mb-4">{selectedEvent.year}</p>
                </div>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <button
                    className="text-cyan-300 hover:text-cyan-100 transition-colors"
                    onClick={() => {
                      const currentIndex = events.findIndex(e => e.id === selectedEvent.id)
                      if (currentIndex > 0) {
                        selectEvent(events[currentIndex - 1], -1)
                      }
                    }}
                    disabled={selectedEvent.id === events[0].id}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Evento anterior</span>
                  </button>
                  <button
                    className="text-cyan-300 hover:text-cyan-100 transition-colors"
                    onClick={() => {
                      const currentIndex = events.findIndex(e => e.id === selectedEvent.id)
                      if (currentIndex < events.length - 1) {
                        selectEvent(events[currentIndex + 1], 1)
                      }
                    }}
                    disabled={selectedEvent.id === events[events.length - 1].id}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Siguiente evento</span>
                  </button>
                </div>
              </div>
              <p className="text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed text-gray-300">{selectedEvent.description}</p>
              {selectedEvent.videoUrl && (
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <video controls className="rounded-lg w-full">
                    <source src={selectedEvent.videoUrl} type="video/mp4" />
                    Tu navegador no soporta el tag de video.
                  </video>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}