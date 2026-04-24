import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Facebook,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Twitter,
  User,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { useAdminStore } from "../store/admin";
import { useCartStore } from "../store/cart";

const NAV_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Appliances",
  "Books",
  "Sports",
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { cartCount } = useCartStore();
  const { isAuthenticated, logout } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/products",
        search: {
          q: searchQuery.trim(),
          category: undefined,
          minPrice: undefined,
          maxPrice: undefined,
        },
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header Bar */}
      <header
        className="bg-primary shadow-md sticky top-0 z-50"
        data-ocid="layout.header"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex flex-col leading-tight"
              data-ocid="layout.logo_link"
            >
              <span className="text-primary-foreground font-display font-bold text-xl tracking-tight">
                Uday
              </span>
              <span className="text-primary-foreground/70 text-[9px] italic font-body -mt-0.5 hidden sm:block">
                Explore Plus
              </span>
            </Link>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-2xl hidden sm:flex"
            >
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 h-9 rounded-sm bg-card text-foreground border-0 focus-visible:ring-0 text-sm"
                  data-ocid="layout.search_input"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-3 text-primary hover:text-primary/80"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right Nav */}
            <nav className="flex items-center gap-1 ml-auto">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/admin/dashboard"
                    className="text-primary-foreground hover:text-primary-foreground/80 text-sm font-medium px-3 py-1 hidden sm:flex items-center gap-1"
                    data-ocid="layout.admin_dashboard_link"
                  >
                    <Package className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80 text-sm hidden sm:flex"
                    data-ocid="layout.logout_button"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link
                  to="/admin"
                  className="text-primary-foreground hover:text-primary-foreground/80 text-sm font-medium px-3 py-2 hidden sm:flex items-center gap-1 transition-colors"
                  data-ocid="layout.admin_link"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                  <ChevronDown className="w-3 h-3" />
                </Link>
              )}

              {/* My Orders Link */}
              <Link
                to="/my-orders"
                className="text-primary-foreground hover:text-primary-foreground/80 text-sm font-medium px-3 py-2 hidden sm:flex items-center gap-1 transition-colors"
                data-ocid="layout.my_orders_link"
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </Link>

              <Link
                to="/cart"
                className="relative text-primary-foreground hover:text-primary-foreground/80 p-2 flex items-center gap-1 transition-colors"
                data-ocid="layout.cart_link"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:block">
                  Cart
                </span>
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[10px] px-1 bg-yellow-400 text-foreground border-0 font-bold"
                    data-ocid="layout.cart_badge"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="sm:hidden text-primary-foreground p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                data-ocid="layout.mobile_menu_toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </nav>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden pb-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 h-9 rounded-sm bg-card text-foreground border-0 text-sm"
                  data-ocid="layout.mobile_search_input"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-3 text-primary"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Category Nav Bar */}
        <div className="bg-primary/90 border-t border-primary-foreground/10 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6 h-9 overflow-x-auto scrollbar-hide">
              <Link
                to="/"
                className="text-primary-foreground text-xs font-medium whitespace-nowrap hover:text-primary-foreground/80 transition-colors py-2"
                data-ocid="nav.home_link"
              >
                Home
              </Link>
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to="/products"
                  search={{
                    category: cat,
                    minPrice: undefined,
                    maxPrice: undefined,
                    q: undefined,
                  }}
                  className="text-primary-foreground text-xs font-medium whitespace-nowrap hover:text-primary-foreground/80 transition-colors py-2 flex items-center gap-1"
                  data-ocid={`nav.category_link.${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                  <ChevronDown className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-primary/95 border-t border-primary-foreground/10">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to="/products"
                  search={{
                    category: cat,
                    minPrice: undefined,
                    maxPrice: undefined,
                    q: undefined,
                  }}
                  className="text-primary-foreground text-sm py-2 border-b border-primary-foreground/10 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                  data-ocid="nav.mobile_category_link"
                >
                  {cat}
                </Link>
              ))}
              <Link
                to="/my-orders"
                className="text-primary-foreground text-sm py-2 flex items-center gap-2 border-b border-primary-foreground/10"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.mobile_my_orders_link"
              >
                <Package className="w-4 h-4" />
                My Orders
              </Link>
              <Link
                to="/admin"
                className="text-primary-foreground text-sm py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.mobile_admin_link"
              >
                <User className="w-4 h-4" />
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer — Flipkart Style */}
      <footer data-ocid="layout.footer">
        {/* Section 1: Links */}
        <div style={{ backgroundColor: "#172337" }} className="pt-10 pb-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
              {/* About */}
              <div>
                <h4
                  className="text-[10px] font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#878787" }}
                >
                  About
                </h4>
                <ul className="space-y-2.5">
                  {[
                    "About Us",
                    "Careers",
                    "Press",
                    "Corporate Information",
                  ].map((item) => (
                    <li key={item}>
                      <span
                        className="text-xs cursor-pointer hover:underline"
                        style={{ color: "#c0c0c0" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div>
                <h4
                  className="text-[10px] font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#878787" }}
                >
                  Help
                </h4>
                <ul className="space-y-2.5">
                  {[
                    "Payments",
                    "Shipping",
                    "Returns",
                    "FAQ",
                    "Report Infringement",
                  ].map((item) => (
                    <li key={item}>
                      <span
                        className="text-xs cursor-pointer hover:underline"
                        style={{ color: "#c0c0c0" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consumer Policy */}
              <div>
                <h4
                  className="text-[10px] font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#878787" }}
                >
                  Consumer Policy
                </h4>
                <ul className="space-y-2.5">
                  {[
                    "Cancellation & Returns",
                    "Terms Of Use",
                    "Security",
                    "Privacy",
                    "Sitemap",
                    "Grievance Redressal",
                  ].map((item) => (
                    <li key={item}>
                      <span
                        className="text-xs cursor-pointer hover:underline"
                        style={{ color: "#c0c0c0" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4
                  className="text-[10px] font-bold tracking-widest uppercase mb-4"
                  style={{ color: "#878787" }}
                >
                  Social
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs hover:underline transition-colors"
                      style={{ color: "#c0c0c0" }}
                      data-ocid="footer.facebook_link"
                    >
                      <Facebook
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "#1877f2" }}
                      />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs hover:underline transition-colors"
                      style={{ color: "#c0c0c0" }}
                      data-ocid="footer.twitter_link"
                    >
                      <Twitter
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "#1da1f2" }}
                      />
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs hover:underline transition-colors"
                      style={{ color: "#c0c0c0" }}
                      data-ocid="footer.youtube_link"
                    >
                      <Youtube
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "#ff0000" }}
                      />
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Bottom Bar */}
        <div style={{ backgroundColor: "#0d1b2a" }} className="py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Payment Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded border border-border"
                  style={{ color: "#c0c0c0", borderColor: "#333" }}
                >
                  Sold by registered sellers only
                </span>
                {["VISA", "Mastercard", "UPI", "COD"].map((method) => (
                  <span
                    key={method}
                    className="text-[10px] font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: "#1e2d42",
                      color: "#c0c0c0",
                      border: "1px solid #2a3a55",
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-[11px]" style={{ color: "#878787" }}>
                © {new Date().getFullYear()} Uday Shop. Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "#1a73e8" }}
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Flipkart-style Mobile Bottom Navigation */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border"
        style={{ backgroundColor: "#ffffff" }}
        data-ocid="layout.bottom_nav"
        aria-label="Bottom navigation"
      >
        <div className="grid grid-cols-5 h-14">
          <Link
            to="/"
            className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
            activeProps={{
              className:
                "flex flex-col items-center justify-center gap-0.5 text-primary",
            }}
            data-ocid="bottom_nav.home_link"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-[10px] font-medium leading-none">Home</span>
          </Link>

          <Link
            to="/products"
            search={{
              category: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              q: undefined,
            }}
            className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
            activeProps={{
              className:
                "flex flex-col items-center justify-center gap-0.5 text-primary",
            }}
            data-ocid="bottom_nav.categories_link"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
            </svg>
            <span className="text-[10px] font-medium leading-none">
              Categories
            </span>
          </Link>

          <Link
            to="/my-orders"
            className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
            activeProps={{
              className:
                "flex flex-col items-center justify-center gap-0.5 text-primary",
            }}
            data-ocid="bottom_nav.my_orders_link"
          >
            <Package className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium leading-none">
              My Orders
            </span>
          </Link>

          <Link
            to="/cart"
            className="relative flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
            activeProps={{
              className:
                "relative flex flex-col items-center justify-center gap-0.5 text-primary",
            }}
            data-ocid="bottom_nav.cart_link"
          >
            <span className="relative inline-flex">
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] text-[9px] font-bold bg-yellow-400 text-foreground rounded-full flex items-center justify-center px-0.5 leading-none">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium leading-none">Cart</span>
          </Link>

          <Link
            to="/admin"
            className="flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
            activeProps={{
              className:
                "flex flex-col items-center justify-center gap-0.5 text-primary",
            }}
            data-ocid="bottom_nav.profile_link"
          >
            <User className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium leading-none">
              Profile
            </span>
          </Link>
        </div>
      </nav>

      {/* Spacer so content isn't hidden behind bottom nav on mobile */}
      <div className="sm:hidden h-14" aria-hidden="true" />

      <Toaster position="bottom-right" />
    </div>
  );
}
