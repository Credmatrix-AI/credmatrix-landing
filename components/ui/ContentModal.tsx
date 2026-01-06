'use client'

import { useEffect, useState } from 'react'
import Modal from './Modal'

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="2xl" scrollable>
      <MarkdownContent content={content} />
    </Modal>
  )
}
