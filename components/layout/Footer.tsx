'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, ArrowRight, IndianRupee } from 'lucide-react'
import Container from './Container'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ContentModal from '@/components/ui/ContentModal'
import { FOOTER_LINKS } from '@/constants'

export default function Footer() {
  const [showModal, setShowModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  return (
    <>
      <footer className="bg-secondary text-white py-32 md:py-48">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 md:gap-48">
            {/* Logo and Description */}
            <div>
              <Link href="/" className="inline-block mb-16 md:mb-24">
                <Image
                  src="/credmatrix-logo.svg"
                  alt="CredMatrix"
                  width={150}
                  height={40}
                  className="h-32 md:h-40 w-auto bg-white rounded-lg p-4"
                />
              </Link>
              <div className="space-y-8 md:space-y-12">
                <div className="flex items-center gap-8 text-xs sm:text-sm">
                  <Mail className="w-12 h-12 md:w-16 md:h-16" />
                  <span>contact@credmatrix.ai</span>
                </div>
                <div className="flex items-center gap-8 text-xs sm:text-sm">
                  <Phone className="w-12 h-12 md:w-16 md:h-16" />
                  <span>+91-9686866005</span>
                </div>
              </div>
              {/* Social Links */}
              <div className="flex gap-12 md:gap-16 mt-16 md:mt-24">
                <a href="#" className="hover:text-primary transition-colors">
                  <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-16 md:mb-24">Quick Links</h3>
              <ul className="space-y-8 md:space-y-12">
                {FOOTER_LINKS.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary-light rounded-xl p-16 md:p-24">
              <h3 className="text-base md:text-lg font-semibold mb-12 md:mb-16">Have Questions?</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mb-16 md:mb-24">
                Got any questions about the product or scaling on our platform?
                We&apos;re here to help. Chat to our team today.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
                <Link href="/pricing" className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full whitespace-nowrap border-white text-white hover:bg-white hover:text-secondary"
                  >
                    <IndianRupee className="w-12 h-12 md:w-16 md:h-16 mr-4" />
                    View Pricing
                  </Button>
                </Link>
                <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full whitespace-nowrap"
                  >
                    Get Started
                    <ArrowRight className="w-12 h-12 md:w-16 md:h-16 ml-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-32 md:mt-48 pt-16 md:pt-24 border-t border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-12 text-xs sm:text-sm text-gray-300">
            <p>&copy; 2026 CredMatrix. All rights reserved.</p>
            <div className="flex items-center gap-16">
              <button
                onClick={() => setShowTermsModal(true)}
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </Container>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-12 md:p-16">
          <div className="bg-white rounded-xl p-16 md:p-32 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-12 right-12 md:top-16 md:right-16 text-neutral-400 hover:text-neutral-600"
            >
              <svg className="w-20 h-20 md:w-24 md:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-16 md:mb-24">
              Get Started Today
            </h3>
            <form className="space-y-12 md:space-y-16">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="your@email.com" />
              <Input label="Company" placeholder="Your company" />
              <Button variant="primary" size="sm" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      <ContentModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Services"
        contentUrl="/content/terms-of-services.md"
      />

      {/* Privacy Policy Modal */}
      <ContentModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
        contentUrl="/content/privacy-policy.md"
      />
    </>
  )
}
