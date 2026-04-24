import { r as reactExports, j as jsxRuntimeExports } from "./index-kKW6gZ0D.js";
import { P as Package, B as Badge } from "./badge-Dt4rpOpJ.js";
import { I as Input, B as Button } from "./input-BAOXxmR3.js";
import { C as Card, b as CardContent, a as CardHeader } from "./card-C4S41cN2.js";
import { S as Skeleton, M as MapPin } from "./skeleton-CKzIgk5d.js";
import { b as useGetOrdersByPhone } from "./useOrders-Dqh5Ee3O.js";
import { S as ShoppingBag } from "./shopping-bag-B-C5WXHr.js";
import { P as Phone } from "./phone-CaooozUZ.js";
import { S as Search } from "./search-D4B7iy6O.js";
import { C as Clock } from "./clock-DCeJvSE4.js";
import "./backend-D0JSsV3h.js";
import "./useMutation-CGiqmeEM.js";
function formatDate(createdAt) {
  const ms = Number(createdAt / 1000000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    bgClass: "bg-yellow-50",
    textClass: "text-yellow-700",
    dotClass: "bg-yellow-400"
  },
  confirmed: {
    label: "Confirmed",
    bgClass: "bg-blue-50",
    textClass: "text-blue-700",
    dotClass: "bg-blue-500"
  },
  shipped: {
    label: "Shipped",
    bgClass: "bg-orange-50",
    textClass: "text-orange-700",
    dotClass: "bg-orange-500"
  },
  delivered: {
    label: "Delivered",
    bgClass: "bg-green-50",
    textClass: "text-green-700",
    dotClass: "bg-green-500"
  }
};
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bgClass} ${cfg.textClass}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${cfg.dotClass}` }),
        cfg.label
      ]
    }
  );
}
function OrderCard({ order, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": `my_orders.item.${index + 1}`,
      className: "border border-border shadow-sm hover:shadow-md transition-smooth bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Order ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-semibold text-foreground", children: [
                "#",
                String(order.id).padStart(8, "0")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              formatDate(order.createdAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Items Ordered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center justify-between text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[60%]", children: item.productName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground whitespace-nowrap", children: [
                    item.quantity,
                    " × ₹",
                    item.priceAtPurchase.toLocaleString("en-IN")
                  ] })
                ]
              },
              item.productId || `${item.productName}-${i}`
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-dashed border-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: order.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                order.deliveryAddress,
                ", ",
                order.deliveryCity,
                " —",
                " ",
                order.deliveryPincode
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: order.paymentMethod }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold text-primary", children: [
                "₹",
                order.totalPrice.toLocaleString("en-IN")
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function OrderSkeletons() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "my_orders.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
    ] })
  ] }, i)) });
}
function MyOrdersPage() {
  const [phoneInput, setPhoneInput] = reactExports.useState("");
  const [submittedPhone, setSubmittedPhone] = reactExports.useState(null);
  const [validationError, setValidationError] = reactExports.useState("");
  const { data: orders = [], isLoading } = useGetOrdersByPhone(submittedPhone);
  function handleSubmit(e) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-sm sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground font-display leading-tight", children: "My Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Track your purchases" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border shadow-sm bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground font-display", children: "Track Your Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Enter the phone number used at checkout" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "my_orders.search_input",
                type: "tel",
                inputMode: "numeric",
                maxLength: 10,
                placeholder: "Enter 10-digit phone number",
                value: phoneInput,
                onChange: (e) => {
                  setPhoneInput(e.target.value.replace(/\D/g, ""));
                  setValidationError("");
                },
                className: "h-11 text-base font-mono tracking-wider",
                "aria-label": "Phone number"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "my_orders.submit_button",
                type: "submit",
                className: "h-11 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth",
                disabled: isLoading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 mr-2" }),
                  "Track Orders"
                ]
              }
            )
          ] }),
          validationError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "my_orders.field_error",
              className: "text-sm text-destructive font-medium",
              children: validationError
            }
          )
        ] })
      ] }) }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeletons, {}),
      !isLoading && hasSearched && orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "my_orders.empty_state",
          className: "flex flex-col items-center justify-center py-16 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "No orders found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-xs", children: [
              "We couldn't find any orders for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: submittedPhone }),
              ". Make sure the number is correct."
            ] })
          ]
        }
      ),
      !isLoading && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            orders.length,
            " order",
            orders.length !== 1 ? "s" : "",
            " found"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: submittedPhone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i }, order.id)) })
      ] })
    ] })
  ] });
}
export {
  MyOrdersPage
};
