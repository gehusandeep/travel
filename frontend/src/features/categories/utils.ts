import { fallbackDestinationGroups, type NavGroup } from '@/config/navigation';
import { routes } from '@/lib/routes';
import type { CategoryOption, CategoryTreeNode } from './types';

export interface FlatCategory extends CategoryTreeNode {
  depth: number;
}

export function flattenCategoryTree(nodes: readonly CategoryTreeNode[], depth = 0): FlatCategory[] {
  return nodes.flatMap((node) => [{ ...node, depth }, ...flattenCategoryTree(node.children, depth + 1)]);
}

export function toCategoryOptions(tree: readonly CategoryTreeNode[]): CategoryOption[] {
  return flattenCategoryTree(tree).map(({ slug, name, depth }) => ({ slug, name, depth }));
}

/** Navigation groups for the mega menu and footer, with a static fallback. */
export function buildDestinationMenu(tree: readonly CategoryTreeNode[]): NavGroup[] {
  if (tree.length === 0) return fallbackDestinationGroups;

  return tree.map((node) => ({
    label: node.name,
    href: routes.category(node.path),
    description: node.shortDescription,
    children: node.children.map((child) => ({ label: child.name, href: routes.category(child.path) })),
  }));
}
