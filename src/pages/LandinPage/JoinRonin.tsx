
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

interface FormData {
  steam_name: string
  steam_id: string
  player_age: string
  hll_level: string
  headset: boolean
  competitivo: boolean
  how_uk_ronin: string
  who_invited: string
}

export default function JoinRoninSection() {
  const [showRequirements, setShowRequirements] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    steam_name: '',
    steam_id: '',
    player_age: '',
    hll_level: '',
    headset: false,
    competitivo: false,
    how_uk_ronin: '',
    who_invited: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await emailjs.send(
        "ronin_928$sxoowi",
        "template_ronin_210021xx",
        {
          steam_name: formData.steam_name,
          steam_id: formData.steam_id,
          player_age: formData.player_age,
          hll_level: formData.hll_level,
          headset: formData.headset ? "Sí" : "No",
          competitivo: formData.competitivo ? "Sí" : "No",
          how_uk_ronin: formData.how_uk_ronin,
          who_invited: formData.who_invited
        },
        "j6TUh_MBuDaCsAvOi"
      )
      alert("Solicitud enviada con éxito!")
      // Reset form
      e.preventDefault()
      setFormData({
        steam_name: '',
        steam_id: '',
        player_age: '',
        hll_level: '',
        headset: false,
        competitivo: false,
        how_uk_ronin: '',
        who_invited: ''
      })
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("Error al enviar el formulario. Por favor, intenta nuevamente.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <section id="join-ronin" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Únete a Nosotros</h2>
        <div className="grid grid-cols-1 gap-12">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Únete al Servidor de Ronin</h3>
            <p className="mb-6 text-gray-300">
              Tenemos un servidor publico tanto de entrenamiento como de partidas casuales. Unite al discord para saber más.
            </p>
            <div className="relative group">
              <a
                href="https://discord.gg/8An65sVmrX"
                target='_blank'
                className="block w-full h-80 bg-[url('https://i.ytimg.com/vi/Ah8EWW-B8Js/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD8HK50Se9Br-b4A-iJdqoLUFFp8A')] bg-cover bg-center rounded-lg transition-opacity duration-300 group-hover:opacity-75"
                aria-label="Unirse al servidor de Discord"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                    Haz click para unirte al Discord
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Aplica para unirte a Ronin</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="steam_name"
                value={formData.steam_name}
                onChange={handleInputChange}
                placeholder="Nombre en Steam"
                className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <input
                type="text"
                name="steam_id"
                value={formData.steam_id}
                onChange={handleInputChange}
                placeholder="Steam64 ID"
                maxLength={17}
                className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <input
                type="number"
                name="player_age"
                value={formData.player_age}
                onChange={handleInputChange}
                placeholder="Edad"
                className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <input
                type="number"
                name="hll_level"
                value={formData.hll_level}
                onChange={handleInputChange}
                placeholder="Nivel en HLL"
                className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="headset"
                  name="headset"
                  checked={formData.headset}
                  onChange={handleInputChange}
                  className="rounded text-cyan-400 focus:ring-cyan-400"
                />
                <label htmlFor="headset">Tengo headset con micrófono</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="competitivo"
                  name="competitivo"
                  checked={formData.competitivo}
                  onChange={handleInputChange}
                  className="rounded text-cyan-400 focus:ring-cyan-400"
                />
                <label htmlFor="competitivo">Puedo unirme para prácticas o competitivo</label>
              </div>
              <select 
                name="how_uk_ronin"
                value={formData.how_uk_ronin}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              >
                <option value="">¿Cómo te enteraste de Ronin?</option>
                <option value="amigo">Por un amigo</option>
                <option value="redes">Redes sociales</option>
                <option value="torneo">En un torneo</option>
                <option value="otro">Otro</option>
              </select>
              <input
                type="text"
                name="who_invited"
                value={formData.who_invited}
                onChange={handleInputChange}
                placeholder="Si te invitó un Ronin, indica su nombre (opcional)"
                className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Enviar solicitud
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequirements(!showRequirements)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <HelpCircle className="w-6 h-6" />
                </button>
              </div>
            </form>
            {showRequirements && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gray-600 rounded-md"
              >
                <h4 className="font-semibold mb-2">Requisitos para unirse:</h4>
                <ul className="list-disc list-inside">
                  <li>Ser nivel 80 o superior</li>
                  <li>Jugar frecuentemente en Hagamos Garry</li>
                  <li>Tener experiencia en juego competitivo</li>
                  <li>Disponibilidad para entrenamientos y torneos</li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}