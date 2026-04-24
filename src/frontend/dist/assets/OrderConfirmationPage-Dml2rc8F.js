import { b as useParams, j as jsxRuntimeExports, L as Link } from "./index-kKW6gZ0D.js";
import { P as Package, B as Badge } from "./badge-Dt4rpOpJ.js";
import { c as createLucideIcon, B as Button } from "./input-BAOXxmR3.js";
import { S as Separator } from "./separator-BFUPPDbR.js";
import { S as Skeleton, M as MapPin } from "./skeleton-CKzIgk5d.js";
import { L as Layout, S as ShoppingCart } from "./Layout-OmdWpmSV.js";
import { a as useOrder } from "./useOrders-Dqh5Ee3O.js";
import { C as CircleAlert } from "./circle-alert-DNH9VeNA.js";
import { C as Clock } from "./clock-DCeJvSE4.js";
import { T as Truck } from "./truck-BpBVsmcn.js";
import { S as ShoppingBag } from "./shopping-bag-B-C5WXHr.js";
import "./index-CDaruwym.js";
import "./index-CW2rFMzu.js";
import "./admin-DOl_jeQ5.js";
import "./search-D4B7iy6O.js";
import "./backend-D0JSsV3h.js";
import "./useMutation-CGiqmeEM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const STATUS_STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" }
];
function getStatusIndex(status) {
  return STATUS_STEPS.findIndex(
    (s) => s.key === status
  );
}
function StatusBadge({ status }) {
  const variants = {
    pending: {
      label: "Order Placed",
      className: "bg-yellow-100 text-yellow-800 border-yellow-300"
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-800 border-blue-300"
    },
    shipped: {
      label: "Shipped",
      className: "bg-purple-100 text-purple-800 border-purple-300"
    },
    delivered: {
      label: "Delivered",
      className: "bg-green-100 text-green-800 border-green-300"
    }
  };
  const key = status;
  const v = variants[key] ?? variants.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: `border text-xs font-semibold px-2.5 py-0.5 ${v.className}`,
      children: v.label
    }
  );
}
function formatDate(timestamp) {
  const ms = Number(timestamp) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function OrderConfirmationPage() {
  const params = useParams({ from: "/order-confirmation/$orderId" });
  const orderId = BigInt(params.orderId);
  const { data: order, isLoading, isError } = useOrder(orderId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-secondary/40 min-h-screen py-6",
      "data-ocid": "order_confirmation.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-4",
          "data-ocid": "order_confirmation.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-sm" })
          ]
        }
      ) : isError || !order ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-sm shadow-sm p-10 text-center",
          "data-ocid": "order_confirmation.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-destructive mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Order Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
              "We couldn't find order #",
              params.orderId,
              ". Please check your order ID."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "bg-primary hover:bg-primary/90 text-primary-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "order_confirmation.home_link", children: "Continue Shopping" })
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-4",
          "data-ocid": "order_confirmation.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-green-200 rounded-sm shadow-sm overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-500 px-5 py-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-white flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-white", children: "Order Confirmed!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-100 text-sm", children: "Your order has been placed successfully." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex flex-wrap items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-foreground text-sm", children: [
                    "#",
                    order.id.toString().padStart(6, "0")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Order Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: formatDate(order.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Payment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Cash on Delivery" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-sm shadow-sm px-5 py-5",
                "data-ocid": "order_confirmation.status_tracker",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
                    "Order Status"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: STATUS_STEPS.map((step, i) => {
                    const currentIdx = getStatusIndex(order.status);
                    const isCompleted = i <= currentIdx;
                    const isActive = i === currentIdx;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: [
                              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth",
                              isActive ? "bg-primary border-primary text-primary-foreground" : isCompleted ? "bg-green-500 border-green-500 text-white" : "bg-card border-border text-muted-foreground"
                            ].join(" "),
                            children: isCompleted && !isActive ? "✓" : i + 1
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: [
                              "text-[10px] mt-1 text-center font-medium whitespace-nowrap",
                              isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"
                            ].join(" "),
                            children: step.label
                          }
                        )
                      ] }),
                      i < STATUS_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: [
                            "flex-1 h-0.5 mx-1 mb-4 rounded-full transition-smooth",
                            i < currentIdx ? "bg-green-400" : "bg-border"
                          ].join(" ")
                        }
                      )
                    ] }, step.key);
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground font-medium", children: [
                      "Estimated Delivery:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "3–5 business days" })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-sm shadow-sm",
                "data-ocid": "order_confirmation.items_list",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border bg-primary/5 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm text-foreground", children: [
                      "Items Ordered (",
                      order.items.length,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-5 py-3 flex items-center justify-between gap-3",
                      "data-ocid": `order_confirmation.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2", children: item.productName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                            "Qty: ",
                            item.quantity.toString(),
                            " × ₹",
                            item.priceAtPurchase.toLocaleString("en-IN")
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground flex-shrink-0", children: [
                          "₹",
                          (item.priceAtPurchase * Number(item.quantity)).toLocaleString("en-IN")
                        ] })
                      ]
                    },
                    `${item.productId.toString()}-${idx}`
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-t border-border bg-secondary/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total Amount" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold text-primary", children: [
                        "₹",
                        order.totalPrice.toLocaleString("en-IN")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 text-right", children: "+ Delivery charges if applicable" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-sm shadow-sm px-5 py-4",
                "data-ocid": "order_confirmation.address_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                    "Delivery Address"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: order.customerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: order.deliveryAddress }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      order.deliveryCity,
                      " – ",
                      order.deliveryPincode
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      "Phone: ",
                      order.customerPhone
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-smooth",
                  "data-ocid": "order_confirmation.continue_shopping_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                    "Continue Shopping"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  className: "flex-1 h-11 border-primary text-primary hover:bg-primary/5 font-semibold transition-smooth",
                  "data-ocid": "order_confirmation.view_cart_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                    "View Cart"
                  ] })
                }
              )
            ] })
          ]
        }
      ) })
    }
  ) });
}
export {
  OrderConfirmationPage
};
