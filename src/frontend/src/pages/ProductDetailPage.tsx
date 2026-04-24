import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { Check, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ErrorMessage } from "../components/ErrorMessage";
import { Layout } from "../components/Layout";
import { LoadingPage } from "../components/LoadingSpinner";
import { useProduct } from "../hooks/useProducts";
import { useCartStore } from "../store/cart";

export function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const id = BigInt(productId);
  const { data: product, isLoading, error, refetch } = useProduct(id);
  const { addToCart } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    toast.success("Added to cart!", { duration: 2000 });
    setTimeout(() => setAdded(false), 2000);
  }

  if (isLoading)
    return (
      <Layout>
        <LoadingPage />
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <ErrorMessage onRetry={() => refetch()} />
      </Layout>
    );
  if (!product)
    return (
      <Layout>
        <div
          className="max-w-7xl mx-auto px-4 py-12 text-center"
          data-ocid="product.not_found"
        >
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="font-display font-bold text-lg mb-2">
            Product Not Found
          </h2>
          <Link
            to="/products"
            search={{
              category: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              q: undefined,
            }}
            className="text-primary hover:underline text-sm"
          >
            ← Back to Products
          </Link>
        </div>
      </Layout>
    );

  const images = product.images.length > 0 ? product.images : [];
  const hasImages = images.length > 0;
  const originalPrice = Math.round(product.price * 1.2);
  const discount = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100,
  );

  return (
    <Layout>
      <div
        className="max-w-7xl mx-auto px-4 py-4"
        data-ocid="product.detail_page"
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to="/products"
            search={{
              category: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              q: undefined,
            }}
            className="hover:text-primary"
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-3" data-ocid="product.images_section">
            <div className="bg-card border border-border rounded-lg aspect-square flex items-center justify-center overflow-hidden">
              {hasImages ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <span className="text-8xl">
                  {product.category === "Electronics"
                    ? "📱"
                    : product.category === "Fashion"
                      ? "👗"
                      : product.category === "Home & Kitchen"
                        ? "🏠"
                        : "🛍️"}
                </span>
              )}
            </div>
            {hasImages && images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden transition-smooth ${i === selectedImage ? "border-primary" : "border-border"}`}
                    data-ocid={`product.thumbnail.${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4" data-ocid="product.info_section">
            <Badge
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border-primary/20"
            >
              {product.category}
            </Badge>

            <h1 className="font-display font-bold text-2xl text-foreground leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.2 (1,284 ratings)
              </span>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary font-display">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-muted-foreground line-through text-lg">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  {discount}% off
                </span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {Number(product.stock) > 0 ? (
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <Check className="w-4 h-4" />
                In Stock ({product.stock.toString()} available)
              </div>
            ) : (
              <p className="text-destructive font-medium text-sm">
                Out of Stock
              </p>
            )}

            <div className="border-t border-border pt-4">
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">
                Description
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                size="lg"
                className="flex-1 bg-yellow-400 text-foreground hover:bg-yellow-300 font-bold"
                onClick={handleAddToCart}
                disabled={Number(product.stock) === 0}
                data-ocid="product.add_to_cart_button"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {added ? "Added!" : "Add to Cart"}
              </Button>
              <Link
                to="/checkout"
                onClick={() => {
                  if (product) addToCart(product);
                }}
                className="flex-1"
                data-ocid="product.buy_now_button"
              >
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                  disabled={Number(product.stock) === 0}
                >
                  Buy Now
                </Button>
              </Link>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/40 rounded-lg p-3 text-xs space-y-1 text-muted-foreground">
              <p>
                🚚 <strong>Free Delivery</strong> on orders above ₹499
              </p>
              <p>
                ↩️ <strong>10-day return</strong> policy
              </p>
              <p>
                🔒 <strong>Secure</strong> checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
