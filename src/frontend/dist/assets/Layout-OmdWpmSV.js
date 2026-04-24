import { r as reactExports, j as jsxRuntimeExports, c as useNavigate, L as Link } from "./index-kKW6gZ0D.js";
import { P as Package, B as Badge } from "./badge-Dt4rpOpJ.js";
import { c as createLucideIcon, I as Input, B as Button } from "./input-BAOXxmR3.js";
import { $ as $e, U as User, C as ChevronDown, X } from "./index-CW2rFMzu.js";
import { c as create, u as useAdminStore } from "./admin-DOl_jeQ5.js";
import { S as Search } from "./search-D4B7iy6O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
var M = (e, i, s, u, m, a, l, h) => {
  let d = document.documentElement, w = ["light", "dark"];
  function p(n) {
    (Array.isArray(e) ? e : [e]).forEach((y) => {
      let k = y === "class", S = k && a ? m.map((f) => a[f] || f) : m;
      k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
    }), R(n);
  }
  function R(n) {
    h && w.includes(n) && (d.style.colorScheme = n);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u) p(u);
  else try {
    let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
    p(y);
  } catch (n) {
  }
};
var x = reactExports.createContext(void 0), U = { setTheme: (e) => {
}, themes: [] }, z = () => {
  var e;
  return (e = reactExports.useContext(x)) != null ? e : U;
};
reactExports.memo(({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w }) => {
  let p = JSON.stringify([s, i, a, e, h, l, u, m]).slice(1, -1);
  return reactExports.createElement("script", { ...w, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? d : "", dangerouslySetInnerHTML: { __html: `(${M.toString()})(${p})` } });
});
const Toaster = ({ ...props }) => {
  const { theme = "system" } = z();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $e,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};
