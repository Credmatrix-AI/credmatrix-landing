import type { Metadata } from 'next'

const description =
  'Our mission: trustworthy financial intelligence for everyone who has a decision to make.'

export const metadata: Metadata = {
  title: 'About Us',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | CredMatrix',
    description,
    type: 'website',
    url: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
