/**
 * Flash CategoryHero Component — Compact, sleek, balanced category hero banner (h-[220px] sm:h-[240px] md:h-[260px])
 * with proportional hero image, floating micro product tag, and smooth CTA button.
 */
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/mockProducts";
import SafeImage from "@/components/common/SafeImage";

export default function CategoryHero({
  categoryTitle,
  itemCount,
  heroImage,
  featuredProduct,
  scrollToProducts,
}: {
  categoryTitle?: string;
  itemCount?: number;
  heroImage?: string;
  featuredProduct?: Product;
  scrollToProducts?: () => void;
}) {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (scrollToProducts) {
      scrollToProducts();
    } else if (featuredProduct) {
      navigate(`/product/${featuredProduct.id}`);
    }
  };

  const displayImage = heroImage ?? featuredProduct?.image ?? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#F8FAFC] border border-[#E5E7EB] h-[220px] sm:h-[240px] md:h-[260px] flex items-center justify-between shadow-sm">
        {/* Left Content Area (Text & CTA) */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-center max-w-lg">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#7CAE00] mb-1.5">
            {categoryTitle ? `${categoryTitle} In Motion` : "Flash Edit In Motion"}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F1115] tracking-tight leading-tight">
            A sharper edit. <br />
            <span className="text-[#5B8C00]">Picked to move.</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 mt-2 font-medium">
            {itemCount ?? 24} ready to dispatch
          </p>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-[#0F1115] hover:bg-neutral-800 text-white text-xs font-bold py-2.5 px-5 rounded-full transition-all duration-150 cursor-pointer"
            >
              <span>Meet the lead find</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* Right Hero Product Image (Compact & Proportional) */}
        <div className="relative h-full w-[40%] sm:w-[45%] md:w-[48%] flex-shrink-0 flex items-center justify-center overflow-hidden">
          {/* Background Image / Hero Image */}
          <SafeImage
            src={displayImage}
            alt={featuredProduct?.name ?? "Category Hero"}
            className="w-full h-full object-cover object-center"
          />

          {/* Floating Micro Product Tag */}
          {featuredProduct && (
            <div className="absolute bottom-4 right-4 bg-[#0F1115]/90 backdrop-blur-md border border-white/10 text-white rounded-xl p-2.5 px-3.5 shadow-xl hidden sm:flex flex-col">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                {featuredProduct.brand}
              </span>
              <span className="text-xs font-black text-white truncate max-w-[160px]">
                {featuredProduct.name}
              </span>
              <span className="text-xs font-black text-[#CCFF00] mt-0.5">
                ₹{featuredProduct.price.toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
