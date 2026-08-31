'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, X } from 'lucide-react'
import Container from './Container'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import AttributedLink from '@/components/shared/AttributedLink'
import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, getAttributionParams } from '@/lib/utm'
import { NAV_LINKS } from '@/constants'
import { cn } from '@/lib/utils'

const WHATSAPP_NUMBER = '919686866005'
const WHATSAPP_MESSAGE = 'Hi CredMatrix, I would like to speak with a risk expert.'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState(`https://wa.me/${WHATSAPP_NUMBER}`)

  useEffect(() => {
    setWhatsappUrl(buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE))
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between h-48 md:h-64">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/credmatrix-logo.svg"
              alt="CredMatrix"
              width={150}
              height={40}
              className="h-32 md:h-40 w-auto bg-white"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-32">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-neutral-600 hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-8 md:gap-16">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', getAttributionParams())}
            >
              <Button variant="outline" size="sm" className="hidden lg:inline-flex whitespace-nowrap">
                <WhatsAppIcon className="w-16 h-16 mr-8" />
                Speak with Risk Expert
              </Button>
            </a>
            <AttributedLink
              href="https://app.credmatrix.ai/"
              event="login_click"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm" className="hidden lg:inline-flex whitespace-nowrap">
                <LogIn className="w-16 h-16 mr-8" />
                Login
              </Button>
            </AttributedLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-8 -mr-8 text-neutral-600 hover:text-primary transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-24 h-24" />
              ) : (
                <Menu className="w-24 h-24" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-16 border-t border-neutral-200">
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-8 py-12 text-base font-medium transition-colors rounded-lg',
                    pathname === link.href
                      ? 'text-primary bg-primary/5'
                      : 'text-neutral-600 hover:text-primary hover:bg-neutral-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-8 pt-8 border-t border-neutral-200">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => track('whatsapp_click', getAttributionParams())}
                >
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    <WhatsAppIcon className="w-16 h-16 mr-8" />
                    Speak with Risk Expert
                  </Button>
                </a>
                <AttributedLink
                  href="https://app.credmatrix.ai/"
                  event="login_click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    <LogIn className="w-16 h-16 mr-8" />
                    Login
                  </Button>
                </AttributedLink>
              </div>
            </div>
          </nav>
        )}
      </Container>
    </header>
  )
}
