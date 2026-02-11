'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, X, FileText } from 'lucide-react'
import Container from './Container'
import Button from '@/components/ui/Button'
import { NAV_LINKS } from '@/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between h-48 md:h-64">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/credmatrix-logo.svg"
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
          <div className="flex items-center gap-12 md:gap-16">
            <Link href="/generate-report" className="hidden lg:block">
              <div
                className="group inline-flex items-center gap-8 bg-gradient-to-r from-primary to-primary-dark text-white px-24 py-12 rounded-full font-medium text-sm transition-all duration-200 animate-glow"
              >
                <FileText className="w-16 h-16" />
                <span>Generate Report</span>
                <Image src="/icons/free.svg" alt="Free" width={42} height={21} className="h-[18px] w-auto ml-4" />
              </div>
            </Link>
            <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer" className="hidden lg:block">
              <div className="inline-flex items-center gap-8 border-2 border-primary text-primary px-24 py-12 rounded-full font-medium text-sm transition-all duration-200 hover:bg-primary hover:text-white">
                <LogIn className="w-16 h-16" />
                <span>Login</span>
              </div>
            </a>

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
              <div className="flex flex-col gap-12 pt-12 border-t border-neutral-200">
                <Link href="/generate-report" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <div className="relative">
                    <div
                      className="absolute -inset-[2px] rounded-full animate-border-spin opacity-75"
                      style={{
                        background: 'linear-gradient(90deg, #2563eb, #ec4899, #8b5cf6, #2563eb)',
                        backgroundSize: '300% 100%',
                      }}
                    />
                    <div className="relative flex items-center justify-center gap-8 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-12 rounded-full font-medium text-sm">
                      <FileText className="w-16 h-16" />
                      <span>Generate Report</span>
                      <Image src="/icons/free.svg" alt="Free" width={42} height={21} className="h-[18px] w-auto" />
                    </div>
                  </div>
                </Link>
                <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer" className="w-full">
                  <div className="flex items-center justify-center gap-8 w-full border-2 border-primary text-primary py-12 rounded-full font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200">
                    <LogIn className="w-16 h-16" />
                    <span>Login</span>
                  </div>
                </a>
              </div>
            </div>
          </nav>
        )}
      </Container>
    </header>
  )
}
