import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CreditCard,
  Gift,
  HelpCircle,
  Package,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Store,
  Truck,
  Wallet,
} from "lucide-react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Layout } from "../components/Layout";
import { LoadingPage } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { useCategories, useProducts } from "../hooks/useProducts";

const HERO_CATEGORIES = [
  { name: "Electronics", emoji: "📱", color: "bg-blue-50" },
  { name: "Fashion", emoji: "👗", color: "bg-pink-50" },
  { name: "Home & Kitchen", emoji: "🏠", color: "bg-green-50" },
  { name: "Appliances", emoji: "🔌", color: "bg-yellow-50" },
  { name: "Books", emoji: "📚", color: "bg-purple-50" },
  { name: "Sports", emoji: "⚽", color: "bg-orange-50" },
];

const BANNER_SLIDES = [
  {
    bg: "from-primary to-primary/80",
    text: "Big Billion Days Sale",
    sub: "Up to 80% off on all categories",
  },
  {
    bg: "from-primary/90 to-primary/60",
    text: "Electronics Fest",
    sub: "Best deals on mobiles, laptops & more",
  },
  {
    bg: "from-primary/80 to-primary/50",
    text: "Fashion Week",
    sub: "Top brands at amazing prices",
  },
];

// ── Flipkart-style Profile / My Account section ──────────────────────────────
const MY_ACCOUNT_LINKS = [
  {
    icon: Package,
    label: "My Orders",
    desc: "Track & manage orders",
    href: "/my-orders" as const,
    accent: "#1a73e8",
    bg: "#e8f0fe",
    ocid: "home.account.my_orders_link",
  },
  {
    icon: Wallet,
    label: "My Wallet",
    desc: "Manage your balance",
    href: null,
    accent: "#f57c00",
    bg: "#fff3e0",
    ocid: "home.account.wallet_link",
  },
  {
    icon: CreditCard,
    label: "Saved Cards",
    desc: "Quick checkout",
    href: null,
    accent: "#0f9d58",
    bg: "#e6f4ea",
    ocid: "home.account.saved_cards_link",
  },
  {
    icon: Gift,
    label: "Gift Cards",
    desc: "Gifting made easy",
    href: null,
    accent: "#d93025",
    bg: "#fce8e6",
    ocid: "home.account.gift_cards_link",
  },
  {
    icon: Star,
    label: "Wishlist",
    desc: "Your saved items",
    href: null,
    accent: "#fbbc04",
    bg: "#fef9e7",
    ocid: "home.account.wishlist_link",
  },
  {
    icon: RotateCcw,
    label: "Returns",
    desc: "Easy 10-day returns",
    href: null,
    accent: "#9c27b0",
    bg: "#f3e5f5",
    ocid: "home.account.returns_link",
  },
];

const QUICK_ACCESS = [
  {
    icon: Package,
    title: "My Orders",
    subtitle: "Track your orders",
    href: "/my-orders" as const,
    accent: "#1a73e8",
    bg: "#e8f0fe",
    ocid: "home.quick_access.my_orders_card",
  },
  {
    icon: HelpCircle,
    title: "Need Help?",
    subtitle: "Customer Support",
    href: null,
    accent: "#0f9d58",
    bg: "#e6f4ea",
    ocid: "home.quick_access.help_card",
  },
  {
    icon: Store,
    title: "Become a Seller",
    subtitle: "Start selling today",
    href: null,
    accent: "#f57c00",
    bg: "#fff3e0",
    ocid: "home.quick_access.seller_card",
  },
  {
    icon: Gift,
    title: "Gift Cards",
    subtitle: "Gifting made easy",
    href: null,
    accent: "#d93025",
    bg: "#fce8e6",
    ocid: "home.quick_access.gift_card",
  },
];

