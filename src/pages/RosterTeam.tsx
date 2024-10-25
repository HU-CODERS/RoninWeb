import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronDown } from 'lucide-react'
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { teamMembers } from '../json/team'

interface Member {
  name: string;
  role: string;
  joinDate: string;
  avatar: string;
}

export default function TeamRoster() {
  const [isOpen, setIsOpen] = useState(true)

  const sortedMembers = useMemo(() => {
    return [...teamMembers.Members].sort((b, a) => {
      const dateA = new Date(a.joinDate.split('/').reverse().join('-'));
      const dateB = new Date(b.joinDate.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen)

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
                    <Card className="bg-gray-800 overflow-hidden shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                          {/* <p className="text-sm text-cyan-400 mb-2">{member.role}</p> */}
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
    </section>
  )
}