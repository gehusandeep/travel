import { routes } from '@/lib/routes';

export interface Announcement {
  id: string;
  message: string;
  /** Last day (inclusive, IST) the notice is shown. Pages drop it on their next revalidation. */
  showUntil: string;
  link?: { label: string; href: string };
}

/** Time-bound notices shown above the site header. Source: Divya Darshan Instagram posts. */
export const announcements: Announcement[] = [
  {
    id: 'adi-kailash-permit-pause-2026',
    message:
      'Adi Kailash update: no Inner Line Permits will be issued from 19 to 26 October 2026 because of the Adi Kailash Parikrama Run 2.0. Please plan your dates around this window.',
    showUntil: '2026-10-26',
    link: { label: 'See open batches', href: routes.category(['uttarakhand', 'adi-kailash-yatra']) },
  },
];

/** Today's date in India as YYYY-MM-DD, so notices expire on Indian dates. */
function todayInIndia(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
}

export function activeAnnouncements(now: Date = new Date()): Announcement[] {
  const today = todayInIndia(now);
  return announcements.filter((announcement) => announcement.showUntil >= today);
}
