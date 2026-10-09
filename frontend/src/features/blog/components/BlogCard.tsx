import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { routes } from '@/lib/routes';
import { formatDate } from '@/lib/utils/format';
import type { BlogSummary } from '../types';

interface BlogCardProps {
  post: BlogSummary;
  headingLevel?: 'h2' | 'h3';
}

export function BlogCard({ post, headingLevel: Heading = 'h3' }: BlogCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-700">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ul className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <li key={tag}>
              <Badge variant="brand">{tag}</Badge>
            </li>
          ))}
        </ul>
        <Heading className="mt-3 text-lg font-semibold leading-snug text-ink-950">
          <Link href={routes.post(post.slug)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm text-stone-600">{post.excerpt}</p>
        <p className="mt-auto pt-4 text-xs text-stone-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
