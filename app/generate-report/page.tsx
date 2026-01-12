'use client'

import { useState } from 'react'
import { Search, Building2, Loader2, ExternalLink, TrendingUp, Shield, Droplets, FileCheck, Target, BookOpen, CheckCircle } from 'lucide-react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

interface Company {
  cin: string
  company_name: string
  company_status?: string
  company_class?: string
  authorized_capital?: number
  paid_up_capital?: number
  state?: string
  city?: string
}

interface SearchResult {
  companies: Company[]
  total_count: number
}

// Dummy data for local UI testing
const MOCK_RESULTS: Company[] = [
  {
    cin: 'U74999KA2018PTC117tried',
    company_name: 'ZETWERK MANUFACTURING BUSINESSES PRIVATE LIMITED',
    company_status: 'Active',
    company_class: 'Private',
    authorized_capital: 1500000000,
    paid_up_capital: 1234567890,
    state: 'Karnataka',
    city: 'Bengaluru',
  },
  {
    cin: 'U29299MH2015PTC265798',
    company_name: 'TATA STEEL LIMITED',
    company_status: 'Active',
    company_class: 'Public',
    authorized_capital: 15000000000,
    paid_up_capital: 12200000000,
    state: 'Maharashtra',
    city: 'Mumbai',
  },
  {
    cin: 'L17110MH1973PLC019786',
    company_name: 'RELIANCE INDUSTRIES LIMITED',
    company_status: 'Active',
    company_class: 'Public',
    authorized_capital: 50000000000,
    paid_up_capital: 33900000000,
    state: 'Maharashtra',
    city: 'Mumbai',
  },
  {
    cin: 'U72200KA2006PTC041287',
    company_name: 'INFOSYS TECHNOLOGIES PRIVATE LIMITED',
    company_status: 'Strike Off',
    company_class: 'Private',
    authorized_capital: 100000,
    paid_up_capital: 100000,
    state: 'Karnataka',
    city: 'Bengaluru',
  },
  {
    cin: 'L65910MH2000PLC129408',
    company_name: 'BAJAJ FINSERV LIMITED',
    company_status: 'Active',
    company_class: 'Public',
    authorized_capital: 2000000000,
    paid_up_capital: 1592000000,
    state: 'Maharashtra',
    city: 'Pune',
  },
]

// Set to true to use mock data for local testing
const USE_MOCK_DATA = true

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.credmatrix.ai'

const REPORT_PILLARS = [
  {
    icon: TrendingUp,
    title: 'Financial Health Assessment',
    description: 'Using the Altman Z-Score, we calculate bankruptcy risk. A score below 1.8 indicates a "Distress Zone," signaling potential financial difficulties.',
  },
  {
    icon: Target,
    title: 'Operational Efficiency',
    description: 'We analyze Fixed Asset Turnover, Inventory Turnover, and Material Costs to score operational excellence against industry best practices.',
  },
  {
    icon: Droplets,
    title: 'Liquidity & Working Capital',
    description: 'We measure WC Turnover and WC to Revenue ratios to ensure a company can meet its short-term obligations.',
  },
  {
    icon: FileCheck,
    title: 'Statutory & Compliance Hygiene',
    description: 'We track GSTR filing regularity, PF/ESI payment timeliness, and identify any diversion of funds or pending legal cases.',
  },
]

const BUSINESS_BENEFITS = [
  {
    title: 'Set Smart Credit Limits',
    description: 'Avoid bad debt by following our Recommended Exposure limits for high-risk entities.',
  },
  {
    title: 'Monitor Growth vs. Risk',
    description: 'A company might show strong revenue growth but still be high risk due to leveraged capital structure.',
  },
  {
    title: 'Validate Real-time Compliance',
    description: 'Go beyond balance sheets with live updates on Open Charges and GST filing aging.',
  },
  {
    title: 'Identify Related Party Risks',
    description: 'Map out Subsidiaries, Associates, and Joint Ventures to understand the full corporate ecosystem.',
  },
]

const HOW_TO_READ = [
  {
    title: 'The Risk Score (0-85+)',
    description: 'Scores between 0-40 (Grade CM6/CM7) are "Reject" or high-risk, while scores above 85 represent "Low Risk".',
  },
  {
    title: 'Comforts vs. Discomforts',
    description: 'Quick summary of strengths (efficient asset utilization) versus red flags (weak current ratio).',
  },
  {
    title: 'Financial Trendline',
    description: 'Track Operating Income, EBITDA Margins, and Debt-to-Equity over a 4-year period.',
  },
  {
    title: 'Working Capital Cycle',
    description: 'Check Debtor Days and Creditor Days. Increasing "Net WCC" may indicate collection struggles.',
  },
]

