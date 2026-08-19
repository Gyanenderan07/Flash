/**
 * Flash confirmation — a clear end-state that turns the simulated checkout into a visible
 * order and tracking handoff while retaining Flash's restrained editorial energy.
 */
import { CheckCircle2, Download, MapPin, PackageCheck, Truck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, getProduct } from "@/data/mockProducts";

export default function OrderSuccess() {
  const location = useLocation();
  const { orders } = useCommerce();
  const orderId = (location.state as { orderId?: string } | null)?.orderId;
  const order = orderId ? orders.find((item) => item.id === orderId) : undefined;
  if (!order) return <section className="shell route-placeholder"><p className="eyebrow">Orders</p><h1>Your order stream is clear.</h1><Link className="lime-button" to="/shop">Explore the edit</Link></section>;
  const address = "Your saved delivery address";
  return <section className="order-success-page shell"><div className="success-mark"><CheckCircle2 size={42} /></div><p className="eyebrow">Order confirmed</p><h1>That’s moving.</h1><p className="success-copy">Order <b>{order.id}</b> has entered the Flash flow. We’ll keep you in the loop as it moves.</p><div className="success-grid"><section className="tracking-card"><div className="tracking-head"><div><PackageCheck size={21} /><span><b>Tracking starts now</b><small>Estimated delivery: tomorrow, before 11 AM</small></span></div><span className="status-pill">{order.status}</span></div><div className="tracking-line"><i className="is-done"><CheckCircle2 size={16} /></i><span /><i className="is-active"><PackageCheck size={16} /></i><span /><i><Truck size={16} /></i><span /><i><MapPin size={16} /></i></div><div className="tracking-labels"><b>Confirmed</b><b>Packed</b><b>In transit</b><b>Delivered</b></div><div className="success-items">{order.lines.map((line) => { const product = getProduct(line.productId); return product && <article key={`${product.id}-${line.variantSku ?? line.color}-${line.size}`}><img src={line.image ?? product.image} alt={product.name} /><span>{product.name} <small>{[line.colorName ?? line.color, line.size, line.variantSku].filter(Boolean).join(" · ")} · Qty {line.quantity}</small></span><b>{formatINR(product.price * line.quantity)}</b></article>; })}</div></section><aside className="invoice-card"><h2>Invoice snapshot</h2><p><span>Order ID</span><b>{order.id}</b></p><p><span>Delivery</span><b>{address}</b></p><p><span>Paid</span><strong>{formatINR(order.total)}</strong></p><button onClick={() => window.print()}><Download size={15} /> Print invoice</button></aside></div><div className="success-actions"><Link className="lime-button" to="/shop">Continue shopping</Link><Link className="text-button" to="/orders">Track this order <Truck size={17} /></Link></div></section>;
}
