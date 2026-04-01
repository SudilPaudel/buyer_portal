import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";
import { propertyApi } from "../api/propertyApi";
import { favouriteApi } from "../api/favouriteApi";
import type { Property } from "../types/property.types";
import type { Favourite } from "../types/favourite.types";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/common/Loader";
import { formatCurrency } from "../utils/formatCurrency";
import { useFavorites } from "../hooks/useFavorites";
import { Heart } from "lucide-react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02c8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
];

function pickImage(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return placeholderImages[hash % placeholderImages.length];
}

export function PropertyDetailPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [pending, setPending] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { incrementCount, decrementCount } = useFavorites();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!propertyId) return;
      setLoading(true);
      try {
        const [pRes, fRes] = await Promise.all([
          propertyApi.getById(propertyId),
          favouriteApi.getMine(),
        ]);
        if (!mounted) return;
        setProperty(pRes.data);
        setFavourites(fRes.data);
      } catch {
        toast.error("Failed to load property.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [propertyId]);

  const isFav = useMemo(() => {
    if (!propertyId) return false;
    return favourites.some((f) => f.property.id === propertyId);
  }, [favourites, propertyId]);

  async function toggleFavourite() {
    if (!propertyId) return;
    setPending(true);
    try {
      if (isFav) {
        const res = await favouriteApi.remove(propertyId);
        toast.success(res.message ?? "Favourite removed");
        decrementCount();
      } else {
        const res = await favouriteApi.add({ propertyId });
        toast.success(res.message ?? "Added to favourites");
        incrementCount();
      }
      const fRes = await favouriteApi.getMine();
      setFavourites(fRes.data);
    } catch {
      toast.error("Could not update favourites.");
    } finally {
      setPending(false);
    }
  }

  if (loading) {
    return (
      <Container className="py-12">
        <Loader label="Loading property…" />
      </Container>
    );
  }

  if (!property) {
    return (
      <Container className="py-12">
        <div className="rounded-3xl border border-slate-200/60 bg-white shadow-xl p-10">
          <div className="text-lg font-semibold text-slate-900">Property not found</div>
          <p className="mt-2 text-sm text-slate-500">This property may have been removed.</p>
          <div className="mt-6">
            <Link to="/dashboard">
              <Button variant="secondary">Back to dashboard</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-12">
      <div className="flex items-center justify-start gap-3">
        <Link to="/dashboard">
          <Button variant="ghost">← Back</Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl">
        <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center">
          {imageError ? (
            <div className="flex flex-col items-center justify-center">
              <Building2 className="h-16 w-16 text-slate-300" />
              <p className="mt-2 text-sm text-slate-400">Image unavailable</p>
            </div>
          ) : (
            <img
              src={pickImage(property.id)}
              alt={property.title}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">{property.title}</h1>
              <p className="mt-2 text-sm text-slate-500">{property.location}</p>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50 px-5 py-4">
              <div className="text-xs text-slate-500">Price</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {formatCurrency(property.price)}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Broker verified", v: "Trusted listing" },
              { k: "Smooth UX", v: "Clear states" },
              { k: "Favourites", v: "Saved per-user" },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-2xl border border-slate-200/60 bg-white shadow-sm p-5"
              >
                <div className="text-xs text-slate-500">{m.k}</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{m.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200/60 flex justify-end">
            <button
              onClick={toggleFavourite}
              disabled={pending}
              className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                isFav
                  ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                  : "border-green-500 bg-green-50 text-green-600 hover:bg-green-100"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
              {isFav ? "Remove From Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

