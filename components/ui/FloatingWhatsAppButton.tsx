'use client'

import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/919686866005"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24  right-24 z-50 flex  items-center gap-12 bg-white px-20 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100"
      aria-label="Speak with Risk Expert on WhatsApp"
    >
      <div className="w-48 h-48 bg-[#25D366] rounded-full flex items-center justify-center">
        <WhatsAppIcon className="w-28 h-28 text-white" />
      </div>
      <span className="font-semibold text-sm text-neutral-800 text-center leading-tight">
        Speak with Risk Expert
      </span>
    </a>
  )
}
