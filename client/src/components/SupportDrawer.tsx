/**
 * Flash Customer Support Drawer — Slide-over drawer with live order tracking,
 * interactive FAQ accordion, and direct support channels.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, Headphones, MessageCircle, Phone, Search, ShieldCheck, Truck, X, Zap } from "lucide-react";
import { toast } from "sonner";

export default function SupportDrawer({
  isOpen,
  onClose,
  onOpenAiChat,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiChat?: (query: string) => void;
}) {
  const [orderId, setOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState<{
    id: string;
    status: string;
    eta: string;
    courier: string;
    steps: { title: string; time: string; done: boolean }[];
  } | null>(null);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleOrderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = orderId.trim().toUpperCase();
    if (!cleaned) {
      toast.error("Please enter an Order ID.");
      return;
    }

    setTrackingResult({
      id: cleaned.startsWith("FL-") ? cleaned : `FL-${cleaned}`,
      status: "Out for Delivery",
      eta: "Today by 5:30 PM",
      courier: "Flash Express Logistics",
      steps: [
        { title: "Order Placed & Verified", time: "10:14 AM", done: true },
        { title: "Packed at Hub", time: "11:30 AM", done: true },
        { title: "Out for Delivery", time: "01:45 PM", done: true },
        { title: "Delivered to Doorstep", time: "Expected 5:30 PM", done: false },
      ],
    });
    toast.success(`Tracking details loaded for ${cleaned}`);
  };

  const faqs = [
    {
      question: "Instant Refund",
      answer: "Refunds are processed within 15 minutes of item pickup directly back to your original payment method or Flash Wallet. Zero convenience fees deducted.",
    },
    {
      question: "Delivery Window",
      answer: "Standard Flash orders arrive within 1-2 business days. Flash Express orders in supported metro locations deliver within 4 hours of order verification.",
    },
    {
      question: "Return Pickup",
      answer: "Initiate a return from My Orders -> Return Item. A Flash logistics executive will pick up the package free of charge within 24 hours.",
    },
    {
      question: "Damaged / Missing Item",
      answer: "Report any item issues within 48 hours of delivery. Flash provides an immediate replacement or 100% money-back guarantee.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end" style={{ zIndex: 150 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F1115]/75 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md h-full bg-[#0F1115] text-white shadow-2xl flex flex-col overflow-hidden border-l border-[#26282E]"
            style={{ width: "100%", maxWidth: "460px", backgroundColor: "#0F1115", color: "#fff" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#242730] bg-[#14161C]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#CCFF00] text-[#0F1115] flex items-center justify-center font-bold shadow-md shadow-[#CCFF00]/15">
                  <Headphones size={20} strokeWidth={2.4} />
                </span>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#CCFF00] mb-0.5">
                    Flash Care
                  </p>
                  <h2 className="text-lg font-bold text-white leading-tight">Customer Support</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#20232C] hover:bg-[#2C303D] text-[#A0A4B0] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close support"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
              {/* Order Tracking Card */}
              <section className="bg-[#181A22] border border-[#282B36] rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#CCFF00] text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Truck size={15} />
                  <span>Live Order Tracking</span>
                </div>
                <form onSubmit={handleOrderSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Enter Order ID (e.g. FL-89421)"
                      className="w-full bg-[#101217] border border-[#2C303E] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#CCFF00] hover:bg-[#d8ff26] text-[#0F1115] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 active:scale-95"
                  >
                    Track <ArrowRight size={14} />
                  </button>
                </form>

                {trackingResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-3 border-t border-[#2A2E3A] text-xs space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{trackingResult.id}</span>
                      <span className="bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                        {trackingResult.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px]">
                      Courier: <strong className="text-gray-200">{trackingResult.courier}</strong> | ETA:{" "}
                      <strong className="text-[#CCFF00]">{trackingResult.eta}</strong>
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {trackingResult.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px]">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              step.done ? "bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]" : "bg-gray-600"
                            }`}
                          />
                          <span className={step.done ? "text-gray-200 font-medium" : "text-gray-500"}>
                            {step.title}
                          </span>
                          <span className="ml-auto text-[10px] text-gray-500">{step.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </section>

              {/* Direct Support Channels */}
              <section className="space-y-2.5">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-1">
                  Direct Channels
                </p>

                {/* Chat with Flash Agent */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenAiChat?.("I need help with my order and account support.");
                  }}
                  className="w-full bg-[#181A22] hover:bg-[#20232E] border border-[#282B36] hover:border-[#CCFF00]/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#CCFF00]/10 text-[#CCFF00] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Zap size={18} fill="currentColor" />
                    </span>
                    <div>
                      <b className="block text-xs font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                        Chat with Flash Agent
                      </b>
                      <span className="text-[11px] text-gray-400">Instant AI & live representative assistance</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-all" />
                </button>

                {/* WhatsApp Support */}
                <a
                  href="https://wa.me/919876543210?text=Hi%20Flash%20Support,%20I%20need%20assistance"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#181A22] hover:bg-[#20232E] border border-[#282B36] hover:border-[#25D366]/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageCircle size={18} />
                    </span>
                    <div>
                      <b className="block text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">
                        WhatsApp Instant Support
                      </b>
                      <span className="text-[11px] text-gray-400">Quick chat on mobile app</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                </a>

                {/* Phone Call Support */}
                <a
                  href="tel:18003527466"
                  className="w-full bg-[#181A22] hover:bg-[#20232E] border border-[#282B36] hover:border-blue-400/40 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Phone size={18} />
                    </span>
                    <div>
                      <b className="block text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        Call Helpline (1800-FLASH-NOW)
                      </b>
                      <span className="text-[11px] text-gray-400">Available 24/7 · Mon - Sun</span>
                    </div>
                  </div>
                  <Clock size={15} className="text-gray-400" />
                </a>
              </section>

              {/* FAQ Accordion */}
              <section className="space-y-2.5 pt-2">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 px-1">
                  Frequently Asked Questions
                </p>
                <div className="space-y-2">
                  {faqs.map((faq, index) => {
                    const isActive = activeFaq === index;
                    return (
                      <div
                        key={index}
                        className="bg-[#181A22] border border-[#282B36] rounded-xl overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setActiveFaq(isActive ? null : index)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-xs font-bold text-gray-200 hover:text-white"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${
                              isActive ? "rotate-180 text-[#CCFF00]" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="px-3.5 pb-3.5 pt-0 text-[11px] text-gray-400 leading-relaxed border-t border-[#242733]/60">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Footer Note */}
            <div className="p-4 border-t border-[#242730] bg-[#14161C] flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#CCFF00]" /> 100% Protected Support
              </span>
              <span>Average response: &lt; 2 mins</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
