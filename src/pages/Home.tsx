import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Users, Sword, Shield, Clock, MessageSquare, DollarSign, HelpCircle, Menu, X } from 'lucide-react'
import TeamRoster from './LandinPage/RosterTeam'
import PatrocinioComponent from './LandinPage/Patrocinio'
import JoinRoninSection from './LandinPage/JoinRonin'
import RoninHistory from './LandinPage/aboutRonin'
import TrayectoriaClanRonin from './LandinPage/trayectoriaRonin'

export default function RoninLandingPage() {
  const [showRequirements, setShowRequirements] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const menuItems = [
    { title: 'Sobre Ronin', href: '#about-ronin' },
    { title: 'Roster de Ronin', href: '#roster-ronin' },
    { title: 'Ser un Ronin', href: '#join-ronin' },
    { title: 'Apoya a Ronin', href: '#sponsor-ronin' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex justify-center space-x-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-lg font-medium text-white hover:text-cyan-400 transition-colors"
                >
                  {item.title}
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
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main>
        <section id="inicio" className="min-h-screen flex items-center justify-center pick-image">
          <div className="text-center">
            <img src="https://i.ibb.co/zGSNS2R/Logo-Ronin.png" className='opacity-70' alt="" />

          </div>
        </section>

        <RoninHistory/>

        {/* <TrayectoriaClanRonin/> */}

        <TeamRoster />

        <JoinRoninSection/>

        <PatrocinioComponent />

      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <img
                src="https://i.ibb.co/zGSNS2R/Logo-Ronin.png"
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
                    <path d="M19.615 3.184c-1.004-.805-3.965-1.178-7.604-1.178-3.64 0-6.6.374-7.604 1.178C3.396 3.99 3 6.186 3 8.825v6.35c0 2.64.396 4.835 1.407 5.641.973.763 3.935 1.184 7.604 1.184 3.64 0 6.6-.375 7.604-1.178 1.01-.805 1.408-3 1.408-5.647v-6.35c-.003-2.639-.398-4.835-1.408-5.641zm-9.59 11.176v-7l6 3.5-6 3.5z" />
                  </svg>

                </a>
              </div>
              <p className="text-gray-400 text-sm">© 2021 - 2024 Clan Ronin. Todos los derechos reservados.</p>
              <p className="text-gray-400 text-sm">Desarrollado por <a href="https://hu-code.vercel.app" target='_blank' className='text-cyan-400 hover:text-cyan-500 transition-colors'>HUCO I+D</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}