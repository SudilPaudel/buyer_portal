import { cn } from "../../utils/cn";

export function Input({
  label,
  hint,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-slate-900">{label}</span>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </div>
      <input
        {...props}
        className={cn(
          "mt-2 h-11 w-full rounded-xl border border-slate-200/60 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition",
          "placeholder:text-slate-400",
          "focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10",
          error ? "border-rose-300 focus:border-rose-300 focus:ring-rose-500/10" : null,
        )}
      />
      {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
    </label>
  );
}

