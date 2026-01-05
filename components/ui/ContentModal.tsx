'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  contentUrl: string
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')

  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className="text-sm text-neutral-600 space-y-8">
      {lines.map((line, index) => {
        if (line.startsWith('# ')) {
          return null // Skip main title, we show it separately
        } else if (line.startsWith('## ')) {
          return (
            <h4 key={index} className="font-semibold text-secondary text-base mt-16 mb-8">
              {line.replace('## ', '')}
            </h4>
          )
        } else if (line.startsWith('### ')) {
          return (
            <h5 key={index} className="font-medium text-secondary mt-12 mb-4">
              {line.replace('### ', '')}
            </h5>
          )
        } else if (line.startsWith('- ')) {
          return (
            <p key={index} className="pl-16 relative before:content-['•'] before:absolute before:left-4">
              {parseInlineFormatting(line.replace('- ', ''))}
            </p>
          )
        } else if (line.trim()) {
          return <p key={index}>{parseInlineFormatting(line)}</p>
        }
        return null
      })}
    </div>
  )
}

export default function ContentModal({ isOpen, onClose, title, contentUrl }: ContentModalProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (isOpen && !content) {
      fetch(contentUrl)
        .then(res => res.text())
        .then(setContent)
    }
  }, [isOpen, content, contentUrl])

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
      <div className="bg-white rounded-xl max-w-2xl w-full relative max-h-[90vh] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white rounded-t-xl border-b border-neutral-200 px-16 md:px-32 py-16 md:py-20 flex items-center justify-between z-10">
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-16 md:px-32 py-16 md:py-24">
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  )
}
