import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { propertyApi } from "../api/propertyApi";
import { favouriteApi } from "../api/favouriteApi";
import type { Property } from "../types/property.types";
import type { Favourite } from "../types/favourite.types";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Loader } from "../components/common/Loader";
import { EmptyState } from "../components/common/EmptyState";
import { PropertyGrid } from "../components/property/PropertyGrid";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";

export function DashboardPage() {
  const { user } = useAuth();
  const { incrementCount, decrementCount } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [pending, setPending] = useState<Set<string>>(new Set());

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [propsRes, favRes] = await Promise.all([propertyApi.getAll(), favouriteApi.getMine(1, 1000)]);
        if (!mounted) return;
        setProperties(propsRes.data);
        setFavourites(favRes.data);
      } catch {
        toast.error("Failed to load dashboard data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const favouritePropertyIds = useMemo(() => {
    return new Set(favourites.map((f) => f.property.id));
  }, [favourites]);

  async function toggleFavourite(propertyId: string) {
    setPending((prev) => new Set(prev).add(propertyId));
    const isFav = favouritePropertyIds.has(propertyId);
    try {
      if (isFav) {
        const res = await favouriteApi.remove(propertyId);
        toast.success(res.message ?? "Favourite removed");
        setFavourites((prev) => prev.filter((f) => f.property.id !== propertyId));
        decrementCount();
      } else {
        const res = await favouriteApi.add({ propertyId });
        toast.success(res.message ?? "Added to favourites");
        // Refresh with large limit to get all favorites
        const favRes = await favouriteApi.getMine(1, 1000);
        setFavourites(favRes.data);
        incrementCount();
        void res; // keep for typing
      }
    } catch {
      toast.error("Could not update favourites. Please try again.");
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(propertyId);
        return next;
      });
    }
  }

  return (
    <Container className="py-10 sm:py-12">
      <div className="rounded-3xl border border-slate-200/60 bg-white shadow-xl p-7 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-slate-500">Welcome Back,</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{user?.name}</div>
            <div className="mt-1 text-sm text-slate-500">
              {/* make the initial letter capital of role */}
              Role: <span className="font-medium text-slate-700">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "-"}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-slate-50 px-4 py-3">
            <div className="text-xs text-slate-500">My favourites</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {favourites.length} saved
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle
          eyebrow="Properties"
          title="Explore available listings"
          subtitle="Tap the heart to save properties to your favourites."
        />
        <div className="mt-6">
          {loading ? (
            <Loader label="Loading properties…" />
          ) : properties.length === 0 ? (
            <EmptyState title="No properties yet" description="When listings are added, they’ll appear here." />
          ) : (
            <PropertyGrid
              properties={properties}
              favouritePropertyIds={favouritePropertyIds}
              pendingPropertyIds={pending}
              onToggleFavourite={toggleFavourite}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

