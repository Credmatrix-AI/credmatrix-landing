import {
  ReportSectionNote,
  CreditInsight,
  FactCard,
  FinancialRow,
} from '@/types/report'

/**
 * Masked sample data for the /sample-report walkthrough.
 *
 * Sourced from a real CredMatrix assessment so the layout, field names and
 * tone are accurate. Everything that could identify the assessed entity — name,
 * website, PAN, GSTIN, location, directors, bankers, clients, PF codes, report
 * id — is redacted, and the narrative has been stripped of sector detail.
 * The financial figures are retained as illustrative values only; detached from
 * the entity they describe nothing in particular.
 */

export const REPORT_META = {
  generatedAt: '25 Aug 2026, 19:04 IST',
  risk: 'Moderate',
  score: '64',
  limit: '₹0.07 Cr',
  constitution: 'PRIVATE LIMITED',
  listingStatus: '(UNLISTED)',
  vintage: '14.5Y',
  creditRating: 'Unrated',
}

export const FACT_CARDS: FactCard[] = [
  {
    title: 'Identity',
    rows: [
      { label: 'PAN', redactedWidth: 10 },
      // Exact incorporation date is a registry-level identifier; the coarse
      // vintage in the banner carries the same signal without pinpointing.
      { label: 'Incorp.', redactedWidth: 11 },
      { label: 'Location', redactedWidth: 9 },
    ],
  },
  {
    title: 'Operations',
    rows: [
      { label: 'Employees', value: '105' },
      { label: 'Banker', redactedWidth: 12, note: '(2.0Cr)' },
    ],
  },
  {
    title: 'Compliance',
    rows: [
      { label: 'GST', value: 'Regular', tone: 'green' },
      { label: 'PF/ESI', value: 'Frequent Delays', note: '(2/14)', tone: 'red' },
      { label: 'AOC-4', value: '31 Mar, 2025', note: '(Current)' },
    ],
  },
  {
    title: 'Legal Risk',
    rows: [
      { label: 'Insolvency', value: '0' },
      { label: 'Civil/NI', value: '0/0' },
      { label: 'Severity', value: 'MEDIUM', tone: 'amber' },
      { label: 'Diversion', value: '44.8%' },
    ],
  },
]

/** The About block is redaction-heavy by design — it is pure entity detail. */
export const ABOUT_BULLETS: number[][] = [
  [14, 22, 18],
  [20, 16, 24],
  [12, 19],
  [17, 21, 11],
]

