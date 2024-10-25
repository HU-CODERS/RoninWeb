import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Users, Sword, Shield, Clock, MessageSquare, DollarSign, HelpCircle, Menu, X } from 'lucide-react'
import { teamMembers } from '../json/team'
import * as Collapsible from '@radix-ui/react-collapsible'

interface TeamMember {
  name: string
  role: string
  joinDate: string
  avatar: string
}

interface GroupedMembers {
  [key: string]: TeamMember[]
}

export default function RoninLandingPage() {
  const [showRequirements, setShowRequirements] = useState(false)
  const [groupedMembers, setGroupedMembers] = useState<GroupedMembers>({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState(Object.keys(groupedMembers))

  const toggleCategory = (category) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    )
  }


  // Group team members by role
  useEffect(() => {
    const grouped = teamMembers.Members.reduce<GroupedMembers>((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = []
      }
      acc[member.role].push(member)
      return acc
    }, {})
    setGroupedMembers(grouped)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = ['Inicio', 'Sobre Nosotros', 'Equipo', 'Únete', 'Patrocina']


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex justify-center space-x-8">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-lg font-medium text-white hover:text-cyan-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-full"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 z-40 flex items-center justify-center">
          <ul className="flex flex-col items-center space-y-8">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-2xl font-medium text-white hover:text-cyan-400 transition-colors"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main>
        <section id="inicio" className="min-h-screen flex items-center justify-center pick-image">
          <div className="text-center">
            <img src="https://cdn.discordapp.com/attachments/1297397964041486347/1299063032999313500/Sin_titulo-3.png?ex=671bd63a&is=671a84ba&hm=dcfcf682a5c90a0d5d7bf95bce1763c811b69db1714e8dbbc5c6348fa62f8427&" className='opacity-70' alt="" />
            <motion.a
              href="#sobre-nosotros"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Mas sobre Ronin
            </motion.a>
          </div>
        </section>

        <section id="sobre-nosotros" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Sobre Ronin</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg mb-6">
                  Ronin es un equipo competitivo de élite dedicado a la excelencia en el gaming. Nuestro compromiso con la estrategia, la habilidad y el trabajo en equipo nos ha llevado a la cima de la competencia.
                </p>
                <p className="text-lg">
                  Con un enfoque en el crecimiento continuo y la innovación, Ronin está siempre buscando nuevos talentos y desafíos para expandir nuestros horizontes en el mundo del gaming competitivo.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Alianza con MERC</h3>
                <p className="text-lg mb-4">
                  Estamos orgullosos de nuestra alianza histórica con MERC, un pilar en la comunidad de gaming. Esta colaboración nos ha permitido alcanzar nuevas alturas y fortalecer nuestra presencia en la escena competitiva.
                </p>
                <p className="text-lg">
                  Juntos, Ronin y MERC están redefiniendo lo que significa ser un equipo de élite en el mundo del gaming competitivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="equipo" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Jugadores de Ronin</h2>
        {Object.entries(groupedMembers).map(([role, members]) => (
          <Collapsible.Root
            key={role}
            open={openCategories.includes(role)}
            onOpenChange={() => toggleCategory(role)}
          >
            <div className="mb-8">
              <Collapsible.Trigger className="w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-cyan-400 capitalize">{role}</h3>
                  <ChevronDown
                    className={`text-cyan-400 transition-transform duration-300 ${
                      openCategories.includes(role) ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </Collapsible.Trigger>
            </div>
            <Collapsible.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300"
                    style={{ maxWidth: '350px', maxHeight: '500px' }}
                  >
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-white">{member.name}</h4>
                      <p className="text-cyan-400 mb-4">{member.role}</p>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Miembro desde {member.joinDate}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </div>
    </section>

        <section id="únete" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Únete a Nosotros</h2>
            <div className="grid grid-cols-1 gap-12">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-white">Únete al Servidor de Ronin</h3>
                <p className="mb-6 text-gray-300">Tenemos un servidor publico tanto de entrenamiento como de partidas casuales. Unite al discord para saber más.</p>
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
                <form className="space-y-4">

                  <input
                    type="text"
                    placeholder="Nombre en Steam"
                    className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="text"
                    placeholder="Steam64 ID"
                    maxLength={17}
                    className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="number"
                    placeholder="Edad"
                    className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="number"
                    placeholder="Nivel en HLL"
                    className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="headset" className="rounded text-cyan-400 focus:ring-cyan-400" />
                    <label htmlFor="headset">Tengo headset con micrófono</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="practice" className="rounded text-cyan-400 focus:ring-cyan-400" />
                    <label htmlFor="practice">Puedo unirme para prácticas o competitivo</label>
                  </div>
                  <select className="w-full p-3 bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400">
                    <option value="">¿Cómo te enteraste de Ronin?</option>
                    <option value="amigo">Por un amigo</option>
                    <option value="redes">Redes sociales</option>
                    <option value="torneo">En un torneo</option>
                    <option value="otro">Otro</option>
                  </select>
                  <input
                    type="text"
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

        <section id="patrocina" className="py-20 bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Patrocina a Ronin</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Patrocina al Equipo</h3>
                <p className="mb-6">
                  Tu apoyo nos permite competir en torneos de alto nivel, mejorar nuestro equipamiento y llevar a Ronin a nuevas alturas en la escena competitiva.
                </p>
                <a
                  href="#"
                  className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Patrocinar a Ronin
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Patrocina el Servidor</h3>
                <p className="mb-6">
                  Ayúdanos a mantener y mejorar nuestra comunidad en Discord. Tu apoyo nos permite organizar eventos, torneos y ofrecer una mejor experiencia a todos los miembros.
                </p>
                <a
                  href="#"
                  className="bg-[#7289da] hover:bg-[#5b6eae] text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Patrocinar el Servidor
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <img
                src="https://cdn.discordapp.com/attachments/1297397964041486347/1299063032999313500/Sin_titulo-3.png?ex=671bd63a&is=671a84ba&hm=dcfcf682a5c90a0d5d7bf95bce1763c811b69db1714e8dbbc5c6348fa62f8427&"
                alt="Ronin Logo"
                width={200}
                height={67}
              />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-6 mb-4">
                <a href="https://www.facebook.com/profile.php?id=100088576507160&locale=es_LA" target='_blank' className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/roninsudamerica/" target='_blank' className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@ClanRoninHLL" target='_blank' className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21.8 8.001a2.81 2.81 0 00-1.976-1.985C18.19 5.504 12 5.5 12 5.5s-6.19.004-7.825.516a2.81 2.81 0 00-1.975 1.985 29.99 29.99 0 000 7.998c.233.878.924 1.57 1.975 1.984 1.634.511 7.825.515 7.825.515s6.19-.004 7.824-.516a2.81 2.81 0 001.976-1.984 29.99 29.99 0 000-7.998zM10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>

                </a>
              </div>
              <p className="text-gray-400 text-sm">© 2021 - 2024 Clan Ronin. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}