'use client'

import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/919686866005"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-24 z-50 p-[2px] border border-green-300 rounded-xl shadow-lg hover:shadow-xl flex items-center gap-12 bg-white px-6 py-8 cursor-pointer"
      aria-label="Speak with Risk Expert on WhatsApp"
    >
        <div className="w-40 h-40 bg-[#25D366] flex items-center justify-center rounded">
          <WhatsAppIcon className="w-24 h-24 text-white" />
        </div>
        <span className="font-semibold text-sm text-neutral-800 text-center leading-tight">
          Speak with Risk Expert
        </span>
    </a>
  )
}
