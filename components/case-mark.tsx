import type { CaseShape } from '@/lib/constants';

interface CaseMarkProps {
  shape: CaseShape;
  size?: number;
}

export function CaseMark({ shape, size = 36 }: CaseMarkProps): React.ReactElement {
  const sw = 1.6;
  switch (shape) {
    case 'aperture':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth={sw} />
          <circle cx="16" cy="16" r="3.2" fill="currentColor" />
          <line x1="16" y1="1.5" x2="16" y2="6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
          <line x1="16" y1="26" x2="16" y2="30.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
          <line x1="1.5" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
          <line x1="26" y1="16" x2="30.5" y2="16" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case 'layers':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <rect x="3" y="22" width="26" height="4" rx="1" fill="currentColor" opacity="0.45" />
          <rect x="5" y="15" width="22" height="4" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="8" y="8" width="16" height="4" rx="1" fill="currentColor" />
        </svg>
      );
    case 'grid':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <rect x="5" y="5" width="10" height="10" rx="1.5" fill="currentColor" />
          <rect x="17" y="5" width="10" height="10" rx="1.5" fill="currentColor" opacity="0.4" />
          <rect x="5" y="17" width="10" height="10" rx="1.5" fill="currentColor" opacity="0.4" />
          <rect x="17" y="17" width="10" height="10" rx="1.5" fill="currentColor" />
        </svg>
      );
    case 'hex':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
          <polygon
            points="16,2.5 28,9.5 28,22.5 16,29.5 4,22.5 4,9.5"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <polygon
            points="16,10 22,13.5 22,18.5 16,22 10,18.5 10,13.5"
            fill="currentColor"
          />
        </svg>
      );
  }
}
