import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

interface ProductProps {
  product: {
    id: string
    name: string
    category: string
    price: number
    image: string
    tag?: string
  }
}

export const ProductCard = ({ product }: ProductProps) => {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel overflow-hidden group relative"
    >
      {product.tag && (
        <span className={`absolute top-4 left-4 z-10 text-xs font-bold px-2 py-1 rounded ${
          product.tag === 'Nuevo' ? 'bg-[#ccff00] text-slate-950' : 'bg-[#00f3ff] text-slate-950'
        }`}>
          {product.tag}
        </span>
      )}
      
      <div className="relative h-64 overflow-hidden bg-white/5 flex items-center justify-center p-6">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
        <div className="absolute w-full h-full bg-[#ccff00]/0 group-hover:bg-[#ccff00]/10 transition-colors duration-500 z-0" />
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 z-0 relative"
        />
      </div>
      
      <div className="p-6 relative z-20">
        <p className="text-gray-400 text-sm mb-1">{product.category}</p>
        <h3 className="font-bold text-lg mb-4 text-white line-clamp-1">{product.name}</h3>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-black text-[#ccff00]">${product.price.toLocaleString('es-AR')}</span>
          <button 
            onClick={() => addItem(product)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ccff00] hover:text-slate-950 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
