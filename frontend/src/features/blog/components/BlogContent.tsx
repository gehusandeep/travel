import { Info, Sparkles, TriangleAlert, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ContentBlock } from '../types';

type CalloutTone = Extract<ContentBlock, { type: 'callout' }>['tone'];

const calloutStyles: Record<CalloutTone, { container: string; icon: string; Icon: LucideIcon }> = {
  info: { container: 'border-ink-200 bg-ink-50', icon: 'text-ink-700', Icon: Info },
  tip: { container: 'border-emerald-200 bg-emerald-50', icon: 'text-emerald-700', Icon: Sparkles },
  warning: { container: 'border-amber-200 bg-amber-50', icon: 'text-amber-700', Icon: TriangleAlert },
};

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return block.level === 2 ? (
        <h2 key={block.id} id={block.id} className="scroll-mt-28 pt-4 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
          {block.text}
        </h2>
      ) : (
        <h3 key={block.id} id={block.id} className="scroll-mt-28 text-xl font-semibold text-ink-950">
          {block.text}
        </h3>
      );
    case 'paragraph':
      return <p key={index}>{block.text}</p>;
    case 'list': {
      const List = block.style === 'number' ? 'ol' : 'ul';
      return (
        <List
          key={index}
          className={cn('space-y-2 pl-6 marker:text-brand-700', block.style === 'number' ? 'list-decimal' : 'list-disc')}
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    case 'quote':
      return (
        <figure key={index} className="border-l-4 border-gold-400 pl-5">
          <blockquote className="italic text-ink-900">{block.text}</blockquote>
          {block.cite ? <figcaption className="mt-2 text-sm text-stone-500">{block.cite}</figcaption> : null}
        </figure>
      );
    case 'callout': {
      const style = calloutStyles[block.tone];
      return (
        <aside key={index} className={cn('flex gap-3 rounded-2xl border p-5 text-base', style.container)}>
          <style.Icon aria-hidden="true" className={cn('mt-1 h-5 w-5 shrink-0', style.icon)} />
          <div>
            {block.title ? <p className="font-semibold text-ink-950">{block.title}</p> : null}
            <p className={cn('text-stone-700', block.title && 'mt-1')}>{block.text}</p>
          </div>
        </aside>
      );
    }
  }
}

/** Renders structured article blocks as semantic HTML. No raw HTML is injected. */
export function BlogContent({ blocks }: { blocks: readonly ContentBlock[] }) {
  return (
    <div className="space-y-6 text-base leading-relaxed text-stone-700 sm:text-lg">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
