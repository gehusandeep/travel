import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { InstagramIcon, WhatsappIcon } from '@/components/icons/SocialIcons';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { formatAddress, siteConfig } from '@/config/site';
import { EnquiryForm } from '@/features/enquiry/components/EnquiryForm';
import { routes, whatsappUrl } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: `Call, WhatsApp or email ${siteConfig.name} in Dharchula to plan your Adi Kailash and Om Parvat yatra, or any Himalayan pilgrimage.`,
  path: routes.contact,
});

const breadcrumbs = [
  { name: 'Home', path: routes.home },
  { name: 'Contact', path: routes.contact },
];

interface ContactChannel {
  title: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ReactNode;
}

const iconClasses = 'h-5 w-5';

export default function ContactPage() {
  const { contact } = siteConfig;

  const channels: ContactChannel[] = [
    {
      title: 'Call us',
      value: contact.phone,
      href: contact.phoneHref,
      icon: <Phone aria-hidden="true" className={iconClasses} />,
    },
    {
      title: 'Call us (second line)',
      value: contact.altPhone,
      href: contact.altPhoneHref,
      icon: <Phone aria-hidden="true" className={iconClasses} />,
    },
    {
      title: 'WhatsApp',
      value: `${contact.phone}: chat with our yatra team`,
      href: whatsappUrl('Namaste! I would like to plan an Adi Kailash yatra.'),
      external: true,
      icon: <WhatsappIcon className={iconClasses} />,
    },
    {
      title: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail aria-hidden="true" className={iconClasses} />,
    },
    {
      title: 'Instagram',
      value: siteConfig.instagram.handle,
      href: siteConfig.instagram.url,
      external: true,
      icon: <InstagramIcon className={iconClasses} />,
    },
    {
      title: 'Visit our office',
      value: formatAddress(),
      icon: <MapPin aria-hidden="true" className={iconClasses} />,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a yatra expert"
        description="Share your plans and we will suggest the right route, dates and comfort level for your group."
        breadcrumbs={breadcrumbs}
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950">Get in touch</h2>
          <ul className="mt-6 space-y-4">
            {channels.map(({ title, value, href, external, icon }) => {
              const content = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    {icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink-950">{title}</span>
                    <span className="block text-sm text-stone-600">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={title}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition-colors hover:border-brand-300"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-sm text-stone-600">
            <Clock aria-hidden="true" className="h-4 w-4 text-brand-700" />
            {contact.hours}
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
          <h2 className="font-display text-2xl font-bold text-ink-950">Send us a message</h2>
          <p className="mt-1 text-sm text-stone-600">We reply to every enquiry within one working day.</p>
          <EnquiryForm idPrefix="contact" source="CONTACT_PAGE" variant="detailed" submitLabel="Send message" className="mt-6" />
        </div>
      </Container>

      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
