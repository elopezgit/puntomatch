import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-black tracking-tighter text-white mb-4">
          PUNTO<span className="text-[#ccff00]">MATCH</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          El ecosistema definitivo para amantes del pádel. Reserva tu turno, mejora tu nivel y equípate como un profesional.
        </p>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ccff00] hover:text-slate-950 transition-colors font-bold text-sm">
            IG
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ccff00] hover:text-slate-950 transition-colors font-bold text-sm">
            TW
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ccff00] hover:text-slate-950 transition-colors font-bold text-sm">
            YT
          </a>
        </div>
        
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} PuntoMatch. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
