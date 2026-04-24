import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useCreateOrder } from "../hooks/useOrders";
import { useCartStore } from "../store/cart";

interface CustomerForm {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

const EMPTY_FORM: CustomerForm = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
};

type PaymentMethod = "cod" | "phonepe" | "gpay" | "paytm";

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  available: boolean;
}[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: <Truck className="w-5 h-5" />,
    available: true,
  },
  {
    id: "phonepe",
    label: "PhonePe",
    icon: <Smartphone className="w-5 h-5" />,
    available: false,
  },
  {
    id: "gpay",
    label: "Google Pay",
    icon: <Wallet className="w-5 h-5" />,
    available: false,
  },
  {
    id: "paytm",
    label: "Paytm",
    icon: <CreditCard className="w-5 h-5" />,
    available: false,
  },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCartStore();
  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CustomerForm>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate({ to: "/cart" });
    }
  }, [cartItems.length, navigate]);

  function handleChange(field: keyof CustomerForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function validate(): boolean {
    const newErrors: Partial<CustomerForm> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid 10-digit number";
    if (!form.street.trim()) newErrors.street = "Street address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode.trim()))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      const orderId = await createOrder({
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: BigInt(item.quantity),
        })),
        customerName: form.fullName.trim(),
        customerPhone: form.phone.trim(),
        deliveryAddress: form.street.trim(),
        deliveryCity: form.city.trim(),
        deliveryPincode: form.pincode.trim(),
        paymentMethod: "cod",
      });
      clearCart();
      navigate({
        to: "/order-confirmation/$orderId",
        params: { orderId: orderId.toString() },
      });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const deliveryFee = cartTotal >= 500 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <Layout>
      <div
        className="bg-secondary/40 min-h-screen py-4"
        data-ocid="checkout.page"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <span className="text-primary font-medium">Cart</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              Delivery Address
            </span>
            <ChevronRight className="w-3 h-3" />
            <span>Payment</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-4">
              {/* Delivery Address */}
              <div
                className="bg-card border border-border rounded-sm shadow-sm"
                data-ocid="checkout.address_section"
              >
                <div className="px-5 py-3 border-b border-border bg-primary/5 rounded-t-sm">
                  <h2 className="font-display font-bold text-base text-foreground">
                    Delivery Address
                  </h2>
                </div>
                <form
                  id="checkout-form"
                  onSubmit={handlePlaceOrder}
                  className="px-5 py-5 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="fullName"
                        className="text-xs font-medium text-foreground"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        placeholder="Enter your full name"
                        className="h-9 text-sm"
                        data-ocid="checkout.fullname_input"
                      />
                      {errors.fullName && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.fullname_field_error"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="phone"
                        className="text-xs font-medium text-foreground"
                      >
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="h-9 text-sm"
                        data-ocid="checkout.phone_input"
                      />
                      {errors.phone && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.phone_field_error"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="email"
                      className="text-xs font-medium text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="your@email.com (optional)"
                      className="h-9 text-sm"
                      data-ocid="checkout.email_input"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="street"
                      className="text-xs font-medium text-foreground"
                    >
                      Street Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="street"
                      value={form.street}
                      onChange={handleChange("street")}
                      placeholder="House no., building, street, area"
                      className="h-9 text-sm"
                      data-ocid="checkout.street_input"
                    />
                    {errors.street && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="checkout.street_field_error"
                      >
                        {errors.street}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="city"
                        className="text-xs font-medium text-foreground"
                      >
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={handleChange("city")}
                        placeholder="City"
                        className="h-9 text-sm"
                        data-ocid="checkout.city_input"
                      />
                      {errors.city && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.city_field_error"
                        >
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="state"
                        className="text-xs font-medium text-foreground"
                      >
                        State
                      </Label>
                      <Input
                        id="state"
                        value={form.state}
                        onChange={handleChange("state")}
                        placeholder="State"
                        className="h-9 text-sm"
                        data-ocid="checkout.state_input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="pincode"
                        className="text-xs font-medium text-foreground"
                      >
                        Pincode <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        value={form.pincode}
                        onChange={handleChange("pincode")}
                        placeholder="6-digit pincode"
                        maxLength={6}
                        className="h-9 text-sm"
                        data-ocid="checkout.pincode_input"
                      />
                      {errors.pincode && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.pincode_field_error"
                        >
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div
                className="bg-card border border-border rounded-sm shadow-sm"
                data-ocid="checkout.payment_section"
              >
                <div className="px-5 py-3 border-b border-border bg-primary/5 rounded-t-sm">
                  <h2 className="font-display font-bold text-base text-foreground">
                    Payment Method
                  </h2>
                </div>
                <div className="px-5 py-5 space-y-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!opt.available}
                      onClick={() => opt.available && setPaymentMethod(opt.id)}
                      className={[
                        "w-full flex items-center gap-3 px-4 py-3 rounded-sm border text-left transition-smooth",
                        opt.available
                          ? paymentMethod === opt.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/40 hover:bg-secondary/50"
                          : "border-border bg-muted/40 cursor-not-allowed opacity-70",
                      ].join(" ")}
                      data-ocid={`checkout.payment_${opt.id}`}
                    >
                      <span
                        className={[
                          "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                          paymentMethod === opt.id && opt.available
                            ? "border-primary"
                            : "border-muted-foreground",
                        ].join(" ")}
                      >
                        {paymentMethod === opt.id && opt.available && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </span>
                      <span
                        className={
                          opt.available
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      >
                        {opt.icon}
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">
                        {opt.label}
                      </span>
                      {!opt.available && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-2 py-0 h-5 bg-muted text-muted-foreground border border-border"
                        >
                          Coming Soon
                        </Badge>
                      )}
                      {opt.id === "cod" && opt.available && (
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          Pay on delivery
                        </span>
                      )}
                    </button>
                  ))}
                  {paymentMethod === "cod" && (
                    <div className="flex items-center gap-2 mt-2 px-2 py-2 bg-green-50 border border-green-200 rounded-sm text-xs text-green-700">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                      You pay only when your order arrives at your doorstep.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="space-y-4">
              <div
                className="bg-card border border-border rounded-sm shadow-sm sticky top-20"
                data-ocid="checkout.order_summary"
              >
                <div className="px-5 py-3 border-b border-border bg-primary/5 rounded-t-sm">
                  <h2 className="font-display font-bold text-base text-foreground">
                    Order Summary{" "}
                    <span className="text-muted-foreground font-normal text-sm">
                      ({itemCount} items)
                    </span>
                  </h2>
                </div>
                <div className="px-5 py-4 space-y-3">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-hide">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id.toString()}
                        className="flex gap-3 items-start"
                      >
                        <div className="w-12 h-12 rounded border border-border overflow-hidden flex-shrink-0 bg-secondary/30">
                          {item.product.images[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-foreground flex-shrink-0">
                          ₹
                          {(item.product.price * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Price ({itemCount} items)
                      </span>
                      <span className="text-foreground">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Charges
                      </span>
                      <span
                        className={
                          deliveryFee === 0
                            ? "text-green-600 font-medium"
                            : "text-foreground"
                        }
                      >
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-base font-bold">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-primary">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {deliveryFee === 0 && (
                    <p className="text-xs text-green-600 font-medium">
                      🎉 You save ₹40 on delivery!
                    </p>
                  )}

                  <Button
                    type="submit"
                    form="checkout-form"
                    className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
                    disabled={isPending}
                    data-ocid="checkout.place_order_button"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Placing Order...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  <p className="text-[10px] text-center text-muted-foreground">
                    Safe and Secure Payments. Easy returns. 100% Authentic
                    products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
