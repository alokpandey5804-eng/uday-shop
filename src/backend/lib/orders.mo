import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import OrderTypes "../types/orders";
import CatalogTypes "../types/catalog";

module {
  public type Order = OrderTypes.Order;
  public type OrderItem = OrderTypes.OrderItem;
  public type OrderItemInput = OrderTypes.OrderItemInput;
  public type OrderStatus = OrderTypes.OrderStatus;
  public type Product = CatalogTypes.Product;

  func parseStatus(s : Text) : OrderStatus {
    switch (s) {
      case "pending" #pending;
      case "confirmed" #confirmed;
      case "shipped" #shipped;
      case "delivered" #delivered;
      case _ Runtime.trap("invalid status: " # s);
    };
  };

  public func createOrder(
    orders : List.List<Order>,
    products : List.List<Product>,
    nextId : Nat,
    items : [OrderItemInput],
    customerName : Text,
    customerPhone : Text,
    deliveryAddress : Text,
    deliveryCity : Text,
    deliveryPincode : Text,
    paymentMethod : Text,
  ) : Nat {
    var total : Float = 0.0;

    // Validate all products exist before placing the order
    for (input in items.vals()) {
      switch (products.find(func(p) { p.id == input.productId })) {
        case null Runtime.trap("product not found: " # input.productId.toText());
        case _ {};
      };
    };

    // Build order items and compute total
    let orderItems = items.map(func(input) {
      let product = switch (products.find(func(p) { p.id == input.productId })) {
        case (?p) p;
        case null Runtime.trap("product not found");
      };
      let qty = input.quantity.toFloat();
      let lineTotal = product.price * qty;
      total += lineTotal;
      {
        productId = input.productId;
        productName = product.name;
        quantity = input.quantity;
        priceAtPurchase = product.price;
      };
    });

    // Decrement stock for each ordered product
    for (input in items.vals()) {
      products.mapInPlace(func(p) {
        if (p.id == input.productId) {
          let newStock = if (p.stock >= input.quantity) { p.stock - input.quantity } else { 0 };
          { p with stock = newStock };
        } else {
          p;
        };
      });
    };

    let order : Order = {
      id = nextId;
      items = orderItems;
      totalPrice = total;
      status = #pending;
      createdAt = Time.now();
      paymentMethod;
      customerName;
      customerPhone;
      deliveryAddress;
      deliveryCity;
      deliveryPincode;
    };
    orders.add(order);
    nextId + 1;
  };

  public func getOrder(orders : List.List<Order>, id : Nat) : ?Order {
    orders.find(func(o) { o.id == id });
  };

  public func listOrders(orders : List.List<Order>) : [Order] {
    orders.toArray();
  };

  public func getOrdersByPhone(orders : List.List<Order>, phone : Text) : [Order] {
    orders.toArray().filter(func(o) { o.customerPhone == phone });
  };

  public func updateOrderStatus(orders : List.List<Order>, id : Nat, status : Text) : Bool {
    let newStatus = parseStatus(status);
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == id) {
        found := true;
        { o with status = newStatus };
      } else {
        o;
      };
    });
    found;
  };
};
