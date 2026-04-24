import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Layout } from "../components/Layout";
import { useOrder } from "../hooks/useOrders";
import type { OrderStatus } from "../types";

type StatusKey = "pending" | "confirmed" | "shipped" | "delivered";

const STATUS_STEPS: { key: StatusKey; label: string }[] = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

function getStatusIndex(status: OrderStatus): number {
  return STATUS_STEPS.findIndex(
    (s) => s.key === (status as unknown as StatusKey),
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const variants: Record<StatusKey, { label: string; className: string }> = {
    pending: {
      label: "Order Placed",
      className: "bg-yellow-100 text-yellow-800 border-yellow-300",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-300",
    },
    shipped: {
      label: "Shipped",
      className: "bg-purple-100 text-purple-800 border-purple-300",
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-300",
    },
  };
  const key = status as unknown as StatusKey;
  const v = variants[key] ?? variants.pending;
  return (
    <Badge
      className={`border text-xs font-semibold px-2.5 py-0.5 ${v.className}`}
    >
      {v.label}
    </Badge>
  );
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderConfirmationPage() {
  const params = useParams({ from: "/order-confirmation/$orderId" });
  const orderId = BigInt(params.orderId);
  const { data: order, isLoading, isError } = useOrder(orderId);

  return (
    <Layout>
      <div
        className="bg-secondary/40 min-h-screen py-6"
        data-ocid="order_confirmation.page"
      >
        <div className="max-w-3xl mx-auto px-4">
          {isLoading ? (
            <div
              className="space-y-4"
              data-ocid="order_confirmation.loading_state"
            >
              <Skeleton className="h-32 w-full rounded-sm" />
              <Skeleton className="h-48 w-full rounded-sm" />
              <Skeleton className="h-32 w-full rounded-sm" />
            </div>
          ) : isError || !order ? (
            <div
              className="bg-card border border-border rounded-sm shadow-sm p-10 text-center"
              data-ocid="order_confirmation.error_state"
            >
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
              <h2 className="font-display font-bold text-xl text-foreground mb-1">
                Order Not Found
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                We couldn't find order #{params.orderId}. Please check your
                order ID.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/" data-ocid="order_confirmation.home_link">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div
              className="space-y-4"
              data-ocid="order_confirmation.success_state"
            >
              {/* Success Banner */}
              <div className="bg-card border border-green-200 rounded-sm shadow-sm overflow-hidden">
                <div className="bg-green-500 px-5 py-4 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0" />
                  <div>
                    <h1 className="font-display font-bold text-xl text-white">
                      Order Confirmed!
                    </h1>
                    <p className="text-green-100 text-sm">
                      Your order has been placed successfully.
                    </p>
                  </div>
                </div>
                <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="font-mono font-bold text-foreground text-sm">
                      #{order.id.toString().padStart(6, "0")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Order Date</p>
                    <p className="text-sm text-foreground font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Payment</p>
                    <p className="text-sm text-foreground font-medium">
                      Cash on Delivery
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              {/* Order Status Tracker */}
              <div
                className="bg-card border border-border rounded-sm shadow-sm px-5 py-5"
                data-ocid="order_confirmation.status_tracker"
              >
                <h2 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Order Status
                </h2>
                <div className="flex items-center">
                  {STATUS_STEPS.map((step, i) => {
                    const currentIdx = getStatusIndex(order.status);
                    const isCompleted = i <= currentIdx;
                    const isActive = i === currentIdx;
                    return (
                      <div key={step.key} className="flex-1 flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={[
                              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth",
                              isActive
                                ? "bg-primary border-primary text-primary-foreground"
                                : isCompleted
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "bg-card border-border text-muted-foreground",
                            ].join(" ")}
                          >
                            {isCompleted && !isActive ? "✓" : i + 1}
                          </div>
                          <p
                            className={[
                              "text-[10px] mt-1 text-center font-medium whitespace-nowrap",
                              isActive
                                ? "text-primary"
                                : isCompleted
                                  ? "text-green-600"
                                  : "text-muted-foreground",
                            ].join(" ")}
                          >
                            {step.label}
                          </p>
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div
                            className={[
                              "flex-1 h-0.5 mx-1 mb-4 rounded-full transition-smooth",
                              i < currentIdx ? "bg-green-400" : "bg-border",
                            ].join(" ")}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-sm">
                  <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-xs text-foreground font-medium">
                    Estimated Delivery:{" "}
                    <span className="text-primary">3–5 business days</span>
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div
                className="bg-card border border-border rounded-sm shadow-sm"
                data-ocid="order_confirmation.items_list"
              >
                <div className="px-5 py-3 border-b border-border bg-primary/5 flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-bold text-sm text-foreground">
                    Items Ordered ({order.items.length})
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {order.items.map((item, idx) => (
                    <div
                      key={`${item.productId.toString()}-${idx}`}
                      className="px-5 py-3 flex items-center justify-between gap-3"
                      data-ocid={`order_confirmation.item.${idx + 1}`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {item.productName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty: {item.quantity.toString()} × ₹
                          {item.priceAtPurchase.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground flex-shrink-0">
                        ₹
                        {(
                          item.priceAtPurchase * Number(item.quantity)
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-border bg-secondary/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Amount
                    </span>
                    <span className="text-base font-bold text-primary">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 text-right">
                    + Delivery charges if applicable
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div
                className="bg-card border border-border rounded-sm shadow-sm px-5 py-4"
                data-ocid="order_confirmation.address_section"
              >
                <h2 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Delivery Address
                </h2>
                <div className="text-sm space-y-0.5">
                  <p className="font-semibold text-foreground">
                    {order.customerName}
                  </p>
                  <p className="text-muted-foreground">
                    {order.deliveryAddress}
                  </p>
                  <p className="text-muted-foreground">
                    {order.deliveryCity} – {order.deliveryPincode}
                  </p>
                  <p className="text-muted-foreground">
                    Phone: {order.customerPhone}
                  </p>
                </div>
              </div>

              <Separator />

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pb-4">
                <Button
                  asChild
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth"
                  data-ocid="order_confirmation.continue_shopping_button"
                >
                  <Link to="/">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-11 border-primary text-primary hover:bg-primary/5 font-semibold transition-smooth"
                  data-ocid="order_confirmation.view_cart_button"
                >
                  <Link to="/cart">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
