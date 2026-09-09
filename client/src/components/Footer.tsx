import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import googlePlayBadge from "@/assets/badges/google-play-badge.png";
import appStoreBadge from "@/assets/badges/app-store-badge.png";

interface FooterProps {
  onOpenSupport?: () => void;
}

export function DownloadAppBadges() {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
        Download The App
      </span>

      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
        {/* Google Play Store Badge */}
        <a
          href="#google-play"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-white hover:border-[#CCFF00] hover:brightness-110 transition-all duration-200 active:scale-[0.98] shadow-sm shrink-0"
        >
          <img
            src={googlePlayBadge || "/images/google-play-badge.png"}
            alt="Google Play"
            className="w-5 h-5 object-contain shrink-0"
            loading="lazy"
          />
          <div className="flex flex-col text-left">
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 leading-tight">
              GET IT ON
            </span>
            <span className="text-xs font-bold text-white tracking-tight leading-tight">
              Google Play
            </span>
          </div>
        </a>

        {/* Apple App Store Badge */}
        <a
          href="#app-store"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-white hover:border-[#CCFF00] hover:brightness-110 transition-all duration-200 active:scale-[0.98] shadow-sm shrink-0"
        >
          <img
            src={appStoreBadge || "/images/app-store-badge.png"}
            alt="App Store"
            className="w-5 h-5 object-contain shrink-0"
            loading="lazy"
          />
          <div className="flex flex-col text-left">
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 leading-tight">
              DOWNLOAD ON THE
            </span>
            <span className="text-xs font-bold text-white tracking-tight leading-tight">
              App Store
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default function Footer({ onOpenSupport }: FooterProps) {
  return (
    <footer className="site-footer bg-[#f6f6f4] dark:bg-[#0E1015] border-t border-neutral-200 dark:border-neutral-800 transition-colors">
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

          {/* Download The App on the left side under newsletter */}
          <div className="mt-6">
            <DownloadAppBadges />
          </div>
        </section>

        <section>
          <h3>Shop</h3>
          <Link to="/shop">All Categories</Link>
          <Link to="/shop?sort=discount">Today’s Deals</Link>
          <Link to="/shop?sort=rating">Best Sellers</Link>
          <Link to="/shop?sort=newest">New Arrivals</Link>
        </section>

        {/* Customer Service Links */}
        <section>
          <h3>Customer Service</h3>
          <button
            type="button"
            className="footer-[#A0A4B0] hover:text-[#CCFF00] text-left text-xs transition-colors"
            onClick={onOpenSupport}
          >
            Help Center
          </button>
          <button
            type="button"
            className="footer-[#A0A4B0] hover:text-[#CCFF00] text-left text-xs transition-colors"
            onClick={onOpenSupport}
          >
            Track Order
          </button>
          <Link to="/cart">Shipping & Returns</Link>
          <button
            type="button"
            className="footer-[#A0A4B0] hover:text-[#CCFF00] text-left text-xs transition-colors"
            onClick={onOpenSupport}
          >
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
      </div>

      <div className="shell footer-bottom">
        <Link className="brand brand--compact" to="/" aria-label="Flash home">
          <span className="flash-logo__bolt">
            <Zap size={29} fill="currentColor" strokeWidth={2.4} />
          </span>
          <span>Flash</span>
        </Link>
        <p>© 2026 Flash. All rights reserved.</p>
        <div>
          <a href="#top" aria-label="Instagram">ig</a>
          <a href="#top" aria-label="Facebook">f</a>
          <a href="#top" aria-label="X">x</a>
        </div>
      </div>
    </footer>
  );
}
