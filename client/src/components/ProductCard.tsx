/**
 * Flash product card — a high-key editorial product stage with concise obsidian data,
 * multi-angle hover crossfade with Framer Motion, color swatch switching, and unified brand green action signals.
 */
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

    // 200ms debounce delay to prevent jumpy hover states
    debounceTimerRef.current = setTimeout(() => {
      setIsHovered(true);
      if (activeGallery.length > 1) {
        setActiveImageIndex(1);
      }

      // Smoothly cycle through alternative angles of the exact product
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

  return (
    <article
      className="commerce-product-card group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="deal-tag">-{getDiscount(product)}%</span>
      {product.express && (
        <span className="express-tag">
          <Sparkles size={11} /> Express
        </span>
      )}
      <button
        className={`favourite commerce-favourite ${isSaved ? "is-saved" : ""}`}
        aria-label={`Save ${product.name}`}
        onClick={() => toggleWishlist(product.id)}
      >
        <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <Link
        className="commerce-product-card__media relative w-full aspect-square bg-[#F4F4F5] dark:bg-[#15181E] rounded-2xl overflow-hidden group block"
        to={`/product/${product.id}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1.0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <SafeImage src={currentImageUrl} alt={product.name} className="w-full h-full object-cover object-center" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Link>

      <div className="commerce-product-card__detail">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{product.brand}</p>

          {/* Interactive Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
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
                    className={`w-3 h-3 rounded-full border transition-all duration-150 ${
                      isSelected
                        ? "ring-2 ring-[#0F1115] ring-offset-1 scale-110 border-transparent shadow-sm"
                        : "border-gray-300 hover:scale-110"
                    }`}
                    style={{ backgroundColor: colorHex }}
                    aria-label={`Select ${colorHex} color`}
                  />
                );
              })}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-gray-400 font-semibold ml-0.5">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <span className="availability-line">{product.stock} ready to dispatch</span>
        <div className="price-line">
          <strong>{formatINR(product.price)}</strong>
          <del>{formatINR(product.mrp)}</del>
        </div>
      </div>
      <div className="commerce-product-card__actions">
        <button className="card-quick-view" onClick={() => onQuickView?.(product)}>
          Quick view
        </button>
        <button
          className="add-cart"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={17} />
        </button>
      </div>
    </article>
  );
}