export default function GenerateReportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const filtered = MOCK_RESULTS.filter(c =>
        c.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cin.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setResults(filtered.length > 0 ? filtered : MOCK_RESULTS)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/company/search?query=${encodeURIComponent(searchQuery)}&enhanced=true&include_suggestions=true&include_data_sources=true&limit=15`
      )
      const data: SearchResult = await response.json()
      setResults(data.companies || [])
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompanyClick = (cin: string) => {
    window.open(`${API_URL}/companies/${cin}`, '_blank')
  }

  const formatCapital = (amount?: number) => {
    if (!amount) return '-'
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString()}`
  }

  return (
    <>
      {/* Search Section */}
      <div className="relative">
        {/* Blue background with rounded bottom */}
        <div className="absolute top-0 left-8 right-8 md:left-32 md:right-32 lg:left-64 lg:right-64 h-[400px] bg-accent-blue rounded-b-[32px] md:rounded-b-[48px]" />

        <Section background="white" size="lg" className="relative bg-transparent">
          <Container>
            <div className="max-w-3xl mx-auto">
              <AnimateOnScroll animation="fadeUp">
                <div className="text-center mb-32">
                  <Heading as="h1" align="center" className="mb-16">
                    Transforming Risk into Resolution
                  </Heading>
                  <p className="text-lg text-neutral-600">
Search and get company insights                  </p>
                </div>
              </AnimateOnScroll>

            <form onSubmit={handleSearch} className="relative mb-32">
              <div className="flex flex-col sm:flex-row gap-12 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-12 md:left-16 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter company name, CIN, or PAN..."
                    className="w-full pl-36 pr-12 py-10 text-sm md:pl-48 md:pr-16 md:py-12 md:text-base border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  />
                </div>
                <Button type="submit" variant="primary" size="sm" className="whitespace-nowrap" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-16 h-16 md:w-20 md:h-20 mr-8 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Search'
                  )}
                </Button>
              </div>
            </form>

            {/* Results */}
            {hasSearched && (
              <div className="space-y-16">
                {isLoading ? (
                  <div className="text-center py-32">
                    <Loader2 className="w-32 h-32 mx-auto text-primary animate-spin" />
                    <p className="mt-16 text-neutral-600">Searching companies...</p>
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <p className="text-sm text-neutral-500">{results.length} companies found</p>
                    <div className="space-y-12">
                      {results.map((company) => (
                        <div
                          key={company.cin}
                          onClick={() => handleCompanyClick(company.cin)}
                          className="bg-white border border-neutral-200 rounded-xl p-20 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-start justify-between gap-16">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-12 mb-8">
                                <Building2 className="w-20 h-20 text-neutral-500 flex-shrink-0" />
                                <h3 className="font-semibold text-neutral-900 truncate group-hover:text-primary transition-colors">
                                  {company.company_name}
                                </h3>
                              </div>
                              <p className="text-sm text-neutral-500 mb-12 ml-32">{company.cin}</p>
                              <div className="flex flex-wrap gap-8 ml-32">
                                {company.company_status && (
                                  <span className={`text-xs px-8 py-4 rounded-full ${
                                    company.company_status === 'Active'
                                      ? 'bg-success/10 text-success'
                                      : 'bg-neutral-100 text-neutral-600'
                                  }`}>
                                    {company.company_status}
                                  </span>
                                )}
                                {company.state && (
                                  <span className="text-xs px-8 py-4 rounded-full bg-neutral-100 text-neutral-600">
                                    {company.city ? `${company.city}, ` : ''}{company.state}
                                  </span>
                                )}
                                {company.paid_up_capital && (
                                  <span className="text-xs px-8 py-4 rounded-full bg-neutral-100 text-neutral-700">
                                    Paid-up: {formatCapital(company.paid_up_capital)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="w-16 h-16 text-neutral-400 group-hover:text-primary flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-32">
                    <p className="text-neutral-600">No companies found for &quot;{searchQuery}&quot;</p>
                    <p className="text-sm text-neutral-500 mt-8">Try searching with a different name or CIN</p>
                  </div>
                )}
              </div>
            )}

           
          </div>
        </Container>
      </Section>
      </div>

      {/* What's Inside the Report */}
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll animation="fadeUp">
              <div className="text-center mb-40">
                <Heading as="h2" align="center" className="mb-12">
                  What&apos;s Inside the Report?
                </Heading>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 gap-24">
              {REPORT_PILLARS.map((pillar, index) => (
                <AnimateOnScroll key={index} animation="fadeUp" delay={index * 100}>
                  <Card variant="grey" size="md">
                    <div className="flex items-start gap-16">
                      <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-200">
                        <pillar.icon className="w-20 h-20 text-neutral-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-8">{pillar.title}</h3>
                        <p className="text-sm text-neutral-600">{pillar.description}</p>
                      </div>
                    </div>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* How This Report Empowers Your Business */}
      <Section background="blue">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll animation="fadeUp">
              <div className="text-center mb-40">
                <Heading as="h2" align="center" className="mb-12">
                  How This Report Empowers Your Business
                </Heading>
              </div>
            </AnimateOnScroll>

            <div className="grid sm:grid-cols-2 gap-16">
              {BUSINESS_BENEFITS.map((benefit, index) => (
                <AnimateOnScroll key={index} animation="fadeUp" delay={index * 100}>
                  <Card variant="default" size="md">
                    <div className="flex items-start gap-12">
                      <CheckCircle className="w-20 h-20 text-neutral-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-4">{benefit.title}</h3>
                        <p className="text-sm text-neutral-600">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* How to Read Your Report */}
      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll animation="fadeUp">
              <div className="text-center mb-40">
                <Heading as="h2" align="center" className="mb-12">
                  How to Read Your CREDMatrix Report
                </Heading>
              </div>
            </AnimateOnScroll>

            <div className="space-y-16">
              {HOW_TO_READ.map((item, index) => (
                <AnimateOnScroll key={index} animation="fadeUp" delay={index * 100}>
                  <Card variant="grey" size="md">
                    <div className="flex items-start gap-16">
                      <div className="w-32 h-32 bg-neutral-800 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-8">{item.title}</h3>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="grey">
        <Container>
          <AnimateOnScroll animation="fadeUp">
            <div className="max-w-2xl mx-auto text-center">
              <Heading as="h2" align="center" className="mb-16">
                Ready to minimize your exposure?
              </Heading>
              <p className="text-neutral-600 mb-32">
                Search for any company and get instant access to comprehensive financial intelligence
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-8 bg-neutral-900 text-white px-32 py-16 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
              >
                <Search className="w-20 h-20" />
                Search a Company
              </button>
            </div>
          </AnimateOnScroll>
        </Container>
      </Section>
    </>
  )
}
