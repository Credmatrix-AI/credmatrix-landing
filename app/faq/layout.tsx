import type { Metadata } from 'next'

const description =
  'What we cover, where our data comes from, and how to get started.'

export const metadata: Metadata = {
  title: 'FAQ',
  description,
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | CredMatrix',
    description,
    type: 'website',
    url: '/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
