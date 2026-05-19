interface SectionHeaderProps {
  idx: string;
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}

export function SectionHeader({ idx, eyebrow, title, sub }: SectionHeaderProps): React.ReactElement {
  return (
    <div className="px-6 pb-6 pt-20 md:px-10">
      <div className="mb-4.5 flex items-center gap-3">
        <span className="rounded-[4px] bg-purple px-2 py-[3px] font-mono text-[11px] text-offwhite">
          {idx}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-offwhite/55">
          {eyebrow}
        </span>
      </div>
      <h2 className="m-0 max-w-[900px] text-pretty font-display text-[clamp(2rem,5vw,3.125rem)] font-semibold leading-[1.05] tracking-brand-tight">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 max-w-[660px] text-[17px] text-offwhite/55">{sub}</p>
      )}
    </div>
  );
}
