interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 28, className }: LogoMarkProps): React.ReactElement {
  const id = `dl-logo-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#056B30" />
          <stop offset="100%" stopColor="#00F57A" />
        </linearGradient>
      </defs>
      <rect x={1} y={16} width={6} height={11} rx={1.5} fill="#056B30" opacity={0.85} />
      <rect x={11} y={9} width={6} height={18} rx={1.5} fill={`url(#${id})`} opacity={0.95} />
      <rect x={21} y={2} width={6} height={25} rx={1.5} fill="#00F57A" />
      <circle cx={24} cy={5} r={1.5} fill="#070709" />
    </svg>
  );
}
