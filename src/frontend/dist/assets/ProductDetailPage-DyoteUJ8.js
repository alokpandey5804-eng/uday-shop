import { b as useParams, r as reactExports, j as jsxRuntimeExports, a as LoadingPage, L as Link } from "./index-kKW6gZ0D.js";
import { B as Badge } from "./badge-Dt4rpOpJ.js";
import { B as Button } from "./input-BAOXxmR3.js";
import { u as ue } from "./index-CW2rFMzu.js";
import { E as ErrorMessage, S as Star } from "./ErrorMessage-D6DGxzUp.js";
import { u as useCartStore, L as Layout, S as ShoppingCart } from "./Layout-OmdWpmSV.js";
import { b as useProduct } from "./useProducts-_xPWTb93.js";
import { C as ChevronRight } from "./chevron-right-4nKwe-ej.js";
import { C as Check } from "./check-CEnRB-RZ.js";
import "./circle-alert-DNH9VeNA.js";
import "./admin-DOl_jeQ5.js";
import "./search-D4B7iy6O.js";
import "./backend-D0JSsV3h.js";
function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const id = BigInt(productId);
  const { data: product, isLoading, error, refetch } = useProduct(id);
  const { addToCart } = useCartStore();
  const [selectedImage, setSelectedImage] = reactExports.useState(0);
  const [added, setAdded] = reactExports.useState(false);
  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    ue.success("Added to cart!", { duration: 2e3 });
    setTimeout(() => setAdded(false), 2e3);
  }
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingPage, {}) });
  if (error)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: () => refetch() }) });
  if (!product)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-7xl mx-auto px-4 py-12 text-center",
        "data-ocid": "product.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg mb-2", children: "Product Not Found" }),
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
              className: "text-primary hover:underline text-sm",
              children: "← Back to Products"
            }
          )
        ]
      }
    ) });
  const images = product.images.length > 0 ? product.images : [];
  const hasImages = images.length > 0;
  const originalPrice = Math.round(product.price * 1.2);
  const discount = Math.round(
    (originalPrice - product.price) / originalPrice * 100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 py-4",
      "data-ocid": "product.detail_page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-primary", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
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
              className: "hover:text-primary",
              children: "Products"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: product.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "product.images_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg aspect-square flex items-center justify-center overflow-hidden", children: hasImages ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: images[selectedImage],
                alt: product.name,
                className: "w-full h-full object-contain p-4"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-8xl", children: product.category === "Electronics" ? "📱" : product.category === "Fashion" ? "👗" : product.category === "Home & Kitchen" ? "🏠" : "🛍️" }) }),
            hasImages && images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedImage(i),
                className: `flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden transition-smooth ${i === selectedImage ? "border-primary" : "border-border"}`,
                "data-ocid": `product.thumbnail.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: `${product.name} ${i + 1}`,
                    className: "w-full h-full object-contain"
                  }
                )
              },
              img
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "product.info_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs bg-primary/10 text-primary border-primary/20",
                children: product.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-4 h-4 ${s <= 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`
                },
                s
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "4.2 (1,284 ratings)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-bold text-primary font-display", children: [
                  "₹",
                  product.price.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground line-through text-lg", children: [
                  "₹",
                  originalPrice.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600 font-bold text-lg", children: [
                  discount,
                  "% off"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 mt-1", children: "Inclusive of all taxes" })
            ] }),
            Number(product.stock) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-600 text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              "In Stock (",
              product.stock.toString(),
              " available)"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium text-sm", children: "Out of Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-2", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: product.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "flex-1 bg-yellow-400 text-foreground hover:bg-yellow-300 font-bold",
                  onClick: handleAddToCart,
                  disabled: Number(product.stock) === 0,
                  "data-ocid": "product.add_to_cart_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }),
                    added ? "Added!" : "Add to Cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/checkout",
                  onClick: () => {
                    if (product) addToCart(product);
                  },
                  className: "flex-1",
                  "data-ocid": "product.buy_now_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold",
                      disabled: Number(product.stock) === 0,
                      children: "Buy Now"
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-xs space-y-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "🚚 ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Free Delivery" }),
                " on orders above ₹499"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "↩️ ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "10-day return" }),
                " policy"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "🔒 ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Secure" }),
                " checkout"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
export {
  ProductDetailPage
};
