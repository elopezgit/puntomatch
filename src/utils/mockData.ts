import type { Court } from '../store/useBookingStore'

export const COURTS: Court[] = [
  { id: 1, name: 'Cancha 1 - Panorámica', pricePerHour: 18000 },
  { id: 2, name: 'Cancha 2 - Panorámica', pricePerHour: 18000 },
  { id: 3, name: 'Cancha 3 - Premium', pricePerHour: 22000 },
]

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

// Mock function to simulate available slots
export const getSlotStatus = (date: Date, courtId: number, slot: string) => {
  // Randomly set some slots as occupied for demonstration
  const random = Math.sin(date.getDate() + courtId + parseInt(slot))
  if (random > 0.6) return 'occupied'
  if (random > 0.3) return 'partially'
  return 'available'
}

export const PRODUCTS = [
  {
    id: '1',
    name: 'Nox AT10 Genius',
    category: 'Paletas',
    price: 280000,
    image: '/images/racket_green.png',
    tag: 'Nuevo'
  },
  {
    id: '2',
    name: 'Babolat Technical Viper',
    category: 'Paletas',
    price: 310000,
    image: '/images/racket_blue.png',
    tag: 'Best Seller'
  },
  {
    id: '3',
    name: 'Pack Overgrips x3',
    category: 'Accesorios',
    price: 15000,
    image: '/images/balls.png'
  },
  {
    id: '4',
    name: 'Tubo Pelotas Head Pro',
    category: 'Pelotas',
    price: 12000,
    image: '/images/balls.png'
  }
]
