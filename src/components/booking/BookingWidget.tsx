import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, ChevronRight, Check } from 'lucide-react'
import { useBookingStore } from '../../store/useBookingStore'
import { COURTS, TIME_SLOTS, getSlotStatus } from '../../utils/mockData'
import { generateTicketPDF } from '../../utils/generateTicket'
import { format, addDays } from 'date-fns'
import { es } from 'date-fns/locale'

export const BookingWidget = () => {
  const { selectedCourt, selectedDate, selectedSlots, totalPrice, selectCourt, setDate, toggleSlot } = useBookingStore()
  const [step, setStep] = useState(1) // 1: Court & Date, 2: Time, 3: Checkout

  const nextDays = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i))

  const handleNextStep = () => {
    if (step === 1 && selectedCourt) setStep(2)
    if (step === 2 && selectedSlots.length > 0) setStep(3)
  }

  const handleConfirm = () => {
    // Generate PDF
    generateTicketPDF(selectedCourt?.name || 'Cancha', selectedDate, selectedSlots, totalPrice, 10000)

    // Generate WhatsApp
    const message = `Hola PuntoMatch! Quiero confirmar una reserva:%0A%0A` +
      `*Cancha:* ${selectedCourt?.name}%0A` +
      `*Fecha:* ${format(selectedDate, 'EEEE d MMMM, yyyy', { locale: es })}%0A` +
      `*Horarios:* ${selectedSlots.join(', ')} hs%0A` +
      `*Total:* $${totalPrice.toLocaleString('es-AR')}%0A` +
      `*Seña a abonar:* $10.000%0A%0A` +
      `Adjunto el comprobante de transferencia por la seña.`
    
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank')
  }

  return (
    <div className="glass-panel p-6 md:p-8 max-w-4xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              s === step 
                ? 'bg-[#ccff00] text-slate-950 shadow-[0_0_15px_rgba(204,255,0,0.5)]' 
                : s < step 
                  ? 'bg-white text-slate-950'
                  : 'bg-slate-800 text-gray-400 border border-white/10'
            }`}
          >
            {s < step ? <Check className="w-5 h-5" /> : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-[#ccff00]" /> 1. Selecciona tu Pista
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {COURTS.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => selectCourt(court)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      selectedCourt?.id === court.id 
                        ? 'border-[#ccff00] bg-[#ccff00]/10 shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                        : 'border-white/10 hover:border-white/30 bg-white/5'
                    }`}
                  >
                    <h4 className="font-bold text-lg">{court.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">${court.pricePerHour}/hr</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-[#ccff00]" /> 2. ¿Cuándo Juegas?
              </h3>
              <div className="flex overflow-x-auto gap-3 pb-2 custom-scrollbar">
                {nextDays.map((date) => {
                  const isSelected = date.toDateString() === selectedDate.toDateString()
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => setDate(date)}
                      className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#00f3ff] bg-[#00f3ff]/10 shadow-[0_0_15px_rgba(0,243,255,0.2)] text-white'
                          : 'border-white/10 hover:border-white/30 bg-white/5 text-gray-400'
                      }`}
                    >
                      <span className="text-xs uppercase font-medium">{format(date, 'EEE', { locale: es })}</span>
                      <span className="text-2xl font-black">{format(date, 'd')}</span>
                      <span className="text-xs">{format(date, 'MMM', { locale: es })}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleNextStep}
                disabled={!selectedCourt}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ccff00] text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-[#b3e600] transition-colors"
              >
                Continuar a Horarios <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Clock className="text-[#ccff00]" /> 3. Horario del Partido
              </h3>
              <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-white underline">
                Volver
              </button>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl mb-6 flex flex-col md:flex-row justify-between items-center border border-white/5">
              <div>
                <p className="text-gray-400 text-sm">Cancha seleccionada</p>
                <p className="font-bold text-lg text-[#00f3ff]">{selectedCourt?.name}</p>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <p className="text-gray-400 text-sm">Día seleccionado</p>
                <p className="font-bold">{format(selectedDate, 'EEEE d MMMM', { locale: es })}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {TIME_SLOTS.map((slot) => {
                const status = getSlotStatus(selectedDate, selectedCourt?.id || 1, slot)
                const isSelected = selectedSlots.includes(slot)
                
                let btnClass = 'border-white/10 bg-white/5 text-gray-400 cursor-not-allowed opacity-50'
                if (status === 'available') {
                  btnClass = isSelected 
                    ? 'border-[#ccff00] bg-[#ccff00] text-slate-950 shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                    : 'border-[#ccff00]/30 hover:border-[#ccff00] hover:bg-[#ccff00]/10 text-white'
                }

                return (
                  <button
                    key={slot}
                    disabled={status !== 'available'}
                    onClick={() => toggleSlot(slot)}
                    className={`p-3 rounded-lg border text-center font-bold transition-all ${btnClass}`}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-xs text-gray-400 justify-center mt-6">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#ccff00]"></span> Seleccionado</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full border border-[#ccff00]/30"></span> Disponible</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-white/10"></span> Ocupado</span>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <div>
                <p className="text-gray-400 text-sm">Total ({selectedSlots.length} horas)</p>
                <p className="text-3xl font-black text-[#ccff00]">${totalPrice.toLocaleString('es-AR')}</p>
              </div>
              <button 
                onClick={handleNextStep}
                disabled={selectedSlots.length === 0}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ccff00] text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-[#b3e600] transition-colors"
              >
                Confirmar Reserva <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Check className="text-[#00f3ff]" /> 4. Resumen y Pago
              </h3>
              <button onClick={() => setStep(2)} className="text-sm text-gray-400 hover:text-white underline">
                Volver
              </button>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">Cancha</span>
                <span className="font-bold">{selectedCourt?.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">Fecha</span>
                <span className="font-bold capitalize">{format(selectedDate, 'EEEE d MMMM, yyyy', { locale: es })}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">Horarios</span>
                <span className="font-bold text-[#00f3ff]">{selectedSlots.join(', ')} hs</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">Total</span>
                <span className="font-bold text-xl">${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seña mínima requerida</span>
                <span className="font-bold text-[#ccff00]">$10.000</span>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleConfirm}
                className="w-full flex items-center justify-center gap-2 bg-[#00f3ff] text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00d0ff] transition-colors shadow-[0_0_20px_rgba(0,243,255,0.4)]"
              >
                Confirmar vía WhatsApp
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                Serás redirigido a WhatsApp para finalizar el pago y recibir tu comprobante PDF.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
