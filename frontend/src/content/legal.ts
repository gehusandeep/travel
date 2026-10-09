import { siteConfig } from '@/config/site';

/**
 * TEMPLATE LEGAL TEXT. It is a starting point only. Have every policy reviewed
 * by a qualified legal professional before publishing the website.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

const contactLine = `Email ${siteConfig.contact.email} or call ${siteConfig.contact.phone} (${siteConfig.contact.hours}).`;

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.legalName} collects, uses and protects your personal information.`,
  updatedAt: '2026-10-01',
  sections: [
    {
      heading: 'Information we collect',
      items: [
        'Contact details you share in our forms: name, phone number, email address and city.',
        'Trip details such as preferred travel month, group size, package of interest and your message.',
        'Booking documents you send us, such as passport or ID copies and medical certificates.',
        'Technical data: IP address, browser type, pages visited and campaign parameters (UTM tags).',
      ],
    },
    {
      heading: 'How we use your information',
      items: [
        'To respond to your enquiry and plan your yatra.',
        'To book stays, transport, permits and visas on your behalf.',
        'To send updates about your booking and, with your consent, offers for future departures.',
        'To protect our website from spam and abuse.',
      ],
    },
    {
      heading: 'Sharing your information',
      paragraphs: [
        'We share only what is necessary with hotels, transport providers, permit offices and visa authorities to deliver your yatra. We never sell your personal data.',
      ],
    },
    {
      heading: 'Data retention and security',
      paragraphs: [
        'Enquiry and booking records are kept only as long as needed for the purposes above or as required by law, and are protected with access controls.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'In line with the Digital Personal Data Protection Act, 2023, you can ask to access, correct or delete your personal data, or withdraw consent for marketing messages at any time.',
      ],
    },
    {
      heading: 'Cookies',
      paragraphs: [
        'We use essential cookies and local storage to run the website (for example, to remember your wishlist). Analytics cookies are used only with your consent.',
      ],
    },
    { heading: 'Contact us', paragraphs: [contactLine] },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: 'Terms and Conditions',
  description: `The terms that apply when you book a tour with ${siteConfig.legalName}.`,
  updatedAt: '2026-10-01',
  sections: [
    {
      heading: 'Bookings',
      paragraphs: [
        'A seat is reserved once we receive the booking (token) amount for each traveller, for example ₹5,100 per person on most Adi Kailash departures. You then receive a confirmation voucher by email, and our team calls you with the itinerary, documents and preparation details. Prices are per person unless stated otherwise.',
      ],
    },
    {
      heading: 'Payments',
      paragraphs: [
        'The token amount is not the full trip price. The balance is payable at the start of the journey unless your confirmation says otherwise. Government taxes such as GST are charged as applicable.',
      ],
    },
    {
      heading: 'Itinerary changes',
      paragraphs: [
        'Mountain travel depends on weather, road conditions and government orders. We may change routes, timings or stays to keep the group safe. Extra costs caused by such events are payable by the traveller unless included in the package.',
      ],
    },
    {
      heading: 'Health and fitness',
      paragraphs: [
        'High-altitude yatras require good health. Travellers must declare medical conditions honestly and carry the medical certificate needed for the Inner Line Permit. Our team may stop a traveller from continuing if their health is at risk.',
      ],
    },
    {
      heading: 'Travel documents',
      paragraphs: [
        'Travellers are responsible for carrying valid ID, passports and permits as advised. Delays or refusals by authorities are outside our control.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'We act as an agent for hotels, airlines and transport providers and are not liable for their acts or omissions, or for events beyond our reasonable control.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        `These terms are governed by the laws of India, and disputes are subject to the courts of ${siteConfig.address.district}, ${siteConfig.address.region}.`,
      ],
    },
    { heading: 'Questions', paragraphs: [contactLine] },
  ],
};

export const refundPolicy: LegalDocument = {
  title: 'Refund and Cancellation Policy',
  description: 'Cancellation charges, refunds and what happens if a departure is changed.',
  updatedAt: '2026-10-01',
  sections: [
    {
      heading: 'Cancellation by the traveller',
      paragraphs: ['Charges are calculated on the total package cost, based on when we receive your written cancellation:'],
      items: [
        '45 days or more before departure: 10% of the package cost',
        '30 to 44 days before departure: 25%',
        '15 to 29 days before departure: 50%',
        'Less than 15 days before departure, or no-show: 100%',
      ],
    },
    {
      heading: 'Non-refundable costs',
      paragraphs: [
        'Visa fees, permit charges, flight and helicopter tickets are non-refundable once issued, in addition to the charges above.',
      ],
    },
    {
      heading: 'Changes by us',
      paragraphs: [
        'If we cancel a departure, you can move to another date or receive a full refund of the amount paid, minus any non-refundable costs already incurred with your approval.',
      ],
    },
    {
      heading: 'Refund timelines',
      paragraphs: ['Approved refunds are processed to the original payment method within 14 working days.'],
    },
    { heading: 'Contact', paragraphs: [contactLine] },
  ],
};
