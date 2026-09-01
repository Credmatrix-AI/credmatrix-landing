import type { Metadata } from 'next'

const description =
  'Risk reports, financial analysis and ongoing monitoring, all in one place.'

export const metadata: Metadata = {
  title: 'Solutions',
  description,
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Solutions | CredMatrix',
    description,
    type: 'website',
    url: '/solutions',
  },
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
