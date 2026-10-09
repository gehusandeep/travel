import Image from 'next/image';
import { InstagramIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/config/site';
import { instagramPhotos } from '@/content/marketing';

/**
 * Photos from the agency's Instagram page. Static for now; the Instagram
 * Graph API can feed this list later without changing the markup.
 */
export function InstagramGallery() {
  return (
    <section aria-labelledby="instagram-heading" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          id="instagram-heading"
          eyebrow="On Instagram"
          title="Moments from our yatras"
          description={`Fresh snow on Om Parvat, Kuti village and our groups on the road. Follow ${siteConfig.instagram.handle} for batch updates and route news.`}
        />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {instagramPhotos.map((photo) => (
            <li key={photo.url} className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
              />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button href={siteConfig.instagram.url} target="_blank" variant="outline">
            <InstagramIcon className="h-5 w-5" />
            Follow us on Instagram
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
