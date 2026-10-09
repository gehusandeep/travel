import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/ui/Container';
import { WishlistView } from '@/features/wishlist/components/WishlistView';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Your Wishlist',
  description: 'Packages you have saved on this device.',
  path: routes.wishlist,
  noIndex: true,
});

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        title="Your wishlist"
        description="Saved on this device. Compare your shortlisted yatras and send us one enquiry for all of them."
        breadcrumbs={[
          { name: 'Home', path: routes.home },
          { name: 'Wishlist', path: routes.wishlist },
        ]}
      />
      <Container className="py-12 sm:py-16">
        <WishlistView />
      </Container>
    </>
  );
}
