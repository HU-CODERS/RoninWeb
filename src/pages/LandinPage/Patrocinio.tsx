import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { MessageSquare } from 'lucide-react'

export default function PatrocinioComponent() {
  const [showSeedingInfo, setShowSeedingInfo] = useState(false)

  return (
    <section id='sponsor-ronin' className="py-20 bg-gradient-to-br bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">APOYA A RONIN & MERC</h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
              <h3 className="text-3xl font-semibold mb-4 text-cyan-400">Obtén VIP</h3>
              <p className="mb-6 text-white text-lg">
                Al adquirir VIP, no solo apoyas a Ronin y a Hell Let Loose Latino America, sino que también obtienes:
              </p>
              <ul className="list-disc list-inside mb-6 text-white text-lg">
                <li>Una etiqueta e icono especial en el Discord</li>
                <li>Ignoras la cola de espera para entrar en nuestros servidores.</li>
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 text-lg px-6 py-3 w-full sm:w-auto">
                    Obtener VIP
                  </Button>
                </DialogTrigger>
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4 text-center text-red-500 underline">Método 1: Realizar pago de 5 U$D</DialogTitle>
                    <DialogDescription className="text-lg text-center">
                       <a href="https://www.patreon.com/merciless112/membership" className='text-blue-700 underline uppercase ' target="_blank">
                        PATREON
                      </a>
                      <br />
                      Al acceder al link, dirigirse a la membresía <b>Sicario</b> y realizar el pago.
                      Una vez hecha la donación, por favor abra un ticket en <a href="https://discord.gg/SXtCnpfvDW" target='_blank' className='text-blue-700 underline'>#soporte</a>. Incluya su comprobante, mail del que realizó transacción y Steam ID para notificarnos de la donación.
                    </DialogDescription>
                    <br />
                    <DialogTitle className="text-2xl font-bold mb-4 text-center text-red-500 underline">Método 2: Boostear nuestro servidor.</DialogTitle>
                    <DialogDescription className="text-lg text-center">
                      <a href="https://discord.gg/SXtCnpfvDW" target="_blank" className="text-blue-700 underline">BOOST DISCORD</a>
                      <br />
                      Requiere que el usuario tenga Discord NITRO.
                      <br />Consulte disponibilidad en nuestro Discord ya que hay cupos limitados para este metodo.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="lg:w-1/2 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <img
                src="https://i.ibb.co/SKSjbG6/Untitled.png"
                alt="Icono y etiqueta de Discord"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => setShowSeedingInfo(!showSeedingInfo)}
            className="text-gray-400 hover:text-gray-300 underline text-lg transition-colors duration-200"
          >
            No tengo dinero...
          </button>
        </div>

        {showSeedingInfo && (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-semibold mb-6 text-cyan-400 text-center">¡Puedes ayudarnos Seedeando!</h3>

            <div className="flex flex-col items-center mb-8">
              <div className="w-full mb-4">
                <p className="text-white text-lg leading-relaxed text-center">
                  El seedeo es una forma valiosa de contribuir a nuestra comunidad sin gastar dinero.
                  <br />
                  Ayuda a mantener nuestros servidores activos y atrae a más jugadores, fortaleciendo
                  nuestra comunidad de Hell Let Loose.
                </p>
              </div>
              <div className="w-full">
                <img
                  src="https://i.ibb.co/nMxz616/image.png"
                  alt="Seedeo en Hell Let Loose"
                  width={200}
                  height={100}
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg text-cyan-400">¿Qué es seedear en HLL?</AccordionTrigger>
                <AccordionContent className="text-white">
                  Seedear es el proceso de unirse a un servidor vacío o con pocos jugadores para ayudar a poblarlo y atraer a más jugadores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg text-cyan-400">¿Por qué es útil seedear?</AccordionTrigger>
                <AccordionContent className="text-white">
                  Seedear ayuda a mantener los servidores activos, crea oportunidades para nuevos jugadores y fortalece la comunidad de HLL. De esta manera, incentivarás a otros jugadores a entrar al servidor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg text-cyan-400">¿Qué gano al seedear?</AccordionTrigger>
                <AccordionContent className="text-white">
                  Recibirás VIP durante las siguientes 24 horas cuando se hayan alcanzado los 40 jugadores, lo cual te servirá por si quieres entrar más tarde al servidor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg text-cyan-400">¿Cuáles son los horarios usuales de Seeding?</AccordionTrigger>
                <AccordionContent className="text-white">
                  El horario varia dependiendo el dia. Lo usual es que comience a las 16/18hs UTC-3 de Lunes a Viernes. Sabados y Domingos puede comenzar antes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 text-center">
              <a href="https://discord.gg/SXtCnpfvDW" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#7289da] hover:bg-[#5b6eae] text-white text-lg px-6 py-3 flex items-center justify-center w-full sm:w-auto">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  <span className="hidden sm:inline">Unirse al Discord de HLL LatinoAmerica</span>
                  <span className="sm:hidden">Unirse al Discord</span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}