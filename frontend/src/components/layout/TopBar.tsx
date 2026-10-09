import { BadgeCheck, Clock, Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { SocialLinks } from './SocialLinks';

export function TopBar() {
  return (
    <div className="hidden bg-ink-950 text-xs text-white/80 md:block">
      <Container className="flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Phone aria-hidden="true" className="h-3.5 w-3.5" />
            {siteConfig.contact.phone}
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
            {siteConfig.contact.email}
          </a>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {siteConfig.contact.hours}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 lg:flex">
            <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5 text-gold-300" />
            Registered with Uttarakhand Tourism
          </span>
          <SocialLinks linkClassName="h-7 w-7 hover:bg-white/10 hover:text-white" iconClassName="h-3.5 w-3.5" />
        </div>
      </Container>
    </div>
  );
}
