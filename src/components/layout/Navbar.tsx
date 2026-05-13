import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items, toggleCart } = useCartStore()

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-black tracking-tighter text-white">
          PUNTO<span className="text-[#ccff00]">MATCH</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center font-medium">
          <a href="#reservas" className="hover:text-[#ccff00] transition-colors">Reservas</a>
          <a href="#academia" className="hover:text-[#ccff00] transition-colors">Academia</a>
          <a href="#shop" className="hover:text-[#ccff00] transition-colors">Pro-Shop</a>
          
          <button onClick={toggleCart} className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#ccff00] text-slate-950 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <a href="#reservas" className="bg-[#ccff00] text-slate-950 px-6 py-2 rounded-full font-bold hover:bg-[#b3e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            Reservar Cancha
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleCart} className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#ccff00] text-slate-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-white/10 py-4 px-4 flex flex-col gap-4">
          <a href="#reservas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg py-2 border-b border-white/5">Reservas</a>
          <a href="#academia" onClick={() => setIsMobileMenuOpen(false)} className="text-lg py-2 border-b border-white/5">Academia</a>
          <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg py-2 border-b border-white/5">Pro-Shop</a>
          <a href="#reservas" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#ccff00] text-slate-950 px-6 py-3 rounded-full font-bold text-center mt-2">
            Reservar Cancha
          </a>
        </div>
      )}
    </header>
  )
}
