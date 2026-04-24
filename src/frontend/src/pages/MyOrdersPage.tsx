import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  MapPin,
  Package,
  Phone,
  Search,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { useGetOrdersByPhone } from "../hooks/useOrders";
import type { Order, OrderStatus } from "../types";

// ── helpers ──────────────────────────────────────────────────────────────────

function formatDate(createdAt: bigint): string {
  const ms = Number(createdAt / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bgClass: string; textClass: string; dotClass: string }
> = {
  pending: {
    label: "Pending",
    bgClass: "bg-yellow-50",
    textClass: "text-yellow-700",
    dotClass: "bg-yellow-400",
  },
  confirmed: {
    label: "Confirmed",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    dotClass: "bg-blue-500",
  },
  shipped: {
    label: "Shipped",
    bgClass: "bg-orange-50",
    textClass: "text-orange-700",
    dotClass: "bg-orange-500",
  },
  delivered: {
    label: "Delivered",
    bgClass: "bg-green-50",
    textClass: "text-green-700",
    dotClass: "bg-green-500",
  },
};

// ── sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bgClass} ${cfg.textClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
      {cfg.label}
    </span>
  );
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  return (
    <Card
      data-ocid={`my_orders.item.${index + 1}`}
      className="border border-border shadow-sm hover:shadow-md transition-smooth bg-card"
    >
      {/* Card header: order id + date + status */}
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                #{String(order.id).padStart(8, "0")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(order.createdAt)}
            </div>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Items list */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Items Ordered
          </p>
          <ul className="space-y-1.5">
            {order.items.map((item, i) => (
              <li
                key={item.productId || `${item.productName}-${i}`}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground font-medium truncate max-w-[60%]">
                  {item.productName}
                </span>
                <span className="text-muted-foreground whitespace-nowrap">
                  {item.quantity} × ₹
                  {item.priceAtPurchase.toLocaleString("en-IN")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-border" />

        {/* Delivery address */}
        <div className="flex gap-2">
          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              {order.customerName}
            </p>
            <p className="text-muted-foreground">
              {order.deliveryAddress}, {order.deliveryCity} —{" "}
              {order.deliveryPincode}
            </p>
          </div>
        </div>

        {/* Footer: payment + total */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {order.paymentMethod}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-base font-bold text-primary">
              ₹{order.totalPrice.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderSkeletons() {
  return (
    <div className="space-y-4" data-ocid="my_orders.loading_state">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border border-border">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function MyOrdersPage() {
  const [phoneInput, setPhoneInput] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");

  const { data: orders = [], isLoading } = useGetOrdersByPhone(submittedPhone);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phoneInput.trim();
    if (!/^\d{10}$/.test(digits)) {
      setValidationError("Please enter a valid 10-digit phone number.");
      return;
    }
    setValidationError("");
    setSubmittedPhone(digits);
  }

  const hasSearched = submittedPhone !== null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground font-display leading-tight">
              My Orders
            </h1>
            <p className="text-xs text-muted-foreground">
              Track your purchases
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Search card */}
        <Card className="border border-border shadow-sm bg-card">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground font-display">
                  Track Your Orders
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Enter the phone number used at checkout
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    data-ocid="my_orders.search_input"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter 10-digit phone number"
                    value={phoneInput}
                    onChange={(e) => {
                      setPhoneInput(e.target.value.replace(/\D/g, ""));
                      setValidationError("");
                    }}
                    className="h-11 text-base font-mono tracking-wider"
                    aria-label="Phone number"
                  />
                </div>
                <Button
                  data-ocid="my_orders.submit_button"
                  type="submit"
                  className="h-11 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth"
                  disabled={isLoading}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Track Orders
                </Button>
              </div>
              {validationError && (
                <p
                  data-ocid="my_orders.field_error"
                  className="text-sm text-destructive font-medium"
                >
                  {validationError}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Results section */}
        {isLoading && <OrderSkeletons />}

        {!isLoading && hasSearched && orders.length === 0 && (
          <div
            data-ocid="my_orders.empty_state"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              No orders found
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              We couldn't find any orders for{" "}
              <span className="font-mono font-semibold text-foreground">
                {submittedPhone}
              </span>
              . Make sure the number is correct.
            </p>
          </div>
        )}

        {!isLoading && orders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">
                {orders.length} order{orders.length !== 1 ? "s" : ""} found
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {submittedPhone}
              </p>
            </div>
            <div className="space-y-4">
              {orders.map((order, i) => (
                <OrderCard key={order.id} order={order} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
