import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { propertyApi } from "../../api/propertyApi";
import type { Property } from "../../types/property.types";
import { Loader } from "../common/Loader";
import { formatCurrency } from "../../utils/formatCurrency";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";

// Swiper styles
const swiperStyles = `
  .swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .swiper-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .property-slider {
    width: 100%;
  }
  .swiper-button-next-custom:after,
  .swiper-button-prev-custom:after {
    content: '';
  }
`;

// Dynamic image array for properties
const propertyImages = [
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

export function PropertySlider() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (propertyId: string) => {
    setFailedImages((prev) => new Set(prev).add(propertyId));
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data } = await propertyApi.getAll();
        if (Array.isArray(data)) {
          setProperties(data.slice(0, 10)); // Limit to 10 properties for slider
        }
      } catch (err) {
        setError("Failed to load properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (properties.length === 0) return null;

  return (
    <>
      <style>{swiperStyles}</style>
      <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="property-slider"
      >
        {properties.map((property, index) => (
          <SwiperSlide key={property.id}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl">
              <div className="bg-slate-100 w-full flex items-center justify-center" style={{ height: "400px", width: "100%" }}>
                {failedImages.has(property.id) ? (
                  <Building2 className="w-16 h-16 text-slate-400" />
                ) : (
                  <img
                    src={property.image || propertyImages[index % propertyImages.length]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(property.id)}
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{property.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{property.location} • Featured</div>
                  </div>
                  <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    Premium
                  </div>
                </div>
                <div className="mt-4 text-lg font-bold text-indigo-600">
                  {formatCurrency(parseInt(property.price))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["Modern design", "Prime location", "Great value"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-slate-200/60 bg-slate-50 p-3 text-xs text-slate-600"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900 rounded-full p-2 shadow-lg hover:bg-slate-800 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-900 rounded-full p-2 shadow-lg hover:bg-slate-800 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
    </>
  );
}
