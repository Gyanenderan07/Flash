import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Briefcase, ChevronRight, Cpu, Dumbbell, Footprints, Headphones, Home as HomeIcon, Shirt, Sparkles, Undo2, Watch, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import TopDeals, { TopDealsHeaderWithCountdown, TopDealsGrid } from "@/components/TopDeals";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/common/SafeImage";
import { categoryOrder, products, type Product } from "@/data/mockProducts";
import { getLiveStoreProducts } from "@/services/productService";

const categoryArt = ["camera", "hoodie", "shoe", "watch", "chair", "scent", "ball", "bag"];
const categorySlug = (category: string) => category.toLowerCase().replace(/\s+/g, "-");

function CategoryGlyph({ type }: { type: string }) {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0F1115] border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00] shadow-md shadow-[#CCFF00]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-[#0F1115] group-hover:border-[#CCFF00] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] shrink-0">
      {type === "camera" && <Cpu size={24} strokeWidth={2.2} />}
      {type === "hoodie" && <Shirt size={24} strokeWidth={2.2} />}
      {type === "shoe" && <Footprints size={24} strokeWidth={2.2} />}
      {type === "watch" && <Watch size={24} strokeWidth={2.2} />}
      {type === "chair" && <HomeIcon size={24} strokeWidth={2.2} />}
      {type === "scent" && <Sparkles size={24} strokeWidth={2.2} />}
      {type === "ball" && <Dumbbell size={24} strokeWidth={2.2} />}
      {type === "bag" && <Briefcase size={24} strokeWidth={2.2} />}
    </div>
  );
}

export function CategoryNavigationSection() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Explore Categories
        </h3>
        <Link
          to="/shop"
          className="text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 transition-colors"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-3 scroll-smooth">
        {categoryOrder.map((category, index) => (
          <Link
            key={category}
            to={`/shop?category=${categorySlug(category)}`}
            className="group flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 min-w-[100px] sm:min-w-[120px] transition-all hover:shadow-md hover:border-[#CCFF00]/60 shrink-0 text-center"
          >
            <CategoryGlyph type={categoryArt[index % categoryArt.length]} />
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mt-2.5 group-hover:text-[#88aa00] dark:group-hover:text-[#CCFF00] transition-colors truncate max-w-full">
              {category}
            </span>
          </Link>
        ))}

        <Link
          to="/shop"
          className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 min-w-[100px] sm:min-w-[120px] h-[104px] sm:h-[120px] transition-all hover:scale-105 shrink-0 text-center shadow-sm"
        >
          <span className="text-xs font-black leading-tight">
            View<br />All
          </span>
          <ChevronRight size={18} className="mt-1" />
        </Link>
      </div>
    </div>
  );
}

