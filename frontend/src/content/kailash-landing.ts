import type { IconFeature } from './marketing';
import type { ImageAsset } from '@/types/api';

/** Copy for the Trip To Temples-style campaign landing page. */
export const kailashLandingContent = {
  categorySlug: 'kailash-mansarovar-yatra',
  seo: {
    title: 'Kailash Mansarovar Yatra 2027: Packages, Dates, Routes and Cost',
    description:
      'Kailash Mansarovar Yatra 2027 packages by helicopter and overland. Compare routes, fixed departure dates from May to September, inclusions and cost.',
    keywords: [
      'kailash mansarovar yatra 2027',
      'kailash yatra 2027 dates',
      'kailash mansarovar package cost',
      'kailash yatra by helicopter',
    ],
  },
  hero: {
    eyebrow: 'Registrations open for the 2027 season',
    title: 'Kailash Mansarovar Yatra 2027',
    description:
      'The yatra season runs from May to September 2027, with departures from Lucknow and Kathmandu. Choose the helicopter route, the overland route or a five-day express darshan.',
    image: {
      url: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1920&q=80',
      alt: 'Snow-covered Himalayan peak wrapped in clouds',
    } satisfies ImageAsset,
  },
  highlights: [
    { value: 'May–Sep', label: '2027 yatra season' },
    { value: '3 routes', label: 'Helicopter, overland, express' },
    { value: '5,630 m', label: 'Dolma La Pass' },
    { value: '52 km', label: 'Kailash parikrama' },
  ],
  care: [
    {
      icon: 'tent',
      title: 'Changing tents at Mansarovar',
      text: 'Privacy after the holy dip, set up by our team on the lake shore.',
    },
    {
      icon: 'oxygen',
      title: 'Oxygen and daily health checks',
      text: 'Oximeter checks twice a day and oxygen cylinders with every group.',
    },
    {
      icon: 'guide',
      title: 'Indian tour manager',
      text: 'A Hindi- and English-speaking manager travels with the group throughout.',
    },
    {
      icon: 'calendar',
      title: 'Panchang-based dates',
      text: 'Batches are planned so the group reaches Kailash on an auspicious day.',
    },
    {
      icon: 'helpline',
      title: 'Updates for your family',
      text: 'Our helpline keeps your family informed while you are in Tibet.',
    },
    {
      icon: 'permit',
      title: 'Visa and permits handled',
      text: 'Chinese group visa, Tibet permits and border formalities are included.',
    },
  ] satisfies IconFeature[],
  sections: [
    { id: 'packages', label: 'Packages' },
    { id: 'dates', label: 'Dates and prices' },
    { id: 'why-us', label: 'Why us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faqs', label: 'FAQs' },
  ],
};
