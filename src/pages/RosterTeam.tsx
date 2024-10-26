import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronDown, Info, Instagram, Youtube, Facebook } from 'lucide-react'
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { teamMembers } from '../json/team'

interface Member {
  name: string;
  role: string;
  joinDate: string;
  avatar: string;
  description?: string;
  labels?: string[];
  socials?: { name: string; url: string }[];
  whyRonin?: string;
  someElse?: string;
}

const getLabelColor = (label: string) => {
  const colors = {
    "Comandante": "bg-gradient-to-r from-red-600 to-red-800 text-white",
    "Oficial de Escuadra": "bg-gradient-to-r from-orange-500 to-orange-700 text-white",
    "Fusilero": "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
    "Medico": "bg-gradient-to-r from-green-500 to-green-700 text-white",
    "Apoyo": "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
    "Ametrallador": "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white",
    "Antitanque": "bg-gradient-to-r from-pink-500 to-pink-700 text-white",
    "Ingeniero": "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white",
    "Comandante de Tanque": "bg-gradient-to-r from-gray-700 to-gray-900 text-white",
    "Tripulante de Tanque": "bg-gradient-to-r from-gray-500 to-gray-700 text-white",
    "Oteador de Recon": "bg-gradient-to-r from-teal-500 to-teal-700 text-white",
    "Francotirador de Recon": "bg-gradient-to-r from-cyan-500 to-cyan-700 text-white"
  };
  return colors[label] || "bg-gradient-to-r from-gray-300 to-gray-500 text-black"; // Color por defecto si no se encuentra el rol
};

export default function TeamRoster() {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const sortedMembers = useMemo(() => {
    return [...teamMembers.Members].sort((b, a) => {
      const dateA = new Date(a.joinDate.split('/').reverse().join('-'));
      const dateB = new Date(b.joinDate.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen)

  const openModal = (member: Member) => {
    if (member.description || member.labels || member.socials || member.whyRonin || member.someElse) {
      setSelectedMember(member)
    }
  }

  const closeModal = () => setSelectedMember(null)

  return (
    <section id="equipo" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">Jugadores de Ronin</h2>
        <div className="mb-8">
          <Button
            onClick={toggleOpen}
            variant="outline"
            className="w-full flex justify-between items-center text-2xl font-semibold text-cyan-400 bg-gray-800 border-gray-700 p-5"
            aria-expanded={isOpen}
            aria-controls="players-list"
          >
            <span>Lista de Jugadores</span>
            <ChevronDown
              className={`text-cyan-400 transition-transform duration-300 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </Button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="players-list"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {sortedMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gray-800 overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl cursor-pointer" onClick={() => openModal(member)}>
                      <CardContent className="p-6 flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                          <div className="flex items-center text-sm text-gray-400">
                            <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                            <span>Miembro desde {member.joinDate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Dialog open={!!selectedMember} onOpenChange={closeModal}>
        {selectedMember && (
          <DialogContent className="bg-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                Expediente del Soldado {selectedMember.name}
                <div className="relative group">
                  <Info className="w-6 h-6 text-cyan-400 cursor-help" />
                  <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded -left-32 top-8 w-64">
                    Todos los datos pueden ser inexactos ya que su actualización se produce de manera manual por administración.
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              {selectedMember.description && (
                <DialogDescription className="text-gray-300">
                  {selectedMember.description}
                </DialogDescription>
              )}
              {selectedMember.labels && selectedMember.labels.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Roles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.labels.map((label, index) => (
                      <span key={index} className={`px-2 py-1 rounded-full text-sm ${getLabelColor(label)}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedMember.socials && selectedMember.socials.some(social => social.url.trim() !== '') && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Redes Sociales:</h4>
                  <div className="flex gap-4">
                    {selectedMember.socials.map((social, index) => (
                      social.url.trim() !== '' && (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          {social.name === 'instagram' && <Instagram className="w-6 h-6" />}
                          {social.name === 'youtube' && <Youtube className="w-6 h-6" />}
                          {social.name === 'facebook' && <Facebook className="w-6 h-6" />}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
              {selectedMember.whyRonin && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">¿Por qué se unió a Ronin?</h4>
                  <p className="text-gray-300">{selectedMember.whyRonin}</p>
                </div>
              )}
              {selectedMember.someElse && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Detalles extras:</h4>
                  <p className="text-gray-300">{selectedMember.someElse}</p>
                </div>
              )}
            </div>
            <Button onClick={closeModal} className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white">
              Minimizar expediente
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}