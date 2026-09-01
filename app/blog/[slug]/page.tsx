import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import BlogCard from '@/components/blog/BlogCard'
import AuthorByline from '@/components/blog/AuthorByline'
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  getSocialImage,
} from '@/lib/blog'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post not found' }

  const socialImage = getSocialImage(post.ogImage)

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: socialImage, width: 1200, height: 630, alt: 'CredMatrix' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [socialImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.category)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: [getSocialImage(post.ogImage)],
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'CredMatrix' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section size="sm">
        <Container>
          <article className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-8 text-sm text-neutral-500 hover:text-primary transition-colors mb-24"
            >
              <ArrowLeft className="w-16 h-16" />
              All posts
            </Link>

            <div className="flex flex-wrap items-center gap-12 mb-16">
              <span className="inline-flex items-center rounded-full bg-accent-blue px-12 py-4 text-xs font-medium text-primary-dark">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-4 text-xs text-neutral-500">
                <Clock className="w-12 h-12" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-16">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-neutral-600 mb-16">{post.description}</p>

            <AuthorByline
              author={post.author}
              date={post.date}
              avatar={post.authorAvatar}
              readingTime={post.readingTime}
              size="md"
              className="pb-24 mb-32 border-b border-neutral-200"
            />

            <div
              className="prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section size="md" background="grey">
          <Container>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-24 md:mb-32">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
