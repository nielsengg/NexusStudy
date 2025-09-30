import { useState, useEffect } from 'react'
import Login from './Login.jsx'

export default function DesktopLogin() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl window-shadow border border-white/20 w-[900px] h-[600px] flex flex-col overflow-hidden">
      {/* Brilho que segue o mouse */}
      <div
        className="pointer-events-none fixed w-40 h-40 rounded-full bg-teal-400 opacity-30 blur-3xl transition-transform"
        style={{
          transform: `translate(${mousePos.x -80}px, ${mousePos.y - 80}px)`,
        }}
      ></div>

      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/20">
        <div className="dot bg-red-500"></div>
        <div className="dot bg-yellow-400"></div>
        <div className="dot bg-green-500"></div>
        <span className="ml-4 text-white font-semibold">Nexus Study</span>
      </div>

      <div className="flex flex-1">
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#0b2540] to-[#0f3f3a] text-white items-center justify-center p-8">
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo</h2>
            <p className="opacity-80">
              Faça login para acessar o Nexus Study
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="black bg-white/5 backdrop-blur-md rounded-lg p-8 w-full max-w-md">
            <Login />
          </div>
        </div>
      </div>
    </div>
  )
}
