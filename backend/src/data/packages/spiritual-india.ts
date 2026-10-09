import type { TourPackage } from '@/modules/packages/package.types';
import { departure, MEALS_B, MEALS_BD, MEALS_D } from '../helpers';
import { images } from '../images';

export const spiritualIndiaPackages: TourPackage[] = [
  {
    id: 'pkg-kashi-ayodhya-prayagraj',
    slug: 'kashi-ayodhya-prayagraj-yatra',
    title: 'Kashi, Ayodhya & Prayagraj Yatra',
    subtitle:
      'Ganga aarti in Varanasi, darshan at Kashi Vishwanath and Shri Ram Janmabhoomi, and a boat ride to Triveni Sangam.',
    summary:
      'Five days across three of India’s holiest cities: Kashi Vishwanath and the Varanasi ghats, the Ram Mandir in Ayodhya and the Triveni Sangam in Prayagraj.',
    overview: [
      'This short yatra links Varanasi, Ayodhya and Prayagraj by road, with comfortable hotels and an unhurried pace suitable for all ages.',
      'In Varanasi you watch the Ganga aarti at Dashashwamedh Ghat, take a sunrise boat ride past the ghats and visit Kashi Vishwanath, Kaal Bhairav and Sarnath.',
      'Ayodhya brings darshan at Shri Ram Janmabhoomi Mandir and Hanuman Garhi. Prayagraj ends the journey with a boat ride to the confluence of the Ganga, Yamuna and the sacred Saraswati.',
    ],
    categoryId: 'cat-spiritual-india',
    region: 'DOMESTIC',
    tier: 'STANDARD',
    travelModes: ['ROAD'],
    difficulty: 'EASY',
    tags: ['Family Friendly', 'Senior Friendly', 'Temple Darshan'],
    durationDays: 5,
    durationNights: 4,
    startLocation: 'Varanasi',
    endLocation: 'Varanasi',
    stayPlan: [
      { place: 'Varanasi', nights: 2 },
      { place: 'Ayodhya', nights: 1 },
      { place: 'Prayagraj', nights: 1 },
    ],
    bestTime: 'October to March',
    bestFor: 'Families and seniors looking for a short, comfortable temple tour.',
    groupSize: '2–20 travellers',
    priceFrom: 18500,
    priceNote: 'per person, twin sharing',
    heroImage: images.varanasiGhats,
    gallery: [images.varanasiGhats, images.oldCityLane],
    highlights: [
      'Evening Ganga aarti at Dashashwamedh Ghat',
      'Darshan at Kashi Vishwanath and Kaal Bhairav',
      'Shri Ram Janmabhoomi Mandir and Hanuman Garhi in Ayodhya',
      'Boat ride to Triveni Sangam in Prayagraj',
      'Sarnath, where the Buddha gave his first sermon',
    ],
    inclusions: [
      'AC vehicle for all transfers and sightseeing',
      'Stays as per the stay plan',
      'Breakfast and dinner daily (pure vegetarian)',
      'Boat rides in Varanasi and Prayagraj',
      'Local guide in each city',
      'Darshan assistance where available',
    ],
    exclusions: [
      'Train or flight to Varanasi',
      'Special puja and donation charges',
      'Lunch and personal expenses',
      'Travel insurance',
    ],
    thingsToCarry: [
      'Government photo ID for temple entry and hotels',
      'Modest clothing for temple visits',
      'Footwear that is easy to remove',
      'Personal medicines',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrive in Varanasi',
        description:
          'Pickup from Varanasi airport or railway station. Evening Ganga aarti at Dashashwamedh Ghat.',
        meals: MEALS_D,
        overnight: 'Varanasi',
      },
      {
        day: 2,
        title: 'Kashi darshan and Sarnath',
        description:
          'Sunrise boat ride along the ghats, darshan at Kashi Vishwanath, Kaal Bhairav and Sankat Mochan, and an afternoon visit to Sarnath.',
        meals: MEALS_BD,
        overnight: 'Varanasi',
      },
      {
        day: 3,
        title: 'Varanasi to Ayodhya',
        description:
          'Drive to Ayodhya. Darshan at Shri Ram Janmabhoomi Mandir and Hanuman Garhi, then the evening aarti at the Saryu ghats.',
        meals: MEALS_BD,
        overnight: 'Ayodhya',
        distance: '~210 km, 5 hours',
      },
      {
        day: 4,
        title: 'Ayodhya to Prayagraj',
        description: 'Drive to Prayagraj. Boat ride to Triveni Sangam and darshan at the Bade Hanuman temple.',
        meals: MEALS_BD,
        overnight: 'Prayagraj',
        distance: '~170 km, 4 hours',
      },
      {
        day: 5,
        title: 'Prayagraj to Varanasi',
        description: 'Drive back to Varanasi for your onward journey.',
        meals: MEALS_B,
        distance: '~120 km, 3 hours',
      },
    ],
    departures: [
      departure('KAP-2601', '2026-10-30', '2026-11-03', 18500, 20, 17),
      departure('KAP-2602', '2026-11-20', '2026-11-24', 18500, 20, 8),
      departure('KAP-2603', '2026-12-18', '2026-12-22', 19500, 20, 20, 'Winter holiday batch'),
      departure('KAP-2701', '2027-01-15', '2027-01-19', 18500, 20, 5),
      departure('KAP-2702', '2027-02-19', '2027-02-23', 18500, 20, 0),
    ],
    isFeatured: true,
    sortOrder: 12,
    seo: {
      title: 'Kashi, Ayodhya & Prayagraj Yatra Package (5 Days)',
      description:
        'Five-day Kashi Ayodhya Prayagraj tour: Ganga aarti, Kashi Vishwanath, Ram Mandir darshan and Triveni Sangam boat ride, with AC transport and local guides.',
      keywords: ['kashi ayodhya prayagraj tour', 'varanasi ayodhya package', 'ram mandir tour package'],
    },
    updatedAt: '2026-10-05T09:00:00.000Z',
  },
];
