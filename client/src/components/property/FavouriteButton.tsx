import { FiHeart } from "react-icons/fi";
import { cn } from "../../utils/cn";

export function FavouriteButton({
  active,
  loading,
  onClick,
}: {
  active: boolean;
  loading?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      disabled={loading}
      className={cn(
        "h-10 w-10 grid place-items-center rounded-xl border shadow-sm transition",
        "focus-ring",
        active
          ? "bg-rose-50 border-rose-200/70 text-rose-600 hover:bg-rose-100/60"
          : "bg-white border-slate-200/60 text-slate-700 hover:bg-slate-50",
      )}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
    >
      <FiHeart className={cn("transition", active ? "fill-rose-600" : "fill-transparent")} />
    </button>
  );
}

