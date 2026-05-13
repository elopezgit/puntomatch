import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  toggleCart: () => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,
  total: 0,

  addItem: (item) => set((state) => {
    const existing = state.items.find((i) => i.id === item.id)
    let newItems
    if (existing) {
      newItems = state.items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    } else {
      newItems = [...state.items, { ...item, quantity: 1 }]
    }
    return {
      items: newItems,
      total: newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
      isCartOpen: true
    }
  }),

  removeItem: (id) => set((state) => {
    const newItems = state.items.filter((i) => i.id !== id)
    return {
      items: newItems,
      total: newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    }
  }),

  updateQuantity: (id, quantity) => set((state) => {
    if (quantity <= 0) {
      return useCartStore.getState().removeItem(id) as unknown as Partial<CartState>
    }
    const newItems = state.items.map((i) =>
      i.id === id ? { ...i, quantity } : i
    )
    return {
      items: newItems,
      total: newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    }
  }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  clearCart: () => set({ items: [], total: 0, isCartOpen: false })
}))
