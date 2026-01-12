import type { Metadata } from 'next'
import { Lato, Libre_Caslon_Text } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
})

const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-caslon-text',
})

export const metadata: Metadata = {
  title: 'CredMatrix - Financial Due Diligence Intelligence',
  description: 'Transforming financial due-diligence intelligence into accessible, affortable & instant resource for every decision - maker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${libreCaslonText.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  )
}
