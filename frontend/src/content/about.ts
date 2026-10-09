import { galleryPhotos, type IconFeature } from './marketing';

/** About copy built from the Divya Darshan Instagram page. Extend with the founders' own story. */
export const aboutContent = {
  seo: {
    title: 'About Us: Adi Kailash Yatra Specialists in Dharchula',
    description:
      'Divya Darshan Tours is a local, Uttarakhand registered tour operator in Dharchula running Adi Kailash and Om Parvat yatras with permit help, 4×4 vehicles and pure veg food.',
  },
  title: 'A local Dharchula team for your Adi Kailash yatra',
  intro: [
    'Divya Darshan Tours is a local team based in Dharchula, the gateway to the Vyas valley, where every road yatra to Adi Kailash and Om Parvat begins its climb.',
    'We run fixed batches from Pithoragarh, Kathgodam and Delhi, and also plan solo journeys, family yatras, self-drive bike trips and 4×4 expeditions. Inner Line Permits, stays, transport and pure vegetarian food are arranged by our own team.',
    'We share road and weather updates as they happen, because your safety is our priority. Explore the unexplored with people who live on this route.',
  ],
  /** Shown as a pull quote, marked up with lang="hi". */
  quote: { text: 'यात्रा नहीं, अनुभव है ये…', lang: 'hi', translation: 'This is not just a journey, it is an experience.' },
  image: galleryPhotos.welcomeArch,
  values: [
    {
      icon: 'shield',
      title: 'Safety before schedules',
      text: 'We follow road and weather updates closely and will always choose a later date over an unsafe road.',
    },
    {
      icon: 'care',
      title: 'Seva in every detail',
      text: 'From pure veg meals to help with permits and medical papers, the small things are taken care of.',
    },
    {
      icon: 'route',
      title: 'Local knowledge',
      text: 'We live on this route, and our guides know the roads to Gunji, Jolingkong and Nabidhang well.',
    },
    {
      icon: 'leaf',
      title: 'Respect for the mountains',
      text: 'We work with local homestays and drivers and help keep the high valleys clean.',
    },
  ] satisfies IconFeature[],
  process: [
    { title: 'Tell us your plan', text: 'Share your dates, group size, pickup city and any health considerations.' },
    { title: 'Pick your batch', text: 'We suggest the right departure from Pithoragarh, Kathgodam or Delhi.' },
    {
      title: 'Reserve with a token amount',
      text: 'Pay a small booking amount per traveller and get a confirmation voucher by email. The balance is paid at the start of the journey.',
    },
    {
      title: 'Travel with confidence',
      text: 'Our team handles permits, stays and transport and stays in touch with you throughout the yatra.',
    },
  ],
};
