/**
 * Flash AI concierge — dynamic conversational discovery grounded in the Flash catalog.
 * Features macOS spring pop animations, intent classification, and interactive product cards.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, ChevronDown, MessageCircle, Plus, Send, Sparkles, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, products, type Product } from "@/data/mockProducts";
import SafeImage from "@/components/common/SafeImage";

type AssistantMessage = { id: string; role: "assistant" | "user"; text: string; productIds?: string[] };
const quickPrompts = [
  "Running shoes under ₹3000",
  "Wireless audio for workouts",
  "When will my order arrive?",
  "How does FLASH10 work?",
];
const starter: AssistantMessage = {
  id: "hello",
  role: "assistant",
  text: "I’m Flash AI. Tell me the pace, budget, or product you’re after — I’ll make the shortlist.",
};

function findCatalogMatches(query: string) {
  const normalized = query.toLowerCase();
  const budget = normalized.match(/(?:under|below|less than)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/)?.[1];
  const maxPrice = budget ? Number(budget.replace(/,/g, "")) : undefined;
  const relatedCategory = /running|shoe|sneaker|footwear/.test(normalized)
    ? "Footwear"
    : /watch|chrono|smartwatch/.test(normalized)
    ? "Watches"
    : /audio|headphone|speaker|earbud|sound|noise/.test(normalized)
    ? "Electronics"
    : /fashion|hoodie|jacket|cargo|trousers|streetwear/.test(normalized)
    ? "Fashion"
    : /home|lamp|mirror|chair|kettle|diffuser/.test(normalized)
    ? "Home & Living"
    : /fragrance|beauty|perfume|skincare|mist/.test(normalized)
    ? "Beauty"
    : /sport|fitness|training|mat|kettlebell|roller/.test(normalized)
    ? "Sports"
    : undefined;

  const terms = normalized
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(
      (term) =>
        term.length > 2 &&
        !["show", "best", "with", "under", "below", "find", "need", "want", "some", "what", "that"].includes(term)
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
        (relatedCategory === product.category ? 7 : 0) +
        terms.reduce((sum, term) => sum + (haystack.includes(term) ? 3 : 0), 0) +
        (product.express ? 0.3 : 0);

      return { product, score };
    })
    .filter(({ product, score }) => score > 0 && (maxPrice === undefined || product.price <= maxPrice))
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .slice(0, 3)
    .map(({ product }) => product);

  if (ranked.length || maxPrice === undefined) return ranked;
  return products.filter((product) => product.price <= maxPrice).sort((a, b) => a.price - b.price).slice(0, 3);
}

function answerQuery(query: string): Pick<AssistantMessage, "text" | "productIds"> {
  const normalized = query.toLowerCase();
  if (/deliver|delivery|arrive|shipping|when.*order|express/.test(normalized)) {
    return {
      text: "⚡ Flash Express Delivery reaches eligible pin codes within 24 hours. Standard deliveries arrive within 2–4 business days with full real-time tracking in your Account dashboard.",
    };
  }
  if (/return|refund|exchange|policy/.test(normalized)) {
    return {
      text: "Flash offers a 15-day hassle-free return window on all items. You can initiate instant returns directly from your Order Activity tab.",
    };
  }
  if (/flash10|coupon|discount|promo|code|offer/.test(normalized)) {
    return {
      text: "Use code FLASH10 at checkout to unlock an instant 10% cashback on all prepaid orders! You can also check our Top Deals section for up to 60% off.",
    };
  }

  const matches = findCatalogMatches(query);
  if (!matches.length) {
    return {
      text: "I couldn’t match that precisely in the current Flash edit. Try asking for a product type, category, or budget like 'smartwatches under ₹5000' or 'running shoes'.",
    };
  }
  const budgetNote = normalized.includes("under") || normalized.includes("below") ? " I matched your budget target." : "";
  return {
    text: `Here are ${matches.length === 1 ? "the top recommendation" : `${matches.length} top recommendations`} from the Flash edit.${budgetNote} Click (+) to add directly to your cart or view details.`,
    productIds: matches.map((product) => product.id),
  };
}

export default function FlashAssistant({
  open,
  onOpen,
  onClose,
  seedQuery,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  seedQuery?: string;
}) {
  const { addToCart } = useCommerce();
  const [messages, setMessages] = useState<AssistantMessage[]>([starter]);
  const [query, setQuery] = useState("");
  const lastSeed = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), []);

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
    if (open) {
      window.setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 80);
    }
  }, [messages, open]);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flash-ai-trigger"
        aria-label="Open Flash AI"
        onClick={onOpen}
      >
        <span>
          <Bot size={16} />
        </span>
        <b>Ask AI</b>
        <Zap size={13} fill="currentColor" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="flash-ai-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={onClose}
          >
            <motion.aside
              className="flash-ai-panel"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: [0.85, 1.02, 1] }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{ transformOrigin: "bottom right" }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <header>
                <div>
                  <span>
                    <Bot size={19} />
                  </span>
                  <p>
                    <b>Flash AI</b>
                    <small>
                      <i /> Flash AI v2.4 active
                    </small>
                  </p>
                </div>
                <button aria-label="Close Flash AI" onClick={onClose}>
                  <X size={19} />
                </button>
              </header>

              <div className="flash-ai-policy">
                <Sparkles size={14} /> Product discovery, delivery, returns & smart savings.
              </div>

              <div className="flash-ai-feed" ref={scrollRef}>
                {messages.map((message) => (
                  <article className={`flash-ai-message flash-ai-message--${message.role}`} key={message.id}>
                    {message.role === "assistant" && <Bot size={15} />}
                    <div>
                      <p>{message.text}</p>
                      {message.productIds && (
                        <div className="flash-ai-products">
                          {message.productIds.map((id) => {
                            const product = productMap.get(id);
                            return (
                              product && (
                                <ProductPreview
                                  key={id}
                                  product={product}
                                  onAdd={() => {
                                    addToCart(product);
                                    toast.success(`Added ${product.name} to cart.`);
                                  }}
                                />
                              )
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className="flash-ai-prompts">
                {quickPrompts.map((prompt) => (
                  <button key={prompt} onClick={() => send(prompt)}>
                    {prompt}
                    <ChevronDown size={12} />
                  </button>
                ))}
              </div>

              <form
                className="flash-ai-compose"
                onSubmit={(event) => {
                  event.preventDefault();
                  send(query);
                }}
              >
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about products, delivery, savings..."
                />
                <button aria-label="Send to Flash AI" type="submit">
                  <Send size={17} />
                </button>
              </form>

              <p className="flash-ai-disclaimer">
                <MessageCircle size={12} /> Flash AI suggests from the current catalog.
              </p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProductPreview({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="flash-ai-product">
      <SafeImage src={product.image} alt={product.name} />
      <div>
        <span>{product.brand}</span>
        <Link to={`/product/${product.id}`}>
          {product.name}
          <ArrowUpRight size={12} />
        </Link>
        <b>
          {formatINR(product.price)} <del>{formatINR(product.mrp)}</del>
        </b>
      </div>
      <button onClick={onAdd} aria-label={`Add ${product.name} to cart`}>
        <Plus size={16} />
      </button>
    </div>
  );
}
