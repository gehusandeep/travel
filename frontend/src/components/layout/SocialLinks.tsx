import type { ComponentType } from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from '@/components/icons/SocialIcons';
import { siteConfig, type SocialNetwork } from '@/config/site';
import { cn } from '@/lib/utils/cn';

const NETWORKS: Array<{ key: SocialNetwork; label: string; Icon: ComponentType<{ className?: string }> }> = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'youtube', label: 'YouTube', Icon: YoutubeIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'x', label: 'X', Icon: XIcon },
];

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}

/** Renders an icon link for every network configured in siteConfig.social. */
export function SocialLinks({ className, linkClassName, iconClassName = 'h-4 w-4' }: SocialLinksProps) {
  const links = NETWORKS.flatMap(({ key, ...network }) => {
    const href = siteConfig.social[key];
    return href ? [{ key, href, ...network }] : [];
  });

  if (links.length === 0) return null;

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {links.map(({ key, href, label, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on ${label} (opens in a new tab)`}
            className={cn('grid h-8 w-8 place-items-center rounded-full transition-colors', linkClassName)}
          >
            <Icon className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
}