export function TrustPerksGrid() {
  const triggerSupport = () => {
    window.dispatchEvent(new CustomEvent("flash-open-support"));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/20 text-[#88aa00] dark:text-[#CCFF00] flex items-center justify-center shrink-0">
          <Zap size={20} fill="currentColor" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white truncate">
            Lightning Fast Delivery
          </h4>
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
            Get your order in a flash
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Undo2 size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white truncate">
            Easy Returns
          </h4>
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
            15-day hassle-free returns
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <BadgeCheck size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white truncate">
            Secure Payments
          </h4>
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
            Protected checkout flow
          </p>
        </div>
      </div>

      <div
        onClick={triggerSupport}
        className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-900 text-white dark:bg-[#14171E] border border-neutral-800 shadow-sm cursor-pointer hover:bg-neutral-800 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-[#CCFF00] text-black flex items-center justify-center shrink-0">
          <Headphones size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-black text-white truncate">
            Support Route
          </h4>
          <p className="text-[11px] font-medium text-neutral-400 truncate">
            Help is always in reach
          </p>
        </div>
        <ChevronRight size={16} className="text-[#CCFF00]" />
      </div>
    </div>
  );
}

export function FeaturedCatalogSection() {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(products.slice(0, 8));

  useEffect(() => {
    async function loadCatalog() {
      const live = await getLiveStoreProducts();
      if (live && live.length > 0) {
        setCatalogProducts(live.slice(0, 8));
      }
    }
    loadCatalog();
  }, []);

  return (
    <div className="space-y-8">
      {/* Promotional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-6 sm:p-8 text-white flex flex-col justify-between min-h-[220px] group border border-neutral-800">
          <div className="relative z-10 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#CCFF00]">Flash Club</p>
            <h3 className="text-xl sm:text-2xl font-black leading-tight">
              First dip. Fast lane.<br />More in every drop.
            </h3>
          </div>
          <div className="relative z-10 pt-4">
            <Link
              to="/flash-club"
              className="inline-flex items-center gap-2 text-xs font-black text-[#CCFF00] hover:underline"
            >
              Enter the club <ArrowRight size={14} />
            </Link>
          </div>
          <Zap
            size={120}
            className="absolute -bottom-6 -right-6 text-neutral-900 group-hover:text-[#CCFF00]/10 transition-colors pointer-events-none"
            fill="currentColor"
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 sm:p-8 text-black flex flex-col justify-between min-h-[220px] group shadow-md">
          <div className="relative z-10 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-black/70">Extra 10% prepaid</p>
            <h3 className="text-xl sm:text-2xl font-black leading-tight text-neutral-950">
              Let the savings<br />move first.
            </h3>
          </div>
          <div className="relative z-10 pt-4">
            <span className="inline-block px-3 py-1.5 rounded-xl bg-black text-[#CCFF00] text-xs font-black">
              Use code: <b>FLASH10</b>
            </span>
          </div>
          <div className="absolute -bottom-4 -right-2 text-7xl font-black text-black/15 pointer-events-none select-none">
            %
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-[#14171E] p-6 sm:p-8 text-neutral-900 dark:text-white flex flex-col justify-between min-h-[220px] group border border-neutral-200/80 dark:border-neutral-800/80">
          <div className="relative z-10 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-neutral-400">New arrivals</p>
            <h3 className="text-xl sm:text-2xl font-black leading-tight">
              Just dropped.<br />Already in motion.
            </h3>
          </div>
          <div className="relative z-10 pt-4">
            <Link
              to="/shop?collection=new-in"
              className="inline-flex items-center gap-2 text-xs font-black text-neutral-900 dark:text-[#CCFF00] hover:underline"
            >
              Catch the drop <ArrowRight size={14} />
            </Link>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity">
            <SafeImage
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
              alt="Black running sneaker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Curated Catalog
          </h3>
          <Link
            to="/shop"
            className="text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            Explore all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {catalogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Brand Band */}
      <div className="rounded-3xl bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
            Trusted at the speed of now.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Sharp finds, straight pricing and service that keeps pace.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-[#CCFF00] font-black text-xs">
            <Zap size={14} fill="currentColor" /> Flash
          </span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs uppercase">NEXORA</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs uppercase">VANTAGE</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs uppercase">URBANIC</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs uppercase">ZAPSTER</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#08090C] text-neutral-900 dark:text-white selection:bg-[#CCFF00] selection:text-black overflow-x-hidden">
      {/* 1. HERO SLIDER BANNER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <HeroSection />
      </section>

      {/* 2. TOP DEALS & EXPIRING OFFERS (Placed Directly at Top) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <TopDealsHeaderWithCountdown />
        <TopDealsGrid />
      </section>

      {/* 3. CATEGORIES HORIZONTAL SCROLLER / GRID */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <CategoryNavigationSection />
      </section>

      {/* 4. VALUE PROPOSITIONS & TRUST PERKS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
        <TrustPerksGrid />
      </section>

      {/* 5. CURATED CATALOG / FLASH CLUB BANNER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        <FeaturedCatalogSection />
      </section>
    </div>
  );
}
