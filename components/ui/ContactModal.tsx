'use client'

import { useState, FormEvent } from 'react'
import Modal from './Modal'
import Input from './Input'
import Button from './Button'
import { Loader2, CheckCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    query: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const emailjs = (await import('@emailjs/browser')).default

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          phone_number: formData.phone,
          message: formData.query,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setIsSuccess(true)
      setFormData({ name: '', phone: '', query: '' })

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2000)
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: '', phone: '', query: '' })
    setError('')
    setIsSuccess(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Contact Us">
      {isSuccess ? (
        <div className="text-center py-16">
          <CheckCircle className="w-48 h-48 text-green-500 mx-auto mb-12" />
          <p className="text-lg font-medium text-secondary">Message sent successfully!</p>
          <p className="text-sm text-neutral-500 mt-4">We&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
          <Input
            label="Name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Your phone number"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-8">
              Query
            </label>
            <textarea
              placeholder="How can we help you?"
              rows={4}
              required
              value={formData.query}
              onChange={(e) => setFormData({ ...formData, query: e.target.value })}
              className="w-full px-16 py-12 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-400 resize-none"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-16 h-16 mr-8 animate-spin" />
                Sending...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      )}
    </Modal>
  )
}
