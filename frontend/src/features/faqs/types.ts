export const FAQ_TOPICS = ['BOOKING', 'PAYMENTS', 'CANCELLATION', 'TRAVEL', 'HEALTH', 'PERMITS'] as const;
export type FaqTopic = (typeof FAQ_TOPICS)[number];

export interface Faq {
  id: string;
  question: string;
  answer: string;
  topic: FaqTopic;
}

export const FAQ_TOPIC_LABELS: Record<FaqTopic, string> = {
  BOOKING: 'Booking',
  PAYMENTS: 'Payments',
  CANCELLATION: 'Cancellation',
  TRAVEL: 'On the yatra',
  HEALTH: 'Health and fitness',
  PERMITS: 'Permits and documents',
};
