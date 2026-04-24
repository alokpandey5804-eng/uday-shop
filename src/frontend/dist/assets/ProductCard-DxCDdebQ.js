import { j as jsxRuntimeExports, L as Link } from "./index-kKW6gZ0D.js";
import { B as Badge } from "./badge-Dt4rpOpJ.js";
import { B as Button } from "./input-BAOXxmR3.js";
import { u as useCartStore, S as ShoppingCart } from "./Layout-OmdWpmSV.js";
import { S as Star } from "./ErrorMessage-D6DGxzUp.js";
const FALLBACK_IMAGES = {
  Electronics: "📱",
  Fashion: "👟",
  "Home & Kitchen": "🍳",
  Appliances: "🔌",
  Books: "📚",
  Sports: "⚽",
  Beauty: "💄",
  Toys: "🧸"
};
function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCartStore();
  const emoji = FALLBACK_IMAGES[product.category] ?? "🛍️";
  const hasImage = product.images.length > 0 && product.images[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-smooth group flex flex-col",
      "data-ocid": `product.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$productId",
            params: { productId: product.id.toString() },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-secondary flex items-center justify-center overflow-hidden", children: [
              hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.images[0],
                  alt: product.name,
                  className: "w-full h-full object-contain p-2 group-hover:scale-105 transition-smooth"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl group-hover:scale-110 transition-smooth select-none", children: emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "absolute top-2 left-2 text-xs bg-primary/10 text-primary border-primary/20",
                  children: product.category
                }
              ),
              Number(product.stock) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground", children: "Out of Stock" }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col flex-1 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products/$productId",
              params: { productId: product.id.toString() },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition-colors", children: product.name })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: `w-3 h-3 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "(128)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-primary font-display", children: [
                "₹",
                product.price.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                "₹",
                Math.round(product.price * 1.2).toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-green-600 font-medium", children: "17% off" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs h-8",
                onClick: () => addToCart(product),
                disabled: Number(product.stock) === 0,
                "data-ocid": `product.add_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3 mr-1" }),
                  Number(product.stock) === 0 ? "Out of Stock" : "Add to Cart"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
