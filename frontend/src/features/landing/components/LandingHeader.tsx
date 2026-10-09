import { Phone } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { navItemClasses } from '@/components/layout/nav-styles';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { EnquiryButton } from '@/features/enquiry/components/EnquiryButton';

interface LandingHeaderProps {
  sections: ReadonlyArray<{ id: string; label: string }>;
}

/** Focused header for paid-campaign landing pages: logo, in-page anchors, phone and CTA. */
export function LandingHeader({ sections }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={navItemClasses}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button href={siteConfig.contact.phoneHref} variant="outline" size="sm" className="hidden sm:inline-flex">
            <Phone aria-hidden="true" className="h-4 w-4" />
            {siteConfig.contact.phone}
          </Button>
          <EnquiryButton size="sm" source="LANDING_PAGE">
            Enquire now
          </EnquiryButton>
        </div>
      </Container>
    </header>
  );
}
