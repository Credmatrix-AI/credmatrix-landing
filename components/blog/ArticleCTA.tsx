import { LogIn } from 'lucide-react'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

/**
 * End-of-article conversion block.
 *
 * A reader who has just finished a piece on counterparty risk is at peak
 * intent; without this the page's only next step is "read another article".
 * Placed before the author bio and related posts so it sits at the natural
 * end of the argument rather than after the page has already wound down.
 */
export default function ArticleCTA() {
  return (
    <aside className="mt-64 rounded-xl bg-secondary p-24 text-white md:p-32">
      <h2 className="font-heading text-xl tracking-tight md:text-2xl">
        Assess a counterparty in under two minutes
      </h2>
      <p className="mt-12 text-sm leading-relaxed text-neutral-300 md:text-base">
        CredMatrix pulls from authorised public sources and scores every entity against 125+
        risk parameters — fully automated, with no manual review and no waiting.
      </p>
      <div className="mt-24 flex flex-col gap-12 sm:flex-row">
        <a href="https://app.credmatrix.ai/" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="md" className="w-full justify-center sm:w-auto">
            <LogIn className="mr-8 h-16 w-16" />
            Try the platform
          </Button>
        </a>
        <a href="https://wa.me/919686866005" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-center border-white text-white hover:bg-white hover:text-secondary sm:w-auto"
          >
            <WhatsAppIcon className="mr-8 h-16 w-16" />
            Speak with a risk expert
          </Button>
        </a>
      </div>
    </aside>
  )
}
