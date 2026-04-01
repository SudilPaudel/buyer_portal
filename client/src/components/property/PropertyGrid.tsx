import type { Property } from "../../types/property.types";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({
  properties,
  favouritePropertyIds,
  pendingPropertyIds,
  onToggleFavourite,
}: {
  properties: Property[];
  favouritePropertyIds: Set<string>;
  pendingPropertyIds: Set<string>;
  onToggleFavourite: (propertyId: string) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          isFavourited={favouritePropertyIds.has(p.id)}
          pending={pendingPropertyIds.has(p.id)}
          onToggleFavourite={() => onToggleFavourite(p.id)}
        />
      ))}
    </div>
  );
}

