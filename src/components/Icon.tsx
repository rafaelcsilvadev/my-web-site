export type IconName =
  | "download"
  | "mail"
  | "linkedin"
  | "github"
  | "whatsapp"
  | "menu"
  | "close"
  | "arrow";

type IconProps = {
  name: IconName;
  className?: string;
};

const SHAPES: Record<IconName, React.ReactNode> = {
  download: (
    <>
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M12 13a2 2 0 0 1 4 0v3" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.5-4-2-6-2.5m12 4.5v-3.5a3 3 0 0 0-.8-2.3c2.800-.3 5.800-1.400 5.800-6.200a4.800 4.800 0 0 0-1.300-3.300 4.500 4.500 0 0 0-.1-3.300s-1.100-.3-3.500 1.300a12 12 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.500 4.500 0 0 0-.1 3.300A4.800 4.800 0 0 0 4 9.700c0 4.800 3 5.900 5.800 6.200a3 3 0 0 0-.8 2.300V21" />
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.700-5A8.500 8.500 0 1 1 8 19.300L3 21Z" />
      <path d="M9 9.500c0 3 2.500 5.500 5.500 5.500l1-1.500-2-1-.8.800a3.500 3.500 0 0 1-1.500-1.500l.8-.8-1-2L9 9.500Z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {SHAPES[name]}
    </svg>
  );
}
