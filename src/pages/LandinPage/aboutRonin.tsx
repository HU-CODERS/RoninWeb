'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'

interface ContentBlock {
    text: string;
    image?: string;
}

interface Chapter {
    title: string;
    content: ContentBlock[];
}

const chapters: Chapter[] = [
    {
        title: "Historia de Ronin",
        content: [
            {
                text: "Ronin nació de la resiliencia. Después de una dura derrota en el HCA en 2022, decidimos dejar de jugar en clanes, pero el amor por Hell Let Loose nunca se apagó. Nos reunimos sin nombre ni servidor y empezamos a construir un espacio sólido, con una visión competitiva clara. Nos enfocamos en crear una estructura que apoyara tanto a los jugadores antiguos como a los nuevos, fomentando una comunidad de aprendizaje, disciplina y diplomacia.",
            },
        ]
    },
    {
        title: "Fundamentos de Ronin",
        content: [
            {
                text: "El corazón de Ronin es su comunidad y sus normas. Valoramos el entrenamiento en servidores públicos, la convivencia y el respeto hacia otros clanes, ya sean aliados o no. Trabajamos en conjunto para implementar mejoras y facilitar el desarrollo competitivo, minimizando la burocracia y promoviendo siempre el diálogo abierto.",
            },
        ]
    },
    {
        title: "Ronin 2.0 y la Visión a Futuro",
        content: [
            {
                text: "Ronin evoluciona gracias al esfuerzo de todos. Nos enfocamos en ofrecer herramientas a los nuevos reclutas, aprendiendo de experiencias pasadas y siendo autocríticos. Nuestro objetivo es reducir la fuga de información y mejorar continuamente el sistema, delegando el liderazgo para evitar el estancamiento y el personalismo.",
            }
        ]
    },
    {
        title: "Torneos y Expansión",
        content: [
            {
                text: "Empezamos con pocos miembros, uniendo jugadores de servidores públicos y otros clanes. Pronto, logramos participar en torneos internacionales de [18 vs 18], con el apoyo de figuras clave y contactos de aliados como Compton de MERC y Skyline de Vanguarda, además de amigos de clanes internacionales que se sumaron a la causa. Esto nos permitió competir contra equipos de Europa y EE. UU., posicionando a Ronin en la escena internacional.",
                image: "https://i.ibb.co/7SKqKYb/Miniaturas-YT-Ronin-Mesa-de-trabajo-1-copia-22.png"
            },
            {
                text: "Hoy en día, seguimos trabajando para cumplir las demandas de nuestra comunidad y para el crecimiento continuo de Ronin en la escena competitiva de Hell Let Loose."
            },
        ]
    }
]

export default function RoninHistory() {
    const [currentChapter, setCurrentChapter] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null);
  
    const nextChapter = () => {
      setCurrentChapter((prev) => (prev + 1) % chapters.length);
      scrollContainerRef.current?.scrollTo(0, 0);
    }
  
    const prevChapter = () => {
      setCurrentChapter((prev) => (prev - 1 + chapters.length) % chapters.length);
      scrollContainerRef.current?.scrollTo(0, 0);
    }
  
    useEffect(() => {
      scrollContainerRef.current?.scrollTo(0, 0);
    }, [currentChapter]);

    return (
        <section id="about-ronin" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-white tracking-tight">
                    La Historia de <span className="text-cyan-400">Ronin</span>
                </h2>
                <div
                    ref={scrollContainerRef}
                    className="w-full max-w-[50%] h-[auto] mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl border border-gray-700 overflow-y-auto"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentChapter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="mb-8"
                        >
                            <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-5 text-cyan-400 tracking-wide">{chapters[currentChapter].title}</h3>
                            {chapters[currentChapter].content.map((block, index) => (
                                <div key={index} className="mb-4 sm:mb-6 md:mb-8">
                                    {block.image && (
                                        <div className="relative mb-4 max-w-full h-auto">
                                            <img
                                                src={block.image}
                                                alt={`Ilustración para ${chapters[currentChapter].title}`}
                                                className="object-cover rounded-lg w-full h-auto max-h-[300px]"
                                            />
                                        </div>
                                    )}
                                    <div className="w-full">
                                        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">{block.text}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <br />
                <div className="flex justify-between items-center mt-4 w-full max-w-[50%] mx-auto">
                    <Button
                        onClick={prevChapter}
                        variant="outline"
                        size="icon"
                        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Capítulo anterior</span>
                    </Button>
                    <span className="text-gray-400 text-sm font-medium">
                        Capítulo {currentChapter + 1} de {chapters.length}
                    </span>
                    <Button
                        onClick={nextChapter}
                        variant="outline"
                        size="icon"
                        className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                    >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Siguiente capítulo</span>
                    </Button>
                </div>
            </div>
        </section>
    )
}