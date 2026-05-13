import { create } from 'zustand'

export interface Court {
  id: number
  name: string
  pricePerHour: number
}

interface BookingState {
  selectedCourt: Court | null
  selectedDate: Date
  selectedSlots: string[]
  totalPrice: number
  selectCourt: (court: Court) => void
  setDate: (date: Date) => void
  toggleSlot: (slot: string) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedCourt: null,
  selectedDate: new Date(),
  selectedSlots: [],
  totalPrice: 0,
  
  selectCourt: (court) => set((state) => ({ 
    selectedCourt: court,
    totalPrice: state.selectedSlots.length * court.pricePerHour
  })),
  
  setDate: (date) => set({ selectedDate: date, selectedSlots: [], totalPrice: 0 }),
  
  toggleSlot: (slot) => set((state) => {
    const isSelected = state.selectedSlots.includes(slot)
    const newSlots = isSelected 
      ? state.selectedSlots.filter(s => s !== slot)
      : [...state.selectedSlots, slot].sort()
      
    const price = state.selectedCourt ? state.selectedCourt.pricePerHour : 0
    
    return {
      selectedSlots: newSlots,
      totalPrice: newSlots.length * price
    }
  }),
  
  clearBooking: () => set({ selectedCourt: null, selectedSlots: [], totalPrice: 0 })
}))
