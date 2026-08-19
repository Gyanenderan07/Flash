/**
 * Flash homepage — Supercharged Editorial Commerce in its primary form: a paper-white runway,
 * assertive Space Grotesk headlines, and Flash Volt as a scarce signal for action and savings.
 */
import { ArrowRight, BadgeCheck, ChevronRight, Headphones, Sparkles, Truck, Undo2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { categoryOrder, formatINR, products } from "@/data/mockProducts";

const categoryArt = ["camera", "hoodie", "shoe", "watch", "chair", "scent", "ball", "bag"];
const categorySlug = (category: string) => category.toLowerCase().replace(/\s+/g, "-");

export default function Home() {
  const heroProduct = products[0];
  return <>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero__copy"><p className="eyebrow">Supercharged</p><h1 id="hero-title">SPEED.<br />STYLE.<br />YOU<span>.</span></h1><p className="hero__description">Next-gen essentials for<br />a faster, smarter life.</p><div className="hero__buttons"><Link className="lime-button" to="/shop">Shop the edit <ArrowRight size={18} /></Link><Link className="text-button" to="/shop?collection=top-deals">Explore deals <ArrowRight size={17} /></Link></div><div className="hero-home-note"><Sparkles size={16} /> <span>Fresh finds, always in motion.</span></div></div>
      <div className="hero__visual"><img src="/manus-storage/flash-wireless-headphones_6f2bbc10.png" alt="Pearl-white wireless headphones on a neon lime product stage" /><div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" /><div className="discount-disc"><span>UP TO</span><strong>60%</strong><b>OFF</b></div><article className="hero-product-card"><small>Flash Exclusive</small><strong>{heroProduct.name}</strong><span>{heroProduct.subcategory}</span><div><b>{formatINR(heroProduct.price)}</b><del>{formatINR(heroProduct.mrp)}</del></div><em>UP TO 60% OFF</em><Link to={`/product/${heroProduct.id}`} aria-label={`View ${heroProduct.name}`}>+</Link></article></div><div className="hero-pager" aria-label="Featured Flash edit"><b /><i /><i /><i /></div>
    </section>
    <section className="category-rail shell" aria-label="Shop by category"><div className="category-rail__track">{categoryOrder.map((category, index) => <Link className={`category-card category-card--${categoryArt[index]}`} to={`/shop?category=${categorySlug(category)}`} key={category}><span className="category-art"><CategoryGlyph type={categoryArt[index]} /></span><span>{category}</span></Link>)}<Link className="view-all-card" to="/shop"><span>View<br />All</span><ChevronRight size={18} /></Link></div></section>
    <section className="benefit-band shell" aria-label="Flash store guarantees"><div className="benefit"><span className="benefit-icon"><Zap size={22} fill="currentColor" /></span><p><b>Lightning Fast Delivery</b><small>Get your order in a flash</small></p><ChevronRight /></div><div className="benefit"><span className="benefit-icon"><Undo2 size={22} /></span><p><b>Easy Returns</b><small>15-day hassle-free returns</small></p><ChevronRight /></div><div className="benefit"><span className="benefit-icon"><BadgeCheck size={22} /></span><p><b>Secure Payments</b><small>Protected checkout flow</small></p><ChevronRight /></div><div className="benefit"><span className="benefit-icon"><Headphones size={22} /></span><p><b>Support Route</b><small>Help is always in reach</small></p><ChevronRight /></div></section>
    <section className="deals shell" aria-labelledby="deals-title"><div className="section-heading"><div><p className="eyebrow">Today’s pace</p><h2 id="deals-title">Best deals right now</h2></div><div className="deal-timer desktop-only"><span>Offers refresh in:</span><b>08<small>Hrs</small></b><b>46<small>Min</small></b><b>32<small>Secs</small></b></div><Link className="black-button" to="/shop?collection=top-deals">View all deals <ArrowRight size={16} /></Link></div><div className="product-grid home-product-grid">{products.slice(0, 5).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="promotion-grid shell" aria-label="Flash promotions"><article className="promo-card promo-club"><div><p className="promo-kicker">Flash Club</p><h2>First dip. Fast lane.<br />More in every drop.</h2><Link to="/flash-club">Enter the club <ArrowRight size={16} /></Link></div><span className="promo-bolt"><Zap fill="currentColor" strokeWidth={2.1} /></span></article><article className="promo-card promo-cashback"><div><p className="promo-kicker">Extra 10% prepaid</p><h2>Let the savings<br />move first.</h2><span>Use code: <b>FLASH10</b></span></div><div className="cashback-mark">%</div></article><article className="promo-card promo-arrivals"><div><p className="promo-kicker">New arrivals</p><h2>Just dropped.<br />Already in motion.</h2><Link to="/shop?collection=new-in">Catch the drop <ArrowRight size={16} /></Link></div><img src="/manus-storage/flash-sneaker_316d488e.png" alt="Black running sneaker with lime detail" /></article></section>
    <section className="brand-band shell"><div><h2>Trusted at the speed of now.</h2><p>Sharp finds, straight pricing and service that keeps pace.</p></div><div className="brand-pills"><span className="brand-pill brand-pill--flash"><Zap size={16} fill="currentColor" /> Flash</span><span className="brand-pill">NEXORA</span><span className="brand-pill">VANTAGE</span><span className="brand-pill">URBANIC</span><span className="brand-pill">ZAPSTER</span><span className="brand-pill">LUXORA</span><span className="brand-pill">BOLTIC</span></div></section>
  </>;
}

function CategoryGlyph({ type }: { type: string }) {
  if (type === "camera") return <span className="glyph-camera"><i /></span>;
  if (type === "hoodie") return <span className="glyph-hoodie" />;
  if (type === "shoe") return <span className="glyph-shoe" />;
  if (type === "watch") return <span className="glyph-watch" />;
  if (type === "chair") return <span className="glyph-chair" />;
  if (type === "scent") return <span className="glyph-scent" />;
  if (type === "ball") return <span className="glyph-ball" />;
  return <span className="glyph-bag" />;
}
