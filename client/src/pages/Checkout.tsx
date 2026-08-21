/**
 * Flash Checkout Page — Multi-step purchase flow integrated with Razorpay Test Gateway Checkout (rzp_test_TSHa6T1dhpiA9w).
 * Supports Razorpay Modal Popup for UPI/Card online payments, and direct placement for Cash on Delivery.
 */
import { useState } from "react";
import { ArrowRight, Check, ChevronLeft, CreditCard, MapPin, Plus, ShieldCheck, ShoppingBag, Smartphone, Truck, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR } from "@/data/mockProducts";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import AuthPanel from "@/components/AuthPanel";

const steps = ["Address", "Delivery", "Payment"];
const DEFAULT_RAZORPAY_KEY = "rzp_test_TSHa6T1dhpiA9w";

export default function Checkout() {
  const navigate = useNavigate();
  const { addresses, addAddress, total, subtotal, deliveryFee, createOrder, cart } = useCommerce();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [addressId, setAddressId] = useState(addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id ?? "");
  const [speed, setSpeed] = useState("express");
  const [payment, setPayment] = useState("upi");
  const [addressOpen, setAddressOpen] = useState(false);
  const [form, setForm] = useState({ label: "Home", name: "", line1: "", city: "", state: "", pincode: "", phone: "" });

  const handleAddress = (event: React.FormEvent) => {
    event.preventDefault();
    const newAddress = addAddress({ ...form, isDefault: addresses.length === 0 });
    setAddressId(newAddress.id);
    setAddressOpen(false);
    setForm({ label: "Home", name: "", line1: "", city: "", state: "", pincode: "", phone: "" });
  };

  const moveForward = () => {
    if (step === 0 && !addressId) {
      toast.error("Add a delivery address before continuing.");
      setAddressOpen(true);
      return;
    }
    setStep(step + 1);
  };

  const handlePaymentAndPlaceOrder = () => {
    if (!addressId) {
      toast.error("Please select or add a delivery address.");
      setAddressOpen(true);
      return;
    }

    const selectedAddress = addresses.find((a) => a.id === addressId);
    const payableAmount = speed === "express" ? total : total + deliveryFee;

    // Cash on Delivery direct placement
    if (payment === "cod") {
      const order = createOrder(addressId);
      if (order) {
        toast.success("Order placed successfully with Cash on Delivery!");
        navigate("/order-success", { state: { orderId: order.id } });
      } else {
        toast.error("Add a valid delivery address before placing your order.");
      }
      return;
    }

    // Razorpay Test Gateway Payment Flow
    const rawKey = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
    const razorpayKey = rawKey && !rawKey.includes("your-key") ? rawKey : DEFAULT_RAZORPAY_KEY;
    const Razorpay = (window as any).Razorpay;

    if (!Razorpay) {
      toast.error("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(payableAmount * 100), // Amount in paise
      currency: "INR",
      name: "Flash Storefront",
      description: "Fastlane Purchase Checkout",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=FlashLogo&backgroundColor=0f1115",
      handler: function (response: any) {
        if (response && response.razorpay_payment_id) {
          const order = createOrder(addressId);
          if (order) {
            toast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`);
            navigate("/order-success", {
              state: {
                orderId: order.id,
                paymentId: response.razorpay_payment_id,
                paymentMethod: payment.toUpperCase(),
              },
            });
          } else {
            toast.error("Order processing error. Please contact support.");
          }
        }
      },
      prefill: {
        name: user?.name || selectedAddress?.name || "Flash Customer",
        email: user?.email || "customer@flash.com",
        contact: user?.phone || selectedAddress?.phone || "9876543210",
      },
      notes: {
        address: selectedAddress ? `${selectedAddress.line1}, ${selectedAddress.city}` : "Flash Address",
        speed: speed,
      },
      theme: {
        color: "#CCFF00",
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment window closed.");
        },
      },
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Razorpay Payment Failure:", response.error);
        toast.error(`Payment failed: ${response.error?.description || "Transaction declined"}`);
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay Execution Exception:", err);
      toast.error("Could not launch Razorpay payment popup.");
    }
  };

  const activeCartLines = cart.filter((line) => !line.saved);
  if (!activeCartLines.length) {
    return (
      <section className="checkout-empty-route shell">
        <aside>
          <span>
            <Zap fill="currentColor" />
          </span>
          <p className="eyebrow">Checkout lane</p>
          <h2>
            Nothing moving<br />
            <em>just yet.</em>
          </h2>
          <p>A find in your cart turns this lane into a delivery route.</p>
        </aside>
        <div>
          <ShoppingBag size={30} />
          <p className="eyebrow">Your cart is clear</p>
          <h1>Bring a find into your cart first.</h1>
          <p>Explore the edit, catch a deal, then head back here when it is time to move.</p>
          <Link to="/shop" className="lime-button">
            Explore the edit <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="checkout-auth-route shell">
        <aside>
          <span>
            <Zap fill="currentColor" />
          </span>
          <p className="eyebrow">Secure checkout</p>
          <h2>
            Your finds<br />
            <em>stay ready.</em>
          </h2>
          <p>Sign in to lock your delivery details, rewards, and order updates together.</p>
        </aside>
        <div>
          <AuthPanel redirectTo="/checkout" />
        </div>
      </section>
    );
  }

  const payableTotal = speed === "express" ? total : total + deliveryFee;

  return (
    <section className="checkout-page shell">
      <div className="page-title">
        <p className="eyebrow">Checkout</p>
        <h1>Make it move.</h1>
        <p>Three short steps, then your order is in the fast lane.</p>
      </div>

      <div className="checkout-steps">
        {steps.map((label, index) => (
          <div key={label} className={index === step ? "is-active" : index < step ? "is-done" : ""}>
            <span>{index < step ? <Check size={15} /> : index + 1}</span>
            <b>{label}</b>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-stage">
          {step === 0 && (
            <section>
              <div className="checkout-stage__head">
                <div>
                  <MapPin size={20} />
                  <h2>Where should we send it?</h2>
                </div>
                <button onClick={() => setAddressOpen(true)}>
                  <Plus size={15} /> Add new
                </button>
              </div>
              {addresses.length ? (
                <div className="address-cards">
                  {addresses.map((address) => (
                    <label key={address.id} className={addressId === address.id ? "is-selected" : ""}>
                      <input type="radio" name="address" checked={addressId === address.id} onChange={() => setAddressId(address.id)} />
                      <span className="radio-dot" />
                      <div>
                        <b>
                          {address.label} {address.isDefault && <em>Default</em>}
                        </b>
                        <strong>{address.name}</strong>
                        <p>
                          {address.line1}, {address.city}, {address.state} — {address.pincode}
                        </p>
                        <small>{address.phone}</small>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="checkout-empty-address">
                  <MapPin size={25} />
                  <h3>Set your first delivery stop.</h3>
                  <p>Add an address to send this order into motion.</p>
                  <button className="black-button" onClick={() => setAddressOpen(true)}>
                    Add delivery address <Plus size={16} />
                  </button>
                </div>
              )}
            </section>
          )}

          {step === 1 && (
            <section>
              <div className="checkout-stage__head">
                <div>
                  <Truck size={20} />
                  <h2>Choose your delivery speed.</h2>
                </div>
              </div>
              <div className="speed-cards">
                <label className={speed === "express" ? "is-selected" : ""}>
                  <input type="radio" checked={speed === "express"} onChange={() => setSpeed("express")} />
                  <span className="radio-dot" />
                  <div>
                    <b>Flash Lightning Delivery</b>
                    <p>Tomorrow, before 11 AM in eligible areas.</p>
                    <strong>FREE</strong>
                  </div>
                  <em>Fastest</em>
                </label>
                <label className={speed === "standard" ? "is-selected" : ""}>
                  <input type="radio" checked={speed === "standard"} onChange={() => setSpeed("standard")} />
                  <span className="radio-dot" />
                  <div>
                    <b>Standard Shipping</b>
                    <p>Delivers in 3–5 working days.</p>
                    <strong>{deliveryFee ? formatINR(deliveryFee) : "FREE"}</strong>
                  </div>
                </label>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <div className="checkout-stage__head">
                <div>
                  <ShieldCheck size={20} />
                  <h2>How would you like to pay?</h2>
                </div>
              </div>
              <div className="payment-options">
                {[
                  { id: "upi", title: "UPI / Razorpay Gateway", copy: "Google Pay, PhonePe, Paytm or Razorpay QR / UPI", icon: Smartphone },
                  { id: "card", title: "Credit / Debit Card (Razorpay)", copy: "Visa, Mastercard, RuPay, Netbanking", icon: CreditCard },
                  { id: "cod", title: "Cash on Delivery", copy: "Pay when your order arrives at your door", icon: Truck },
                ].map(({ id, title, copy, icon: Icon }) => (
                  <label key={id} className={payment === id ? "is-selected" : ""}>
                    <input type="radio" checked={payment === id} onChange={() => setPayment(id)} />
                    <span className="radio-dot" />
                    <Icon size={21} />
                    <div>
                      <b>{title}</b>
                      <p>{copy}</p>
                    </div>
                  </label>
                ))}
              </div>

              {payment !== "cod" && (
                <div className="upi-box mt-4 p-4 bg-[#0F1115] text-[#CCFF00] border border-[#CCFF00]/30 rounded-2xl flex items-center gap-3">
                  <Zap size={20} fill="currentColor" />
                  <span className="text-xs font-semibold text-white">
                    Razorpay Gateway (Test Mode: <code className="text-[#CCFF00]">rzp_test_TSHa6T1dhpiA9w</code>) will open securely upon clicking place order.
                  </span>
                </div>
              )}
            </section>
          )}

          <div className="checkout-actions">
            {step > 0 && (
              <button className="back-button" onClick={() => setStep(step - 1)}>
                <ChevronLeft size={17} /> Back
              </button>
            )}
            {step < 2 ? (
              <button className="lime-button" onClick={moveForward}>
                Continue <ArrowRight size={18} />
              </button>
            ) : (
              <button className="lime-button" onClick={handlePaymentAndPlaceOrder}>
                {payment === "cod" ? "Place secure order" : "Pay with Razorpay"} <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        <aside className="checkout-summary">
          <h2>Order total</h2>
          <div>
            <span>Items</span>
            <b>{formatINR(subtotal)}</b>
          </div>
          <div>
            <span>Delivery</span>
            <b>{speed === "express" ? "FREE" : deliveryFee ? formatINR(deliveryFee) : "FREE"}</b>
          </div>
          <div className="checkout-summary__total">
            <span>Payable</span>
            <strong>{formatINR(payableTotal)}</strong>
          </div>
          <p>
            <ShieldCheck size={14} /> Encrypted, secure checkout
          </p>
        </aside>
      </div>

      {addressOpen && (
        <div className="quick-view-backdrop">
          <form className="address-modal" onSubmit={handleAddress}>
            <button type="button" className="modal-close" onClick={() => setAddressOpen(false)}>
              ×
            </button>
            <p className="eyebrow">New delivery address</p>
            <h2>Set the next stop.</h2>
            <div className="address-form-grid">
              {(["label", "name", "line1", "city", "state", "pincode", "phone"] as const).map((field) => (
                <label key={field}>
                  {field === "line1" ? "Address" : field[0].toUpperCase() + field.slice(1)}
                  <input required value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
                </label>
              ))}
            </div>
            <button className="lime-button" type="submit">
              Save address <ArrowRight size={17} />
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
