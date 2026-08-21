/**
 * Flash homepage — Supercharged Editorial Commerce in its primary form: a paper-white runway,
 * assertive Space Grotesk headlines, dynamic category ribbon, live running countdown timer,
 * and Flash Volt as a scarce signal for action and savings.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Briefcase, ChevronRight, Cpu, Dumbbell, Footprints, Headphones, Home as HomeIcon, Shirt, Sparkles, Truck, Undo2, Watch, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/common/SafeImage";
import { categoryOrder, formatINR, getDiscount, products, type Product } from "@/data/mockProducts";
import { getLiveStoreProducts } from "@/services/productService";

const categoryArt = ["camera", "hoodie", "shoe", "watch", "chair", "scent", "ball", "bag"];
const categorySlug = (category: string) => category.toLowerCase().replace(/\s+/g, "-");

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const heroProducts = allProducts.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function loadLiveProducts() {
      const liveList = await getLiveStoreProducts();
      setAllProducts(liveList);
    }
    loadLiveProducts();
  }, []);

  // Requirement 3: Live Running "Offers Refresh In:" Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 46, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        // When countdown reaches 00:00:00, automatically loop/reset back to 08:00:00
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, heroProducts.length]);

  const activeProduct = heroProducts[currentSlide] ?? heroProducts[0];

  const triggerSupport = () => {
    window.dispatchEvent(new CustomEvent("flash-open-support"));
  };

  return (
    <>
      <section
        className="hero shell"
        aria-labelledby="hero-title"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hero__copy">
          <p className="eyebrow">Supercharged</p>
          <h1 id="hero-title">
            SPEED.<br />STYLE.<br />YOU<span>.</span>
          </h1>
          <p className="hero__description">
            Next-gen essentials for<br />a faster, smarter life.
          </p>
          <div className="hero__buttons">
            <Link className="lime-button" to="/shop">
              Shop the edit <ArrowRight size={18} />
            </Link>
            <Link className="text-button" to="/shop?collection=top-deals">
              Explore deals <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-home-note">
            <Sparkles size={16} /> <span>Fresh finds, always in motion.</span>
          </div>
        </div>

        <div className="hero__visual">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <SafeImage
                src={activeProduct.image}
                alt={activeProduct.name}
              />
              <div className="hero-orbit hero-orbit--one" />
              <div className="hero-orbit hero-orbit--two" />
              <div className="discount-disc">
                <span>UP TO</span>
                <strong>{getDiscount(activeProduct)}%</strong>
                <b>OFF</b>
              </div>
              <article className="hero-product-card">
                <small>Flash Exclusive</small>
                <strong>{activeProduct.name}</strong>
                <span>{activeProduct.subcategory}</span>
                <div>
                  <b>{formatINR(activeProduct.price)}</b>
                  <del>{formatINR(activeProduct.mrp)}</del>
                </div>
                <em>UP TO {getDiscount(activeProduct)}% OFF</em>
                <Link to={`/product/${activeProduct.id}`} aria-label={`View ${activeProduct.name}`}>
                  +
                </Link>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-pager" aria-label="Featured Flash edit">
          {heroProducts.map((_, index) => (
            <button
              key={index}
              className={`hero-pager-dot ${currentSlide === index ? "is-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{ position: "relative", cursor: "pointer", background: "transparent", border: "none", padding: "4px" }}
            >
              <i style={{ display: "block", width: "8px", height: "8px", borderRadius: "50%", background: currentSlide === index ? "#CCFF00" : "rgba(15, 17, 21, 0.2)" }} />
              {currentSlide === index && (
                <motion.span
                  layoutId="hero-pager-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "12px",
                    border: "2px solid #CCFF00",
                    pointerEvents: "none",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Requirement 1: DYNAMIC CATEGORY ICONS UPGRADE (Center Category Ribbon) */}
      <section className="category-rail shell" aria-label="Shop by category">
        <div className="category-rail__track">
          {categoryOrder.map((category, index) => (
            <Link
              className="category-card group"
              to={`/shop?category=${categorySlug(category)}`}
              key={category}
            >
              <span className="category-art">
                <CategoryGlyph type={categoryArt[index]} />
              </span>
              <span className="category-label">{category}</span>
            </Link>
          ))}
          <Link className="view-all-card group" to="/shop">
            <span>
              View<br />All
            </span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      <section className="benefit-band shell" aria-label="Flash store guarantees">
        <div className="benefit">
          <span className="benefit-icon">
            <Zap size={22} fill="currentColor" />
          </span>
          <p>
            <b>Lightning Fast Delivery</b>
            <small>Get your order in a flash</small>
          </p>
          <ChevronRight />
        </div>
        <div className="benefit">
          <span className="benefit-icon">
            <Undo2 size={22} />
          </span>
          <p>
            <b>Easy Returns</b>
            <small>15-day hassle-free returns</small>
          </p>
          <ChevronRight />
        </div>
        <div className="benefit">
          <span className="benefit-icon">
            <BadgeCheck size={22} />
          </span>
          <p>
            <b>Secure Payments</b>
            <small>Protected checkout flow</small>
          </p>
          <ChevronRight />
        </div>

        {/* Requirement 4: Support Route Pill Trigger */}
        <div className="benefit cursor-pointer hover:bg-gray-100/60 transition-colors" onClick={triggerSupport}>
          <span className="benefit-icon bg-[#0F1115] text-[#CCFF00]">
            <Headphones size={22} />
          </span>
          <p>
            <b>Support Route</b>
            <small>Help is always in reach</small>
          </p>
          <ChevronRight className="text-[#CCFF00]" />
        </div>
      </section>

      <section className="deals shell" aria-labelledby="deals-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Today’s pace</p>
            <h2 id="deals-title">Best deals right now</h2>
          </div>

          {/* Requirement 3: LIVE RUNNING COUNTDOWN TIMER */}
          <div className="deal-timer">
            <span>Offers refresh in:</span>
            <b>
              {String(timeLeft.hours).padStart(2, "0")}<small>Hrs</small>
            </b>
            <b>
              {String(timeLeft.minutes).padStart(2, "0")}<small>Min</small>
            </b>
            <b>
              {String(timeLeft.seconds).padStart(2, "0")}<small>Secs</small>
            </b>
          </div>

          <Link className="black-button" to="/shop?collection=top-deals">
            View all deals <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid home-product-grid">
          {allProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="promotion-grid shell" aria-label="Flash promotions">
        <article className="promo-card promo-club">
          <div>
            <p className="promo-kicker">Flash Club</p>
            <h2>
              First dip. Fast lane.<br />More in every drop.
            </h2>
            <Link to="/flash-club">
              Enter the club <ArrowRight size={16} />
            </Link>
          </div>
          <span className="promo-bolt">
            <Zap fill="currentColor" strokeWidth={2.1} />
          </span>
        </article>
        <article className="promo-card promo-cashback">
          <div>
            <p className="promo-kicker">Extra 10% prepaid</p>
            <h2>
              Let the savings<br />move first.
            </h2>
            <span>
              Use code: <b>FLASH10</b>
            </span>
          </div>
          <div className="cashback-mark">%</div>
        </article>
        <article className="promo-card promo-arrivals">
          <div>
            <p className="promo-kicker">New arrivals</p>
            <h2>
              Just dropped.<br />Already in motion.
            </h2>
            <Link to="/shop?collection=new-in">
              Catch the drop <ArrowRight size={16} />
            </Link>
          </div>
          <SafeImage
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
            alt="Black running sneaker with lime detail"
          />
        </article>
      </section>

      <section className="brand-band shell">
        <div>
          <h2>Trusted at the speed of now.</h2>
          <p>Sharp finds, straight pricing and service that keeps pace.</p>
        </div>
        <div className="brand-pills">
          <span className="brand-pill brand-pill--flash">
            <Zap size={16} fill="currentColor" /> Flash
          </span>
          <span className="brand-pill">NEXORA</span>
          <span className="brand-pill">VANTAGE</span>
          <span className="brand-pill">URBANIC</span>
          <span className="brand-pill">ZAPSTER</span>
          <span className="brand-pill">LUXORA</span>
          <span className="brand-pill">BOLTIC</span>
        </div>
      </section>
    </>
  );
}

function CategoryGlyph({ type }: { type: string }) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-[#0F1115] border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00] shadow-md shadow-[#CCFF00]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-[#0F1115] group-hover:border-[#CCFF00] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.5)]">
      {type === "camera" && <Cpu size={26} strokeWidth={2.2} />}
      {type === "hoodie" && <Shirt size={26} strokeWidth={2.2} />}
      {type === "shoe" && <Footprints size={26} strokeWidth={2.2} />}
      {type === "watch" && <Watch size={26} strokeWidth={2.2} />}
      {type === "chair" && <HomeIcon size={26} strokeWidth={2.2} />}
      {type === "scent" && <Sparkles size={26} strokeWidth={2.2} />}
      {type === "ball" && <Dumbbell size={26} strokeWidth={2.2} />}
      {type === "bag" && <Briefcase size={26} strokeWidth={2.2} />}
    </div>
  );
}
