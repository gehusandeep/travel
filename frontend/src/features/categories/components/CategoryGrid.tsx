import { cn } from '@/lib/utils/cn';
import type { Category } from '../types';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: readonly Category[];
  className?: string;
}

export function CategoryGrid({ categories, className }: CategoryGridProps) {
  if (categories.length === 0) return null;

  return (
    <ul className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryCard category={category} />
        </li>
      ))}
    </ul>
  );
}
