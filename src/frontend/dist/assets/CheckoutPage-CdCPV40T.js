import { c as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-kKW6gZ0D.js";
import { B as Badge } from "./badge-Dt4rpOpJ.js";
import { c as createLucideIcon, I as Input, B as Button } from "./input-BAOXxmR3.js";
import { L as Label } from "./label-DqTwaSIZ.js";
import { S as Separator } from "./separator-BFUPPDbR.js";
import { u as ue } from "./index-CW2rFMzu.js";
import { u as useCartStore, L as Layout } from "./Layout-OmdWpmSV.js";
import { u as useCreateOrder } from "./useOrders-Dqh5Ee3O.js";
import { C as ChevronRight } from "./chevron-right-4nKwe-ej.js";
import { S as ShieldCheck } from "./shield-check-YBtu3sil.js";
import { T as Truck } from "./truck-BpBVsmcn.js";
import { W as Wallet, C as CreditCard } from "./wallet-Cr5g4NEs.js";
import "./index-CDaruwym.js";
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
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: ""
};
const PAYMENT_OPTIONS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5" }),
    available: true
  },
  {
    id: "phonepe",
    label: "PhonePe",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }),
    available: false
  },
  {
    id: "gpay",
    label: "Google Pay",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
    available: false
  },
  {
    id: "paytm",
    label: "Paytm",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
    available: false
  }
];
function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCartStore();
  const { mutateAsync: createOrder, isPending } = useCreateOrder();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [paymentMethod, setPaymentMethod] = reactExports.useState("cod");
  reactExports.useEffect(() => {
    if (cartItems.length === 0) {
      navigate({ to: "/cart" });
    }
  }, [cartItems.length, navigate]);
  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
    };
  }
  function validate() {
    const newErrors = {};
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
  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      const orderId = await createOrder({
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: BigInt(item.quantity)
        })),
        customerName: form.fullName.trim(),
        customerPhone: form.phone.trim(),
        deliveryAddress: form.street.trim(),
        deliveryCity: form.city.trim(),
        deliveryPincode: form.pincode.trim(),
        paymentMethod: "cod"
      });
      clearCart();
      navigate({
        to: "/order-confirmation/$orderId",
        params: { orderId: orderId.toString() }
      });
    } catch {
      ue.error("Failed to place order. Please try again.");
    }
  }
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const deliveryFee = cartTotal >= 500 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-secondary/40 min-h-screen py-4",
      "data-ocid": "checkout.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Delivery Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-sm shadow-sm",
                "data-ocid": "checkout.address_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-primary/5 rounded-t-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Delivery Address" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      id: "checkout-form",
                      onSubmit: handlePlaceOrder,
                      className: "px-5 py-5 space-y-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Label,
                              {
                                htmlFor: "fullName",
                                className: "text-xs font-medium text-foreground",
                                children: [
                                  "Full Name ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "fullName",
                                value: form.fullName,
                                onChange: handleChange("fullName"),
                                placeholder: "Enter your full name",
                                className: "h-9 text-sm",
                                "data-ocid": "checkout.fullname_input"
                              }
                            ),
                            errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-destructive",
                                "data-ocid": "checkout.fullname_field_error",
                                children: errors.fullName
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Label,
                              {
                                htmlFor: "phone",
                                className: "text-xs font-medium text-foreground",
                                children: [
                                  "Phone Number ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "phone",
                                value: form.phone,
                                onChange: handleChange("phone"),
                                placeholder: "10-digit mobile number",
                                maxLength: 10,
                                className: "h-9 text-sm",
                                "data-ocid": "checkout.phone_input"
                              }
                            ),
                            errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-destructive",
                                "data-ocid": "checkout.phone_field_error",
                                children: errors.phone
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "email",
                              className: "text-xs font-medium text-foreground",
                              children: "Email Address"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "email",
                              type: "email",
                              value: form.email,
                              onChange: handleChange("email"),
                              placeholder: "your@email.com (optional)",
                              className: "h-9 text-sm",
                              "data-ocid": "checkout.email_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "street",
                              className: "text-xs font-medium text-foreground",
                              children: [
                                "Street Address ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "street",
                              value: form.street,
                              onChange: handleChange("street"),
                              placeholder: "House no., building, street, area",
                              className: "h-9 text-sm",
                              "data-ocid": "checkout.street_input"
                            }
                          ),
                          errors.street && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs text-destructive",
                              "data-ocid": "checkout.street_field_error",
                              children: errors.street
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Label,
                              {
                                htmlFor: "city",
                                className: "text-xs font-medium text-foreground",
                                children: [
                                  "City ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "city",
                                value: form.city,
                                onChange: handleChange("city"),
                                placeholder: "City",
                                className: "h-9 text-sm",
                                "data-ocid": "checkout.city_input"
                              }
                            ),
                            errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-destructive",
                                "data-ocid": "checkout.city_field_error",
                                children: errors.city
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "state",
                                className: "text-xs font-medium text-foreground",
                                children: "State"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "state",
                                value: form.state,
                                onChange: handleChange("state"),
                                placeholder: "State",
                                className: "h-9 text-sm",
                                "data-ocid": "checkout.state_input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Label,
                              {
                                htmlFor: "pincode",
                                className: "text-xs font-medium text-foreground",
                                children: [
                                  "Pincode ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "pincode",
                                value: form.pincode,
                                onChange: handleChange("pincode"),
                                placeholder: "6-digit pincode",
                                maxLength: 6,
                                className: "h-9 text-sm",
                                "data-ocid": "checkout.pincode_input"
                              }
                            ),
                            errors.pincode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs text-destructive",
                                "data-ocid": "checkout.pincode_field_error",
                                children: errors.pincode
                              }
                            )
                          ] })
                        ] })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-sm shadow-sm",
                "data-ocid": "checkout.payment_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-primary/5 rounded-t-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Payment Method" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 space-y-3", children: [
                    PAYMENT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        disabled: !opt.available,
                        onClick: () => opt.available && setPaymentMethod(opt.id),
                        className: [
                          "w-full flex items-center gap-3 px-4 py-3 rounded-sm border text-left transition-smooth",
                          opt.available ? paymentMethod === opt.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-secondary/50" : "border-border bg-muted/40 cursor-not-allowed opacity-70"
                        ].join(" "),
                        "data-ocid": `checkout.payment_${opt.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: [
                                "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                                paymentMethod === opt.id && opt.available ? "border-primary" : "border-muted-foreground"
                              ].join(" "),
                              children: paymentMethod === opt.id && opt.available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: opt.available ? "text-primary" : "text-muted-foreground",
                              children: opt.icon
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium text-foreground", children: opt.label }),
                          !opt.available && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "text-[10px] px-2 py-0 h-5 bg-muted text-muted-foreground border border-border",
                              children: "Coming Soon"
                            }
                          ),
                          opt.id === "cod" && opt.available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block", children: "Pay on delivery" })
                        ]
                      },
                      opt.id
                    )),
                    paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 px-2 py-2 bg-green-50 border border-green-200 rounded-sm text-xs text-green-700", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 flex-shrink-0" }),
                      "You pay only when your order arrives at your doorstep."
                    ] })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-sm shadow-sm sticky top-20",
              "data-ocid": "checkout.order_summary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-b border-border bg-primary/5 rounded-t-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-base text-foreground", children: [
                  "Order Summary",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal text-sm", children: [
                    "(",
                    itemCount,
                    " items)"
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-hide", children: cartItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex gap-3 items-start",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded border border-border overflow-hidden flex-shrink-0 bg-secondary/30", children: item.product.images[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: item.product.images[0],
                            alt: item.product.name,
                            className: "w-full h-full object-cover"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-xs text-muted-foreground", children: "No img" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground line-clamp-2 leading-tight", children: item.product.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                            "Qty: ",
                            item.quantity
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground flex-shrink-0", children: [
                          "₹",
                          (item.product.price * item.quantity).toLocaleString(
                            "en-IN"
                          )
                        ] })
                      ]
                    },
                    item.product.id.toString()
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "Price (",
                        itemCount,
                        " items)"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                        "₹",
                        cartTotal.toLocaleString("en-IN")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery Charges" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: deliveryFee === 0 ? "text-green-600 font-medium" : "text-foreground",
                          children: deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                      "₹",
                      finalTotal.toLocaleString("en-IN")
                    ] })
                  ] }),
                  deliveryFee === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600 font-medium", children: "🎉 You save ₹40 on delivery!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      form: "checkout-form",
                      className: "w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth",
                      disabled: isPending,
                      "data-ocid": "checkout.place_order_button",
                      children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                        "Placing Order..."
                      ] }) : "Place Order"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-center text-muted-foreground", children: "Safe and Secure Payments. Easy returns. 100% Authentic products." })
                ] })
              ]
            }
          ) })
        ] })
      ] })
    }
  ) });
}
export {
  CheckoutPage
};
