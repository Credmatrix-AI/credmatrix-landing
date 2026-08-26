import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import LegalMarkdown from '@/components/legal/LegalMarkdown'
import { getLegalDocument } from '@/lib/legal'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Privacy Policy | CredMatrix',
  description:
    'How CredMatrix collects, uses, shares and protects personal data across our website, platform and services.',
  alternates: { canonical: '/privacy' },
}

export default async function PrivacyPage() {
  const { title, body } = await getLegalDocument('privacy-policy')

  return (
    <>
      <Section background="grey" size="sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading as="h1" size="xl" className="font-heading">
              {title || 'Privacy Policy'}
            </Heading>
            <p className="mt-16 text-sm text-neutral-600 md:text-base">
              Our commitment to your right to privacy, and what we do with the data we process.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <article className="mx-auto max-w-3xl">
            <LegalMarkdown content={body} />
          </article>
        </Container>
      </Section>
    </>
  )
}
