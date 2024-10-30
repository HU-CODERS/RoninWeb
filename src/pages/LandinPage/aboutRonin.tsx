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
        title: "El Nacimiento de Ronin",
        content: [
            {
                text: "Somos el clan -RONIN-, nacido en agosto de 2022. Surgimos de un grupo de amigos con historia juntos en otro clan, pero con la visión de seguir nuestra pasión por competir, la estrategia y tácticas en 'Hell Let Loose'.",
                image: "https://caminodelsamurai.net/wp-content/uploads/ronin-solitario-campo-batalla-1.webp?height=100&width=40"
            },
            {
                text: "Nuestros fundadores, unidos por la pasión por el juego y el deseo de excelencia, decidieron crear un espacio donde la estrategia y la camaradería fueran los pilares fundamentales."
            },
        ]
    },
    {
        title: "Nuestra Misión",
        content: [
            {
                text: "Buscamos constantemente nuevos aliados que compartan esa chispa y pasión. Con ellos, queremos compartir lo aprendido y potenciar juntos el rendimiento del clan, además de construir lazos y amistades fuertes.",
                image: "https://caminodelsamurai.net/wp-content/uploads/ronin-solitario-campo-batalla-1.webp?height=100&width=40"
            },
            {
                text: "Nos esforzamos por ser más que un simple clan de gaming. Aspiramos a ser una comunidad donde cada miembro pueda crecer, aprender y disfrutar del juego en un ambiente de respeto y colaboración."
            }
        ]
    },
    {
        title: "Alianza con MERC",
        content: [
            {
                text: "Estamos orgullosos de nuestra alianza histórica con MERC, un pilar en la comunidad de HLL. Esta colaboración nos ha permitido alcanzar nuevas alturas y fortalecer nuestra presencia en la escena competitiva.",
                image: "https://caminodelsamurai.net/wp-content/uploads/ronin-solitario-campo-batalla-1.webp?height=100&width=40"
            },
            {
                text: "Juntos, hemos participado en numerosos torneos y eventos, demostrando que la unión hace la fuerza y que las alianzas estratégicas son clave en el mundo del gaming competitivo."
            }
        ]
    },
    {
        title: "Nuestro Futuro",
        content: [
            {
                text: "Mirando hacia adelante, -RONIN- se compromete a seguir creciendo, aprendiendo y dejando nuestra marca en la comunidad de Hell Let Loose. Juntos, forjaremos un legado de excelencia y camaradería.",
                image: "https://caminodelsamurai.net/wp-content/uploads/ronin-solitario-campo-batalla-1.webp?height=100&width=40"
            },
            {
                text: "Nuestros objetivos incluyen expandir nuestra presencia en torneos internacionales, desarrollar programas de entrenamiento para nuevos miembros y contribuir al crecimiento saludable de la comunidad de HLL."
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
                    className="w-full max-w-[50%] h-[500px] mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl border border-gray-700 overflow-y-auto"
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