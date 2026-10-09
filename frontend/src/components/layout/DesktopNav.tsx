import { mainNavLinks, type NavGroup } from '@/config/navigation';
import { DestinationsMenu } from './DestinationsMenu';
import { NavLink } from './NavLink';
import { navItemClasses } from './nav-styles';

export function DesktopNav({ destinations }: { destinations: NavGroup[] }) {
  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        <DestinationsMenu groups={destinations} />
        {mainNavLinks.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} className={navItemClasses}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
