import type { Category } from '@/modules/categories/category.types';
import { images } from './images';

/** Static category tree. Slugs are globally unique; URLs nest them by parent. */
export const categoriesData: Category[] = [
  {
    id: 'cat-kailash',
    slug: 'kailash-mansarovar-yatra',
    name: 'Kailash Mansarovar Yatra',
    shortDescription: 'Helicopter and overland yatras to Mount Kailash and Lake Mansarovar in Tibet.',
    description:
      'Mount Kailash is revered as the abode of Lord Shiva, and Lake Mansarovar at its foot is among the holiest lakes in Hindu, Buddhist and Jain tradition. Choose a helicopter route via Nepalgunj and Simikot, an overland journey from Kathmandu, or a short darshan-only express yatra.',
    image: images.dramaticSnowPeak,
    parentId: null,
    sortOrder: 2,
    isFeatured: true,
    seo: {
      title: 'Kailash Mansarovar Yatra 2027 Packages, Dates and Cost',
      description:
        'Compare Kailash Mansarovar Yatra 2027 packages by helicopter and overland. Fixed departures from May to September with visas, permits and Indian tour managers.',
      keywords: ['kailash mansarovar yatra 2027', 'kailash yatra by helicopter', 'kailash yatra cost'],
    },
  },
  {
    id: 'cat-uttarakhand',
    slug: 'uttarakhand',
    name: 'Uttarakhand Tours',
    shortDescription: 'Adi Kailash, Om Parvat and Char Dham yatras across Devbhoomi Uttarakhand.',
    description:
      'Uttarakhand, known as Devbhoomi or the land of the gods, is home to the Adi Kailash and Om Parvat circuit in Kumaon and the Char Dham shrines in Garhwal. Our team in Dharchula handles permits, vehicles, stays and mountain logistics.',
    image: images.kutiVillageSnow,
    parentId: null,
    sortOrder: 1,
    isFeatured: false,
    seo: {
      title: 'Uttarakhand Pilgrimage Tour Packages 2026–27',
      description:
        'Uttarakhand pilgrimage packages: Adi Kailash and Om Parvat from Pithoragarh, Kathgodam and Delhi, and Char Dham by road and helicopter, with a local team.',
    },
  },
  {
    id: 'cat-adi-kailash',
    slug: 'adi-kailash-yatra',
    name: 'Adi Kailash & Om Parvat',
    shortDescription: 'Our home valleys: Adi Kailash, Parvati Sarovar and Om Parvat from Dharchula.',
    description:
      'Adi Kailash, also called Chhota Kailash, rises above the Kuthi valley in Pithoragarh district near the India–Tibet border, with Parvati Sarovar at its foot. Nearby, snow traces the sacred "ॐ" on the face of Om Parvat. No passport is needed; Indian citizens travel on an Inner Line Permit, which our Dharchula team arranges.',
    image: images.adiKailashPeakWide,
    parentId: 'cat-uttarakhand',
    sortOrder: 1,
    isFeatured: true,
    seo: {
      title: 'Adi Kailash & Om Parvat Yatra 2026–27 Packages',
      description:
        'Adi Kailash and Om Parvat Yatra packages from Pithoragarh, Kathgodam and Delhi with a local Dharchula team: Inner Line Permit help, 4×4 vehicles and fixed batches.',
      keywords: ['adi kailash yatra 2026', 'om parvat yatra', 'adi kailash tour package', 'parvati sarovar'],
    },
  },
  {
    id: 'cat-char-dham',
    slug: 'char-dham-yatra',
    name: 'Char Dham Yatra',
    shortDescription: 'Yamunotri, Gangotri, Kedarnath and Badrinath by road or helicopter.',
    description:
      'The Char Dham Yatra visits the four sacred shrines of the Garhwal Himalaya: Yamunotri, Gangotri, Kedarnath and Badrinath. Travel by road from Haridwar with a night at Kedarnath, or fly between the dhams by helicopter.',
    image: images.riverValley,
    parentId: 'cat-uttarakhand',
    sortOrder: 2,
    isFeatured: true,
    seo: {
      title: 'Char Dham Yatra 2027 Packages by Road and Helicopter',
      description:
        'Char Dham Yatra 2027 packages from Haridwar and Dehradun by road or helicopter, with registration support, comfortable stays and fixed departures.',
      keywords: ['char dham yatra 2027', 'char dham by helicopter', 'char dham package from haridwar'],
    },
  },
  {
    id: 'cat-nepal',
    slug: 'nepal-tours',
    name: 'Nepal Spiritual Tours',
    shortDescription: 'Pashupatinath, Muktinath, Pokhara and the temples of Kathmandu valley.',
    description:
      'Nepal combines great Hindu and Buddhist sites with easy travel for Indian citizens, who need only a passport or voter ID. Visit Pashupatinath and the stupas of Kathmandu, the lakes of Pokhara and Muktinath high in Mustang.',
    image: images.stupaHimalaya,
    parentId: null,
    sortOrder: 3,
    isFeatured: true,
    seo: {
      title: 'Nepal Spiritual Tour Packages from India',
      description:
        'Nepal spiritual tour packages: Pashupatinath, Muktinath, Kathmandu and Pokhara. No visa needed for Indian citizens. Fixed departures through the year.',
    },
  },
  {
    id: 'cat-muktinath',
    slug: 'muktinath-yatra',
    name: 'Muktinath Dham',
    shortDescription: 'Fly to Jomsom and bathe under the 108 water spouts at Muktinath.',
    description:
      'Muktinath sits at about 3,710 m in Mustang district and is one of the 108 Divya Desams of Lord Vishnu. Buddhists honour the same site as Chumig Gyatsa. Our yatras fly from Pokhara to Jomsom through the Kali Gandaki gorge.',
    image: images.prayerFlagsPeak,
    parentId: 'cat-nepal',
    sortOrder: 1,
    isFeatured: false,
    seo: {
      title: 'Muktinath Yatra Packages from Kathmandu',
      description:
        'Muktinath Yatra packages from Kathmandu via Pokhara and Jomsom, with Pashupatinath darshan, flights, permits and vegetarian meals.',
    },
  },
  {
    id: 'cat-spiritual-india',
    slug: 'spiritual-india',
    name: 'Spiritual India',
    shortDescription: 'Kashi, Ayodhya, Prayagraj and other great temple towns of India.',
    description:
      'Short, comfortable temple tours across India for families and seniors. Watch the Ganga aarti in Varanasi, take darshan at Shri Ram Janmabhoomi in Ayodhya and bathe at the Triveni Sangam in Prayagraj.',
    image: images.varanasiGhats,
    parentId: null,
    sortOrder: 4,
    isFeatured: false,
    seo: {
      title: 'Spiritual India Tour Packages: Kashi, Ayodhya, Prayagraj',
      description:
        'Temple tour packages across India including Kashi Vishwanath, Ayodhya Ram Mandir and Prayagraj Sangam, with comfortable stays and local guides.',
    },
  },
];
