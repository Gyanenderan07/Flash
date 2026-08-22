/**
 * Flash product detail — deep product discovery, responsive commerce actions, and the same
 * high-key editorial retail staging used on the homepage and catalog.
 */
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Sparkles, Truck, X, Zap, ZoomIn } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, getDiscount, getProduct, getProductGallery, getProductVariant, products, type Product } from "@/data/mockProducts";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/common/SafeImage";

import { getLiveStoreProducts } from "@/services/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistIds } = useCommerce();
  const [liveProduct, setLiveProduct] = useState<Product | null>(getProduct(id) ?? null);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      const staticP = getProduct(id);
      if (staticP) {
        setLiveProduct(staticP);
      } else {
        const allLive = await getLiveStoreProducts();
        const found = allLive.find((p) => p.id === id);
        if (found) setLiveProduct(found);
      }
    }
    loadProduct();
  }, [id]);

  const product = liveProduct;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  useEffect(() => { if (product) { setSelectedColor(product.colors[0] ?? ""); setSelectedImage(0); setSelectedSize(product.sizes?.[0] ?? ""); } }, [product?.id]);

  const pairings = useMemo(() => product ? products.filter((item) => item.id !== product.id && (item.variants?.length || item.category === "Footwear")).slice(0, 2) : [], [product]);
  if (!product) return <section className="shell route-placeholder"><p className="eyebrow">Flash product</p><h1>This drop moved already.</h1><Link className="lime-button" to="/shop">Back to the edit</Link></section>;
  const activeVariant = getProductVariant(product, selectedColor);
  const activeGallery = getProductGallery(product, selectedColor);
  const chooseColor = (color: string) => { setSelectedColor(color); setSelectedImage(0); };
  const saved = wishlistIds.includes(product.id);
  const addCurrent = () => addToCart(product, { color: selectedColor, colorName: activeVariant?.name, variantSku: activeVariant?.sku, image: activeVariant?.image, size: selectedSize, quantity });
  const buyNow = () => { addCurrent(); navigate("/checkout"); };
  const addBundle = () => { [product, ...pairings].forEach((item) => addToCart(item)); };

  return <section className="pdp-page shell">
    <div className="pdp-breadcrumbs"><Link to="/">Home</Link><ChevronRight size={14} /><Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>{product.category}</Link><ChevronRight size={14} /><b>{product.name}</b></div>
    <div className="pdp-hero">
      <div className="pdp-gallery"><div className="pdp-thumbnails">{activeGallery.map((image, index) => <button className={selectedImage === index ? "is-active" : ""} onClick={() => setSelectedImage(index)} key={`${activeVariant?.sku ?? product.sku}-${image}-${index}`}><SafeImage src={image} alt={`${product.name} ${activeVariant?.name ?? ""} view ${index + 1}`} /></button>)}</div><div className={`pdp-media ${zoomed ? "is-zoomed" : ""}`} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)}><AnimatePresence mode="wait"><motion.img key={`${activeVariant?.sku ?? product.sku}-${selectedImage}`} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} src={activeGallery[selectedImage] ?? activeGallery[0]} alt={`${product.name} in ${activeVariant?.name ?? "default"}`} onClick={() => setLightbox(true)} onError={(e) => { const target = e.target as HTMLImageElement; if (!target.src.includes('unsplash.com')) target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'; }} /></AnimatePresence><button className="zoom-button" onClick={() => setLightbox(true)}><ZoomIn size={18} /> Zoom</button></div></div>
      <div className="pdp-info"><p className="eyebrow">{product.brand} / {product.subcategory}</p><h1>{product.name}</h1><div className="product-meta"><span>SKU: {activeVariant?.sku ?? product.sku}</span><b>Flash verified product</b></div><p className="pdp-description">{product.description}</p><div className="pdp-price"><strong>{formatINR(product.price)}</strong><del>MRP {formatINR(product.mrp)}</del><em>Save {getDiscount(product)}%</em></div><div className="pdp-deal-capsule"><span><Zap size={15} fill="currentColor" /> Flash acceleration</span><b>{getDiscount(product)}% off this product lane</b><small>{product.stock} pieces ready to move. Pick your finish, then move first.</small></div><p className="tax-note">Inclusive of all taxes. Extra cashback routes in at checkout.</p>
        <div className="variant-block"><b>Color: <span>{activeVariant?.name ?? "Standard"}</span></b><div className="swatch-row">{product.colors.map((color: string) => { const variant = getProductVariant(product, color); return <button key={color} onClick={() => chooseColor(color)} className={selectedColor === color ? "is-selected" : ""} style={{ background: color }} aria-label={`Choose ${variant?.name ?? color}`} title={variant?.name ?? color}><Check size={13} /></button>; })}</div></div>
        {product.sizes && <div className="variant-block"><b>Size: <span>{selectedSize}</span></b><div className="size-row">{product.sizes.map((size: string) => <button key={size} className={selectedSize === size ? "is-selected" : ""} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>}
        <div className="pincode-card"><div><Truck size={20} /><span><b>Delivery, keeping pace.</b><AnimatePresence mode="wait"><motion.small key={pincodeChecked ? "checked" : "idle"} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .16 }} >{pincodeChecked ? "⚡ Free Delivery by Tomorrow, 11 AM." : "Enter your pincode to catch the delivery window."}</motion.small></AnimatePresence></span></div><form onSubmit={(event) => { event.preventDefault(); setPincodeChecked(pincode.length >= 6); }}><input value={pincode} onChange={(event) => { setPincodeChecked(false); setPincode(event.target.value.replace(/\D/g, "").slice(0, 6)); }} inputMode="numeric" placeholder="Enter pincode" /><button>Check</button></form></div>
        <div className="pdp-actions"><div className="quantity-stepper"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button><motion.span key={quantity} initial={{ scale: .86 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>{quantity}</motion.span><button onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}><Plus size={15} /></button></div><motion.button whileTap={{ scale: .97 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="lime-button" onClick={addCurrent}><ShoppingCart size={18} /> Add to Cart</motion.button><motion.button whileTap={{ scale: .97 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="black-button pdp-buy" onClick={buyNow}>Buy Now <ChevronRight size={17} /></motion.button></div>
        <div className="utility-actions"><motion.button whileTap={{ scale: .94 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className={saved ? "is-saved" : ""} onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={saved ? "currentColor" : "none"} />{saved ? "Saved to Wishlist" : "Add to Wishlist"}</motion.button><motion.button whileTap={{ scale: .97 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={() => navigator.share?.({ title: product.name, url: location.href })}><Share2 size={17} /> Share</motion.button></div>
        <p className="stock-note"><Sparkles size={15} /> {product.stock} units moving now — ready to dispatch.</p>
      </div>
    </div>
    <section className="pdp-details"><div><h2>Built to keep moving.</h2><p>{product.description} Each detail is selected for the hours that do not slow down.</p><ul>{product.highlights.map((highlight: string) => <li key={highlight}><Check size={15} />{highlight}</li>)}</ul></div><div className="spec-table"><h3>Specifications</h3><dl><div><dt>Brand</dt><dd>{product.brand}</dd></div><div><dt>Category</dt><dd>{product.category}</dd></div><div><dt>Warranty</dt><dd>1 year manufacturer warranty</dd></div><div><dt>Returns</dt><dd>15-day easy return window</dd></div><div><dt>In the box</dt><dd>{product.name}, quick start guide, warranty card</dd></div></dl></div></section>
    <section className="bundle-section"><div className="section-heading"><div><p className="eyebrow">The fast lane</p><h2>Move as a set.</h2></div><button className="black-button" onClick={addBundle}>Build the lane <Plus size={16} /></button></div><div className="bundle-row"><article><SafeImage src={activeVariant?.image ?? product.image} alt={product.name} /><div><b>{product.name}</b><span>{formatINR(product.price)}</span></div></article>{pairings.map((item) => <><span className="bundle-plus" key={`${item.id}-plus`}>+</span><article key={item.id}><SafeImage src={item.image} alt={item.name} /><div><b>{item.name}</b><span>{formatINR(item.price)}</span></div></article></>)}</div></section>
    <section className="pdp-dispatch-signal"><span><Zap size={23} fill="currentColor" /></span><div><p className="eyebrow">Flash signal</p><h2>Price set. Variant locked.<br />Your next move is the only one left.</h2></div><p>Every product detail here is built to make the edit clearer before it moves out of your lane.</p></section>
    <section className="related-section"><div className="section-heading"><h2>Keep the next find close.</h2><Link to="/shop" className="text-button">Explore the edit <ChevronRight size={17} /></Link></div><div className="catalog-grid">{products.filter((item) => item.id !== product.id && Boolean(item.variants?.length)).slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
    {lightbox && <div className="lightbox-backdrop" onMouseDown={() => setLightbox(false)}><div className="lightbox" onMouseDown={(event) => event.stopPropagation()}><button aria-label="Close gallery" onClick={() => setLightbox(false)}><X size={22} /></button><SafeImage src={activeGallery[selectedImage] ?? activeGallery[0]} alt={`${product.name} ${activeVariant?.name ?? ""}`} /></div></div>}
  </section>;
}
