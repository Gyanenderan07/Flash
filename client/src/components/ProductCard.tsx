/**
 * Flash product card — a high-key editorial product stage with concise obsidian data,
 * multi-image hover crossfade with Framer Motion, and unified brand green action signals.
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

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);

    // 250ms debounce delay to avoid accidental triggers
    debounceTimerRef.current = setTimeout(() => {
      setIsHovered(true);
      if (gallery.length > 1) {
        setActiveImageIndex(1);
      }

      // Automatically cycle through remaining images if hovering for > 1.8s
      cycleIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prevIndex) => (prevIndex + 1) % gallery.length);
      }, 1800);
    }, 250);
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

  const currentImageUrl = gallery[activeImageIndex] || product.image;

  return (
    <article
      className="commerce-product-card"
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
        className="commerce-product-card__media"
        to={`/product/${product.id}`}
        style={{ position: "relative", overflow: "hidden", display: "block" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <motion.div
              animate={{ scale: isHovered ? 1.04 : 1.0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <SafeImage src={currentImageUrl} alt={product.name} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Link>

      <div className="commerce-product-card__detail">
        <p>{product.brand}</p>
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