export const INSIGHTS: CreditInsight[] = [
  {
    index: 1,
    title: 'Revenue Contraction with Thin Margins Under Pressure',
    category: 'Profitability & Growth Quality',
    impact: 'high',
    body:
      'Revenue declined 4.5% to INR 7.4 Cr in the latest period, signaling a loss of business volume in a competitive market. EBITDA margin stands at just 6.1%, and net profit margin is a razor-thin 2.4% — meaning the company retains only INR 2.40 for every INR 100 of sales. With a service-oriented model and limited fixed-cost leverage, the business has little room to absorb further revenue drops or cost inflation without slipping into losses. The financial health score of 3.51 (Healthy) is currently supported by low debt, but profitability is fragile.',
    metrics:
      'Revenue: INR 7.4 Cr (-4.5%) | EBITDA margin: 6.1% | Net profit margin: 2.4% | Interest coverage: 2.8x',
    industryContext:
      'Peers in this segment typically operate on 5-8% EBITDA margins due to intense competition and commoditized services. The entity is at the lower end, with limited pricing power.',
    creditImplication:
      'Thin margins leave little buffer for operational shocks or client losses. A further 5-10% revenue decline could erode profitability entirely, weakening debt servicing capacity despite the current 2.8x interest coverage.',
    recommendation:
      'Assess client concentration risk and contract renewal pipeline. Prioritize high-margin service lines and explore cost optimization across core operations. Avoid incremental debt until revenue stabilizes.',
  },
  {
    index: 2,
    title: 'Efficient Asset Utilization Driving Returns Despite Revenue Decline',
    category: 'Operational Efficiency',
    impact: 'positive',
    body:
      'The company generates INR 1.89 in revenue for every INR 1 invested in total assets (asset turnover: 1.89x), and an impressive INR 10.00 in sales per INR 1 of fixed assets. This reflects a capital-light, asset-efficient model typical of operators who rely on third-party capacity rather than owning heavy equipment. Return on equity (ROE) stands at 10.8%, meaning owners earn INR 10.80 annually for every INR 100 of capital invested. The cash conversion cycle is strong at 11.89x per year, indicating money cycles through operations roughly every 31 days (365 ÷ 11.89). Despite the revenue contraction, the business is extracting solid returns from its asset base.',
    metrics:
      'Asset turnover: 1.89x | Fixed asset turnover: 10.00x | ROE: 10.8% | Cash cycle: 11.89x/year (≈31 days) | Cash flow efficiency: 70/100',
    industryContext:
      'Asset-light models in this segment typically achieve asset turnover of 1.5-2.5x. The entity is within this range, demonstrating efficient use of its INR 3.9 Cr asset base.',
    creditImplication:
      'High asset turnover and fast cash cycling reduce the need for heavy working capital financing and lower the risk of capital being locked in unproductive assets. The company can scale operations without proportional increases in fixed asset investment, which is favorable for lenders.',
    recommendation:
      'Leverage the asset-light model to pursue higher-margin contracts without significant capex. Focus on improving the cash flow efficiency score from 70/100 by tightening receivables collection and negotiating better payment terms with clients.',
  },
  {
    index: 3,
    title: 'Moderate Leverage with Comfortable Debt Servicing, But Trends Deteriorating',
    category: 'Debt & Solvency',
    impact: 'medium',
    body:
      'The company has borrowed INR 0.81 for every INR 1 of its own capital (debt-to-equity: 0.81x), which is a moderate and manageable level. Total borrowings stand at approximately INR 1.38 Cr against a net worth of INR 1.7 Cr. Operating profit covers interest payments 2.8 times, and cash flow covers total loan repayments 1.5 times — both ratios indicate adequate debt servicing capacity today. However, the trend analysis flags a critical concern: ability to pay bills is deteriorating and operational efficiency is declining. This suggests that while the company is currently solvent, its margin for error is shrinking.',
    metrics:
      'Debt-to-equity: 0.81x | Interest coverage: 2.8x | Debt service coverage: 1.5x | Usable net worth: INR 1.7 Cr',
    industryContext:
      'Comparable operators typically maintain debt-to-equity ratios of 0.5-1.0x. The entity is within this range, but the deteriorating trends are atypical for a company with 14 years of operating history.',
    creditImplication:
      'Current debt levels are sustainable, but deteriorating liquidity and operational efficiency trends increase the risk of future payment stress. If revenue continues to decline or margins compress further, the 2.8x interest coverage could fall below the 2.0x safety threshold, raising default risk.',
    recommendation:
      'Avoid incremental debt until revenue stabilizes and operational efficiency improves. Focus on deleveraging by retaining earnings and improving cash generation. Lenders should cap exposure at the recommended limit and require quarterly financial updates to monitor trend reversal.',
  },
]

export const TOTAL_INSIGHTS = 5

export const COMFORTS = [
  'Business vintage of 14+ years — the company has operated through multiple demand cycles and economic conditions, demonstrating staying power in a competitive industry.',
  'Overall financial health score of 3.51 classified as "Healthy" — the composite assessment of cash position, debt levels, profitability, and sales indicates the company is financially stable.',
  'Return on equity at 10.8% — the company generates INR 10.8 of profit for every INR 100 of owner’s capital, a reasonable return that exceeds typical cost of equity.',
  'Current ratio at 1.45 — the company has INR 1.45 in short-term assets for every INR 1 of short-term liabilities, indicating adequate liquidity to meet near-term obligations.',
  'Debt-to-equity at 0.81x — the company has borrowed INR 0.81 for every INR 1 of its own capital, a moderate and manageable borrowing level.',
  'Interest coverage at 2.8 times — operating profit is sufficient to cover interest payments nearly 3 times over, providing a reasonable cushion for debt servicing.',
]

export const DISCOMFORTS = [
  'Revenue declined by 4.5% to INR 7.4 Cr in the latest period — the company is experiencing negative top-line growth, which raises concerns about market position or competitive pressures.',
  'EBITDA margin at only 6.1% — the company retains just INR 6.1 as operating profit for every INR 100 of sales, which is thin and leaves limited room for operational setbacks.',
  'Net profit margin at 2.4% — for every INR 100 of sales, only INR 2.4 flows to the bottom line, indicating tight profitability and vulnerability to cost increases.',
  'Quick ratio at 0.69x — excluding inventory, the company has only INR 0.69 in liquid assets for every INR 1 of short-term liabilities, indicating potential pressure on immediate cash obligations.',
  'Ability to pay bills is deteriorating (per trend analysis) — the company’s liquidity position is worsening over time, which could lead to payment stress.',
  'Operational efficiency is deteriorating (per trend analysis) — the company’s asset utilization and operational metrics are declining, suggesting weakening business fundamentals despite the improving financial health score.',
]

export const GST_FILINGS = [
  {
    returnType: 'GSTR3B',
    period: '20 Aug, 2026 (Jul 2026)',
    aging: ['8', '2', '2', '0', '0'],
  },
  {
    returnType: 'GSTR1',
    period: '11 Aug, 2026 (Jul 2026)',
    aging: ['5', '7', '0', '0', '0'],
  },
]

