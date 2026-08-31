export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  author: string
  authorAvatar?: string
  category: string
  tags?: string[]
  cover?: string
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
