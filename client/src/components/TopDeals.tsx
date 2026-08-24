import { useEffect, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/data/mockProducts";
import { getLiveStoreProducts } from "@/services/productService";

export function TopDealsHeaderWithCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 46, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        // Reset/Loop back to 08:00:00
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-[#CCFF00]">
          <Flame size={15} fill="currentColor" />
          <span>Today's pace</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
          Best deals right now
        </h2>
      </div>

      {/* Countdown Timer & CTA */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-[#14171E] p-2 sm:p-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60">
          <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 px-1 hidden sm:inline">
            Offers refresh in:
          </span>
          <div className="flex items-center gap-1">
            <div className="flex flex-col items-center justify-center bg-white dark:bg-black px-2.5 py-1 rounded-xl min-w-[38px] shadow-sm">
              <span className="text-sm font-black text-neutral-900 dark:text-white leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase">Hrs</span>
            </div>
            <span className="text-neutral-400 font-bold">:</span>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-black px-2.5 py-1 rounded-xl min-w-[38px] shadow-sm">
              <span className="text-sm font-black text-neutral-900 dark:text-white leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase">Min</span>
            </div>
            <span className="text-neutral-400 font-bold">:</span>
            <div className="flex flex-col items-center justify-center bg-black dark:bg-[#CCFF00] text-white dark:text-black px-2.5 py-1 rounded-xl min-w-[38px] shadow-sm">
              <span className="text-sm font-black text-[#CCFF00] dark:text-black leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-bold text-neutral-400 dark:text-black/70 uppercase">Secs</span>
            </div>
          </div>
        </div>

        <Link
          to="/shop?collection=top-deals"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs sm:text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-95 transition-all ml-auto md:ml-0"
        >
          View all deals <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export function TopDealsGrid({ dealsList }: { dealsList?: Product[] }) {
  const [dealProducts, setDealProducts] = useState<Product[]>(dealsList || products.slice(0, 5));

  useEffect(() => {
    if (dealsList && dealsList.length > 0) {
      setDealProducts(dealsList);
      return;
    }
    async function loadDeals() {
      const live = await getLiveStoreProducts();
      if (live && live.length > 0) {
        setDealProducts(live.slice(0, 5));
      }
    }
    loadDeals();
  }, [dealsList]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {dealProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function TopDeals({ dealsList }: { dealsList?: Product[] }) {
  return (
    <div className="w-full">
      <TopDealsHeaderWithCountdown />
      <TopDealsGrid dealsList={dealsList} />
    </div>
  );
}
