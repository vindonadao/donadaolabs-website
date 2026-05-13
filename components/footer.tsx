import { LogoMark } from '@/components/logo-mark';

export function Footer(): React.ReactElement {
  return (
    <footer className="flex flex-col gap-3 border-t border-white/[0.08] px-6 py-8 font-mono text-[11px] text-offwhite/55 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex items-center gap-2.5">
        <LogoMark size={18} />
        <span>© 2026 donadão/labs · donadaolabs.com</span>
      </div>
      <span>build · 2026.05.13 · live</span>
    </footer>
  );
}
