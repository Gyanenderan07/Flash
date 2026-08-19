/**
 * Flash product card — a high-key editorial product stage with concise obsidian data and
 * Flash Volt reserved for deal, save, and add-to-cart signals.
 */
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getDiscount, formatINR, type Product } from "@/data/mockProducts";
import { useCommerce } from "@/contexts/CommerceContext";

export default function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (product: Product) => void }) {
  const { addToCart, toggleWishlist, wishlistIds } = useCommerce();
  const isSaved = wishlistIds.includes(product.id);
  return <article className="commerce-product-card">
    <span className="deal-tag">-{getDiscount(product)}%</span>
    {product.express && <span className="express-tag"><Sparkles size={11} /> Express</span>}
    <button className={`favourite commerce-favourite ${isSaved ? "is-saved" : ""}`} aria-label={`Save ${product.name}`} onClick={() => toggleWishlist(product.id)}><Heart size={16} fill={isSaved ? "currentColor" : "none"} /></button>
    <Link className="commerce-product-card__media" to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
    <div className="commerce-product-card__detail"><p>{product.brand}</p><Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link><span className="availability-line">{product.stock} ready to dispatch</span><div className="price-line"><strong>{formatINR(product.price)}</strong><del>{formatINR(product.mrp)}</del></div></div>
    <div className="commerce-product-card__actions"><button className="card-quick-view" onClick={() => onQuickView?.(product)}>Quick view</button><button className="add-cart" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}><ShoppingCart size={17} /></button></div>
  </article>;
}
