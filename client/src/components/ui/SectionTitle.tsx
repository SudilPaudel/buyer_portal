import { cn } from "../../utils/cn";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">{eyebrow}</div>
      ) : null}
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

