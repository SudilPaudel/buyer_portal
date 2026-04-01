import { cn } from "../../utils/cn";

export function Loader({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-slate-600", className)}>
      <span className="relative inline-flex h-5 w-5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500/30" />
        <span className="relative inline-flex h-5 w-5 rounded-full bg-indigo-600" />
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

