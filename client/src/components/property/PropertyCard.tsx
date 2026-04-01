import { Link } from "react-router-dom";
import { useState } from "react";
import { Building2 } from "lucide-react";
import type { Property } from "../../types/property.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { cn } from "../../utils/cn";
import { FavouriteButton } from "./FavouriteButton";

const placeholderImages = [
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600",
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
  const [imageError, setImageError] = useState(false);
  const img = pickImage(property.id);

  return (
    <div
      className={cn(
        "group rounded-2xl border border-slate-200/60 bg-white shadow-lg transition-transform",
        "hover:-translate-y-0.5 hover:shadow-xl",
      )}
    >
      <Link to={`/properties/${property.id}`} className="block overflow-hidden rounded-t-2xl">
        <div className="relative h-64 bg-slate-100">
          {!imageError ? (
            <img
              src={img}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <Building2 className="h-16 w-16 text-slate-400" />
            </div>
          )}
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

