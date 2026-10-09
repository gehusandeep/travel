import type { Faq } from '@/modules/faqs/faq.types';

/**
 * Booking and payment answers follow the agency's public booking pages
 * (token amount per traveller, balance at the start of the journey).
 * SAMPLE CONTENT: payment modes and age guidance still need review before launch.
 */
const generalFaqs: Faq[] = [
  {
    id: 'faq-book',
    question: 'How do I book a yatra?',
    answer:
      'Choose a batch and pay the booking (token) amount for each traveller, or call or WhatsApp us and we will reserve the seats for you. You receive a confirmation voucher by email, and our team then calls you with the itinerary, documents and preparation details.',
    topic: 'BOOKING',
    packageId: null,
    sortOrder: 1,
  },
  {
    id: 'faq-advance',
    question: 'How much do I pay to book, and when is the balance due?',
    answer:
      'Adi Kailash batches are reserved with a token amount per traveller: ₹5,100 for yatras from Pithoragarh and Kathgodam and ₹6,500 from Delhi. The token is not the full trip price; the remaining balance is paid at the start of the journey. Other destinations may need a different advance, which we confirm before you pay.',
    topic: 'PAYMENTS',
    packageId: null,
    sortOrder: 2,
  },
  {
    id: 'faq-custom',
    question: 'Can you customise a package for my family or group?',
    answer:
      'Yes. We plan private departures for families, societies and corporate groups, with your own dates, hotel category and extra temple visits.',
    topic: 'BOOKING',
    packageId: null,
    sortOrder: 3,
  },
  {
    id: 'faq-payment-modes',
    question: 'Which payment methods do you accept?',
    answer:
      'Pay the booking amount online through our secure Razorpay payment page (UPI, cards or net banking), or ask us for bank transfer details. You receive a receipt for every payment.',
    topic: 'PAYMENTS',
    packageId: null,
    sortOrder: 4,
  },
  {
    id: 'faq-cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'Cancellation charges depend on how close to departure you cancel and on non-refundable costs such as visas and flights. See our refund and cancellation policy for the full details.',
    topic: 'CANCELLATION',
    packageId: null,
    sortOrder: 5,
  },
  {
    id: 'faq-age',
    question: 'Is there an age limit for high-altitude yatras?',
    answer:
      'We recommend pilgrims between 12 and 70 years for Kailash Mansarovar and Adi Kailash, with a doctor’s fitness certificate. Seniors above 70 can consider helicopter packages after medical clearance. Final eligibility follows the permit rules in force at the time.',
    topic: 'HEALTH',
    packageId: null,
    sortOrder: 6,
  },
  {
    id: 'faq-altitude-prep',
    question: 'How should I prepare for high altitude?',
    answer:
      'Walk 4–5 km daily for at least six weeks before the yatra, practise breathing exercises and get a full health check-up. Discuss altitude medication with your doctor before you travel.',
    topic: 'HEALTH',
    packageId: null,
    sortOrder: 7,
  },
  {
    id: 'faq-food',
    question: 'Is the food vegetarian?',
    answer:
      'Yes. All meals on our yatras are pure vegetarian. Jain food and other dietary needs can be arranged on most routes if you tell us at booking.',
    topic: 'TRAVEL',
    packageId: null,
    sortOrder: 8,
  },
  {
    id: 'faq-adi-kailash-permit',
    question: 'Do I need a permit for Adi Kailash?',
    answer:
      'Yes. Indian citizens need an Inner Line Permit issued at Dharchula. Documents typically include Aadhaar, a medical certificate and photographs; we share the current checklist at booking and our Dharchula team completes the paperwork with you. Note that no Adi Kailash permits will be issued from 19 to 26 October 2026 because of the Adi Kailash Parikrama Run 2.0.',
    topic: 'PERMITS',
    packageId: null,
    sortOrder: 9,
  },
  {
    id: 'faq-nepal-id',
    question: 'Do Indian citizens need a passport for Nepal?',
    answer:
      'No visa is needed. Indian citizens can enter Nepal with a valid passport or voter ID card. Minors can travel with a school ID or birth certificate along with their parents.',
    topic: 'PERMITS',
    packageId: null,
    sortOrder: 10,
  },
];

