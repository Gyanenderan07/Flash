/**
 * Flash Cart Page — Restored 2-Column Desktop Grid Architecture (`lg:grid-cols-12`),
 * side-by-side layout with left column (span 7 or 8) for items & Lightning Delivery banner,
 * and sticky right column (span 5 or 4) for the glassmorphic Order Summary card.
 */
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, getProduct } from "@/data/mockProducts";
import CartItem, { type CartLineItem } from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

import EmptyCartView from "@/components/cart/EmptyCartView";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    savings,
    couponDiscount,
    deliveryFee,
    total,
    couponCode,
    applyCoupon,
    clearCoupon,
    updateQuantity,
    removeFromCart,
    moveToWishlist,
  } = useCommerce();

  const activeLines: CartLineItem[] = cart
    .filter((line) => !line.saved)
    .map((line) => ({ ...line, product: getProduct(line.productId) }))
    .filter((line): line is CartLineItem => Boolean(line.product));

  const deliveryGap = Math.max(0, 499 - subtotal);

  return (
    <section className="cart-page shell py-6 md:py-10 space-y-8">
      {/* Page Title */}
      <div className="page-title space-y-1">
        <p className="eyebrow text-xs font-bold uppercase tracking-widest text-[#a5c900]">
          Your fast lane
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-[#0F1115] tracking-tight">
          Cart, in motion.
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Keep the good finds close. We’ll hold the pace from here.
        </p>
      </div>

      {activeLines.length ? (
        <div className="max-w-7xl mx-auto py-2">
          {/* Cart Content: 2-Column Side-by-Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Span 7 or 8) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* 1. Lightning Delivery Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] relative overflow-hidden shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F1115] text-[#CCFF00] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F1115]">
                      {deliveryGap ? `Add ${formatINR(deliveryGap)} more for FREE Lightning Delivery` : "Lightning Delivery unlocked!"}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {deliveryGap ? "You’re almost at the free-delivery line." : "Your order has caught the fast lane."}
                    </p>
                  </div>
                </div>
                {/* Neon Progress Bar */}
                <div className="mt-3 h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#CCFF00] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 2. Cart Items List */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {activeLines.map((line) => (
                    <CartItem
                      key={`${line.productId}-${line.variantSku ?? line.color}-${line.size}`}
                      line={line}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                      onMoveToWishlist={moveToWishlist}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* 3. Keep Finding / Continue Shopping Link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/shop")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F1115] hover:text-neutral-600 transition-colors"
                >
                  <ArrowLeft size={16} /> Keep finding
                </button>
              </div>
            </div>

            {/* Right Column (Span 5 or 4): Sticky Order Summary */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
              <OrderSummary
                subtotal={subtotal}
                savings={savings}
                couponDiscount={couponDiscount}
                deliveryFee={deliveryFee}
                total={total}
                couponCode={couponCode}
                onApplyCoupon={applyCoupon}
                onClearCoupon={clearCoupon}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCartView />
      )}
    </section>
  );
}
