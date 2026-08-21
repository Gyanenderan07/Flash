/**
 * Flash CartItem Component — Refined ergonomics, interactive quantity stepper with auto-remove logic,
 * red morph indicator when quantity=1, and smooth Framer Motion exit transitions.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatINR, type Product } from "@/data/mockProducts";
import SafeImage from "@/components/common/SafeImage";

export type CartLineItem = {
  productId: string;
  color?: string;
  colorName?: string;
  size?: string;
  variantSku?: string;
  quantity: number;
  image?: string;
  product: Product;
};

export default function CartItem({
  line,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist,
}: {
  line: CartLineItem;
  onUpdateQuantity: (lineRef: any, newQty: number) => void;
  onRemove: (lineRef: any) => void;
  onMoveToWishlist: (lineRef: any) => void;
}) {
  const { product, quantity, color, colorName, size, variantSku, image } = line;
  const lineRef = { productId: product.id, color, size, variantSku };

  const [isRemoving, setIsRemoving] = useState(false);

  const handleDecrement = () => {
    if (quantity <= 1) {
      setIsRemoving(true);
      setTimeout(() => onRemove(lineRef), 180);
    } else {
      onUpdateQuantity(lineRef, quantity - 1);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(lineRef), 180);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`cart-line border border-[#E5E7EB] rounded-2xl p-4 md:p-5 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 ${
        isRemoving ? "opacity-40 scale-95 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <Link to={`/product/${product.id}`} className="cart-line__media flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#F4F4F1] border border-gray-100 flex items-center justify-center">
          <SafeImage src={image ?? product.image} alt={product.name} className="w-full h-full object-cover" />
        </Link>

        <div className="cart-line__copy flex-1 min-w-0 space-y-1">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            {product.brand} / {product.subcategory}
          </p>
          <Link to={`/product/${product.id}`} className="hover:text-black transition-colors">
            <h2 className="text-sm md:text-base font-bold text-[#0F1115] truncate leading-tight">
              {product.name}
            </h2>
          </Link>
          <span className="block text-xs text-gray-500 font-medium">
            {[colorName ?? color, size, variantSku].filter(Boolean).join(" · ") || "Standard edit"}
          </span>

          <div className="flex items-baseline gap-2 pt-1">
            <b className="text-base font-extrabold text-[#0F1115]">{formatINR(product.price)}</b>
            {product.mrp > product.price && (
              <del className="text-xs text-gray-400 font-medium">{formatINR(product.mrp)}</del>
            )}
          </div>

          <div className="cart-line__utilities flex items-center gap-4 pt-2 text-xs font-semibold">
            <button
              onClick={() => onMoveToWishlist(lineRef)}
              className="text-gray-600 hover:text-black flex items-center gap-1.5 transition-colors"
            >
              <Heart size={14} /> Save for later
            </button>
            <button
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      </div>

      {/* Stepper & Action Controls Container */}
      <div className="relative flex items-center gap-3 self-end sm:self-center">
        {/* Quantity Pill Box */}
        <div className="inline-flex items-center bg-[#F4F4F5] border border-neutral-200/80 rounded-full p-1 shadow-sm">
          {/* Decrement / Trash Button */}
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={handleDecrement}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#0F1115] hover:bg-white transition-all duration-150 active:scale-90"
              aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
            >
              {quantity === 1 ? (
                <Trash2 className="w-4 h-4 text-neutral-500 hover:text-red-500 transition-colors" />
              ) : (
                <Minus className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Clean Modern Tooltip (Only appears when qty is 1 and hovered) */}
            {quantity === 1 && showTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-30 flex flex-col items-center animate-in fade-in zoom-in-95 duration-150">
                <div className="bg-[#0F1115] text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                  <span>Remove item</span>
                </div>
                {/* Tooltip Arrow Caret */}
                <div className="w-2 h-2 bg-[#0F1115] rotate-45 -mt-1 border-r border-b border-white/10" />
              </div>
            )}
          </div>

          {/* Quantity Value */}
          <span className="w-8 text-center text-sm font-bold text-[#0F1115] select-none">
            {quantity}
          </span>

          {/* Increment Button */}
          <button
            type="button"
            onClick={() => onUpdateQuantity(lineRef, quantity + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#0F1115] hover:bg-white transition-all duration-150 active:scale-90"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
