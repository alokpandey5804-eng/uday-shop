import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "../store/cart";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const FALLBACK_IMAGES: Record<string, string> = {
  Electronics: "📱",
  Fashion: "👟",
  "Home & Kitchen": "🍳",
  Appliances: "🔌",
  Books: "📚",
  Sports: "⚽",
  Beauty: "💄",
  Toys: "🧸",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const emoji = FALLBACK_IMAGES[product.category] ?? "🛍️";
  const hasImage = product.images.length > 0 && product.images[0];

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth group flex flex-col"
      data-ocid={`product.item.${index + 1}`}
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.id.toString() }}
      >
        <div className="relative aspect-square bg-secondary flex items-center justify-center overflow-hidden">
          {hasImage ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-smooth"
            />
          ) : (
            <span className="text-6xl group-hover:scale-110 transition-smooth select-none">
              {emoji}
            </span>
          )}
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 text-xs bg-primary/10 text-primary border-primary/20"
          >
            {product.category}
          </Badge>
          {Number(product.stock) === 0 && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="text-sm font-semibold text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-1 gap-2">
        <Link
          to="/products/$productId"
          params={{ productId: product.id.toString() }}
        >
          <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3 h-3 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(128)</span>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary font-display">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ₹{Math.round(product.price * 1.2).toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-green-600 font-medium">17% off</span>
          </div>

          <Button
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs h-8"
            onClick={() => addToCart(product)}
            disabled={Number(product.stock) === 0}
            data-ocid={`product.add_button.${index + 1}`}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            {Number(product.stock) === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
