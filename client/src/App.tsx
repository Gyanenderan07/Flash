/**
 * Flash application router — a persistent editorial storefront shell carries the same sharp
 * paper-white, obsidian, and Flash Volt system through every commerce route.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import StorefrontLayout from "./components/StorefrontLayout";
import { CommerceProvider } from "./contexts/CommerceContext";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import FlashClub from "./pages/FlashClub";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";


function RoutePlaceholder({ title }: { title: string }) { return <section className="shell route-placeholder"><p className="eyebrow">Flash Commerce</p><h1>{title}</h1><p>The next layer of this storefront is being connected now.</p></section>; }

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider><AuthProvider><CommerceProvider><BrowserRouter><Toaster /><StorefrontLayout><Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Catalog />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/category/:categoryName" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/flash-club" element={<FlashClub />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes></StorefrontLayout></BrowserRouter></CommerceProvider></AuthProvider></TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
