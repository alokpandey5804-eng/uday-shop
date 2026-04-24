import { c as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-kKW6gZ0D.js";
import { c as createLucideIcon, B as Button } from "./input-BAOXxmR3.js";
import { u as useCartStore, L as Layout, S as ShoppingCart } from "./Layout-OmdWpmSV.js";
import { P as Plus, T as Trash2 } from "./trash-2-Ccguvk2a.js";
import { C as ChevronRight } from "./chevron-right-4nKwe-ej.js";
import "./badge-Dt4rpOpJ.js";
import "./index-CW2rFMzu.js";
import "./admin-DOl_jeQ5.js";
import "./search-D4B7iy6O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function CartPage() {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-7xl mx-auto px-4 py-16 text-center",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-20 h-20 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Add items to it now." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              search: {
                category: void 0,
                minPrice: void 0,
                maxPrice: void 0,
                q: void 0
              },
              "data-ocid": "cart.shop_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8", children: "Shop Now" })
            }
          )
        ]
      }
    ) });
  }
  const savings = cartItems.reduce(
    (sum, item) => sum + (Math.round(item.product.price * 1.2) - item.product.price) * item.quantity,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground mb-4", children: [
      "My Cart (",
      cartCount,
      " items)"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-3", "data-ocid": "cart.items_list", children: cartItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4 flex gap-4",
          "data-ocid": `cart.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products/$productId",
                params: { productId: item.product.id.toString() },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-secondary rounded flex items-center justify-center flex-shrink-0 overflow-hidden", children: item.product.images.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.product.images[0],
                    alt: item.product.name,
                    className: "w-full h-full object-contain p-1"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🛍️" }) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/products/$productId",
                  params: { productId: item.product.id.toString() },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground hover:text-primary line-clamp-2", children: item.product.name })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.product.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                  "₹",
                  (item.product.price * item.quantity).toLocaleString(
                    "en-IN"
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                  "₹",
                  (Math.round(item.product.price * 1.2) * item.quantity).toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors",
                      onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                      "aria-label": "Decrease quantity",
                      "data-ocid": `cart.decrease_qty.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-medium", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors",
                      onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                      "aria-label": "Increase quantity",
                      "data-ocid": `cart.increase_qty.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-destructive hover:text-destructive hover:bg-destructive/10 text-xs",
                    onClick: () => removeFromCart(item.product.id),
                    "data-ocid": `cart.remove_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                      "Remove"
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        item.product.id.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-80 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4 sticky top-20",
          "data-ocid": "cart.summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3", children: "Price Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Price (",
                  cartCount,
                  " items)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "₹",
                  cartItems.reduce(
                    (s, i) => s + Math.round(i.product.price * 1.2) * i.quantity,
                    0
                  ).toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "-₹",
                  savings.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery Charges" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "Free" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex justify-between font-bold text-base", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "₹",
                  cartTotal.toLocaleString("en-IN")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-600 text-xs mt-2 mb-3", children: [
              "You will save ₹",
              savings.toLocaleString("en-IN"),
              " on this order"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold",
                onClick: () => navigate({ to: "/checkout" }),
                "data-ocid": "cart.checkout_button",
                children: [
                  "Place Order",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ]
              }
            )
          ]
        }
      ) })
    ] })
  ] }) });
}
export {
  CartPage
};
