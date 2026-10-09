import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { companyLinks, legalLinks, type NavLink as NavItem } from '@/config/navigation';
import { formatAddress, siteConfig } from '@/config/site';
import { buildDestinationMenu } from '@/features/categories/utils';
import type { CategoryTreeNode } from '@/features/categories/types';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';

function FooterColumn({ title, links }: { title: string; links: NavItem[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-gold-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ categories }: { categories: CategoryTreeNode[] }) {
  const destinationLinks = buildDestinationMenu(categories).flatMap((group) => [
    { label: group.label, href: group.href },
    ...group.children,
  ]);
  const { contact } = siteConfig;

  return (
    <footer className="bg-ink-950 text-white/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{siteConfig.description}</p>
          <SocialLinks className="mt-6" linkClassName="h-9 w-9 bg-white/10 text-white hover:bg-brand-700" />
        </div>

        <FooterColumn title="Destinations" links={destinationLinks} />
        <FooterColumn title="Company" links={companyLinks} />

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact us</h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>{formatAddress({ withCountry: true })}</span>
            </p>
            <p className="flex gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span className="flex flex-col gap-1">
                <a href={contact.phoneHref} className="transition-colors hover:text-gold-300">
                  {contact.phone} <span className="text-white/60">(call / WhatsApp)</span>
                </a>
                <a href={contact.altPhoneHref} className="transition-colors hover:text-gold-300">
                  {contact.altPhone}
                </a>
              </span>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="flex gap-2.5 transition-colors hover:text-gold-300">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                {contact.email}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              {contact.hours}
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
        <Container className="pb-8 text-xs text-white/60">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {siteConfig.registrations.map((registration) => (
              <li key={registration.label}>
                {registration.label}: {registration.number ?? registration.detail}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
