'use client'

import { useEffect, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | '2xl'
  scrollable?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  '2xl': 'max-w-2xl',
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
  scrollable = false
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-12 md:p-16">
      <div className={cn(
        'bg-white rounded-xl w-full relative',
        maxWidthClasses[maxWidth],
        scrollable && 'max-h-[90vh] flex flex-col'
      )}>
        <div className={cn(
          'px-16 md:px-32 py-16 md:py-20 flex items-center justify-between border-b border-neutral-200',
          scrollable && 'sticky top-0 bg-white rounded-t-xl z-10'
        )}>
          <h3 className="text-xl md:text-2xl font-semibold text-secondary">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="w-20 h-20 md:w-24 md:h-24" />
          </button>
        </div>
        <div className={cn(
          'px-16 md:px-32 py-16 md:py-24',
          scrollable && 'overflow-y-auto flex-1'
        )}>
          {children}
        </div>
      </div>
    </div>
  )
}
