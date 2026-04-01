import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { favouriteApi } from "../api/favouriteApi";
import type { Favourite } from "../types/favourite.types";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Loader } from "../components/common/Loader";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/ui/Button";
import { formatCurrency } from "../utils/formatCurrency";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export function FavouritesPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Favourite[]>([]);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await favouriteApi.getMine(currentPage, itemsPerPage);
        if (!mounted) return;
        setItems(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotal(res.pagination.total);
      } catch {
        toast.error("Failed to load favourites.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [currentPage, itemsPerPage]);

  async function remove(propertyId: string) {
    setPending((prev) => new Set(prev).add(propertyId));
    try {
      const res = await favouriteApi.remove(propertyId);
      toast.success(res.message ?? "Removed from favourites");
      // Reload the current page
      const res2 = await favouriteApi.getMine(currentPage, itemsPerPage);
      setItems(res2.data);
      setTotalPages(res2.pagination.totalPages);
      setTotal(res2.pagination.total);
    } catch {
      toast.error("Could not remove favourite.");
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(propertyId);
        return next;
      });
    }
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset to page 1
  };

  return (
    <Container className="py-10 sm:py-12">
      <div className="flex items-center justify-between gap-3">
        <SectionTitle
          eyebrow="My list"
          title="Favourites"
          subtitle="Only you can view and modify your saved properties."
        />
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <Loader label="Loading favourites…" />
        ) : total === 0 ? (
          <EmptyState
            title="No favourites yet"
            description="Browse properties and tap the heart to save your shortlist."
            action={
              <Link to="/dashboard">
                <Button>Explore properties</Button>
              </Link>
            }
          />
        ) : (
          <>
            {/* Items per page selector */}
            <div className="mb-4 flex items-center gap-3">
              <label htmlFor="items-select" className="text-sm font-medium text-slate-700">
                Show per page:
              </label>
              <select
                id="items-select"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={3}>3 items</option>
                <option value={6}>6 items</option>
                <option value={9}>9 items</option>
                <option value={12}>12 items</option>
              </select>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200/60">
                  <tr>
                    {["Property", "Location", "Price", "Added", "Actions"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-600 px-6 py-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((f) => (
                    <tr key={f.favouriteId} className="border-b border-slate-200/60 last:border-b-0">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-900">{f.property.title}</div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">{f.property.location}</td>
                      <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                        {formatCurrency(f.property.price)}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">{formatDate(f.addedAt)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Link to={`/properties/${f.property.id}`}>
                            <Button variant="secondary" size="sm">
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            disabled={pending.has(f.property.id)}
                            onClick={() => remove(f.property.id)}
                          >
                            {pending.has(f.property.id) ? "Removing…" : "Remove"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Mobile cards */}
            <div className="md:hidden grid gap-4">
              {items.map((f) => (
                <div
                  key={f.favouriteId}
                  className="rounded-2xl border border-slate-200/60 bg-white shadow-lg p-5"
                >
                  <div className="text-base font-semibold text-slate-900">{f.property.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{f.property.location}</div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-slate-500">Price</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {formatCurrency(f.property.price)}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-slate-500">Added</div>
                    <div className="text-sm text-slate-700">{formatDate(f.addedAt)}</div>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Link className="flex-1" to={`/properties/${f.property.id}`}>
                      <Button className="w-full" variant="secondary">
                        View
                      </Button>
                    </Link>
                    <Button
                      className="flex-1"
                      variant="danger"
                      disabled={pending.has(f.property.id)}
                      onClick={() => remove(f.property.id)}
                    >
                      {pending.has(f.property.id) ? "Removing…" : "Remove"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Pagination Controls */}
            {totalPages > 1 && (
              <div className="md:hidden mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
}

