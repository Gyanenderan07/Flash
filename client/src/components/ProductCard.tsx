import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getDiscount, formatINR, type Product } from "@/data/mockProducts";
import { useCommerce } from "@/contexts/CommerceContext";
import SafeImage from "@/components/common/SafeImage";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addToCart, toggleWishlist, wishlistIds } = useCommerce();
  const isSaved = wishlistIds.includes(product.id);

  // Selected color swatch state
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors?.[0] ?? null);
  const activeVariant = product.variants?.find((v) => v.color === selectedColor) ?? product.variants?.[0];

  // Active gallery pool based on selected color variant or default product gallery
  const activeGallery = activeVariant?.gallery && activeVariant.gallery.length > 0
    ? activeVariant.gallery
    : product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);

    debounceTimerRef.current = setTimeout(() => {
      setIsHovered(true);
      if (activeGallery.length > 1) {
        setActiveImageIndex(1);
      }

      cycleIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % activeGallery.length);
      }, 1500);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    if (cycleIntervalRef.current) {
      clearInterval(cycleIntervalRef.current);
      cycleIntervalRef.current = null;
    }
    setIsHovered(false);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    };
  }, []);

  const currentImageUrl = activeGallery[activeImageIndex] || activeVariant?.image || product.image;
  const discountPercent = getDiscount(product);

  return (
    <article
      className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E1015] border border-neutral-200/80 dark:border-neutral-800/80 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:-translate-y-1 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Badges */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5 pointer-events-none">
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 rounded-md bg-[#CCFF00] text-neutral-950 font-black text-[10px] sm:text-xs shadow-sm w-fit">
            -{discountPercent}%
          </span>
        )}
        {product.express && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900/90 text-white dark:bg-white/90 dark:text-neutral-950 font-bold text-[10px] backdrop-blur-sm shadow-sm w-fit">
            <Sparkles size={10} className="text-[#CCFF00] dark:text-black" /> Express
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        className={`absolute top-5 right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
          isSaved
            ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
            : "bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-rose-500 dark:hover:text-rose-400 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50"
        }`}
        aria-label={`Save ${product.name}`}
        onClick={() => toggleWishlist(product.id)}
      >
        <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
      </button>

      {/* Media Aspect Stage */}
      <Link
        className="relative w-full aspect-square bg-gradient-to-b from-neutral-100/80 to-neutral-200/40 dark:from-[#14171E] dark:to-[#0B0D10] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center justify-center overflow-hidden block"
        to={`/product/${product.id}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: isHovered ? 1.06 : 1.0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <SafeImage
                src={currentImageUrl}
                alt={product.name}
                className="w-full h-full max-h-[180px] sm:max-h-[220px] object-contain object-center transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Link>

      {/* Card Details */}
      <div className="flex flex-col flex-1 pt-3 sm:pt-4 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider truncate">
            {product.brand}
          </p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              {product.colors.slice(0, 4).map((colorHex) => {
                const isSelected = selectedColor === colorHex;
                return (
                  <button
                    key={colorHex}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColor(colorHex);
                      setActiveImageIndex(0);
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setSelectedColor(colorHex);
                      setActiveImageIndex(0);
                    }}
                    className={`w-3 h-3 rounded-full border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-[#CCFF00] scale-110 border-transparent shadow-sm"
                        : "border-neutral-300 dark:border-neutral-700 hover:scale-110"
                    }`}
                    style={{ backgroundColor: colorHex }}
                    aria-label={`Select ${colorHex} color`}
                  />
                );
              })}
              {product.colors.length > 4 && (
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="group-hover:text-[#88aa00] dark:group-hover:text-[#CCFF00] transition-colors">
          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          {product.stock} ready to dispatch
        </p>

        {/* Price Line */}
        <div className="flex items-baseline gap-2 pt-1 mt-auto">
          <strong className="text-sm sm:text-base font-black text-neutral-900 dark:text-white">
            {formatINR(product.price)}
          </strong>
          {product.mrp && product.mrp > product.price && (
            <del className="text-xs font-medium text-neutral-400 dark:text-neutral-500 line-through">
              {formatINR(product.mrp)}
            </del>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center gap-2 pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800/80">
        <button
          type="button"
          className="flex-1 py-2 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          onClick={() => onQuickView?.(product)}
        >
          Quick view
        </button>
        <button
          type="button"
          className="p-2 sm:p-2.5 rounded-xl bg-[#CCFF00] text-neutral-950 hover:bg-[#b8e600] active:scale-95 transition-all shadow-sm cursor-pointer flex items-center justify-center shrink-0"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </article>
  );
}
