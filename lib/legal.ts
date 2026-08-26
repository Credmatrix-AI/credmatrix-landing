import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Legal copy lives as markdown in content/legal so the text stays easy to edit
 * without touching JSX. It is read at build time — both legal routes are fully
 * static — so nothing hits the filesystem at request time.
 */

export type LegalSlug = 'terms-of-services' | 'privacy-policy'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'legal')

export interface LegalDocument {
  /** The `# ` heading from the markdown. */
  title: string
  /** Everything after the title. */
  body: string
}

export async function getLegalDocument(slug: LegalSlug): Promise<LegalDocument> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.md`), 'utf8')
  const lines = raw.split('\n')

  const titleIndex = lines.findIndex((line) => line.startsWith('# '))
  const title = titleIndex >= 0 ? lines[titleIndex].replace('# ', '').trim() : ''
  const body = titleIndex >= 0 ? lines.slice(titleIndex + 1).join('\n') : raw

  return { title, body }
}
