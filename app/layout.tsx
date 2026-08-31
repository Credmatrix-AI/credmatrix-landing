import type { Metadata } from 'next'
import { Lato, Libre_Caslon_Text } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CalFloatingButton from '@/components/ui/CalFloatingButton'
import AttributionTracker from '@/components/shared/AttributionTracker'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://credmatrix.ai'),
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
        <CalFloatingButton />
        <AttributionTracker />
        <Analytics />
      </body>
    </html>
  )
}
