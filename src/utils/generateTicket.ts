import { jsPDF } from 'jspdf'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const generateTicketPDF = (
  courtName: string,
  date: Date,
  slots: string[],
  total: number,
  deposit: number
) => {
  const doc = new jsPDF()
  
  // Design settings
  const primaryColor = '#020617'
  
  // Background
  doc.setFillColor(primaryColor)
  doc.rect(0, 0, 210, 297, 'F')
  
  // Header
  doc.setTextColor(204, 255, 0)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('PUNTOMATCH', 105, 30, { align: 'center' })
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('TICKET DE RESERVA', 105, 40, { align: 'center' })
  
  // Divider
  doc.setDrawColor(204, 255, 0)
  doc.setLineWidth(0.5)
  doc.line(20, 50, 190, 50)
  
  // Details
  const startY = 70
  const lineHeight = 15
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Detalles de la Cancha', 20, startY)
  
  doc.setFont('helvetica', 'normal')
  doc.text(`Cancha: ${courtName}`, 20, startY + lineHeight)
  doc.text(`Fecha: ${format(date, 'EEEE d MMMM, yyyy', { locale: es })}`, 20, startY + lineHeight * 2)
  doc.text(`Horarios: ${slots.join(', ')} hs`, 20, startY + lineHeight * 3)
  
  // Pricing
  const priceStartY = startY + lineHeight * 5
  
  doc.setFont('helvetica', 'bold')
  doc.text('Resumen de Pago', 20, priceStartY)
  
  doc.setFont('helvetica', 'normal')
  doc.text(`Total Reserva: $${total.toLocaleString('es-AR')}`, 20, priceStartY + lineHeight)
  doc.text(`Seña a abonar (Min): $${deposit.toLocaleString('es-AR')}`, 20, priceStartY + lineHeight * 2)
  doc.text(`Saldo pendiente en sede: $${(total - deposit).toLocaleString('es-AR')}`, 20, priceStartY + lineHeight * 3)
  
  // Footer Box
  doc.setDrawColor(204, 255, 0)
  doc.setFillColor(255, 255, 255, 0.05)
  doc.roundedRect(20, priceStartY + lineHeight * 5, 170, 40, 3, 3, 'FD')
  
  doc.setFontSize(10)
  doc.text('IMPORTANTE:', 25, priceStartY + lineHeight * 5 + 10)
  doc.setFont('helvetica', 'italic')
  doc.text('Presenta este comprobante en recepción 10 minutos antes de tu turno.', 25, priceStartY + lineHeight * 5 + 20)
  doc.text('La seña no es reembolsable en caso de cancelación con menos de 24hs.', 25, priceStartY + lineHeight * 5 + 30)
  
  doc.save('PuntoMatch_Reserva.pdf')
}
