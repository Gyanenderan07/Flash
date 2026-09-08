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

          {/* Requirement 5: OFFICIAL PLAY STORE & APP STORE VECTOR LOGOS IN FOOTER */}
          <section className="app-links">
            <h3>Download The App</h3>
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              {/* Google Play Store Official Vector Badge */}
              <a
                href="#top"
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0F1115] border border-[#26282E] text-white hover:border-[#CCFF00] hover:brightness-110 transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                <svg width="22" height="22" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <path d="M48 24.3C47 26 47 28.5 47 31.7V480.3C47 483.5 47 486 48 487.7L276 256L48 24.3Z" fill="#2196F3" />
                  <path d="M351 180.8L276 256L351 331.2L428.5 287.3C445.8 277.5 445.8 234.5 428.5 224.7L351 180.8Z" fill="#FFC107" />
                  <path d="M48 487.7C55 491.5 64 491.8 72.8 486.8L351 331.2L276 256L48 487.7Z" fill="#4CAF50" />
                  <path d="M48 24.3L276 256L351 180.8L72.8 25.2C64 20.2 55 20.5 48 24.3Z" fill="#F44336" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 leading-tight">GET IT ON</span>
                  <span className="text-xs font-bold text-white tracking-tight leading-tight">Google Play</span>
                </div>
              </a>

              {/* Apple App Store Official Vector Badge */}
              <a
                href="#top"
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0F1115] border border-[#26282E] text-white hover:border-[#CCFF00] hover:brightness-110 transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                <svg width="22" height="22" viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-white">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.99.13-9.79-1.9-14.42-6.08-3.47-3.1-7.46-8.09-11.96-14.97-6.53-9.97-11.75-20.89-15.66-32.78-3.91-11.89-5.87-23.11-5.87-33.67 0-14.88 3.75-27.27 11.24-37.16 7.49-9.89 16.92-14.92 28.29-15.09 4.87 0 10.15 1.25 15.86 3.76 5.71 2.51 9.8 3.76 12.27 3.76 2.12 0 6.34-1.25 12.65-3.76 6.31-2.51 11.72-3.64 16.24-3.39 12.74.88 22.86 5.69 30.36 14.42-11.24 6.8-16.71 16.32-16.42 28.56.29 9.6 4.07 17.65 11.34 24.16 7.27 6.51 16.03 10.18 26.28 11.01-2.45 7.37-5.74 15.06-9.87 23.08zm-26.69-106.6c0 6.94-2.53 13.56-7.59 19.86-5.06 6.3-11.47 10.15-19.23 11.55-.26-1.02-.39-2.04-.39-3.06 0-6.94 2.68-13.78 8.04-20.52 5.36-6.74 12.01-10.74 19.95-12.01.13 1.39.22 2.78.22 4.18z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 leading-tight">Download on the</span>
                  <span className="text-xs font-bold text-white tracking-tight leading-tight">App Store</span>
                </div>
              </a>
            </div>
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
