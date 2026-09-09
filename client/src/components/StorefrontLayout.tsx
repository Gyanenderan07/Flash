/**
 * Shared Flash storefront shell — assertive black type, paper-white runway, and scarce Flash Volt
 * action moments unify header, navigation, footer, customer support drawer, and app download badges across every route.
 */
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Menu, Search, ShoppingCart, Trash2, UserRound, X, Zap } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { categoryOrder, formatINR, getProduct } from "@/data/mockProducts";
import { useAuth } from "@/contexts/AuthContext";
import AuthPanel from "@/components/AuthPanel";
import AskAI from "@/components/AskAI";
import SupportDrawer from "@/components/SupportDrawer";
import QuickCartDrawer from "@/components/cart/QuickCartDrawer";
import SafeImage from "@/components/common/SafeImage";
import googlePlayBadge from "@/assets/badges/google-play-badge.png";
import appStoreBadge from "@/assets/badges/app-store-badge.png";

function FlashLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} to="/" aria-label="Flash home">
      <span className="flash-logo__bolt">
        <Zap size={29} fill="currentColor" strokeWidth={2.4} />
      </span>
      <span>Flash</span>
    </Link>
  );
}

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, searchQuery, setSearchQuery, cart, subtotal, removeFromCart } = useCommerce();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [aiSeed, setAiSeed] = useState<string | undefined>();

  useEffect(() => {
    const handleOpenSupport = () => setSupportOpen(true);
    const handleOpenAuth = () => setAuthOpen(true);
    window.addEventListener("flash-open-support", handleOpenSupport);
    window.addEventListener("flash-open-auth", handleOpenAuth);
    return () => {
      window.removeEventListener("flash-open-support", handleOpenSupport);
      window.removeEventListener("flash-open-auth", handleOpenAuth);
    };
  }, []);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  const askFlashAi = (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;
    setAiSeed(`${cleaned}-${Date.now()}`);
    setAiOpen(true);
  };

  const accountInitial = user?.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const searchParams = new URLSearchParams(location.search);
  const activeCategoryRaw = searchParams.get("category") ?? "";
  const activeCollection = searchParams.get("collection") ?? "";

  const matchCategorySlug = (cat: string, currentCategoryParam: string, currentPathname: string) => {
    const rawParam = decodeURIComponent(currentCategoryParam || (currentPathname.startsWith("/category/") ? currentPathname.slice(10) : ""));
    const normCurrent = rawParam.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normCat = cat.toLowerCase().replace(/[^a-z0-9]/g, "");
    return Boolean(normCurrent) && normCurrent === normCat;
  };

  const navItems = [
    { id: "all-categories", label: "All Categories", to: "/shop", icon: <Menu size={16} />, checkActive: () => (location.pathname === "/shop" || location.pathname === "/") && !activeCategoryRaw && !activeCollection },
    { id: "new-in", label: "New In", to: "/shop?collection=new-in", checkActive: () => activeCollection === "new-in" },
    { id: "top-deals", label: "Top Deals", to: "/shop?collection=top-deals", checkActive: () => activeCollection === "top-deals" },
    ...categoryOrder.map((cat) => {
      const slug = cat === "Home & Living" ? "home-living" : cat.toLowerCase().replace(/\s+/g, "-");
      return {
        id: `cat-${slug}`,
        label: cat,
        to: `/shop?category=${slug}`,
        checkActive: () => matchCategorySlug(cat, activeCategoryRaw, location.pathname),
      };
    }),
    { id: "flash-club", label: "Flash Club", to: "/flash-club", badge: "NEW", checkActive: () => location.pathname === "/flash-club" },
  ];

  return (
    <div className="storefront" id="top">
      <header className="site-header">
        <div className="header-main shell">
          <FlashLogo />
          <div className="search-wrap">
            <form className="search-bar" onSubmit={submitSearch}>
              <Search size={18} strokeWidth={2.3} />
              <input
                aria-label="Search products"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for products, brands and more..."
              />
              <button aria-label="Search" type="submit">
                <Search size={19} />
              </button>
            </form>
            {searchQuery.trim() && (
              <button className="flash-ai-search-suggestion" onClick={() => askFlashAi(searchQuery)}>
                <Zap size={13} fill="currentColor" /> Ask Flash AI to find “{searchQuery.trim()}”
              </button>
            )}
          </div>
          <div className="header-actions">
            {user ? (
              <div className="header-account desktop-only">
                <button className="utility-link utility-link--member" onClick={() => setAccountOpen((current) => !current)}>
                  <span className="member-avatar">
                    {user.avatar ? <SafeImage src={user.avatar} alt="" /> : accountInitial}
                    <i aria-label="Active" />
                  </span>
                  <span>{user.name.split(" ")[0]}</span>
                </button>
                {accountOpen && (
                  <div className="account-dropdown">
                    <p>
                      <span className="account-dropdown__avatar">
                        {user.avatar ? <SafeImage src={user.avatar} alt="" /> : accountInitial}
                        <i />
                      </span>
                      <span>
                        <b>{user.name}</b>
                        <small>{user.email ?? user.phone ?? "Flash account"}</small>
                      </span>
                    </p>
                    <Link to="/account" onClick={() => setAccountOpen(false)}>My Profile</Link>
                    <Link to="/orders" onClick={() => setAccountOpen(false)}>My Orders</Link>
                    <Link to="/wishlist" onClick={() => setAccountOpen(false)}>Wishlist</Link>
                    <button onClick={() => { setAccountOpen(false); setSupportOpen(true); }}>Customer Support</button>
                    <Link to="/flash-club" onClick={() => setAccountOpen(false)}>Flash Club Perks</Link>
                    <button onClick={() => { signOut(); setAccountOpen(false); navigate("/"); }}>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="utility-link desktop-only" onClick={() => setAuthOpen(true)}>
                <UserRound size={20} />
                <span>Account</span>
              </button>
            )}
            <Link className="utility-link desktop-only" to="/wishlist">
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>
            <button className="cart-link" onClick={() => setCartOpen(true)} aria-label={`Cart with ${cartCount} items`}>
              <ShoppingCart size={21} />
              <motion.span
                key={cartCount}
                className="cart-badge"
                initial={{ scale: 0.6, opacity: 0.5 }}
                animate={{ scale: [1.35, 0.9, 1], opacity: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
              >
                {cartCount}
              </motion.span>
              <span className="desktop-only">Cart</span>
            </button>
            <button className="mobile-menu-toggle" aria-label="Open categories" onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <nav className={`category-nav ${menuOpen ? "category-nav--open" : ""}`} aria-label="Primary navigation">
          <div className="shell category-nav__inner flex items-center gap-7 overflow-x-auto py-2 relative" style={{ gap: "28px" }}>
            {navItems.map((item) => {
              const isActive = item.checkActive();
              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-colors duration-150 inline-flex items-center gap-2 select-none ${
                    isActive ? "text-[#0F1115] font-bold" : "text-[#4A4A4A] hover:text-[#0F1115]"
                  }`}
                  style={{ position: "relative", zIndex: isActive ? 2 : 1 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#CCFF00",
                        borderRadius: "12px",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    />
                  )}
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: isActive ? "#0F1115" : "#CCFF00",
                        color: isActive ? "#CCFF00" : "#0F1115",
                        fontSize: "9px",
                        fontWeight: 800,
                        marginLeft: "4px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <QuickCartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {authOpen && (
        <div className="auth-modal-shell" onMouseDown={() => setAuthOpen(false)}>
          <div className="auth-modal" role="dialog" aria-modal="true" aria-label="Sign in to Flash" onMouseDown={(event) => event.stopPropagation()}>
            <button className="auth-modal__close" onClick={() => setAuthOpen(false)} aria-label="Close sign in">
              <X size={20} />
            </button>
            <AuthPanel onComplete={() => setAuthOpen(false)} />
          </div>
        </div>
      )}

      <AskAI open={aiOpen} onOpen={() => setAiOpen(true)} onClose={() => setAiOpen(false)} seedQuery={aiSeed} />
      <SupportDrawer isOpen={supportOpen} onClose={() => setSupportOpen(false)} onOpenAiChat={(query) => { setAiSeed(query); setAiOpen(true); }} />

      <footer className="site-footer">
        <div className="shell footer-grid">
          <section className="newsletter">
            <h2>Stay ahead of the drop.</h2>
            <p>Fast finds, sharp deals and new arrivals before they move.</p>
            <form onSubmit={(event) => { event.preventDefault(); }}>
              <input aria-label="Email address" type="email" placeholder="Enter your email" required />
              <button aria-label="Subscribe">
                <Zap size={17} fill="currentColor" />
              </button>
            </form>

            {/* Download The App section placed on left side under newsletter */}
            <div className="mt-6 flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                Download The App
              </span>
              
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Google Play Store Badge */}
                <a
                  href="#google-play"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-white hover:border-[#CCFF00] hover:brightness-110 transition-all duration-200 active:scale-[0.98] shadow-sm shrink-0"
                >
                  <img
                    src={googlePlayBadge || "/images/google-play-badge.png"}
                    alt="Google Play"
                    className="w-5 h-5 object-contain shrink-0"
                    loading="lazy"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 leading-tight">
                      GET IT ON
                    </span>
                    <span className="text-xs font-bold text-white tracking-tight leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>

                {/* Apple App Store Badge */}
                <a
                  href="#app-store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-white hover:border-[#CCFF00] hover:brightness-110 transition-all duration-200 active:scale-[0.98] shadow-sm shrink-0"
                >
                  <img
                    src={appStoreBadge || "/images/app-store-badge.png"}
                    alt="App Store"
                    className="w-5 h-5 object-contain shrink-0"
                    loading="lazy"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 leading-tight">
                      DOWNLOAD ON THE
                    </span>
                    <span className="text-xs font-bold text-white tracking-tight leading-tight">
                      App Store
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <section>
            <h3>Shop</h3>
            <Link to="/shop">All Categories</Link>
            <Link to="/shop?sort=discount">Today’s Deals</Link>
            <Link to="/shop?sort=rating">Best Sellers</Link>
            <Link to="/shop?sort=newest">New Arrivals</Link>
          </section>

          {/* Requirement 4: Customer Support Links Trigger Drawer */}
          <section>
            <h3>Customer Service</h3>
            <button type="button" className="footer-[#A0A4B0] hover:text-[#CCFF00] text-left text-xs transition-colors" onClick={() => setSupportOpen(true)}>
              Help Center
            </button>
            <button type="button" className="footer-[#A0A4B0] hover:text-[#CCFF00] text-left text-xs transition-colors" onClick={() => setSupportOpen(true)}>
              Track Order
            </button>
            <Link to="/cart">Shipping & Returns</Link>
            <button type="button" className="footer-[#A0A4B0] hover:text-[#CCFF00] text-left text-xs transition-colors" onClick={() => setSupportOpen(true)}>
              Contact Us
            </button>
          </section>

          <section>
            <h3>Company</h3>
            <Link to="/flash-club">About Flash</Link>
            <Link to="/flash-club">Flash Club</Link>
            <Link to="/shop">Flash Edit</Link>
          </section>

          <section>
            <h3>Policies</h3>
            <a href="#top">Privacy Policy</a>
            <a href="#top">Terms of Service</a>
            <a href="#top">Return Policy</a>
          </section>
        </div>
        <div className="shell footer-bottom">
          <FlashLogo compact />
          <p>© 2026 Flash. All rights reserved.</p>
          <div>
            <a href="#top" aria-label="Instagram">ig</a>
            <a href="#top" aria-label="Facebook">f</a>
            <a href="#top" aria-label="X">x</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
