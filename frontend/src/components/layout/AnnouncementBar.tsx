import { ArrowRight, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { activeAnnouncements } from '@/content/announcements';

/** Time-bound route notices (permit closures, road updates). Renders nothing when none are active. */
export function AnnouncementBar() {
  const [announcement] = activeAnnouncements();
  if (!announcement) return null;

  return (
    <aside aria-label="Announcement" className="border-b border-gold-200 bg-gold-100 text-ink-950">
      <Container className="flex flex-col gap-1 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        <p className="flex gap-2">
          <Megaphone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
          <span>{announcement.message}</span>
        </p>
        {announcement.link ? (
          <Link
            href={announcement.link.href}
            className="inline-flex shrink-0 items-center gap-1 pl-6 font-semibold text-brand-800 underline-offset-2 hover:underline sm:pl-0"
          >
            {announcement.link.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : null}
      </Container>
    </aside>
  );
}