export function HomePage() {
  const { data: products, isLoading, error, refetch } = useProducts();
  const { data: categories } = useCategories();

  const featured = products?.slice(0, 8) ?? [];
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : HERO_CATEGORIES.map((c, i) => ({ id: String(i), name: c.name }));

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-primary" data-ocid="home.hero_section">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-primary-foreground">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight">
              Shop Everything You Love
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-6">
              Discover millions of products at unbeatable prices. Fast delivery,
              easy returns.
            </p>
            <Link
              to="/products"
              search={{
                category: undefined,
                minPrice: undefined,
                maxPrice: undefined,
                q: undefined,
              }}
              className="inline-flex items-center gap-2 bg-yellow-400 text-foreground px-6 py-3 rounded-sm font-bold hover:bg-yellow-300 transition-smooth"
              data-ocid="home.shop_now_button"
            >
              Shop Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="hidden md:flex gap-3">
            <div className="w-40 h-40 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-7xl">
              📱
            </div>
            <div className="w-32 h-32 mt-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-5xl">
              👟
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section
        className="bg-card border-b border-border"
        data-ocid="home.categories_section"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {displayCategories.map((cat) => {
              const heroData = HERO_CATEGORIES.find((h) => h.name === cat.name);
              return (
                <Link
                  key={cat.id}
                  to="/products"
                  search={{
                    category: cat.name,
                    minPrice: undefined,
                    maxPrice: undefined,
                    q: undefined,
                  }}
                  className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-smooth group min-w-[80px]"
                  data-ocid={`home.category_link.${cat.id}`}
                >
                  <span className="text-3xl">{heroData?.emoji ?? "🛍️"}</span>
                  <span className="text-xs font-medium text-foreground text-center whitespace-nowrap">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deal Banners */}
      <section className="bg-muted/30 py-4" data-ocid="home.deals_section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BANNER_SLIDES.map((slide) => (
              <Link
                key={slide.text}
                to="/products"
                search={{
                  category: undefined,
                  minPrice: undefined,
                  maxPrice: undefined,
                  q: undefined,
                }}
                className={`bg-gradient-to-r ${slide.bg} rounded-lg p-5 text-primary-foreground hover:opacity-90 transition-smooth`}
                data-ocid="home.banner.item"
              >
                <h3 className="font-display font-bold text-lg">{slide.text}</h3>
                <p className="text-primary-foreground/80 text-sm">
                  {slide.sub}
                </p>
                <span className="mt-2 inline-block text-xs font-semibold underline">
                  Shop Now →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-background py-6" data-ocid="home.featured_section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl text-foreground">
              Featured Products
            </h2>
            <Link
              to="/products"
              search={{
                category: undefined,
                minPrice: undefined,
                maxPrice: undefined,
                q: undefined,
              }}
              className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
              data-ocid="home.view_all_link"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading && <LoadingPage />}
          {error && <ErrorMessage onRetry={() => refetch()} />}
          {!isLoading && !error && featured.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
              {featured.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
          {!isLoading && !error && featured.length === 0 && (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="home.empty_state"
            >
              <p className="text-4xl mb-3">🛍️</p>
              <p className="font-medium">No products available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── My Orders & Profile — Flipkart-style Account Section ── */}
      <section
        className="bg-card border-t border-b border-border py-6"
        data-ocid="home.account_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </div>
              <h2 className="font-display font-bold text-base text-foreground">
                My Account
              </h2>
            </div>
            <Link
              to="/my-orders"
              className="text-primary text-xs font-semibold hover:underline flex items-center gap-0.5"
              data-ocid="home.account.view_orders_link"
            >
              Track Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* My Orders Hero Card */}
          <Link to="/my-orders" data-ocid="home.account.my_orders_banner">
            <div className="flex items-center gap-4 p-4 mb-4 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-smooth cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-foreground text-sm">
                  My Orders
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Track your deliveries, view order history, and manage returns
                </p>
              </div>
              <div className="shrink-0">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  Track Now
                </span>
              </div>
            </div>
          </Link>

          {/* Account Links Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {MY_ACCOUNT_LINKS.map((item) => {
              const Icon = item.icon;
              const inner = (
                <div
                  key={item.ocid || item.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-smooth cursor-pointer group"
                  data-ocid={item.ocid}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight hidden sm:block">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <Link key={item.label} to={item.href}>
                  {inner}
                </Link>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section
        className="bg-background border-b border-border py-6"
        data-ocid="home.quick_access_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display font-bold text-base text-foreground mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_ACCESS.map((item) => {
              const Icon = item.icon;
              const inner = (
                <div
                  key={item.ocid || item.title}
                  className="flex items-center gap-3 p-4 rounded-sm border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                  data-ocid={item.ocid}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0 group-hover:text-primary transition-colors" />
                </div>
              );

              return item.href ? (
                <Link key={item.title} to={item.href}>
                  {inner}
                </Link>
              ) : (
                <div key={item.title}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section
        className="bg-muted/30 border-t border-border py-6"
        data-ocid="home.trust_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                Icon: Truck,
                title: "Free Delivery",
                sub: "On orders above ₹499",
              },
              {
                Icon: RotateCcw,
                title: "Easy Returns",
                sub: "10-day return policy",
              },
              {
                Icon: Shield,
                title: "Secure Payments",
                sub: "100% secure checkout",
              },
              { Icon: Star, title: "Top Brands", sub: "Genuine products only" },
            ].map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <badge.Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
