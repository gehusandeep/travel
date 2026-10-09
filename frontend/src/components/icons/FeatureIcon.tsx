import {
  Award,
  Backpack,
  BadgeCheck,
  BadgeIndianRupee,
  BedDouble,
  Bike,
  BookOpen,
  CalendarCheck,
  CarFront,
  Compass,
  Footprints,
  Gift,
  HandHeart,
  Headphones,
  HeartPulse,
  Hourglass,
  Leaf,
  MountainSnow,
  Route,
  ScrollText,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Tent,
  UsersRound,
  Utensils,
  type LucideIcon,
} from 'lucide-react';

/**
 * Content files refer to icons by name, so copy can live outside React
 * (and later in a CMS) without importing components.
 */
export const featureIcons = {
  calendar: CalendarCheck,
  guide: UsersRound,
  permit: ScrollText,
  oxygen: HeartPulse,
  food: Utensils,
  price: BadgeIndianRupee,
  helpline: Headphones,
  pace: Hourglass,
  shield: ShieldCheck,
  tent: Tent,
  gift: Gift,
  award: Award,
  compass: Compass,
  care: HandHeart,
  mountain: MountainSnow,
  leaf: Leaf,
  jacket: Shirt,
  backpack: Backpack,
  bag: ShoppingBag,
  mala: Sparkles,
  book: BookOpen,
  winter: Snowflake,
  solo: Footprints,
  bike: Bike,
  jeep: CarFront,
  stay: BedDouble,
  route: Route,
  verified: BadgeCheck,
} satisfies Record<string, LucideIcon>;

export type FeatureIconName = keyof typeof featureIcons;

export function FeatureIcon({ name, className }: { name: FeatureIconName; className?: string }) {
  const Icon = featureIcons[name];
  return <Icon className={className} aria-hidden="true" />;
}