const packageFaqs: Faq[] = [
  {
    id: 'faq-adp-book',
    question: 'How do I book this yatra from Pithoragarh?',
    answer:
      'Pay the booking amount of ₹5,100 per person online, or call or WhatsApp us. You receive a confirmation voucher by email, and the balance is paid at the start of the journey in Pithoragarh.',
    topic: 'BOOKING',
    packageId: 'pkg-adi-kailash-pithoragarh',
    sortOrder: 1,
  },
  {
    id: 'faq-adp-october',
    question: 'Can I travel in late October 2026?',
    answer:
      'Yes, after the permit pause. The administration will not issue Adi Kailash permits from 19 to 26 October 2026 because of the Adi Kailash Parikrama Run 2.0, so our batches start before or after that window.',
    topic: 'PERMITS',
    packageId: 'pkg-adi-kailash-pithoragarh',
    sortOrder: 2,
  },
  {
    id: 'faq-adp-vehicles',
    question: 'What vehicles do you use beyond Dharchula?',
    answer:
      '4×4 mountain vehicles, which handle the high, rough roads to Gunji, Jolingkong and Nabidhang far better than ordinary cars.',
    topic: 'TRAVEL',
    packageId: 'pkg-adi-kailash-pithoragarh',
    sortOrder: 3,
  },
  {
    id: 'faq-kmh-passport',
    question: 'Do I need a passport for this yatra?',
    answer:
      'Yes. Indian citizens need a passport valid for at least six months from the date of travel. We arrange the Chinese group visa and Tibet permits; you share passport scans and photographs at booking.',
    topic: 'PERMITS',
    packageId: 'pkg-kailash-heli-lucknow',
    sortOrder: 1,
  },
  {
    id: 'faq-kmh-skip-parikrama',
    question: 'Can I skip the parikrama?',
    answer:
      'Yes. Pilgrims who prefer not to trek can stay in Darchen while the group completes the parikrama, then rejoin them. Let us know at booking so we can plan your stay.',
    topic: 'TRAVEL',
    packageId: 'pkg-kailash-heli-lucknow',
    sortOrder: 2,
  },
  {
    id: 'faq-kmo-driving',
    question: 'How long are the driving days?',
    answer:
      'Most driving days in Tibet are 5 to 8 hours on paved highways, with stops for meals and photographs. The longest day is the return from the parikrama to Saga.',
    topic: 'TRAVEL',
    packageId: 'pkg-kailash-overland-kathmandu',
    sortOrder: 1,
  },
  {
    id: 'faq-kmo-join-kathmandu',
    question: 'Can I join the group directly in Kathmandu?',
    answer:
      'Yes. The package starts and ends in Kathmandu. We can also book your flights from any Indian city at extra cost.',
    topic: 'BOOKING',
    packageId: 'pkg-kailash-overland-kathmandu',
    sortOrder: 2,
  },
  {
    id: 'faq-kme-seniors',
    question: 'Is this package suitable for senior citizens?',
    answer:
      'Yes, there is no trekking. Because the ascent is quick, a medical fitness certificate is mandatory and we recommend a full check-up before booking.',
    topic: 'HEALTH',
    packageId: 'pkg-kailash-express-heli',
    sortOrder: 1,
  },
  {
    id: 'faq-kme-darshan',
    question: 'Will I see Mount Kailash without the parikrama?',
    answer:
      'Yes. On clear days you get darshan of the south face of Kailash from the shores of Lake Mansarovar.',
    topic: 'TRAVEL',
    packageId: 'pkg-kailash-express-heli',
    sortOrder: 2,
  },
  {
    id: 'faq-adk-passport',
    question: 'Do I need a passport for Adi Kailash?',
    answer:
      'No. Adi Kailash and Om Parvat are in India. Indian citizens need an Inner Line Permit issued at Dharchula, which we help you obtain.',
    topic: 'PERMITS',
    packageId: 'pkg-adi-kailash-kathgodam',
    sortOrder: 1,
  },
  {
    id: 'faq-adk-trek',
    question: 'Is there any trekking on this yatra?',
    answer:
      'Only short walks. Vehicles reach Jolingkong and Nabidhang, and the walks to the viewpoints take up to an hour at a slow pace. Patal Bhuvaneshwar involves a narrow, steep stairway into the cave.',
    topic: 'TRAVEL',
    packageId: 'pkg-adi-kailash-kathgodam',
    sortOrder: 2,
  },
  {
    id: 'faq-add-pickup',
    question: 'Where does the tour start in Delhi?',
    answer:
      'Pickup is from a central Delhi location, the airport or a Delhi railway station on the morning of day 1.',
    topic: 'BOOKING',
    packageId: 'pkg-adi-kailash-delhi',
    sortOrder: 1,
  },
  {
    id: 'faq-add-kainchi',
    question: 'Is Kainchi Dham open every day?',
    answer:
      'The ashram is generally open to visitors daily, but timings can change on festival days. Our team confirms the schedule a day before your visit.',
    topic: 'TRAVEL',
    packageId: 'pkg-adi-kailash-delhi',
    sortOrder: 2,
  },
  {
    id: 'faq-adh-cancelled',
    question: 'What happens if the helicopter is cancelled due to weather?',
    answer:
      'Mountain flights depend on visibility. If a flight is cancelled we either wait for the next slot or switch to road travel. Costs from long delays are explained before you book.',
    topic: 'TRAVEL',
    packageId: 'pkg-adi-kailash-heli',
    sortOrder: 1,
  },
  {
    id: 'faq-adh-luggage',
    question: 'How much luggage can I carry on the helicopter?',
    answer:
      'Luggage limits on mountain helicopters are strict, usually one small bag per person. Your main luggage can stay at the Pithoragarh hotel.',
    topic: 'TRAVEL',
    packageId: 'pkg-adi-kailash-heli',
    sortOrder: 2,
  },
  {
    id: 'faq-cdr-registration',
    question: 'Is registration mandatory for the Char Dham Yatra?',
    answer:
      'Yes. The Uttarakhand government requires every pilgrim to register before the yatra. We complete the registration for you using your ID details.',
    topic: 'PERMITS',
    packageId: 'pkg-char-dham-haridwar',
    sortOrder: 1,
  },
  {
    id: 'faq-cdr-pony',
    question: 'Can I book a helicopter or pony for Kedarnath?',
    answer:
      'Yes. Ponies and palkis can be arranged on the day, and helicopter tickets are booked in advance through the official portal. Tell us your preference at booking.',
    topic: 'TRAVEL',
    packageId: 'pkg-char-dham-haridwar',
    sortOrder: 2,
  },
  {
    id: 'faq-cdh-weight',
    question: 'Is there a weight limit for passengers?',
    answer:
      'Helicopter operators may set a body-weight limit per passenger and charge extra above it. We confirm the current rules at booking.',
    topic: 'TRAVEL',
    packageId: 'pkg-char-dham-heli',
    sortOrder: 1,
  },
  {
    id: 'faq-cdh-weather',
    question: 'What if bad weather delays the helicopter?',
    answer:
      'Morning flights are the most reliable. If weather delays a sector we reschedule within the day where possible, and our coordinator keeps you informed.',
    topic: 'TRAVEL',
    packageId: 'pkg-char-dham-heli',
    sortOrder: 2,
  },
  {
    id: 'faq-mkt-id',
    question: 'Do Indians need a visa or passport for Nepal?',
    answer:
      'No visa is needed. Indian citizens can travel with a valid passport or voter ID card. Minors can use a school ID or birth certificate along with their parents.',
    topic: 'PERMITS',
    packageId: 'pkg-muktinath-kathmandu',
    sortOrder: 1,
  },
  {
    id: 'faq-mkt-flight',
    question: 'What if the Jomsom flight is cancelled?',
    answer:
      'Jomsom flights operate in the morning and can be cancelled because of strong winds. We keep a jeep route as a backup, which may add a day.',
    topic: 'TRAVEL',
    packageId: 'pkg-muktinath-kathmandu',
    sortOrder: 2,
  },
  {
    id: 'faq-ktm-seniors',
    question: 'Is this tour suitable for elderly parents?',
    answer:
      'Yes. There is no trekking and all stays are in city hotels. We plan each day to keep walking light.',
    topic: 'HEALTH',
    packageId: 'pkg-kathmandu-pokhara',
    sortOrder: 1,
  },
  {
    id: 'faq-ktm-currency',
    question: 'Which currency should I carry?',
    answer:
      'Indian rupees in smaller denominations are widely accepted in Nepal. Nepali rupees are useful for small purchases, and cards work in most hotels.',
    topic: 'PAYMENTS',
    packageId: 'pkg-kathmandu-pokhara',
    sortOrder: 2,
  },
  {
    id: 'faq-kap-phones',
    question: 'Are mobile phones allowed inside the temples?',
    answer:
      'Phones, bags and leather items are not allowed inside Kashi Vishwanath and Shri Ram Janmabhoomi Mandir. Lockers are available near the entry gates.',
    topic: 'TRAVEL',
    packageId: 'pkg-kashi-ayodhya-prayagraj',
    sortOrder: 1,
  },
  {
    id: 'faq-kap-extend',
    question: 'Can we extend the tour to Bodh Gaya or Chitrakoot?',
    answer:
      'Yes. We can add extra days for Bodh Gaya, Chitrakoot or Naimisharanya. Send us an enquiry with your dates.',
    topic: 'BOOKING',
    packageId: 'pkg-kashi-ayodhya-prayagraj',
    sortOrder: 2,
  },
];

export const faqsData: Faq[] = [...generalFaqs, ...packageFaqs];
