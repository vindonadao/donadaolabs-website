/* eslint-disable @next/next/no-img-element */

interface LogoMarkProps {
  /** Visual size in pixels (square). Defaults to 41 (nav default). */
  size?: number;
  className?: string;
}

/**
 * Donadão Labs logo — hexagonal circuit-board mark with embedded DL letterforms
 * and central purple processor eye, rendered in phosphor green with CRT-style glow.
 *
 * The SVG file lives at `public/brand/logo-mark.svg` (vector, scales to any size
 * without loss). Uses native <img> instead of next/image because the SVG already
 * has built-in `<filter>` glow — Next.js image optimization would rasterize and
 * destroy the filter effect.
 */
export function LogoMark({ size = 41, className }: LogoMarkProps): React.ReactElement {
  return (
    <img
      src="/brand/logo-mark.svg"
      alt="Donadão Labs"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block' }}
    />
  );
}
