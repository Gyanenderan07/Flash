/**
 * Flash QuickCartDrawer Component — Slide-over drawer with liquid glass surface top highlight,
 * interactive shimmer wave on the primary "View cart →" CTA button, and smooth cart line utilities.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, getProduct } from "@/data/mockProducts";
import SafeImage from "@/components/common/SafeImage";

export default function QuickCartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { cart, subtotal, removeFromCart } = useCommerce();

  const activeLines = cart.filter((line) => !line.saved);

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex justify-end" style={{ zIndex: 90 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F1115]/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md h-full bg-white text-[#0F1115] shadow-2xl flex flex-col overflow-hidden border-l border-gray-200"
            style={{ width: "100%", maxWidth: "420px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#FAF9F6]">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#7CAE00]">
                  Quick Cart
                </p>
                <h2 className="text-xl font-black text-[#0F1115] tracking-tight leading-tight">
                  Keep it moving.
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeLines.length ? (
                activeLines.map((line) => {
                  const product = getProduct(line.productId);
                  if (!product) return null;
                  return (
                    <article
                      key={`${line.productId}-${line.variantSku ?? line.color}-${line.size}`}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100 shadow-sm"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center">
                        <SafeImage src={line.image ?? product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <b className="block text-xs font-bold text-[#0F1115] truncate">
                          {product.name}
                        </b>
                        <span className="block text-[11px] text-gray-500 font-medium truncate">
                          {line.colorName ?? line.color ?? "Standard"} · Qty {line.quantity}
                        </span>
                        <small className="block text-xs font-extrabold text-[#0F1115] mt-0.5">
                          {formatINR(product.price * line.quantity)}
                        </small>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() =>
                          removeFromCart({
                            productId: line.productId,
                            color: line.color,
                            size: line.size,
                            variantSku: line.variantSku,
                          })
                        }
                        className="w-8 h-8 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </article>
                  );
                })
              ) : (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Your cart is waiting for the next find.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Cart Bottom Action Footer */}
            <div className="p-5 border-t border-neutral-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-400">Subtotal</span>
                <span className="text-lg font-black text-[#0F1115]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                style={{ backgroundColor: '#CCFF00', color: '#0F1115' }}
                className="w-full h-14 rounded-2xl bg-[#CCFF00] hover:bg-[#BCE600] text-[#0F1115] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 shadow-none border-none cursor-pointer"
              >
                <span className="text-[#0F1115] font-black">View cart</span>
                <span className="text-[#0F1115] text-base font-bold">&rarr;</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
