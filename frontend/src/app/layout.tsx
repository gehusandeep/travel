import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { EnquiryModal } from '@/features/enquiry/components/EnquiryModal';
import { UtmTracker } from '@/features/enquiry/components/UtmTracker';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';
import { cn } from '@/lib/utils/cn';
import { StoreProvider } from '@/store/StoreProvider';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Cinzel({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-display', display: 'swap' });

const defaultTitle = `${siteConfig.name} | Adi Kailash & Om Parvat Yatra from Dharchula`;

/** Site-wide defaults. Every page refines these through buildMetadata(). */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'travel',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: defaultTitle,
    description: siteConfig.description,
    url: '/',
  },
  // No X/Twitter account yet: add `site` and `creator` here once there is one.
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#c2250c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={cn(sans.variable, display.variable)}>
      <body className="min-h-screen bg-white font-sans text-stone-800 antialiased">
        <StoreProvider>
          {children}
          <EnquiryModal />
          <FloatingActions />
          <CookieConsent />
          <UtmTracker />
        </StoreProvider>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
