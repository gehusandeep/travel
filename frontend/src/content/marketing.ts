import type { FeatureIconName } from '@/components/icons/FeatureIcon';
import type { PackageTier } from '@/features/packages/types';
import type { ImageAsset } from '@/types/api';

/**
 * Marketing copy that changes rarely. It lives in code today and can move to a
 * CMS later without touching the components that render it.
 *
 * Copy, taglines and photos under /images/gallery come from the Divya Darshan
 * Instagram page (@adi_kailash_yatradivya_darshan). The remaining Unsplash
 * photos are placeholders.
 */

const photo = (id: string, alt: string): ImageAsset => ({
  url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`,
  alt,
});

/** The agency's own photos, served from /public/images/gallery. */
export const galleryPhotos = {
  adiKailashPeak: { url: '/images/gallery/adi-kailash-peak.jpg', alt: 'Snow-covered Adi Kailash peak under a blue sky' },
  adiKailashPeakWide: {
    url: '/images/gallery/adi-kailash-peak-wide.jpg',
    alt: 'Snow-covered Adi Kailash peak under a blue sky',
  },
  adiKailashTrail: {
    url: '/images/gallery/adi-kailash-trail.jpg',
    alt: 'Yatris on a rocky trail below a glacier-covered peak',
  },
  highAltitudeLake: {
    url: '/images/gallery/high-altitude-lake.jpg',
    alt: 'A yatri resting on the rocks beside a high-altitude lake',
  },
  kutiVillageSnow: {
    url: '/images/gallery/kuti-village-snow.jpg',
    alt: 'White jeep parked on a snow-covered lane in Kuti village',
  },
  yatraGroup: {
    url: '/images/gallery/yatra-group.jpg',
    alt: 'A large yatra group outside a mountain guesthouse in a green Himalayan valley',
  },
  adiKailashSignboard: {
    url: '/images/gallery/adi-kailash-signboard.jpg',
    alt: 'Border Roads Organisation signboard for Adi Kailash, with the peak seen through its cut-out frame',
  },
  mountainShrine: {
    url: '/images/gallery/mountain-shrine.jpg',
    alt: 'Small stone shrine draped in red cloth and prayer flags on a rocky slope',
  },
  waterfall: {
    url: '/images/gallery/himalayan-waterfall.jpg',
    alt: 'Waterfall pouring down a dark cliff streaked with snow',
  },
  snowyRidge: { url: '/images/gallery/snowy-ridge.jpg', alt: 'Snow-capped rocky ridge under a blue sky' },
  welcomeArch: {
    url: '/images/gallery/yatris-welcome-arch.jpg',
    alt: 'Yatris with their vehicle under a welcome arch wishing travellers a safe journey',
  },
} satisfies Record<string, ImageAsset>;

export interface IconFeature {
  icon: FeatureIconName;
  title: string;
  text: string;
}

export const heroContent = {
  eyebrow: 'Adi Kailash · Om Parvat · Parvati Sarovar',
  title: 'Adi Kailash calls. Om Parvat awaits.',
  /** Visible as "Book your …" with the last part rotating; screen readers get the full list. */
  rotatingLead: 'Book your',
  rotatingWords: ['group yatra', 'family yatra', 'solo journey', 'self-drive bike trip', '4×4 expedition'],
  description:
    'Experience the divine energy of the Himalayas, breathtaking mountain landscapes and the sacred Om Parvat darshan with a trusted local tour operator from Dharchula.',
  assurances: ['Complete Inner Line Permit help', 'Pure veg food', '4×4 mountain vehicles'],
  image: galleryPhotos.adiKailashPeakWide,
  /** Keeps the summit (left of centre in this photo) in view on narrow screens. */
  imagePosition: '40% 50%',
};

/** Facts from the Instagram page, not sales figures. */
export const trustStats = [
  { value: 'Local', label: 'Team based in Dharchula, on the yatra route' },
  { value: 'ILP', label: 'Complete Inner Line Permit assistance' },
  { value: '4×4', label: 'Mountain vehicles for the high roads' },
  { value: '100% veg', label: 'Pure vegetarian food on every yatra' },
];

export const whyChooseUs: IconFeature[] = [
  {
    icon: 'permit',
    title: 'Complete Inner Line Permit help',
    text: 'Our Dharchula team prepares and submits your Inner Line Permit and tells you exactly which documents and medical checks to bring.',
  },
  {
    icon: 'guide',
    title: 'Experienced local yatra team',
    text: 'A local team runs every departure, with experienced guides who know the roads to Gunji, Jolingkong and Nabidhang.',
  },
  {
    icon: 'jeep',
    title: '4×4 mountain vehicles',
    text: 'Sturdy 4×4 vehicles handle the high, rough roads of the Vyas valley in comfort.',
  },
  {
    icon: 'food',
    title: 'Pure veg food',
    text: 'Freshly cooked pure vegetarian meals throughout the yatra.',
  },
  {
    icon: 'stay',
    title: 'Stay and transport arranged',
    text: 'Rooms, homestays and transport are booked for the whole route, from your pickup point to Gunji and back.',
  },
  {
    icon: 'care',
    title: 'Group and family yatra assistance',
    text: 'Travelling with parents, children or a large group? We plan seats, rest stops and rooms around you.',
  },
  {
    icon: 'shield',
    title: 'Your safety is our priority',
    text: 'We follow road and weather updates every day and share them with you. If the route is unsafe, we change dates rather than take chances.',
  },
  {
    icon: 'verified',
    title: 'Uttarakhand registered operator',
    text: 'Registered with Uttarakhand Tourism and as an MSME (Udyam) enterprise.',
  },
];

/** The four ways to travel listed on the Divya Darshan posters. */
export const waysToTravel: IconFeature[] = [
  {
    icon: 'solo',
    title: 'Solo tour',
    text: 'Travel your way, find your peace. Join a fixed batch on your own and we look after the rest.',
  },
  {
    icon: 'guide',
    title: 'Group tour',
    text: 'Together we travel, together we create memories. Fixed batches for friends, families and satsang groups.',
  },
  {
    icon: 'bike',
    title: 'Self-drive bike',
    text: 'Ride free, explore wild. Ride the Adi Kailash road yourself while we arrange permits and stays.',
  },
  {
    icon: 'jeep',
    title: '4×4 expedition',
    text: 'Go beyond limits, into the unexplored, in a 4×4 planned around your group.',
  },
];

export interface ComfortTier {
  tier: PackageTier;
  name: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const comfortTiers: ComfortTier[] = [
  {
    tier: 'BUDGET',
    name: 'Budget',
    tagline: 'Clean, simple stays and shared transport for the best value.',
    features: ['Guesthouses and homestays', 'Shared vehicles on group departures', 'All essentials included'],
  },
  {
    tier: 'STANDARD',
    name: 'Standard',
    tagline: 'Our most popular balance of comfort and value.',
    features: ['Comfortable hotels where available', 'Dedicated vehicles', 'Local guide with the group'],
    highlighted: true,
  },
  {
    tier: 'DELUXE',
    name: 'Deluxe',
    tagline: 'Upgraded stays, shorter driving days and extra temple visits.',
    features: ['Best available hotels on the route', 'Shorter driving days', 'Priority support'],
  },
  {
    tier: 'PREMIUM',
    name: 'Premium',
    tagline: 'Helicopter routes and personal care for the least effort.',
    features: ['Helicopter sectors', 'Darshan assistance where available', 'Dedicated coordinator'],
  },
];

export const planTripContent = {
  eyebrow: 'Plan your yatra',
  title: 'Planning your Adi Kailash yatra?',
  description:
    'Tell us your dates, group size and pickup city. Our Dharchula team will suggest the right batch and call you back.',
  points: [
    'Batches from Pithoragarh, Kathgodam and Delhi',
    'Inner Line Permit, stays and transport arranged for you',
    'Reserve your seat with a small booking amount',
  ],
  image: galleryPhotos.kutiVillageSnow,
};

export const ctaContent = {
  title: 'Limited departures. Plan your spiritual journey in advance.',
  description:
    'Slots on every Adi Kailash batch are limited. Call or WhatsApp our Dharchula team and reserve your seat with a small booking amount.',
  image: photo('1519681393784-d120267933ba', 'Milky Way over snowy mountains at night'),
};

/** Recent posts shown in the Instagram strip on the home page (static until the Instagram API is connected). */
export const instagramPhotos: ImageAsset[] = [
  galleryPhotos.adiKailashPeak,
  galleryPhotos.kutiVillageSnow,
  galleryPhotos.adiKailashTrail,
  galleryPhotos.highAltitudeLake,
  galleryPhotos.yatraGroup,
  galleryPhotos.adiKailashSignboard,
  galleryPhotos.mountainShrine,
  galleryPhotos.waterfall,
];

export const yatraKit: Array<{ icon: FeatureIconName; label: string }> = [
  { icon: 'jacket', label: 'Down jacket' },
  { icon: 'backpack', label: 'Daypack' },
  { icon: 'bag', label: 'Duffle bag' },
  { icon: 'mala', label: 'Rudraksha mala' },
  { icon: 'book', label: 'Shiv Chalisa' },
  { icon: 'winter', label: 'Woollen cap and gloves' },
];