export const GST_AGING_HEADERS = [
  'By Due Date',
  '1-5 DPD',
  '6-15 DPD',
  '16-30 DPD',
  '30+ DPD',
]

export const GST_TOTALS = ['13', '9', '2', '0', '0']

export const PF_PAYMENTS = [
  { month: 'May, 2026', employees: '60', amount: '0.02', due: '15 Jun, 2026', status: 'Paid on Time' },
  { month: 'Apr, 2026', employees: '59', amount: '0.02', due: '15 May, 2026', status: 'Paid on Time' },
  { month: 'Mar, 2026', employees: '58', amount: '0.02', due: '15 Apr, 2026', status: 'Paid on Time' },
  { month: 'Feb, 2025', employees: '172', amount: '0.06', due: '15 Mar, 2025', status: '311 Days delay' },
  { month: 'Jan, 2025', employees: '163', amount: '0.06', due: '15 Feb, 2025', status: '339 Days delay' },
  { month: 'Dec, 2025', employees: '58', amount: '0.02', due: '15 Jan, 2026', status: 'Paid on Time' },
]

export const FINANCIAL_YEARS = ['FY2022', 'FY2023', 'FY2024', 'FY2025']

export const FINANCIAL_ROWS: FinancialRow[] = [
  { metric: 'Operating Income', unit: '₹ Cr', values: ['5.89', '5.67', '7.72', '7.37'] },
  { metric: 'EBITDA', unit: '₹ Cr', values: ['0.43', '0.36', '0.41', '0.45'] },
  { metric: 'EBITDA Margin', unit: '%', values: ['7.30%', '6.30%', '5.30%', '6.10%'] },
  { metric: 'PAT', unit: '₹ Cr', values: ['0.24', '0.22', '0.27', '0.18'] },
  { metric: 'PAT Margin', unit: '%', values: ['4.10%', '3.80%', '3.50%', '2.50%'] },
  { metric: 'Net Worth', unit: '₹ Cr', values: ['1.02', '1.23', '1.50', '1.66'] },
  { metric: 'D/E Ratio', unit: 'x', values: ['1.17x', '0.78x', '0.43x', '0.81x'] },
  { metric: 'TOL/ATNW', unit: 'x', values: ['2.08x', '1.54x', '1.11x', '1.34x'] },
  { metric: 'ICR', unit: 'x', values: ['4.78x', '4.50x', '8.20x', '2.81x'] },
  { metric: 'Total Borrowing', unit: '₹ Cr', values: ['1.19', '0.96', '0.65', '1.35'] },
]

export const WORKING_CAPITAL_ROWS: FinancialRow[] = [
  { metric: 'Debtor Days', unit: 'Days', values: ['38.00', '45.00', '32.00', '42.00'] },
  { metric: 'Creditor Days', unit: 'Days', values: ['29.00', '42.00', '36.00', '32.00'] },
  { metric: 'Net WC Cycle', unit: 'Days', values: ['9.00', '2.00', '-4.00', '10.00'] },
]

/** The margin annotations that turn the replica into a walkthrough. */
export const REPORT_SECTIONS: ReportSectionNote[] = [
  {
    id: 'verdict',
    step: '01',
    title: 'The verdict, first',
    shows: 'Risk band, a 0-100 score and a recommended exposure limit, in the masthead of page one.',
    tells: 'The answer to "how much credit, and should I?". Everything below it is the working.',
  },
  {
    id: 'identity',
    step: '02',
    title: 'Who you are dealing with',
    shows: 'Name, constitution, vintage, and four fact cards — Identity, Operations, Compliance, Legal Risk.',
    tells: 'Four authorities side by side, so a clean identity cannot hide a compliance flag.',
  },
  {
    id: 'insights',
    step: '03',
    title: 'AI-powered credit insights',
    shows: 'Ranked findings, each tagged by theme and impact, then split into metrics, peer context, credit implication and a recommendation.',
    tells: 'A number alone is not a finding. "EBITDA margin 6.1%" only bites next to "peers run 5-8%".',
  },
  {
    id: 'comforts',
    step: '04',
    title: 'Comforts and discomforts',
    shows: 'What supports the credit case and what undermines it, in two columns of plain English.',
    tells: 'Equal weight to both. A report that shows only one side is selling you a conclusion.',
  },
  {
    id: 'compliance',
    step: '05',
    title: 'Filing and payment behaviour',
    shows: 'GST return aging by days-past-due, and month-by-month provident fund payment timeliness.',
    tells: 'Accounts are annual and can be dressed. Statutory payments are monthly and cannot.',
  },
  {
    id: 'financials',
    step: '06',
    title: 'Four years of financials',
    shows: 'Operating income through to working capital cycle, across four years in one comparable grid.',
    tells: 'One year is a snapshot, four is a direction. Read across the rows, not down the columns.',
  },
]
