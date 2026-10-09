import type { ImageAsset } from '@/shared/types';

/**
 * Placeholder photography from Unsplash (free to use under the Unsplash License)
 * for destinations the agency has not shared photos of yet. Alt text describes
 * what each photo actually shows.
 */
const unsplash = (id: string, alt: string): ImageAsset => ({
  url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
});

/**
 * The agency's own photos (from its Instagram page). They live in the website's
 * /public/images/gallery folder, so the URLs are site-relative. Move them to a
 * CDN or object storage when the database arrives and store absolute URLs.
 */
const own = (file: string, alt: string): ImageAsset => ({ url: `/images/gallery/${file}`, alt });

export const images = {
  adiKailashPeak: own('adi-kailash-peak.jpg', 'Snow-covered Adi Kailash peak under a blue sky'),
  adiKailashPeakWide: own('adi-kailash-peak-wide.jpg', 'Snow-covered Adi Kailash peak under a blue sky'),
  adiKailashTrail: own('adi-kailash-trail.jpg', 'Yatris on a rocky trail below a glacier-covered peak'),
  highAltitudeLake: own('high-altitude-lake.jpg', 'A yatri resting on the rocks beside a high-altitude lake'),
  kutiVillageSnow: own('kuti-village-snow.jpg', 'White jeep parked on a snow-covered lane in Kuti village'),
  yatraGroup: own(
    'yatra-group.jpg',
    'A large yatra group outside a mountain guesthouse in a green Himalayan valley',
  ),
  adiKailashSignboard: own(
    'adi-kailash-signboard.jpg',
    'Border Roads Organisation signboard for Adi Kailash, with the peak seen through its cut-out frame',
  ),
  mountainShrine: own(
    'mountain-shrine.jpg',
    'Small stone shrine draped in red cloth and prayer flags on a rocky slope',
  ),
  himalayanWaterfall: own('himalayan-waterfall.jpg', 'Waterfall pouring down a dark cliff streaked with snow'),
  snowyRidge: own('snowy-ridge.jpg', 'Snow-capped rocky ridge under a blue sky'),
  sunriseAboveClouds: unsplash(
    '1506905925346-21bda4d32df4',
    'Snow-capped peaks rising above a sea of clouds at sunrise',
  ),
  dramaticSnowPeak: unsplash('1486911278844-a81c5267e227', 'Snow-covered Himalayan peak wrapped in clouds'),
  himalayanRange: unsplash('1454496522488-7a8e488e8606', 'Snowy Himalayan range under a bright blue sky'),
  prayerWheels: unsplash('1526712318848-5f38e2740d44', 'Row of prayer wheels beneath colourful prayer flags'),
  pinkSunsetRange: unsplash('1585409677983-0f6c41ca9c3b', 'Himalayan range glowing pink at sunset'),
  hillTown: unsplash('1597074866923-dc0589150358', 'Hill town spread across green Himalayan slopes'),
  pineValley: unsplash('1464822759023-fed622ff2c3b', 'Pine-forested valley leading to snow-capped mountains'),
  alpineMeadow: unsplash('1598091383021-15ddea10925d', 'Horse grazing in an alpine meadow below snowy peaks'),
  sunriseSlope: unsplash('1542224566-6e85f2e6772f', 'Sunrise over a green mountain ridge'),
  riverValley: unsplash('1581791534721-e599df4417f7', 'Mountain river flowing through a pine valley'),
  mountainStream: unsplash('1609920658906-8223bd289001', 'Rocky mountain stream flanked by forested hills'),
  snowTrail: unsplash('1626621341517-bbf3d9990a23', 'Trekkers walking along a snowy mountain trail'),
  stupaHimalaya: unsplash(
    '1544735716-392fe2489ffa',
    'Buddhist stupa on a ridge facing snowy Himalayan peaks',
  ),
  prayerFlagsPeak: unsplash('1571401835393-8c5f35328320', 'Prayer flags in front of a pointed snow peak'),
  boudhanath: unsplash('1605640840605-14ac1855827b', 'Aerial view of the Boudhanath Stupa in Kathmandu'),
  varanasiGhats: unsplash(
    '1561361058-c24cecae35ca',
    'Riverside ghats and temples along the Ganga in Varanasi',
  ),
  oldCityLane: unsplash('1517330357046-3ab5a5dd42a1', 'Narrow old-city lane with an auto rickshaw'),
  tealRidges: unsplash('1483728642387-6c3bdd6c93e5', 'Mountain ridges fading into a teal evening sky'),
  trekkerSnowPeak: unsplash('1491555103944-7c647fd857e6', 'Trekker in a red jacket facing a snowy peak'),
} satisfies Record<string, ImageAsset>;
