/**
 * Flash OrderSummary Component — Sleek obsidian glassmorphic card, integrated promo code pill,
 * cost breakdown with lime savings highlight, integrated total banner, dynamic CTA, and trust badge footer.
 */
import { useState } from "react";
import { ArrowRight, Lock, ShieldCheck, Tag, X, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatINR } from "@/data/mockProducts";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function OrderSummary({
  subtotal,
  savings,
  couponDiscount,
  deliveryFee,
  total,
  couponCode,
  onApplyCoupon,
  onClearCoupon,
}: {
  subtotal: number;
  savings: number;
  couponDiscount: number;
  deliveryFee: number;
  total: number;
  couponCode: string | null;
  onApplyCoupon: (code: string) => boolean;
  onClearCoupon: () => void;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (!cleaned) {
      toast.error("Please enter a valid promo code.");
      return;
    }

    if (onApplyCoupon(cleaned)) {
      setPromoInput("");
    }
  };

  const handleCheckoutClick = () => {
    if (user) {
      navigate("/checkout");
    } else {
      window.dispatchEvent(new CustomEvent("flash-open-auth"));
      toast.info("Please sign in to complete your checkout.");
    }
  };

  return (
    <aside className="w-full bg-[#111317] border border-white/10 rounded-3xl p-6 shadow-2xl text-white space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>Order Summary</span>
        </h2>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/20 px-2.5 py-1 rounded-full">
          Flash Fastlane
        </span>
      </div>

      {/* Promo Code Box */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
          <Tag size={13} className="text-[#CCFF00]" /> Have a promo code?
        </p>

        {couponCode ? (
          <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-[#CCFF00]">
            <span className="flex items-center gap-2">
              <Zap size={14} fill="currentColor" /> {couponCode} APPLIED
            </span>
            <button
              onClick={onClearCoupon}
              className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
              aria-label="Remove coupon"
            >
              <X size={14} /> Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="bg-white/5 border border-white/10 focus-within:border-[#CCFF00] rounded-full p-1.5 flex items-center transition-all">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Try FLASH10"
              className="w-full bg-transparent px-3 py-1 text-xs text-white placeholder-neutral-500 focus:outline-none uppercase font-semibold"
            />
            <button
              type="submit"
              className="bg-[#CCFF00] text-[#0F1115] font-extrabold text-xs px-4 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all flex-shrink-0"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Cost Breakdown List */}
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <dt className="text-neutral-400">Item subtotal</dt>
          <dd className="text-white font-medium">{formatINR(subtotal)}</dd>
        </div>

        {savings > 0 && (
          <div className="flex justify-between items-center text-[#CCFF00]">
            <dt className="font-medium">Product savings</dt>
            <dd className="font-semibold">−{formatINR(savings)}</dd>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="flex justify-between items-center text-[#CCFF00]">
            <dt className="font-medium">{couponCode || "Promo code discount"}</dt>
            <dd className="font-semibold">−{formatINR(couponDiscount)}</dd>
          </div>
        )}

        <div className="flex justify-between items-center">
          <dt className="text-neutral-400">Delivery fee</dt>
          <dd className="text-white font-medium">
            {deliveryFee ? formatINR(deliveryFee) : <span className="text-[#CCFF00] font-bold">FREE</span>}
          </dd>
        </div>
      </dl>

      <div className="border-t border-white/10 my-4" />

      {/* Integrated Total Banner */}
      <div className="bg-gradient-to-r from-[#181B22] to-[#1E222B] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-inner">
        <div>
          <span className="block text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">
            Total to Pay
          </span>
          <span className="text-[10px] text-[#CCFF00] font-semibold">Taxes & shipping included</span>
        </div>
        <strong className="text-2xl font-black text-white tracking-tight">{formatINR(total)}</strong>
      </div>

      {/* Full-width Rounded-full Action CTA */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleCheckoutClick}
          className="w-full bg-[#CCFF00] hover:bg-[#D4F800] text-[#0F1115] font-bold text-base py-3.5 px-6 rounded-full shadow-lg shadow-[#CCFF00]/10 hover:shadow-[#CCFF00]/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>{user ? "Proceed to Checkout" : "Sign in to checkout"}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {!user && (
          <p className="text-center text-[11px] text-neutral-400 font-medium">
            Your cart items will be saved automatically upon sign-in.
          </p>
        )}
      </div>

      {/* Trust & Assurance Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-center gap-4 text-[11px] text-neutral-400">
        <span className="flex items-center gap-1">
          <Lock size={12} className="text-[#CCFF00]" /> Instant Checkout
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-[#CCFF00]" /> 100% Protected
        </span>
        <span>•</span>
        <span>15-day Free Returns</span>
      </div>
    </aside>
  );
}
