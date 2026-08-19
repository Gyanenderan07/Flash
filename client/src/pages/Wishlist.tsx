/**
 * Flash wishlist — a saved-items rail that transforms discovery into a persistent, actionable
 * local shopping list while retaining the sharp Flash retail vocabulary.
 */
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useCommerce } from "@/contexts/CommerceContext";
import { products } from "@/data/mockProducts";

export default function Wishlist() {
  const { wishlistIds, addToCart, toggleWishlist } = useCommerce();
  const saved = products.filter((product) => wishlistIds.includes(product.id));
  return <section className="wishlist-page shell"><div className="page-title"><p className="eyebrow">Saved momentum</p><h1>Wishlist, ready.</h1><p>Keep the drops you want within instant reach.</p></div>{saved.length ? <div className="wishlist-grid">{saved.map((product) => <div className="wishlist-product" key={product.id}><ProductCard product={product} /><button className="move-to-cart" onClick={() => { addToCart(product); toggleWishlist(product.id); }}>Move to cart <ArrowRight size={16} /></button></div>)}</div> : <div className="empty-cart"><Heart size={33} /><h2>Save the next spark.</h2><p>Tap the heart on any product and it will land right here.</p><Link className="lime-button" to="/shop">Explore the edit</Link></div>}</section>;
}
