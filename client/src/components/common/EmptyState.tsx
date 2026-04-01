import { cn } from "../../utils/cn";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white shadow-lg p-8 text-center",
        className,
      )}
    >
      <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-sm" />
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