function loadCart() {
  try {
    const stored = localStorage.getItem("uday_cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
function saveCart(items) {
  localStorage.setItem("uday_cart", JSON.stringify(items));
}
function calcTotal(items) {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}
function calcCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
const initialItems = loadCart();
const useCartStore = create((set) => ({
  cartItems: initialItems,
  cartTotal: calcTotal(initialItems),
  cartCount: calcCount(initialItems),
  addToCart: (product) => {
    set((state) => {
      const existing = state.cartItems.find(
        (i) => i.product.id.toString() === product.id.toString()
      );
      let updated;
      if (existing) {
        updated = state.cartItems.map(
          (i) => i.product.id.toString() === product.id.toString() ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated = [...state.cartItems, { product, quantity: 1 }];
      }
      saveCart(updated);
      return {
        cartItems: updated,
        cartTotal: calcTotal(updated),
        cartCount: calcCount(updated)
      };
    });
  },
  removeFromCart: (productId) => {
    set((state) => {
      const updated = state.cartItems.filter(
        (i) => i.product.id.toString() !== productId.toString()
      );
      saveCart(updated);
      return {
        cartItems: updated,
        cartTotal: calcTotal(updated),
        cartCount: calcCount(updated)
      };
    });
  },
  updateQuantity: (productId, quantity) => {
    set((state) => {
      const updated = quantity <= 0 ? state.cartItems.filter(
        (i) => i.product.id.toString() !== productId.toString()
      ) : state.cartItems.map(
        (i) => i.product.id.toString() === productId.toString() ? { ...i, quantity } : i
      );
      saveCart(updated);
      return {
        cartItems: updated,
        cartTotal: calcTotal(updated),
        cartCount: calcCount(updated)
      };
    });
  },
  clearCart: () => {
    saveCart([]);
    set({ cartItems: [], cartTotal: 0, cartCount: 0 });
  }
}));
const NAV_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Appliances",
  "Books",
  "Sports"
];
function Layout({ children }) {
  const { cartCount } = useCartStore();
  const { isAuthenticated, logout } = useAdminStore();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/products",
        search: {
          q: searchQuery.trim(),
          category: void 0,
          minPrice: void 0,
          maxPrice: void 0
        }
      });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: "bg-primary shadow-md sticky top-0 z-50",
        "data-ocid": "layout.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 h-14", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/",
                  className: "flex-shrink-0 flex flex-col leading-tight",
                  "data-ocid": "layout.logo_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-display font-bold text-xl tracking-tight", children: "Uday" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-[9px] italic font-body -mt-0.5 hidden sm:block", children: "Explore Plus" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "form",
                {
                  onSubmit: handleSearch,
                  className: "flex-1 max-w-2xl hidden sm:flex",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "text",
                        placeholder: "Search for products, brands and more",
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                        className: "w-full pl-4 pr-10 py-2 h-9 rounded-sm bg-card text-foreground border-0 focus-visible:ring-0 text-sm",
                        "data-ocid": "layout.search_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "submit",
                        className: "absolute right-0 top-0 bottom-0 px-3 text-primary hover:text-primary/80",
                        "aria-label": "Search",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 ml-auto", children: [
                isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/admin/dashboard",
                      className: "text-primary-foreground hover:text-primary-foreground/80 text-sm font-medium px-3 py-1 hidden sm:flex items-center gap-1",
                      "data-ocid": "layout.admin_dashboard_link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                        "Dashboard"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: logout,
                      className: "text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80 text-sm hidden sm:flex",
                      "data-ocid": "layout.logout_button",
                      children: "Logout"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/admin",
                    className: "text-primary-foreground hover:text-primary-foreground/80 text-sm font-medium px-3 py-2 hidden sm:flex items-center gap-1 transition-colors",
                    "data-ocid": "layout.admin_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Login" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/my-orders",
                    className: "text-primary-foreground hover:text-primary-foreground/80 text-sm font-medium px-3 py-2 hidden sm:flex items-center gap-1 transition-colors",
                    "data-ocid": "layout.my_orders_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "My Orders" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/cart",
                    className: "relative text-primary-foreground hover:text-primary-foreground/80 p-2 flex items-center gap-1 transition-colors",
                    "data-ocid": "layout.cart_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium hidden sm:block", children: "Cart" }),
                      cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[10px] px-1 bg-yellow-400 text-foreground border-0 font-bold",
                          "data-ocid": "layout.cart_badge",
                          children: cartCount
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "sm:hidden text-primary-foreground p-2",
                    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                    "aria-label": "Toggle menu",
                    "data-ocid": "layout.mobile_menu_toggle",
                    children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSearch, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "text",
                  placeholder: "Search products...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "w-full pl-4 pr-10 py-2 h-9 rounded-sm bg-card text-foreground border-0 text-sm",
                  "data-ocid": "layout.mobile_search_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "absolute right-0 top-0 bottom-0 px-3 text-primary",
                  "aria-label": "Search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" })
                }
              )
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/90 border-t border-primary-foreground/10 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 h-9 overflow-x-auto scrollbar-hide", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                className: "text-primary-foreground text-xs font-medium whitespace-nowrap hover:text-primary-foreground/80 transition-colors py-2",
                "data-ocid": "nav.home_link",
                children: "Home"
              }
            ),
            NAV_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/products",
                search: {
                  category: cat,
                  minPrice: void 0,
                  maxPrice: void 0,
                  q: void 0
                },
                className: "text-primary-foreground text-xs font-medium whitespace-nowrap hover:text-primary-foreground/80 transition-colors py-2 flex items-center gap-1",
                "data-ocid": `nav.category_link.${cat.toLowerCase().replace(/\s+/g, "-")}`,
                children: [
                  cat,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                ]
              },
              cat
            ))
          ] }) }) }),
          mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden bg-primary/95 border-t border-primary-foreground/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex flex-col gap-1", children: [
            NAV_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products",
                search: {
                  category: cat,
                  minPrice: void 0,
                  maxPrice: void 0,
                  q: void 0
                },
                className: "text-primary-foreground text-sm py-2 border-b border-primary-foreground/10 last:border-0",
                onClick: () => setMobileMenuOpen(false),
                "data-ocid": "nav.mobile_category_link",
                children: cat
              },
              cat
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/my-orders",
                className: "text-primary-foreground text-sm py-2 flex items-center gap-2 border-b border-primary-foreground/10",
                onClick: () => setMobileMenuOpen(false),
                "data-ocid": "nav.mobile_my_orders_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                  "My Orders"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin",
                className: "text-primary-foreground text-sm py-2 flex items-center gap-2",
                onClick: () => setMobileMenuOpen(false),
                "data-ocid": "nav.mobile_admin_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                  "Admin Login"
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 bg-background", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { "data-ocid": "layout.footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "#172337" }, className: "pt-10 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h4",
            {
              className: "text-[10px] font-bold tracking-widest uppercase mb-4",
              style: { color: "#878787" },
              children: "About"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
            "About Us",
            "Careers",
            "Press",
            "Corporate Information"
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs cursor-pointer hover:underline",
              style: { color: "#c0c0c0" },
              children: item
            }
          ) }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h4",
            {
              className: "text-[10px] font-bold tracking-widest uppercase mb-4",
              style: { color: "#878787" },
              children: "Help"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
            "Payments",
            "Shipping",
            "Returns",
            "FAQ",
            "Report Infringement"
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs cursor-pointer hover:underline",
              style: { color: "#c0c0c0" },
              children: item
            }
          ) }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h4",
            {
              className: "text-[10px] font-bold tracking-widest uppercase mb-4",
              style: { color: "#878787" },
              children: "Consumer Policy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
            "Cancellation & Returns",
            "Terms Of Use",
            "Security",
            "Privacy",
            "Sitemap",
            "Grievance Redressal"
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs cursor-pointer hover:underline",
              style: { color: "#c0c0c0" },
              children: item
            }
          ) }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h4",
            {
              className: "text-[10px] font-bold tracking-widest uppercase mb-4",
              style: { color: "#878787" },
              children: "Social"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://facebook.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 text-xs hover:underline transition-colors",
                style: { color: "#c0c0c0" },
                "data-ocid": "footer.facebook_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Facebook,
                    {
                      className: "w-4 h-4 flex-shrink-0",
                      style: { color: "#1877f2" }
                    }
                  ),
                  "Facebook"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://twitter.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 text-xs hover:underline transition-colors",
                style: { color: "#c0c0c0" },
                "data-ocid": "footer.twitter_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Twitter,
                    {
                      className: "w-4 h-4 flex-shrink-0",
                      style: { color: "#1da1f2" }
                    }
                  ),
                  "Twitter"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://youtube.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-2 text-xs hover:underline transition-colors",
                style: { color: "#c0c0c0" },
                "data-ocid": "footer.youtube_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Youtube,
                    {
                      className: "w-4 h-4 flex-shrink-0",
                      style: { color: "#ff0000" }
                    }
                  ),
                  "YouTube"
                ]
              }
            ) })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "#0d1b2a" }, className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-semibold px-2.5 py-1 rounded border border-border",
              style: { color: "#c0c0c0", borderColor: "#333" },
              children: "Sold by registered sellers only"
            }
          ),
          ["VISA", "Mastercard", "UPI", "COD"].map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-bold px-2 py-1 rounded",
              style: {
                backgroundColor: "#1e2d42",
                color: "#c0c0c0",
                border: "1px solid #2a3a55"
              },
              children: method
            },
            method
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px]", style: { color: "#878787" }, children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Uday Shop. Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:underline",
              style: { color: "#1a73e8" },
              children: "caffeine.ai"
            }
          )
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border",
        style: { backgroundColor: "#ffffff" },
        "data-ocid": "layout.bottom_nav",
        "aria-label": "Bottom navigation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-5 h-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors",
              activeProps: {
                className: "flex flex-col items-center justify-center gap-0.5 text-primary"
              },
              "data-ocid": "bottom_nav.home_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: "Home" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/products",
              search: {
                category: void 0,
                minPrice: void 0,
                maxPrice: void 0,
                q: void 0
              },
              className: "flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors",
              activeProps: {
                className: "flex flex-col items-center justify-center gap-0.5 text-primary"
              },
              "data-ocid": "bottom_nav.categories_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: "Categories" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/my-orders",
              className: "flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors",
              activeProps: {
                className: "flex flex-col items-center justify-center gap-0.5 text-primary"
              },
              "data-ocid": "bottom_nav.my_orders_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: "My Orders" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/cart",
              className: "relative flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors",
              activeProps: {
                className: "relative flex flex-col items-center justify-center gap-0.5 text-primary"
              },
              "data-ocid": "bottom_nav.cart_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5", "aria-hidden": "true" }),
                  cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] text-[9px] font-bold bg-yellow-400 text-foreground rounded-full flex items-center justify-center px-0.5 leading-none", children: cartCount })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: "Cart" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin",
              className: "flex flex-col items-center justify-center gap-0.5 text-muted-foreground hover:text-primary transition-colors",
              activeProps: {
                className: "flex flex-col items-center justify-center gap-0.5 text-primary"
              },
              "data-ocid": "bottom_nav.profile_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: "Profile" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden h-14", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "bottom-right" })
  ] });
}
export {
  Layout as L,
  ShoppingCart as S,
  useCartStore as u
};
