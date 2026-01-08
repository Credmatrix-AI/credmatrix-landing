import { NavLink, PricingTier, FAQItem, StatItem, ProductSection } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/pricing#faq' },
]

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/pricing#faq' },
  ],
}

export const HOME_STATS: StatItem[] = [
  { value: '10,000+', label: 'Companies Analysed' },
  { value: '₹ 600 Cr. +', label: 'Limit Recommended' },
  { value: '125+', label: 'Risk Parameters' },
]

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Single',
    price: '₹749',
    description: 'Perfect for small tasks and one-time credit checks',
    features: [
      'Self Search',
      'Early Warning System (Limited)',
    ],
    variant: 'grey',
    ctaText: 'Buy Now',
    icon: 'user',
  },
  {
    name: 'Bulk',
    price: '₹7,490',
    description: 'Ideal for teams needing regular credit assessments',
    features: [
      'Self Search',
      'Web Search',
      'Early Warning System (Limited)',
    ],
    highlighted: true,
    variant: 'blue',
    ctaText: 'Buy Now',
    icon: 'users',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-featured solution for large organizations',
    features: [
      'Self Search',
      'Web Search',
      'Early Warning System',
      'Monthly update of all data points',
      'Risk Expert Consultancy',
    ],
    variant: 'pink',
    ctaText: 'Contact Us',
    icon: 'building',
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Which countries are covered for counterparty assessment?',
    answer: 'Currently, the CredMatrix platform offers assessment solutions for counterparties registered in India. We are actively working to expand our coverage to additional geographies in the near future.',
  },
  {
    question: 'Which types of entities/business constitutions can be assessed?',
    answer: 'The CredMatrix Platform provides comprehensive automated assessments for:\n- Private Limited Companies\n- Public Limited Companies\n- Limited Liability Partnerships (LLPs)\nFor other entity types such as Proprietorships and Partnership firms, users can manually input the counterparty\'s financial information using our predefined template, after which the assessment will be completed on the platform.',
  },
  {
    question: 'Do users need to provide any information or documents for counterparty assessment?',
    answer: 'For Private Limited, Public Limited, and LLP entities, the platform automatically retrieves necessary information from authorized public sources, minimizing manual input requirements.',
  },
  {
    question: 'Can customized solutions be provided?',
    answer: 'Email our Risk Experts at: contact@credmatrix.ai\nSchedule a consultation by clicking [this link]\n\nOur CredMatrix team will work with you to develop a solution that meets your unique requirements.',
  },
  {
    question: 'What are the sources of information used for assessment?',
    answer: 'All information used for assessments and displayed on the portal is sourced from:\n- Public domain databases\n- Authorized government portals (e.g., Ministry of Corporate Affairs (MCA), GST Portal)\n\nWe maintain strict compliance with data privacy regulations and do not access any entity\'s data through unauthorized means.',
  },
  {
    question: 'How is confidentiality maintained for user information and portfolio monitoring data?',
    answer: 'We ensure the utmost confidentiality of all information shared or uploaded by users on the portal. Our commitment to data privacy includes:\n- Robust security protocols and encryption standards\n- Strict confidentiality clauses outlined in our Terms & Conditions\n- Compliance with applicable data protection regulations\n\nYou can review our detailed confidentiality policy in our [Terms & Conditions].',
  },
  {
    question: 'Is there any manual intervention in the assessment process?',
    answer: 'No, the entire assessment process is fully automated and conducted digitally without any manual intervention by the CredMatrix team. This ensures consistency, speed, and objectivity in all assessments.',
  },
  {
    question: 'How long does an assessment take?',
    answer: 'Assessment timeframes vary based on the type of analysis:\n- Credit Assessment: Completed in up to 2 minutes\n- Deep Web Research: Takes up to 15 minutes\n\nOur platform is designed to deliver accurate, comprehensive results quickly, allowing you to make informed decisions without unnecessary delays.',
  },
  {
    question: 'What is the accuracy of the data and the assessment results on the portal?',
    answer: 'Data Accuracy:\nOur data is sourced from authoritative government portals (such as MCA and GST Portal) or directly provided by users, ensuring there is no compromise in data quality and reliability.\n\nAssessment Accuracy:\nOur scoring models and assessment methodologies have been developed and rigorously tested by seasoned risk professionals with decades of combined experience across:\n- Banks and Financial Institutions\n- Non-Banking Financial Companies (NBFCs)\n- Startups and Fintech Companies\n- Corporate Enterprises\n\nThese models have been validated across numerous entities spanning different industries and business categories, ensuring robust, reliable, and industry-tested assessment results you can trust.',
  },
  {
    question: 'What is the pricing structure?',
    answer: 'For detailed information about our pricing plans and packages, please visit our Pricing Page.\n\nOur transparent pricing structure is designed to accommodate businesses of all sizes, from startups to enterprises. If you have specific requirements or need a custom quote, feel free to reach out to our team.',
  },
  {
    question: 'How can I get support if I need help?',
    answer: 'Our dedicated support team is here to assist you. For any questions, technical support, or assistance:\n\nContact us by clicking here or email us directly at contact@credmatrix.ai\n\nWe strive to respond to all inquiries promptly and provide the support you need to maximize your experience with CredMatrix.',
  },
]

