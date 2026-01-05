'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQItem } from '@/types'
import { cn } from '@/lib/utils'

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-12 md:space-y-16">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="border border-neutral-200 rounded-lg overflow-hidden"
          initial={false}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-16 md:p-24 text-left hover:bg-neutral-50 transition-colors"
          >
            <span className="flex items-center gap-8 md:gap-12 text-sm sm:text-base font-medium text-neutral-900">
              <span className="text-neutral-400">{index + 1}.</span>
              {item.question}
            </span>
            <motion.svg
              className="w-16 h-16 md:w-20 md:h-20 text-neutral-600 flex-shrink-0 ml-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-16 pb-16 md:px-24 md:pb-24 pt-4">
                  <p className="text-xs sm:text-sm text-neutral-600 pl-24 md:pl-32 whitespace-pre-line">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
