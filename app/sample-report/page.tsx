import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import AnnotatedSection from '@/components/report/AnnotatedSection'
import { Redacted, ReportSheet, SectionBar } from '@/components/report/primitives'
import {
  AboutBlock,
  ComfortsDiscomforts,
  CreditRatingRow,
  EntityBanner,
  FactCards,
  FinancialTable,
  GstFilingTable,
  InsightCard,
  PfPaymentTable,
  ReportMasthead,
} from '@/components/report/ReportBlocks'
import {
  REPORT_SECTIONS,
  COMFORTS,
  DISCOMFORTS,
  FACT_CARDS,
  FINANCIAL_ROWS,
  INSIGHTS,
  TOTAL_INSIGHTS,
  WORKING_CAPITAL_ROWS,
} from '@/constants/sampleReport'

export const metadata: Metadata = {
  title: 'Sample Report | CredMatrix',
  description:
    'A CredMatrix credit assessment, section by section — what each part contains and how to read it.',
}

const [verdict, identity, insights, comforts, compliance, financials] =
  REPORT_SECTIONS

export default function SampleReportPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative">
        <div className="absolute left-8 right-8 top-0 h-[200px] rounded-b-[32px] bg-accent-blue md:left-32 md:right-32 md:h-[240px] md:rounded-b-[48px] lg:left-64 lg:right-64" />

        <Section background="white" className="relative bg-transparent pt-80">
          <Container>
            <AnimateOnScroll animation="fadeUp" className="mx-auto max-w-3xl text-center">
              <Heading as="h1" align="center" className="mb-24">
                Sample Report
              </Heading>
              <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                A CredMatrix credit assessment, section by section — and what each
                part tells you.
              </p>
            </AnimateOnScroll>
          </Container>
        </Section>
      </div>

      {/* Walkthrough — each step is its own alternating band */}
      {/* 01 — the verdict */}
      <AnnotatedSection section={verdict} index={0}>
        <ReportSheet>
          <ReportMasthead />
          <div className="p-12 md:p-16">
            <EntityBanner />
          </div>
        </ReportSheet>
      </AnnotatedSection>

      {/* 02 — who you are dealing with */}
      <AnnotatedSection section={identity} index={1}>
        <ReportSheet className="space-y-12 p-12 md:p-16">
          <EntityBanner />
          <FactCards cards={FACT_CARDS} />
          <CreditRatingRow />
          <AboutBlock />
        </ReportSheet>
      </AnnotatedSection>

      {/* 03 — AI-powered credit insights */}
      <AnnotatedSection section={insights} index={2}>
        <ReportSheet className="p-12 md:p-16">
          <SectionBar>AI-Powered Credit Insights</SectionBar>
          <div className="space-y-12">
            {INSIGHTS.map((insight) => (
              <InsightCard key={insight.index} insight={insight} />
            ))}
          </div>
          <p className="mt-12 text-center text-[10px] italic text-neutral-400 sm:text-xs">
            {INSIGHTS.length} of {TOTAL_INSIGHTS} insights shown
          </p>
        </ReportSheet>
      </AnnotatedSection>

      {/* 04 — comforts & discomforts */}
      <AnnotatedSection section={comforts} index={3}>
        <ReportSheet className="p-12 md:p-16">
          <SectionBar>Comforts &amp; Discomforts</SectionBar>
          <ComfortsDiscomforts comforts={COMFORTS} discomforts={DISCOMFORTS} />
        </ReportSheet>
      </AnnotatedSection>

      {/* 05 — filing & payment behaviour */}
      <AnnotatedSection section={compliance} index={4}>
        <ReportSheet className="space-y-16 p-12 md:p-16">
          <div>
            <SectionBar>
              GST Filing Details — Aging of filings in last 12 months
            </SectionBar>
            <GstFilingTable />
            <p className="mt-8 text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">
              <span className="font-bold">Note:</span> DPD = Days Past Due.
              Analysis based on last 12 months of filing data for active GSTINs
              only.
            </p>
          </div>
          <div>
            <SectionBar>
              PF Payment Details — <Redacted width={13} />
            </SectionBar>
            <PfPaymentTable />
          </div>
        </ReportSheet>
      </AnnotatedSection>

      {/* 06 — financial analysis */}
      <AnnotatedSection section={financials} index={5}>
        <ReportSheet className="space-y-16 p-12 md:p-16">
          <div>
            <SectionBar>Financial Analysis</SectionBar>
            <FinancialTable rows={FINANCIAL_ROWS} />
          </div>
          <div>
            <SectionBar>Working Capital</SectionBar>
            <FinancialTable rows={WORKING_CAPITAL_ROWS} />
          </div>
          <p className="text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">
            <span className="font-bold">Disclaimer:</span> This report is
            compiled exclusively from public sources. All findings are indicative
            and intended for informational purposes only; they do not constitute
            formal professional advice.
          </p>
        </ReportSheet>
  </AnnotatedSection>

      {/* Closing */}
      <Section background="white" size="md">
        <Container>
          <AnimateOnScroll animation="fadeUp" className="mx-auto max-w-2xl text-center">
            <Heading as="h2" align="center" className="mb-16">
              Every counterparty, in the same shape
            </Heading>
            <p className="mb-24 text-xs leading-relaxed text-neutral-600 sm:text-sm md:text-base">
              Generated in under two minutes from authorised public sources, with no
              manual intervention. The same structure every time — which is what makes
              two counterparties comparable.
            </p>
            <Link
              href="/solutions"
              className="text-xs font-medium text-primary underline hover:no-underline sm:text-sm"
            >
              See how the platform builds it
            </Link>
          </AnimateOnScroll>
        </Container>
      </Section>
    </>
  )
}
