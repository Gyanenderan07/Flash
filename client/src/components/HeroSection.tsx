import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getDiscount, formatINR, products, type Product } from "@/data/mockProducts";
import { useCommerce } from "@/contexts/CommerceContext";
import { getLiveStoreProducts } from "@/services/productService";

export interface HeroSlideItem {
  id: string;
  name: string;
  brand?: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  mrp?: number;
  primaryImage: string;
  image?: string;
  rawProduct?: Product;
}

export function HeroSection({ heroItems }: { heroItems?: Product[] }) {
  const { addToCart } = useCommerce();
  const [items, setItems] = useState<Product[]>(heroItems || products.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (heroItems && heroItems.length > 0) {
      setItems(heroItems);
      return;
    }
    async function loadProducts() {
      const live = await getLiveStoreProducts();
      if (live && live.length > 0) {
        setItems(live.slice(0, 4));
      }
    }
    loadProducts();
  }, [heroItems]);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, items.length]);

  const activeProduct = items[currentIndex] || items[0];

  if (!activeProduct) return null;

  const currentSlide: HeroSlideItem = {
    id: activeProduct.id,
    name: activeProduct.name,
    brand: activeProduct.brand || "Flash Exclusive",
    subcategory: activeProduct.subcategory,
    price: activeProduct.price,
    originalPrice: activeProduct.mrp,
    mrp: activeProduct.mrp,
    primaryImage: activeProduct.image,
    image: activeProduct.image,
    rawProduct: activeProduct,
  };

  const handleQuickAdd = (slide: HeroSlideItem) => {
    if (slide.rawProduct) {
      addToCart(slide.rawProduct);
    } else {
      addToCart(activeProduct);
    }
  };

  const discountPercent = getDiscount(activeProduct);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm p-4 sm:p-8 lg:p-12 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
        {/* Left Column: Hero Copy & Actions */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CCFF00]/15 dark:bg-[#CCFF00]/20 text-neutral-900 dark:text-[#CCFF00] text-xs font-black tracking-wider uppercase w-fit border border-[#CCFF00]/40">
            <Sparkles size={14} className="text-[#88aa00] dark:text-[#CCFF00]" />
            <span>Supercharged</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.05] text-neutral-900 dark:text-white">
              SPEED.<br />
              STYLE.<br />
              YOU<span className="text-[#CCFF00]">.</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 font-medium max-w-md">
              Next-gen essentials for a faster, smarter life.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#CCFF00] text-neutral-950 font-black text-sm hover:bg-[#b8e600] active:scale-95 transition-all shadow-md shadow-[#CCFF00]/20"
            >
              Shop the edit <ArrowRight size={18} />
            </Link>
            <Link
              to="/shop?collection=top-deals"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-all"
            >
              Explore deals <ArrowRight size={17} />
            </Link>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2 pt-4" aria-label="Featured Flash edit">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative p-2 cursor-pointer bg-transparent border-0 outline-none"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    currentIndex === index
                      ? "bg-[#CCFF00]"
                      : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                  }`}
                />
                {currentIndex === index && (
                  <motion.div
                    layoutId="hero-pager-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-xl border-2 border-[#CCFF00] pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Background & Clean Image Isolation */}
        <div className="relative w-full lg:w-1/2 min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center p-4 sm:p-8 rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-[#14171F] dark:to-[#0B0D10]">
          {/* Discount Disc Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-4 left-4 z-20 bg-[#CCFF00] text-black rounded-2xl p-2.5 sm:p-3 text-center shadow-lg font-black leading-tight flex flex-col items-center justify-center">
              <span className="text-[9px] uppercase tracking-wider text-black/70">UP TO</span>
              <span className="text-base sm:text-xl font-black">{discountPercent}%</span>
              <span className="text-[9px] uppercase tracking-wider text-black/70">OFF</span>
            </div>
          )}

          {/* Product Image: Cleanly fitted without cropping */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={currentSlide.primaryImage || currentSlide.image}
                alt={currentSlide.name}
                className="w-full max-h-[260px] sm:max-h-[360px] lg:max-h-[420px] object-contain object-center z-10 transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Floating Price Card */}
          <div className="absolute bottom-4 right-4 z-20 bg-black/90 dark:bg-[#12151B]/95 backdrop-blur-md text-white p-3 sm:p-4 rounded-2xl border border-neutral-800 shadow-xl flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                {currentSlide.brand || "Flash Exclusive"}
              </p>
              <h4 className="text-xs sm:text-sm font-black truncate max-w-[120px] sm:max-w-[150px]">
                {currentSlide.name}
              </h4>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm sm:text-base font-black text-[#CCFF00]">
                  ₹{currentSlide.price?.toLocaleString("en-IN")}
                </span>
                {(currentSlide.originalPrice || currentSlide.mrp) &&
                  (currentSlide.originalPrice || currentSlide.mrp)! > currentSlide.price && (
                    <span className="text-[11px] text-neutral-400 line-through">
                      ₹{(currentSlide.originalPrice || currentSlide.mrp)?.toLocaleString("en-IN")}
                    </span>
                  )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleQuickAdd(currentSlide)}
              className="w-8 h-8 rounded-full bg-[#CCFF00] text-black font-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              aria-label={`Add ${currentSlide.name} to cart`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
