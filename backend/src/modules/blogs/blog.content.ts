import { countWords, slugify } from '@/core/utils/text';
import type { ContentBlock, RenderedBlock, TocItem } from './blog.types';

const WORDS_PER_MINUTE = 200;

function blockText(block: ContentBlock): string {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
    case 'quote':
      return block.text;
    case 'list':
      return block.items.join(' ');
    case 'callout':
      return `${block.title ?? ''} ${block.text}`;
  }
}

export function getReadingMinutes(blocks: readonly ContentBlock[]): number {
  const words = blocks.reduce((sum, block) => sum + countWords(blockText(block)), 0);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Adds unique anchor ids to headings and collects them into a table of contents. */
export function renderBlocks(blocks: readonly ContentBlock[]): { content: RenderedBlock[]; toc: TocItem[] } {
  const usedIds = new Map<string, number>();
  const toc: TocItem[] = [];

  const content = blocks.map((block): RenderedBlock => {
    if (block.type !== 'heading') return block;

    const base = slugify(block.text) || 'section';
    const occurrence = (usedIds.get(base) ?? 0) + 1;
    usedIds.set(base, occurrence);
    const id = occurrence === 1 ? base : `${base}-${occurrence}`;

    toc.push({ id, text: block.text, level: block.level });
    return { ...block, id };
  });

  return { content, toc };
}
