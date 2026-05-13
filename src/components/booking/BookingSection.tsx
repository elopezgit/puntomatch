import React from 'react'
import { BookingWidget } from './BookingWidget'

export const BookingSection = () => {
  return (
    <section id="reservas" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[150px] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Asegura Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-[#00f3ff]">Partido</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Elige el día, tu cancha favorita y prepárate para el saque. Reserva tu pista al instante.
          </p>
        </div>

        <BookingWidget />
      </div>
    </section>
  )
}
