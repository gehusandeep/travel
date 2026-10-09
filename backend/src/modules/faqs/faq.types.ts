export const FAQ_TOPICS = ['BOOKING', 'PAYMENTS', 'CANCELLATION', 'TRAVEL', 'HEALTH', 'PERMITS'] as const;
export type FaqTopic = (typeof FAQ_TOPICS)[number];

export interface Faq {
  id: string;
  question: string;
  answer: string;
  topic: FaqTopic;
  /** null = general FAQ shown on the FAQ page; otherwise it belongs to one package. */
  packageId: string | null;
  sortOrder: number;
}

export interface FaqView {
  id: string;
  question: string;
  answer: string;
  topic: FaqTopic;
}
