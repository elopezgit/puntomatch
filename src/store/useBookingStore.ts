import { create } from 'zustand'

export interface Court {
  id: string
  name: string
}

export interface TimeSlot {
  id: string
  court_id?: string
  slot_start: string
  slot_end: string
  price: number
}

interface BookingState {
  selectedCourt: Court | null
  selectedDate: Date
  selectedSlots: TimeSlot[]
  totalPrice: number
  selectCourt: (court: Court) => void
  setDate: (date: Date) => void
  toggleSlot: (slot: TimeSlot) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedCourt: null,
  selectedDate: new Date(),
  selectedSlots: [],
  totalPrice: 0,
  
  selectCourt: (court) => set({ 
    selectedCourt: court,
    selectedSlots: [], // clear slots on court change
    totalPrice: 0
  }),
  
  setDate: (date) => set({ selectedDate: date, selectedSlots: [], totalPrice: 0 }),
  
  toggleSlot: (slot) => set((state) => {
    const isSelected = state.selectedSlots.some(s => s.id === slot.id)
    const newSlots = isSelected 
      ? state.selectedSlots.filter(s => s.id !== slot.id)
      : [...state.selectedSlots, slot].sort((a, b) => a.slot_start.localeCompare(b.slot_start))
      
    return {
      selectedSlots: newSlots,
      totalPrice: newSlots.reduce((acc, curr) => acc + Number(curr.price), 0)
    }
  }),
  
  clearBooking: () => set({ selectedCourt: null, selectedSlots: [], totalPrice: 0 })
}))
