import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Send } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export const CartDrawer = () => {
  const { isCartOpen, toggleCart, items, total, updateQuantity, clearCart } = useCartStore()

  const handleWhatsAppOrder = () => {
    const message = `Hola PuntoMatch! Quiero comprar los siguientes productos:%0A%0A` +
      items.map(i => `- ${i.name} (x${i.quantity}) - $${(i.price * i.quantity).toLocaleString('es-AR')}`).join('%0A') +
      `%0A%0A*Total: $${total.toLocaleString('es-AR')}*`
    
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank')
    clearCart()
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-[#ccff00]" /> Tu Carrito
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                    <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden p-2 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold line-clamp-1">{item.name}</h4>
                        <p className="text-[#ccff00] font-bold">${item.price.toLocaleString('es-AR')}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center bg-white/5 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-[#ccff00]"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-[#ccff00]"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-slate-950 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total a pagar</span>
                  <span className="text-3xl font-black text-[#ccff00]">${total.toLocaleString('es-AR')}</span>
                </div>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#ccff00] text-slate-950 px-6 py-4 rounded-full font-bold text-lg hover:bg-[#b3e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                >
                  <Send className="w-5 h-5" /> Pedir por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
