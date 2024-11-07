
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogContent } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'


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

  const displayModalEmail = () => {
    <>
    <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4 text-center">¡Postulación enviada!</DialogTitle>
            <DialogDescription className="text-lg text-center">
              Gracias por tu interes de unirte a Ronin.<br />
              Unite al Discord mientras revisamos tu postulación.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
    </Dialog>
    </>
  }

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
      displayModalEmail()
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

  const isWidgetProfileEmpty = () => {

  }

  return (
    <section id="join-ronin" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Únete a Nosotros</h2>
        <div className="grid grid-cols-2 gap-12 text-center align-middle justify-center">
          <div className="bg-gray-700 p-6 rounded-lg flex flex-col justify-center align-middle">
            <h3 className="text-2xl font-semibold mb-4 text-white">Únete al Discord de Ronin</h3>
            <p className="mb-6 text-gray-300">
              Si querés ser parte de Ronin, unite a nuestro discord y conocé al  equipo.
            </p>
            <iframe src="https://discord.com/widget?id=1011063821802156132" width="auto" height="500" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
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
                  <li>Ser al menos nivel 80 en adelante</li>
                  <li>Jugar frecuentemente en los servidores de Ronin</li>
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