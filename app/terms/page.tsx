import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import LegalMarkdown from '@/components/legal/LegalMarkdown'
import { getLegalDocument } from '@/lib/legal'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Terms of Services | CredMatrix',
  description:
    'The terms governing your use of the CredMatrix platform and the financial analytics services it provides.',
  alternates: { canonical: '/terms' },
}

export default async function TermsPage() {
  const { title, body } = await getLegalDocument('terms-of-services')

  return (
    <>
      <Section background="grey" size="sm">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading as="h1" size="xl" className="font-heading">
              {title || 'Terms of Services'}
            </Heading>
            <p className="mt-16 text-sm text-neutral-600 md:text-base">
              Please read these terms carefully — they form a binding contract between you and
              CredMatrix.
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
