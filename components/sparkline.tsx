interface SparklineProps {
  data: readonly number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 22,
  color = '#00F57A',
}: SparklineProps): React.ReactElement {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
  const area = `${path} L${width},${height} L0,${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg width={width} height={height} className="block" aria-hidden>
      <path d={area} fill={color} opacity="0.15" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}
