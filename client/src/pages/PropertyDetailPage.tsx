import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { propertyApi } from "../api/propertyApi";
import { favouriteApi } from "../api/favouriteApi";
import type { Property } from "../types/property.types";
import type { Favourite } from "../types/favourite.types";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Loader } from "../components/common/Loader";
import { FavouriteButton } from "../components/property/FavouriteButton";
import { formatCurrency } from "../utils/formatCurrency";

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
      } else {
        const res = await favouriteApi.add({ propertyId });
        toast.success(res.message ?? "Added to favourites");
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
      <div className="flex items-center justify-between gap-3">
        <Link to="/dashboard">
          <Button variant="ghost">← Back</Button>
        </Link>
        <FavouriteButton active={isFav} onClick={toggleFavourite} loading={pending} />
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl">
        <div className="aspect-[16/9] bg-slate-100">
          <img
            src={pickImage(property.id)}
            alt={property.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
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
        </div>
      </div>
    </Container>
  );
}

