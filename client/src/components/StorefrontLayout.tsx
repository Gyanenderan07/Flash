/**
 * Shared Flash storefront shell — assertive black type, paper-white runway, and scarce Flash Volt
 * action moments unify header, navigation, and footer across every commerce route.
 */
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Menu, Search, ShoppingCart, Trash2, UserRound, X, Zap } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { categoryOrder, formatINR, getProduct } from "@/data/mockProducts";
import { useAuth } from "@/contexts/AuthContext";
import AuthPanel from "@/components/AuthPanel";
import FlashAssistant from "@/components/FlashAssistant";

function FlashLogo({ compact = false }: { compact?: boolean }) {
  return <Link className={`brand ${compact ? "brand--compact" : ""}`} to="/" aria-label="Flash home"><span className="flash-logo__bolt"><Zap size={29} fill="currentColor" strokeWidth={2.4} /></span><span>Flash</span></Link>;
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
  const [aiSeed, setAiSeed] = useState<string | undefined>();
  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); navigate(`/shop?search=${encodeURIComponent(searchQuery)}`); };
  const askFlashAi = (query: string) => { const cleaned = query.trim(); if (!cleaned) return; setAiSeed(`${cleaned}-${Date.now()}`); setAiOpen(true); };
  const accountInitial = user?.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const activeCategory = new URLSearchParams(location.search).get("category") ?? "";
  const activeCollection = new URLSearchParams(location.search).get("collection") ?? "";
  const categoryPath = (category: string) => `/shop?category=${encodeURIComponent(category.toLowerCase().replace(/\s+/g, "-"))}`;

  return <div className="storefront" id="top">
    <header className="site-header">
      <div className="header-main shell">
        <FlashLogo />
        <div className="search-wrap"><form className="search-bar" onSubmit={submitSearch}>
          <Search size={18} strokeWidth={2.3} /><input aria-label="Search products" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search for products, brands and more..." />
          <button aria-label="Search" type="submit"><Search size={19} /></button>
        </form>{searchQuery.trim() && <button className="flash-ai-search-suggestion" onClick={() => askFlashAi(searchQuery)}><Zap size={13} fill="currentColor" /> Ask Flash AI to find “{searchQuery.trim()}”</button>}</div>
        <div className="header-actions">
          {user ? <div className="header-account desktop-only"><button className="utility-link utility-link--member" onClick={() => setAccountOpen((current) => !current)}><span className="member-avatar">{user.avatar ? <img src={user.avatar} alt="" /> : accountInitial}<i aria-label="Active" /></span><span>{user.name.split(" ")[0]}</span></button>{accountOpen && <div className="account-dropdown"><p><span className="account-dropdown__avatar">{user.avatar ? <img src={user.avatar} alt="" /> : accountInitial}<i /></span><span><b>{user.name}</b><small>{user.email ?? user.phone ?? "Flash account"}</small></span></p><Link to="/account" onClick={() => setAccountOpen(false)}>My Profile</Link><Link to="/orders" onClick={() => setAccountOpen(false)}>My Orders</Link><Link to="/wishlist" onClick={() => setAccountOpen(false)}>Wishlist</Link><Link to="/account#addresses" onClick={() => setAccountOpen(false)}>Saved Addresses</Link><Link to="/flash-club" onClick={() => setAccountOpen(false)}>Flash Club Perks</Link><button onClick={() => { signOut(); setAccountOpen(false); navigate("/"); }}>Sign out</button></div>}</div> : <button className="utility-link desktop-only" onClick={() => setAuthOpen(true)}><UserRound size={20} /><span>Account</span></button>}
          <Link className="utility-link desktop-only" to="/wishlist"><Heart size={20} /><span>Wishlist</span></Link>
          <button className="cart-link" onClick={() => setCartOpen(true)} aria-label={`Cart with ${cartCount} items`}><ShoppingCart size={21} /><motion.span key={cartCount} className="cart-badge" initial={{ scale: .72, opacity: .5 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>{cartCount}</motion.span><span className="desktop-only">Cart</span></button>
          <button className="mobile-menu-toggle" aria-label="Open categories" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      <nav className={`category-nav ${menuOpen ? "category-nav--open" : ""}`} aria-label="Primary navigation">
        <div className="shell category-nav__inner">
          <NavLink className={`all-categories ${!activeCategory && !activeCollection ? "is-active" : ""}`} to="/shop" onClick={() => setMenuOpen(false)}><Menu size={16} /> All Categories</NavLink>
          <NavLink className={activeCollection === "new-in" ? "is-active" : ""} to="/shop?collection=new-in" onClick={() => setMenuOpen(false)}>New In</NavLink>
          <NavLink className={activeCollection === "top-deals" ? "is-active" : ""} to="/shop?collection=top-deals" onClick={() => setMenuOpen(false)}>Top Deals</NavLink>
          {categoryOrder.map((category) => { const slug = category.toLowerCase().replace(/\s+/g, "-"); return <NavLink className={activeCategory === slug ? "is-active" : ""} key={category} to={categoryPath(category)} onClick={() => setMenuOpen(false)}>{category}</NavLink>; })}
          <NavLink className="club-nav" to="/flash-club" onClick={() => setMenuOpen(false)}>Flash Club <span>NEW</span></NavLink>
        </div>
      </nav>
    </header>
    <main>{children}</main>
    {cartOpen && <div className="cart-drawer-backdrop" onMouseDown={() => setCartOpen(false)}><aside className="cart-drawer" aria-label="Quick cart" onMouseDown={(event) => event.stopPropagation()}><div className="cart-drawer__head"><div><p className="eyebrow">Quick cart</p><h2>Keep it moving.</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div><div className="cart-drawer__lines">{cart.filter((line) => !line.saved).length ? cart.filter((line) => !line.saved).map((line) => { const product = getProduct(line.productId); return product && <article key={`${line.productId}-${line.variantSku ?? line.color}-${line.size}`}><img src={line.image ?? product.image} alt={product.name} /><div><b>{product.name}</b><span>{line.colorName ?? line.color ?? "Standard"} · Qty {line.quantity}</span><small>{formatINR(product.price * line.quantity)}</small></div><button aria-label={`Remove ${product.name}`} onClick={() => removeFromCart({ productId: line.productId, color: line.color, size: line.size, variantSku: line.variantSku })}><Trash2 size={15} /></button></article>; }) : <p className="cart-drawer__empty">Your cart is waiting for the next find.</p>}</div><div className="cart-drawer__footer"><p><span>Subtotal</span><b>{formatINR(subtotal)}</b></p><Link className="lime-button" to="/cart" onClick={() => setCartOpen(false)}>View cart <ArrowRight size={17} /></Link></div></aside></div>}
    {authOpen && <div className="auth-modal-shell" onMouseDown={() => setAuthOpen(false)}><div className="auth-modal" role="dialog" aria-modal="true" aria-label="Sign in to Flash" onMouseDown={(event) => event.stopPropagation()}><button className="auth-modal__close" onClick={() => setAuthOpen(false)} aria-label="Close sign in"><X size={20} /></button><AuthPanel onComplete={() => setAuthOpen(false)} /></div></div>}
    <FlashAssistant open={aiOpen} onOpen={() => setAiOpen(true)} onClose={() => setAiOpen(false)} seedQuery={aiSeed} />
    <footer className="site-footer">
      <div className="shell footer-grid">
        <section className="newsletter"><h2>Stay ahead of the drop.</h2><p>Fast finds, sharp deals and new arrivals before they move.</p><form onSubmit={(event) => { event.preventDefault(); }}><input aria-label="Email address" type="email" placeholder="Enter your email" required /><button aria-label="Subscribe"><Zap size={17} fill="currentColor" /></button></form></section>
        <section><h3>Shop</h3><Link to="/shop">All Categories</Link><Link to="/shop?sort=discount">Today’s Deals</Link><Link to="/shop?sort=rating">Best Sellers</Link><Link to="/shop?sort=newest">New Arrivals</Link></section>
        <section><h3>Customer Service</h3><Link to="/account">Help Center</Link><Link to="/orders">Track Order</Link><Link to="/cart">Shipping & Returns</Link><Link to="/account">Contact Us</Link></section>
        <section><h3>Company</h3><Link to="/flash-club">About Flash</Link><Link to="/flash-club">Flash Club</Link><Link to="/shop">Flash Edit</Link></section>
        <section><h3>Policies</h3><a href="#top">Privacy Policy</a><a href="#top">Terms of Service</a><a href="#top">Return Policy</a></section>
        <section className="app-links"><h3>Download The App</h3><button>Get it on <b>Google Play</b></button><button>Download on the <b>App Store</b></button></section>
      </div>
      <div className="shell footer-bottom"><FlashLogo compact /><p>© 2026 Flash. All rights reserved.</p><div><a href="#top" aria-label="Instagram">ig</a><a href="#top" aria-label="Facebook">f</a><a href="#top" aria-label="X">x</a></div></div>
    </footer>
  </div>;
}
