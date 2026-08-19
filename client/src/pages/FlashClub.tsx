/**
 * Flash Club — premium rewards information expressed as an editorial membership route, with
 * sparse Flash Volt signals and no invented testimonials or customer ratings.
 */
import { ArrowRight, Check, Copy, Crown, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function FlashClub() {
  const copyCode = () => { navigator.clipboard?.writeText("FLASH10"); toast.success("FLASH10 copied — use it in your cart."); };
  return <section className="club-page shell"><section className="club-hero"><div><p className="eyebrow">Flash Club</p><h1>First dip.<br />Fast lane.</h1><p>Member-only routes into faster delivery, sharper drops, and prepaid savings.</p><div><Link className="lime-button" to="/shop">Catch a drop <ArrowRight size={18} /></Link><Link className="text-button" to="/cart">See your benefits <ArrowRight size={17} /></Link></div></div><div className="club-orb"><Crown size={78} /><span>FLASH<br />CLUB</span></div></section><div className="club-stat-row"><article><Zap size={20} /><b>Lightning delivery</b><span>Priority dispatch on eligible orders.</span></article><article><Sparkles size={20} /><b>Early drop access</b><span>Catch new product edits before the rush.</span></article><article><Crown size={20} /><b>Member rewards</b><span>Connect an account to start a points tally.</span></article></div><section className="club-offer"><div><p className="eyebrow">Prepaid perk</p><h2>Let the savings move first.</h2><p>Use the active storefront code below for 10% off eligible prepaid orders.</p></div><div className="club-code"><b>FLASH10</b><span>10% OFF</span><button onClick={copyCode}><Copy size={16} /> Copy code</button></div></section><section className="club-perks"><div><p className="eyebrow">Your lane</p><h2>A quieter route to better finds.</h2></div><div>{["Member-only offers and checkout signals", "Priority support route once live account services are connected", "Browser-local cart and wishlist persistence in this prototype"].map((perk) => <p key={perk}><Check size={16} /> {perk}</p>)}</div></section></section>;
}
