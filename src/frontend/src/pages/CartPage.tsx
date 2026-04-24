import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Layout } from "../components/Layout";
import { useCartStore } from "../store/cart";

export function CartPage() {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } =
    useCartStore();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div
          className="max-w-7xl mx-auto px-4 py-16 text-center"
          data-ocid="cart.empty_state"
        >
          <ShoppingCart className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">Add items to it now.</p>
          <Link
            to="/products"
            search={{
              category: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              q: undefined,
            }}
            data-ocid="cart.shop_button"
          >
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8">
              Shop Now
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const savings = cartItems.reduce(
    (sum, item) =>
      sum +
      (Math.round(item.product.price * 1.2) - item.product.price) *
        item.quantity,
    0,
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-4" data-ocid="cart.page">
        <h1 className="font-display font-bold text-xl text-foreground mb-4">
          My Cart ({cartCount} items)
        </h1>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1 space-y-3" data-ocid="cart.items_list">
            {cartItems.map((item, i) => (
              <div
                key={item.product.id.toString()}
                className="bg-card border border-border rounded-lg p-4 flex gap-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <Link
                  to="/products/$productId"
                  params={{ productId: item.product.id.toString() }}
                >
                  <div className="w-24 h-24 bg-secondary rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-3xl">🛍️</span>
                    )}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to="/products/$productId"
                    params={{ productId: item.product.id.toString() }}
                  >
                    <h3 className="font-display font-semibold text-sm text-foreground hover:text-primary line-clamp-2">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.product.category}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-bold text-primary">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ₹
                      {(
                        Math.round(item.product.price * 1.2) * item.quantity
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-border rounded">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                        data-ocid={`cart.decrease_qty.${i + 1}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        data-ocid={`cart.increase_qty.${i + 1}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs"
                      onClick={() => removeFromCart(item.product.id)}
                      data-ocid={`cart.remove_button.${i + 1}`}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div
              className="bg-card border border-border rounded-lg p-4 sticky top-20"
              data-ocid="cart.summary"
            >
              <h2 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                Price Details
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Price ({cartCount} items)</span>
                  <span>
                    ₹
                    {cartItems
                      .reduce(
                        (s, i) =>
                          s + Math.round(i.product.price * 1.2) * i.quantity,
                        0,
                      )
                      .toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{savings.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                  <span>Total Amount</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <p className="text-green-600 text-xs mt-2 mb-3">
                You will save ₹{savings.toLocaleString("en-IN")} on this order
              </p>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                onClick={() => navigate({ to: "/checkout" })}
                data-ocid="cart.checkout_button"
              >
                Place Order
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
