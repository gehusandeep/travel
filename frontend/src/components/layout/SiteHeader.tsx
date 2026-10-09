import { Search } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { buildDestinationMenu } from '@/features/categories/utils';
import type { CategoryTreeNode } from '@/features/categories/types';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';
import { WishlistLink } from '@/features/wishlist/components/WishlistLink';
import { routes } from '@/lib/routes';
import { AnnouncementBar } from './AnnouncementBar';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { TopBar } from './TopBar';

export function SiteHeader({ categories }: { categories: CategoryTreeNode[] }) {
  const destinations = buildDestinationMenu(categories);

  return (
    <>
      <AnnouncementBar />
      <TopBar />
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />
          <DesktopNav destinations={destinations} />
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={routes.search}
              aria-label="Search packages"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition-colors hover:bg-stone-100"
            >
              <Search aria-hidden="true" className="h-5 w-5" />
            </Link>
            <WishlistLink />
            <EnquiryButton size="sm" className="hidden sm:inline-flex">
              Plan My Yatra
            </EnquiryButton>
            <MobileNav destinations={destinations} />
          </div>
        </Container>
      </header>
    </>
  );
}
