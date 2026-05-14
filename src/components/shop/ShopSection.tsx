import React, { useState, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { CartDrawer } from './CartDrawer'
import { supabase } from '../../lib/supabase'

export const ShopSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pm_products')
        .select(`
          *,
          pm_product_categories (name)
        `)
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match existing ProductCard format if needed
      // existing format: id, name, category, price, image, tag
      const formatted = (data || []).map(p => ({
        id: p.id,
        name: p.name,
        category: p.pm_product_categories?.name || 'Varios',
        price: p.price,
        image: p.image_url || '/images/balls.png', // Fallback image
        tag: p.is_offer ? 'Oferta' : p.is_new ? 'Nuevo' : undefined,
        stock: p.stock
      }));
      
      setProducts(formatted);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
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
          {loading ? (
            <div className="col-span-full text-center text-gray-400 py-12">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">No hay productos disponibles por el momento.</div>
          ) : (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      <CartDrawer />
    </section>
  )
}
