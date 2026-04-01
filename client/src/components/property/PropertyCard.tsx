import { Link } from "react-router-dom";
import type { Property } from "../../types/property.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { cn } from "../../utils/cn";
import { FavouriteButton } from "./FavouriteButton";

const placeholderImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02c8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
];

function pickImage(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return placeholderImages[hash % placeholderImages.length];
}

export function PropertyCard({
  property,
  isFavourited,
  onToggleFavourite,
  pending,
}: {
  property: Property;
  isFavourited: boolean;
  onToggleFavourite: () => void;
  pending?: boolean;
}) {
  const img = pickImage(property.id);

  return (
    <div
      className={cn(
        "group rounded-2xl border border-slate-200/60 bg-white shadow-lg transition-transform",
        "hover:-translate-y-0.5 hover:shadow-xl",
      )}
    >
      <Link to={`/properties/${property.id}`} className="block overflow-hidden rounded-t-2xl">
        <div className="relative bg-slate-100">
          <img
            src={img}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 from-slate-950/20 via-transparent to-transparent" />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/properties/${property.id}`} className="block">
              <h3 className="truncate text-base font-semibold text-slate-900">{property.title}</h3>
            </Link>
            <p className="mt-1 text-sm text-slate-500">{property.location}</p>
          </div>
          <FavouriteButton active={isFavourited} onClick={onToggleFavourite} loading={pending} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">Price</div>
          <div className="text-sm font-semibold text-slate-900">{formatCurrency(property.price)}</div>
        </div>
      </div>
    </div>
  );
}

