import React from 'react'
import { Layout } from './components/layout/Layout'
import { Hero } from './components/home/Hero'
import { BookingSection } from './components/booking/BookingSection'
import { ShopSection } from './components/shop/ShopSection'

function App() {
  return (
    <Layout>
      <Hero />
      <BookingSection />
      <ShopSection />
    </Layout>
  )
}

export default App
