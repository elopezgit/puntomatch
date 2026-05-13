import React from 'react'
import { ProductCard } from './ProductCard'
import { PRODUCTS } from '../../utils/mockData'
import { CartDrawer } from './CartDrawer'

export const ShopSection = () => {
  return (
    <section id="shop" className="py-24 relative overflow-hidden bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Padel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-[#00f3ff]">Pro-Shop</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Encuentra tu paleta ideal y el equipamiento que usan los profesionales. Potencia cada golpe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <CartDrawer />
    </section>
  )
}
