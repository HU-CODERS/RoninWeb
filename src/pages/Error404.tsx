'use client'

import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Home, Code } from 'lucide-react'
import setPageTitle from '../utils/setPageTitle'

export default function Error404() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 101)
    }, 50)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    setPageTitle('La pagina no existe 🤖 | HUCO');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-center text-white">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Code className="text-blue-400 w-24 h-24" />
          </div>
          <h2 className="text-2xl font-semibold text-center text-white">Página no encontrada</h2>
          <p className="text-center text-gray-400">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <div className="flex justify-center items-center space-x-2 text-blue-400">
            <span className="text-lg font-mono">{`<`}</span>
            <div className="w-16 text-center font-mono text-lg">
              {count.toString().padStart(3, '0')}
            </div>
            <span className="text-lg font-mono">{`/>`}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}