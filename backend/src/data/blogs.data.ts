import type { BlogAuthor, BlogPost } from '@/modules/blogs/blog.types';
import { images } from './images';

const yatraDesk: BlogAuthor = { name: 'Yatra Desk', role: 'Pilgrimage planning team' };

export const blogsData: BlogPost[] = [
  {
    id: 'blog-adi-kailash-guide',
    slug: 'adi-kailash-om-parvat-yatra-guide',
    title: 'Adi Kailash & Om Parvat Yatra 2027: Route, Permits and Best Time',
    excerpt:
      'Plan Adi Kailash and Om Parvat in 2027: the road route from Kathgodam, Inner Line Permit documents, the best months and how to prepare for the altitude.',
    coverImage: images.pineValley,
    author: yatraDesk,
    tags: ['Adi Kailash', 'Travel Guide'],
    content: [
      {
        type: 'paragraph',
        text: 'Adi Kailash, also known as Chhota Kailash, stands in the Kuthi valley of Pithoragarh district in Uttarakhand, close to the borders with Tibet and Nepal. Together with Om Parvat, it has become one of India’s most sought-after Himalayan yatras now that roads reach both darshan points.',
      },
      { type: 'heading', level: 2, text: 'How the route works' },
      {
        type: 'paragraph',
        text: 'Most yatras begin at Kathgodam, the railhead for Kumaon, or in Delhi. The road climbs to Pithoragarh and Dharchula on the Kali river, then enters the Vyas valley to Gunji, the base for both darshans.',
      },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Kathgodam to Pithoragarh: about 7 hours',
          'Pithoragarh to Dharchula: about 4 hours',
          'Dharchula to Gunji: 5 to 7 hours, depending on road conditions',
          'Gunji to Jolingkong (Adi Kailash) and Nabidhang (Om Parvat): day trips by SUV',
        ],
      },
      { type: 'heading', level: 2, text: 'Permits and documents' },
      {
        type: 'paragraph',
        text: 'Indian citizens need an Inner Line Permit (ILP) for the area beyond Dharchula. It is issued in Dharchula after document verification and a basic medical check.',
      },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Aadhaar card or another government photo ID',
          'Medical fitness certificate from a registered doctor',
          'Passport-size photographs',
          'Police verification or a self-declaration form, if requested',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'Plan ahead',
        text: 'Permit rules can change from season to season. We share the latest checklist when you book and complete the paperwork with you in Dharchula.',
      },
      { type: 'heading', level: 2, text: 'Best time to go' },
      {
        type: 'paragraph',
        text: 'The road usually opens in May. May and June bring clear mornings and snow on the peaks, while July and August see monsoon landslides on the Dharchula road. Mid-September to October offers the clearest views before the valley closes for winter.',
      },
      { type: 'heading', level: 2, text: 'Preparing for the altitude' },
      {
        type: 'paragraph',
        text: 'Jolingkong sits at about 4,500 m. Spending two or three nights in Gunji before going higher is the simplest way to acclimatise. Walk daily for a few weeks before the yatra, stay hydrated and avoid alcohol on the trip.',
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Listen to your body',
        text: 'Headache, nausea or breathlessness at rest can be signs of altitude sickness. Tell your tour manager immediately; going down to a lower altitude is the most effective treatment.',
      },
    ],
    publishedAt: '2026-09-12T06:00:00.000Z',
    updatedAt: '2026-10-02T06:00:00.000Z',
    isPublished: true,
    relatedPackageIds: ['pkg-adi-kailash-kathgodam', 'pkg-adi-kailash-delhi', 'pkg-adi-kailash-heli'],
    seo: {
      title: 'Adi Kailash Yatra 2027 Guide: Route, Permits and Best Time',
      description:
        'Plan your Adi Kailash and Om Parvat Yatra 2027: the road route from Kathgodam, Inner Line Permit documents, the best months and altitude tips.',
      keywords: ['adi kailash yatra guide', 'adi kailash permit', 'om parvat best time'],
    },
  },
  {
    id: 'blog-kailash-routes',
    slug: 'kailash-mansarovar-yatra-helicopter-vs-overland',
    title: 'Kailash Mansarovar Yatra 2027: Helicopter or Overland?',
    excerpt:
      'Compare the two most popular private routes to Mount Kailash: the fly-in route via Nepalgunj and Simikot, and the overland route from Kathmandu via Kyirong.',
    coverImage: images.dramaticSnowPeak,
    author: yatraDesk,
    tags: ['Kailash Mansarovar', 'Travel Guide'],
    content: [
      {
        type: 'paragraph',
        text: 'Private Kailash Mansarovar yatras from India mostly follow one of two routes through Nepal. Both include the holy dip at Lake Mansarovar and the three-day parikrama around Mount Kailash. They differ in time, cost and how gradually your body adapts to the altitude.',
      },
      { type: 'heading', level: 2, text: 'Route 1: Helicopter via Nepalgunj and Simikot' },
      {
        type: 'paragraph',
        text: 'Pilgrims gather in Lucknow, drive to Nepalgunj and fly to Simikot. A short helicopter ride reaches Hilsa on the Tibet border, and Purang is a short drive away. The full yatra takes 9 to 11 days.',
      },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Shortest total duration',
          'Less time sitting in vehicles',
          'Flights depend on mountain weather, so buffer days matter',
          'Higher cost because of the helicopter sectors',
        ],
      },
      { type: 'heading', level: 2, text: 'Route 2: Overland from Kathmandu via Kyirong' },
      {
        type: 'paragraph',
        text: 'The overland route starts with Pashupatinath darshan in Kathmandu, crosses into Tibet at Kyirong and drives across the plateau via Saga. It takes about 14 days.',
      },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Most affordable way to do the full yatra',
          'Gradual gain in altitude helps acclimatisation',
          'Long driving days on good highways',
          'Less affected by flight cancellations',
        ],
      },
      { type: 'heading', level: 2, text: 'Which one should you choose?' },
      {
        type: 'paragraph',
        text: 'Choose the helicopter route if you have limited leave and want the shortest trip. Choose overland if you prefer a gentler acclimatisation curve or a lower budget. Seniors who cannot trek can also consider a five-day express darshan, which skips the parikrama.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Documents for both routes',
        text: 'You need an Indian passport valid for at least six months. The Chinese group visa and Tibet permits are arranged by your tour operator, so book at least 45 to 60 days before departure.',
      },
    ],
    publishedAt: '2026-08-28T06:00:00.000Z',
    updatedAt: '2026-09-30T06:00:00.000Z',
    isPublished: true,
    relatedPackageIds: [
      'pkg-kailash-heli-lucknow',
      'pkg-kailash-overland-kathmandu',
      'pkg-kailash-express-heli',
    ],
    seo: {
      title: 'Kailash Mansarovar Yatra 2027: Helicopter vs Overland Route',
      description:
        'Helicopter or overland? Compare duration, cost and acclimatisation for the two main Kailash Mansarovar Yatra 2027 routes through Nepal.',
      keywords: ['kailash yatra route', 'kailash by helicopter vs road', 'kailash mansarovar 2027 guide'],
    },
  },
  {
    id: 'blog-char-dham-checklist',
    slug: 'char-dham-yatra-checklist',
    title: 'Char Dham Yatra 2027 Checklist: Registration, Packing and Tips',
    excerpt:
      'A practical checklist for the Char Dham Yatra: mandatory registration, what to pack for four very different climates, and tips for the Kedarnath and Yamunotri treks.',
    coverImage: images.riverValley,
    author: yatraDesk,
    tags: ['Char Dham', 'Checklist'],
    content: [
      {
        type: 'paragraph',
        text: 'The Char Dham Yatra takes you to Yamunotri, Gangotri, Kedarnath and Badrinath in the Garhwal Himalaya. The temples usually open between late April and May and close around Diwali, with exact dates announced each spring.',
      },
      { type: 'heading', level: 2, text: 'Registration is mandatory' },
      {
        type: 'paragraph',
        text: 'Every pilgrim must register with Uttarakhand Tourism before starting the yatra. Registration is free and can be done online or at counters in Haridwar and Rishikesh. Keep the QR code on your phone and a printed copy.',
      },
      { type: 'heading', level: 2, text: 'Packing checklist' },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Government photo ID and your registration slip',
          'Warm jacket, thermals and a woollen cap, even in May',
          'Rain poncho and a small umbrella',
          'Comfortable walking shoes with good grip',
          'Personal medicines, ORS and a small first-aid pouch',
          'Reusable water bottle and dry fruits for the treks',
        ],
      },
      { type: 'heading', level: 2, text: 'Tips for the treks' },
      {
        type: 'paragraph',
        text: 'Kedarnath is about a 16 km trek from Gaurikund and Yamunotri about 6 km from Janki Chatti. Start early, walk at a steady pace and use a pony or palki if you have knee or heart problems.',
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'Book helicopters only on the official portal',
        text: 'Kedarnath helicopter tickets are sold through the official IRCTC HeliYatra portal. Avoid agents who promise confirmed tickets for a premium.',
      },
      { type: 'heading', level: 2, text: 'Best months' },
      {
        type: 'paragraph',
        text: 'May and June are the busiest months. September and October are quieter and greener after the monsoon, with clearer views. Avoid July and August if you can, as landslides are common.',
      },
    ],
    publishedAt: '2026-08-10T06:00:00.000Z',
    updatedAt: '2026-09-20T06:00:00.000Z',
    isPublished: true,
    relatedPackageIds: ['pkg-char-dham-haridwar', 'pkg-char-dham-heli'],
    seo: {
      title: 'Char Dham Yatra 2027 Checklist: Registration, Packing and Tips',
      description:
        'Char Dham Yatra 2027 checklist: how to register, what to pack, Kedarnath and Yamunotri trek tips, helicopter booking advice and the best months to go.',
      keywords: ['char dham registration', 'char dham packing list', 'kedarnath trek tips'],
    },
  },
  {
    id: 'blog-altitude-health',
    slug: 'high-altitude-yatra-health-tips',
    title: 'Staying Healthy on a High-Altitude Yatra',
    excerpt:
      'Simple, practical steps to prepare your body for Kailash, Adi Kailash and other Himalayan yatras, and how to spot altitude sickness early.',
    coverImage: images.trekkerSnowPeak,
    author: yatraDesk,
    tags: ['Health', 'Travel Guide'],
    content: [
      {
        type: 'paragraph',
        text: 'Most Himalayan pilgrimages take you above 3,500 m, where each breath holds noticeably less oxygen. With sensible preparation, pilgrims of almost every age complete these yatras safely.',
      },
      { type: 'heading', level: 2, text: 'Start preparing six weeks ahead' },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Walk 4 to 5 km daily, adding stairs or gentle hills each week',
          'Practise deep breathing or pranayama for 15 minutes a day',
          'Get a full health check-up, especially for blood pressure, heart and lungs',
          'Discuss altitude medication with your doctor before you travel',
        ],
      },
      { type: 'heading', level: 2, text: 'On the yatra' },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Climb slowly and respect acclimatisation days',
          'Drink 3 to 4 litres of water a day',
          'Eat light, warm vegetarian meals',
          'Avoid alcohol and smoking',
          'Keep your head, hands and feet warm',
        ],
      },
      { type: 'heading', level: 2, text: 'Know the warning signs' },
      {
        type: 'paragraph',
        text: 'A mild headache and poor sleep on the first night are common. A persistent headache, vomiting, confusion or breathlessness at rest are not. Tell your tour manager immediately; oxygen and going down to a lower altitude are the most effective responses.',
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'General guidance only',
        text: 'Every body reacts differently to altitude. Follow your doctor’s advice and carry prescriptions for any medicines you take.',
      },
    ],
    publishedAt: '2026-07-22T06:00:00.000Z',
    updatedAt: '2026-07-22T06:00:00.000Z',
    isPublished: true,
    relatedPackageIds: ['pkg-kailash-overland-kathmandu', 'pkg-adi-kailash-kathgodam'],
    seo: {
      title: 'High-Altitude Yatra Health Tips: Acclimatisation Guide',
      description:
        'How to prepare for Kailash, Adi Kailash and other high-altitude yatras: fitness plan, acclimatisation habits and the warning signs of altitude sickness.',
      keywords: ['altitude sickness tips', 'kailash yatra fitness', 'acclimatisation for pilgrims'],
    },
  },
  {
    id: 'blog-muktinath-guide',
    slug: 'muktinath-temple-travel-guide',
    title: 'Muktinath Temple Guide: How to Reach from Kathmandu',
    excerpt:
      'How to reach Muktinath from Kathmandu and Pokhara, the best season to visit, and what to expect at the 108 water spouts.',
    coverImage: images.prayerFlagsPeak,
    author: yatraDesk,
    tags: ['Nepal', 'Muktinath'],
    content: [
      {
        type: 'paragraph',
        text: 'Muktinath, in the Mustang district of Nepal, is sacred to both Hindus and Buddhists. Vaishnavs count it among the 108 Divya Desams of Lord Vishnu, and pilgrims come to bathe under its 108 water spouts.',
      },
      { type: 'heading', level: 2, text: 'Getting there' },
      {
        type: 'paragraph',
        text: 'From Kathmandu, travel to Pokhara by road or a short flight. A morning flight then takes you to Jomsom through the Kali Gandaki gorge, and a jeep covers the last stretch to Muktinath.',
      },
      {
        type: 'list',
        style: 'bullet',
        items: [
          'Kathmandu to Pokhara: 6 to 7 hours by road or about 25 minutes by air',
          'Pokhara to Jomsom: about 20 minutes by air',
          'Jomsom to Muktinath: about 1.5 hours by jeep',
        ],
      },
      { type: 'heading', level: 2, text: 'Best time to visit' },
      {
        type: 'paragraph',
        text: 'March to May and October to December offer the most reliable flying weather. Winter brings snow and freezing winds, and the monsoon months often disrupt Jomsom flights.',
      },
      { type: 'heading', level: 2, text: 'At the temple' },
      {
        type: 'paragraph',
        text: 'Pilgrims walk under the 108 spouts of icy water and take dips in the two kunds in front of the temple. Carry a change of warm clothes and a towel. The walk from the jeep point to the temple takes about 15 minutes, and ponies are available.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Documents for Indian citizens',
        text: 'You need a passport or voter ID card to enter Nepal. Conservation area permits for Muktinath are arranged by your tour operator.',
      },
    ],
    publishedAt: '2026-06-18T06:00:00.000Z',
    updatedAt: '2026-06-18T06:00:00.000Z',
    isPublished: true,
    relatedPackageIds: ['pkg-muktinath-kathmandu', 'pkg-kathmandu-pokhara'],
    seo: {
      title: 'Muktinath Temple Guide: How to Reach from Kathmandu',
      description:
        'How to reach Muktinath from Kathmandu via Pokhara and Jomsom, the best months to visit, what to expect at the 108 water spouts and documents for Indians.',
      keywords: ['how to reach muktinath', 'muktinath temple guide', 'muktinath from kathmandu'],
    },
  },
];
