/**
 * Flash Buyer Copilot (`client/src/components/AskAI.tsx`)
 * Signature floating "ASK AI" capsule button & full slide-in copilot drawer.
 * Palette: Solid Obsidian #000000, Surface Card #11141B, Inner Well #181C24, Electric Lime #CCFF00.
 * Typography: Plus Jakarta Sans with bold uppercase labels.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Plus,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, products, type Product } from "@/data/mockProducts";
import SafeImage from "@/components/common/SafeImage";

export type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  productIds?: string[];
};

const quickPrompts = [
  "Running shoes under ₹3000",
  "Wireless audio for workouts",
  "When will my order arrive?",
  "How does FLASH10 work?",
  "Top deals today",
  "15-day return policy",
];

const starterMessage: AssistantMessage = {
  id: "starter",
  role: "assistant",
  text: "Hello! I'm your Flash Shopping Concierge. Whether you're hunting for running shoes, wireless audio, order status updates, or exclusive promo codes — I'm here to curate your experience. What can I find for you today?",
};

function findCatalogMatches(query: string) {
  const normalized = query.toLowerCase();
  const budgetMatch = normalized.match(
    /(?:under|below|less than)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/
  );
  const maxPrice = budgetMatch
    ? Number(budgetMatch[1].replace(/,/g, ""))
    : undefined;

  const relatedCategory = /running|shoe|sneaker|footwear/.test(normalized)
    ? "Footwear"
    : /watch|chrono|smartwatch/.test(normalized)
    ? "Watches"
    : /audio|headphone|speaker|earbud|sound|noise|wireless/.test(normalized)
    ? "Electronics"
    : /fashion|hoodie|jacket|cargo|trousers|streetwear|apparel/.test(normalized)
    ? "Fashion"
    : /home|lamp|mirror|chair|kettle|diffuser|decor/.test(normalized)
    ? "Home & Living"
    : /fragrance|beauty|perfume|skincare|mist/.test(normalized)
    ? "Beauty"
    : /sport|fitness|training|mat|kettlebell|roller|workout/.test(normalized)
    ? "Sports"
    : undefined;

  const terms = normalized
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(
      (term) =>
        term.length > 2 &&
        ![
          "show",
          "best",
          "with",
          "under",
          "below",
          "find",
          "need",
          "want",
          "some",
          "what",
          "that",
          "for",
          "the",
          "good",
          "any",
        ].includes(term)
    );

  const ranked = products
    .map((product) => {
      const haystack = [
        product.name,
        product.category,
        product.subcategory,
        product.brand,
        product.description,
        ...product.highlights,
      ]
        .join(" ")
        .toLowerCase();

      const score =
        (relatedCategory === product.category ? 8 : 0) +
        terms.reduce(
          (sum, term) => sum + (haystack.includes(term) ? 3 : 0),
          0
        ) +
        (product.express ? 0.5 : 0);

      return { product, score };
    })
    .filter(
      ({ product, score }) =>
        score > 0 && (maxPrice === undefined || product.price <= maxPrice)
    )
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .slice(0, 3)
    .map(({ product }) => product);

  if (ranked.length || maxPrice === undefined) return ranked;
  return products
    .filter((product) => product.price <= maxPrice)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);
}

function answerQuery(query: string): Pick<AssistantMessage, "text" | "productIds"> {
  const normalized = query.toLowerCase().trim();

  // Greetings & casual concierge check-ins
  if (/^(hi|hello|hey|yo|howdy|sup|good\s*(morning|afternoon|evening)|help)\b/i.test(normalized)) {
    return {
      text: "Hey! Great to have you here at Flash. I'm connected in real time to our live catalog, delivery network, and discount engines.\n\nLooking for running shoes, wireless audio for workouts, or curious about the FLASH10 promo? Just let me know what vibe or budget you're aiming for!",
    };
  }

  // Delivery & Tracking
  if (/deliver|delivery|arrive|shipping|when.*order|courier|dispatch|track/.test(normalized)) {
    return {
      text: "⚡ **Flash Express & Priority Logistics**\n\nAll verified catalog orders are dispatched from our nearest fulfillment hub:\n• **Flash Express:** Delivered in **under 24 hours** to eligible metro locations.\n• **Standard Courier:** Arrives nationwide within **2 to 4 business days** with end-to-end SMS & WhatsApp tracking.\n• **Live Rider Tracking:** Check real-time progress anytime inside your **Account > My Orders** dashboard.",
    };
  }

  // Return policy, refunds & exchanges
  if (/return|refund|exchange|policy|money-back|guarantee/.test(normalized)) {
    return {
      text: "🛡️ **15-Day Flash Assurance Policy**\n\nEvery piece in our catalog is backed by our zero-friction guarantee:\n• **15-Day Free Returns:** Tap 'Return Item' in your Order Activity anytime within 15 days.\n• **Complimentary Doorstep Pickup:** Our courier inspects and retrieves the package right from your door.\n• **Instant 15-Minute Refund:** Funds are credited back to your original payment method or Flash Wallet as soon as the item is picked up.",
    };
  }

  // FLASH10 promo code & discounts
  if (/flash10|coupon|discount|promo|code|deal|offer|saving|cashback/.test(normalized)) {
    const deals = products.filter((p) => p.mrp && p.mrp > p.price).slice(0, 3);
    return {
      text: "⚡ **Insider Savings & Deals Drop**\n\nHere’s how you can save on your haul today:\n• **Use Code FLASH10:** Enter `FLASH10` at checkout for an instant **10% cashback** on all prepaid orders.\n• **Top Deals Catalog:** Save up to **60% off** on curated seasonal overstock.\n• **Flash Club Rewards:** Earn 2x reward points on every completed order.\n\nHere are some of our most popular high-value drops right now:",
      productIds: deals.map((p) => p.id),
    };
  }

  // Running shoes / sneakers / footwear
  if (/running|shoe|sneaker|footwear/.test(normalized)) {
    const matches = findCatalogMatches(query);
    const budgetStr = normalized.match(/(?:under|below|less than)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/)?.[1];
    const budgetMsg = budgetStr ? ` under ₹${budgetStr}` : "";
    return {
      text: `Looking to elevate your training? I’ve curated our top high-performance running silhouettes${budgetMsg} engineered with responsive foam cushioning and breathable mesh uppers.\n\nTap the **(+)** button to drop any pair straight into your cart, or click the title to view multi-angle photos!`,
      productIds: matches.map((p) => p.id),
    };
  }

  // Wireless audio / headphones / earbuds / workouts
  if (/audio|headphone|speaker|earbud|sound|noise|wireless/.test(normalized)) {
    const matches = findCatalogMatches(query);
    return {
      text: "Nothing sets the workout tempo like the right sound profile. Here are our top sweat-resistant, ultra-secure wireless audio picks featuring active noise cancellation and punchy bass profiles that keep you locked in:",
      productIds: matches.map((p) => p.id),
    };
  }

  // Watches & Chronographs
  if (/watch|chrono|smartwatch/.test(normalized)) {
    const matches = findCatalogMatches(query);
    return {
      text: "A signature timepiece brings the entire aesthetic together. Here are our premier chronographs and fitness smartwatches combining precision build, obsidian accents, and sapphire-coated glass:",
      productIds: matches.map((p) => p.id),
    };
  }

  // Fashion / Streetwear / Apparel
  if (/fashion|hoodie|jacket|cargo|trousers|streetwear|apparel/.test(normalized)) {
    const matches = findCatalogMatches(query);
    return {
      text: "Curated for the runway, engineered for daily motion. Here are our standout streetwear drops crafted with heavyweight French terry and architectural tailoring:",
      productIds: matches.map((p) => p.id),
    };
  }

  // General catalog search
  const matches = findCatalogMatches(query);
  if (!matches.length) {
    return {
      text: `I couldn't find an exact match for "${query}" in our current collection, but our inventory updates with new drops daily! Could I interest you in exploring our latest **Footwear**, **Wireless Audio**, or **Top Deals**? Let me know your style or budget and I'll find great alternatives.`,
    };
  }

  const budgetNote =
    normalized.includes("under") || normalized.includes("below")
      ? " Filtered to match your price target."
      : "";

  return {
    text: `Here are our top verified catalog recommendations for your search.${budgetNote} Click (+) to add directly to your bag or click the title to inspect specifications:`,
    productIds: matches.map((p) => p.id),
  };
}

export interface AskAIProps {
  open?: boolean;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  setIsOpen?: (open: boolean) => void;
  seedQuery?: string;
}

export default function AskAI({
  open,
  isOpen: propIsOpen,
  onOpen,
  onClose,
  setIsOpen: propSetIsOpen,
  seedQuery,
}: AskAIProps) {
  const { addToCart } = useCommerce();
  const [localOpen, setLocalOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([starterMessage]);
  const [query, setQuery] = useState("");
  const lastSeed = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeIsOpen = propIsOpen ?? open ?? localOpen;

  const handleOpen = useCallback(() => {
    if (onOpen) onOpen();
    if (propSetIsOpen) propSetIsOpen(true);
    setLocalOpen(true);
  }, [onOpen, propSetIsOpen]);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    if (propSetIsOpen) propSetIsOpen(false);
    setLocalOpen(false);
  }, [onClose, propSetIsOpen]);

  const productMap = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    []
  );

  const send = useCallback((text: string) => {
    const cleaned = text.trim();
    if (!cleaned) return;
    const answer = answerQuery(cleaned);
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text: cleaned },
      { id: `assistant-${Date.now()}`, role: "assistant", ...answer },
    ]);
    setQuery("");
  }, []);

  useEffect(() => {
    if (seedQuery && seedQuery !== lastSeed.current) {
      lastSeed.current = seedQuery;
      send(seedQuery);
    }
  }, [seedQuery, send]);

  useEffect(() => {
    if (activeIsOpen) {
      const timer = window.setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [messages, activeIsOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeIsOpen) {
        handleClose();
      }
    };
    if (activeIsOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIsOpen, handleClose]);

  return (
    <>
      {/* 1. FLOATING "ASK AI" PILL BUTTON */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111317] hover:bg-[#181B22] text-white border border-neutral-800/80 hover:border-[#CCFF00]/60 shadow-[0_8px_30px_rgb(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(204,255,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group font-['Plus_Jakarta_Sans',sans-serif]"
        aria-label="Open Flash AI Assistant"
      >
        {/* Flash Signature Neon Sparkle */}
        <svg 
          className="w-4 h-4 text-[#CCFF00] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
        </svg>
        <span className="text-xs font-black tracking-wider uppercase text-white group-hover:text-[#CCFF00] transition-colors">
          ASK AI
        </span>
      </button>

      {/* 2. SLIDE-IN COPILOT DRAWER */}
      <AnimatePresence>
        {activeIsOpen && (
          <div
            className="fixed inset-0 z-[150] flex justify-end font-['Plus_Jakarta_Sans',sans-serif]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 bg-[#000000]/80 backdrop-blur-sm"
            />

            {/* Slide-in Copilot Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-md sm:max-w-[460px] h-full bg-[#000000] text-white shadow-2xl flex flex-col overflow-hidden border-l border-[#181C24] z-10"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#181C24] bg-[#11141B]">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#000000] border border-[#CCFF00]/40 text-[#CCFF00] flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                    <svg
                      className="w-5 h-5 text-[#CCFF00]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00] leading-none mb-1">
                      FLASH BUYER COPILOT
                    </p>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                        Catalog Assistant
                      </h2>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#181C24] border border-[#242A36] text-[9px] font-extrabold text-[#CCFF00]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                        ONLINE
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[#181C24] hover:bg-[#202634] text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-[#242A36]"
                  aria-label="Close Flash Copilot"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Subheader Banner */}
              <div className="bg-[#11141B]/95 border-b border-[#181C24] px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                  <Sparkles size={14} className="text-[#CCFF00] shrink-0" />
                  <span>Ask about products, deals &amp; specifications</span>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase text-[#CCFF00] bg-[#181C24] px-2 py-0.5 rounded border border-[#242A36]">
                  v2.5
                </span>
              </div>

              {/* Chat Message Scroll Area */}
              <div
                ref={scrollRef}
                className="flex-1 copilot-chat-scroll p-4 space-y-4 bg-[#000000]"
              >
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Message Label */}
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1 px-1">
                        {isUser ? "YOU" : "FLASH COPILOT"}
                      </span>

                      <div
                        className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          isUser
                            ? "bg-[#181C24] text-white border border-[#CCFF00]/40 rounded-tr-sm shadow-sm font-medium"
                            : "bg-[#11141B] text-gray-200 border border-[#181C24] rounded-tl-sm shadow-md"
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>

                        {/* Interactive Product Recommendations */}
                        {message.productIds && message.productIds.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.productIds.map((id) => {
                              const product = productMap.get(id);
                              if (!product) return null;
                              return (
                                <div
                                  key={id}
                                  className="bg-[#181C24] border border-[#242A36] hover:border-[#CCFF00]/50 rounded-xl p-2.5 flex items-center gap-3 transition-colors group/card"
                                >
                                  <div className="w-12 h-12 rounded-lg bg-[#000000] p-1 shrink-0 border border-[#242A36] overflow-hidden flex items-center justify-center">
                                    <SafeImage
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-[9px] font-black uppercase tracking-wider text-[#CCFF00]">
                                        {product.brand}
                                      </span>
                                      {product.express && (
                                        <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-[#000000] text-[#CCFF00] border border-[#CCFF00]/30">
                                          ⚡ 24h
                                        </span>
                                      )}
                                    </div>
                                    <Link
                                      to={`/product/${product.id}`}
                                      onClick={handleClose}
                                      className="text-xs font-bold text-white group-hover/card:text-[#CCFF00] transition-colors truncate block mt-0.5"
                                    >
                                      {product.name}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs font-black text-[#CCFF00]">
                                        {formatINR(product.price)}
                                      </span>
                                      {product.mrp &&
                                        product.mrp > product.price && (
                                          <span className="text-[10px] text-gray-500 line-through">
                                            {formatINR(product.mrp)}
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      addToCart(product);
                                      toast.success(
                                        `Added ${product.name} to cart!`
                                      );
                                    }}
                                    className="w-8 h-8 rounded-lg bg-[#CCFF00] hover:bg-[#d8ff26] text-[#000000] flex items-center justify-center shrink-0 transition-transform active:scale-90 shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                                    aria-label={`Add ${product.name} to cart`}
                                  >
                                    <Plus size={16} strokeWidth={2.5} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="border-t border-[#181C24] bg-[#11141B] px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-2 px-1">
                  <Zap size={11} className="text-[#CCFF00]" fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Suggested Inquiries
                  </span>
                </div>
                <div className="flex gap-2 suggested-chips-scroll pb-2.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => send(prompt)}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-[#181C24] hover:bg-[#202634] border border-[#242A36] hover:border-[#CCFF00] text-[11px] font-medium text-gray-300 hover:text-[#CCFF00] transition-all flex items-center gap-1 active:scale-95 group/chip"
                    >
                      <span>{prompt}</span>
                      <ChevronRight
                        size={12}
                        className="text-gray-500 group-hover/chip:text-[#CCFF00] transition-colors"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Compose Input Bar */}
              <div className="border-t border-[#181C24] bg-[#11141B] p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(query);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask about products, deals, specs..."
                      className="w-full bg-[#181C24] border border-[#242A36] focus:border-[#CCFF00] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!query.trim()}
                    className="w-10 h-10 rounded-xl bg-[#CCFF00] hover:bg-[#d8ff26] disabled:opacity-40 disabled:hover:bg-[#CCFF00] text-[#000000] flex items-center justify-center font-black transition-all active:scale-95 shadow-[0_0_12px_rgba(204,255,0,0.25)] shrink-0"
                    aria-label="Send query"
                  >
                    <Send size={15} />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Verified Flash Catalog</span>
                  <span>Real-time Pricing</span>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export { AskAI };
