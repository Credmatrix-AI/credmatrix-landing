import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import { cn } from '@/lib/utils'
import { ReportSectionNote } from '@/types/report'

/**
 * One step of the walkthrough: the annotation on one side, the corresponding
 * fragment of the masked report on the other.
 *
 * Follows the alternating rhythm of `ProductShowcase` on /solutions — odd steps
 * flip the columns and the section background alternates white/grey, so each
 * step reads as its own band. The flip uses `order` rather than DOM order, so
 * the annotation still comes first when the grid collapses below `lg` and for
 * screen readers.
 *
 * On large screens the annotation sticks while the report fragment scrolls,
 * keeping the explanation in view for the taller steps (insights, financials).
 */
export default function AnnotatedSection({
  section,
  index,
  children,
}: {
  section: ReportSectionNote
  /** Position in the walkthrough; odd values render report-left on grey. */
  index: number
  children: React.ReactNode
}) {
  const isReportLeft = index % 2 === 1

  return (
    <Section
      id={section.id}
      background={isReportLeft ? 'grey' : 'white'}
      size="md"
      className="scroll-mt-80 overflow-hidden"
    >
      <Container>
        <div className="grid gap-24 lg:grid-cols-12 lg:gap-32">
          <div className={cn('lg:col-span-4', isReportLeft && 'lg:order-2')}>
            <div className="lg:sticky lg:top-96">
              <AnimateOnScroll animation={isReportLeft ? 'fadeRight' : 'fadeLeft'}>
                <div className="mb-16 flex items-baseline gap-12">
                  <span className="font-heading text-3xl leading-none text-primary/25 md:text-4xl">
                    {section.step}
                  </span>
                  <span className="h-[1px] flex-1 bg-neutral-200" />
                </div>

                <Heading as="h2" size="md" className="mb-12">
                  {section.title}
                </Heading>

                {/* What the section contains — supporting prose, so it sits a
                    step back in contrast. */}
                <p className="text-xs leading-relaxed text-neutral-500 sm:text-sm">
                  {section.shows}
                </p>

                {/* The takeaway. Marked by a rule and a lift in contrast rather
                    than a label, so the reader gets the shift without six
                    repetitions of the same heading down the page. */}
                <p className="mt-16 border-l-2 border-primary/30 pl-16 text-xs leading-relaxed text-secondary sm:text-sm">
                  {section.tells}
                </p>
              </AnimateOnScroll>
            </div>
          </div>

          <div className={cn('lg:col-span-8', isReportLeft && 'lg:order-1')}>
            <AnimateOnScroll
              animation={isReportLeft ? 'fadeLeft' : 'fadeRight'}
              delay={100}
            >
              {children}
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
    </Section>
  )
}
