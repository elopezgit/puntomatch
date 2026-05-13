import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/hero_court.png')] bg-cover bg-center"
      />
      <div className="absolute inset-0 z-10 bg-slate-950/80 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      
      {/* Decorative neon elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ccff00]/20 rounded-full blur-[120px] z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f3ff]/20 rounded-full blur-[120px] z-10" />

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
            ELEVÁ TU NIVEL DE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-[#00f3ff] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">PÁDEL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Canchas de cristal premium, césped sintético de última generación y paletas tope de gama. La experiencia definitiva para verdaderos jugadores.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#reservas" 
              className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] text-slate-950 font-bold rounded-full text-lg hover:bg-[#b3e600] transition-colors shadow-[0_0_20px_rgba(204,255,0,0.4)]"
            >
              Reservar Cancha
            </a>
            <a 
              href="#shop" 
              className="w-full sm:w-auto px-8 py-4 glass-panel text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Explorar Pro-Shop
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-sm tracking-widest uppercase">Descubre más</span>
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  )
}
