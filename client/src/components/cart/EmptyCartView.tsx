import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export const EmptyCartView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-xl mx-auto text-center bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle Ambient Background Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-neutral-100 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        {/* Central Icon Illustration */}
        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0F1115] text-[#CCFF00] flex items-center justify-center mb-6 shadow-md transition-transform hover:scale-105 duration-300">
          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.75} />
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#CCFF00] text-[#0F1115] rounded-full flex items-center justify-center shadow">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Tagline Badge */}
        <span className="inline-block text-xs font-black uppercase tracking-widest text-[#7CAE00] bg-[#CCFF00]/20 px-3 py-1 rounded-full mb-3">
          Cart, In Motion
        </span>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F1115] tracking-tight mb-3">
          Your cart is waiting for a spark.
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-500 max-w-md mx-auto leading-relaxed mb-8">
          The next great find is one quick move away. Explore the curated drop, save your favorites, and check out when you're ready.
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="inline-flex items-center justify-center gap-2 bg-[#CCFF00] hover:bg-[#D4F800] text-[#0F1115] font-bold text-sm sm:text-base py-3.5 px-8 rounded-full shadow-lg shadow-[#CCFF00]/20 hover:shadow-[#CCFF00]/35 active:scale-[0.98] transition-all duration-200"
        >
          <span>Explore the edit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EmptyCartView;
