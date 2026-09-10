export interface BlogFrontmatter {
  title: string
  /**
   * Optional shorter <title> for search results. `title` is the on-page H1 and
   * can run long; Google truncates around 60 characters including the
   * "| CredMatrix" suffix, so a post with a descriptive headline should set a
   * tighter, keyword-first variant here.
   */
  seoTitle?: string
  /**
   * Meta description. Keep at or under ~160 characters — past that Google
   * truncates it. For the longer standfirst shown under the H1, use `excerpt`.
   */
  description: string
  /** Standfirst rendered under the H1 and on cards. Falls back to description. */
  excerpt?: string
  date: string
  /** ISO date of the last substantive edit; drives dateModified. */
  updated?: string
  author: string
  authorAvatar?: string
  category: string
  tags?: string[]
  cover?: string
  ogImage?: string
  featured?: boolean
  draft?: boolean
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string
  readingTime: string
}

export interface BlogPost extends BlogPostMeta {
  html: string
}