export const PRODUCT_SECTIONS: ProductSection[] = [
  {
    id: 'risk-assessment',
    title: 'Risk Analyzer',
    description: 'Evaluate credit worthiness with automated data collection, fast response and intelligence',
    features: [
      { title: 'Self Data Collection', description: 'Compile information from verified databases quickly', icon: 'database' },
      { title: 'Credit Intelligence', description: 'AI driven insights on credit', icon: 'brain' },
      { title: 'Speed', description: 'Get report within seconds', icon: 'zap' },
      { title: 'Cost', description: 'Affordable pricing structure', icon: 'wallet' },
    ],
    image: '/product-showcase/risk-assessment.png',
  },
  {
    id: 'cred-grawler',
    title: 'Cred Crawler',
    description: 'Deep web scan for better credit decisioning for both SME and Corporates',
    features: [
      { title: 'Deep Web Scan', description: 'Comprehensive data scan', icon: 'scan-search' },
      { title: 'Speed', description: 'Ultra fast processing', icon: 'zap' },
      { title: 'Toxicity Flags', description: 'Identify potential red flags', icon: 'alert-triangle' },
      { title: 'EWS', description: 'Early warning system to detect risk', icon: 'bell-ring' },
    ],
    image: '/product-showcase/cred-crawler.png',
  },
  {
    id: 'portfolio-monitoring',
    title: 'Portfolio Monitoring',
    description: 'Real time monitoring of your current portfolio for any flags',
    features: [
      { title: 'Analytics', description: 'Portfolio performance insights', icon: 'bar-chart-3' },
      { title: 'Instant data refresh', description: 'Continuous latest data pull for decision Making', icon: 'building' },
      { title: 'Compliance', description: 'Track regulatory compliance', icon: 'shield-check' },
      { title: 'Deep Search', description: 'Comprehensive portfolio analysis', icon: 'search' },
    ],
    image: '/product-showcase/portfolio-monitoring.png',
  },
  {
    id: 'risk-consultancy',
    title: 'Risk Consultancy',
    description: 'Setup complete credit policy frameworks in-house with ease',
    features: [
      { title: 'Policies & SOPs', description: 'Customized credit policies', icon: 'clipboard-list' },
      { title: 'Scoring Models', description: 'Build credit scoring framework', icon: 'calculator' },
      { title: 'Portfolio Review', description: 'Portfolio insights by Risk Experts', icon: 'folder-search' },
      { title: 'Industry Guidance', description: 'Sector specific expertise', icon: 'compass' },
    ],
    image: '/product-showcase/consultancy.png',
  },
]
