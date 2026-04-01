import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-ring disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 active:translate-y-[1px]",
  secondary:
    "bg-white text-slate-900 border border-slate-200/60 shadow-sm hover:bg-slate-50 active:translate-y-[1px]",
  ghost: "text-slate-700 hover:bg-slate-100/70 active:translate-y-[1px]",
  danger:
    "bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500 active:translate-y-[1px]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

