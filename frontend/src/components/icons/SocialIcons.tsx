/** Brand icons drawn locally (lucide-react 1.x no longer ships brand marks). */

interface IconProps {
  className?: string;
}

const svgProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const;

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} fill="currentColor">
      <path d="M14 8h3V4.5h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v3.5h2.5V22h3.6v-7.5h2.9l.5-3.5h-3.4V9.4c0-.9.4-1.4 1.4-1.4z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z"
      />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} fill="currentColor">
      <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3zm-1.1 16.2h1.7L7.1 4.7H5.3l11.1 14.5z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.4-1.5-3.2-2.8-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.4-.9 2.2.1 1 .5 2 1.1 2.8 1.2 1.7 2.7 3 4.6 3.7.6.2 1.2.3 1.8.2.7-.1 1.4-.6 1.8-1.2.1-.4.2-.8.1-1.2l-.9-.4z" />
    </svg>
  );
}
