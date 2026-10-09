import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';
import { waysToTravel, whyChooseUs } from '@/content/marketing';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { blogService } from '@/features/blog/server/blog.service';
import type { BlogSummary } from '@/features/blog/types';
import { CategoryGrid } from '@/features/categories/components/CategoryGrid';
import { categoryService } from '@/features/categories/server/category.service';
import { flattenCategoryTree } from '@/features/categories/utils';
import { ComfortTiers } from '@/features/marketing/components/ComfortTiers';
import { CtaBanner } from '@/features/marketing/components/CtaBanner';
import { FeatureGridSection } from '@/features/marketing/components/FeatureGridSection';
import { HeroSection } from '@/features/marketing/components/HeroSection';
import { InstagramGallery } from '@/features/marketing/components/InstagramGallery';
import { PlanTripSection } from '@/features/marketing/components/PlanTripSection';
import { StatsStrip } from '@/features/marketing/components/StatsStrip';
import { TrustBadges } from '@/features/marketing/components/TrustBadges';
import { PackageGrid } from '@/features/packages/components/PackageGrid';
import { UpcomingDeparturesTable } from '@/features/packages/components/UpcomingDeparturesTable';
import { packageService } from '@/features/packages/server/package.service';
import type { PackageSummary } from '@/features/packages/types';
import { TestimonialCarousel } from '@/features/testimonials/components/TestimonialCarousel';
import { testimonialService } from '@/features/testimonials/server/testimonial.service';
import { withFallback } from '@/lib/http/with-fallback';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { emptyPage } from '@/types/api';

export const metadata = buildMetadata({
  title: `Adi Kailash Om Parvat Yatra 2026–27 | ${siteConfig.name}`,
  description:
    'Adi Kailash and Om Parvat yatra from Pithoragarh, Kathgodam and Delhi with a local Dharchula team: Inner Line Permit help, 4×4 vehicles and pure veg food.',
  path: routes.home,
  keywords: siteConfig.keywords,
  absoluteTitle: true,
});

export default async function HomePage() {
  const [categories, featured, departures, testimonials, posts] = await Promise.all([
    withFallback(categoryService.getTree(), [], 'home categories'),
    withFallback(packageService.list({ featured: true, limit: 8 }), emptyPage<PackageSummary>(), 'featured packages'),
    withFallback(packageService.getUpcomingDepartures({ limit: 8 }), [], 'upcoming departures'),
    withFallback(testimonialService.list({ featured: true, limit: 9 }), [], 'testimonials'),
    withFallback(blogService.list({ limit: 3 }), emptyPage<BlogSummary>(), 'latest posts'),
  ]);

  const featuredCategories = flattenCategoryTree(categories)
    .filter((category) => category.isFeatured)
    .slice(0, 4);

  return (
    <>
      <HeroSection />
      <StatsStrip />

      {featuredCategories.length > 0 ? (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Sacred destinations"
              title="Where would you like to go?"
              description="Start with Adi Kailash and Om Parvat in our home valleys, or choose another Himalayan yatra to see every route and departure."
            />
            <CategoryGrid categories={featuredCategories} className="mt-12" />
          </Container>
        </section>
      ) : null}

      <section className="bg-stone-50 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow="Most booked" title="Featured yatras for 2026–27" />
            <Button href={routes.packages} variant="outline">
              View all packages
            </Button>
          </div>
          <div className="mt-10">
            <PackageGrid packages={featured.items} columns={4} />
          </div>
        </Container>
      </section>

      <FeatureGridSection
        id="ways-to-travel"
        eyebrow="You can book your"
        title="Travel your way"
        description="Join a fixed batch, ride the mountain road yourself or take a 4×4 into the unexplored."
        features={waysToTravel}
        className="bg-white"
      />

      <ComfortTiers />

      {departures.length > 0 ? (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Fixed departures"
              title="Upcoming batches"
              description="Seat availability is shown for every batch. Slots are limited, so plan your yatra in advance."
            />
            <div className="mt-10">
              <UpcomingDeparturesTable departures={departures} caption="Upcoming fixed departures across all yatras" />
            </div>
          </Container>
        </section>
      ) : null}

      <FeatureGridSection
        eyebrow="Why travel with us"
        title="We open the window to your spiritual journey"
        description="A local, Uttarakhand registered team that handles permits, vehicles, stays and food, so you can focus on darshan."
        features={whyChooseUs}
      />

      <PlanTripSection />

      {testimonials.length > 0 ? (
        <section className="bg-stone-50 py-16 sm:py-20">
          <Container>
            <SectionHeading eyebrow="Pilgrim stories" title="What our yatris say" />
            <div className="mt-10">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
            <div className="mt-6 text-center">
              <Button href={routes.testimonials} variant="ghost">
                Read all reviews
              </Button>
            </div>
          </Container>
        </section>
      ) : null}

      <InstagramGallery />

      {posts.items.length > 0 ? (
        <section className="bg-stone-50 py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading align="left" eyebrow="Travel guides" title="Plan better with our yatra guides" />
              <Button href={routes.blog} variant="outline">
                All articles
              </Button>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.items.map((post) => (
                <li key={post.id}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <TrustBadges />
      <CtaBanner />
    </>
  );
}
