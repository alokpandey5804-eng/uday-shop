import List "mo:core/List";
import Map "mo:core/Map";
import OrdersLib "../lib/orders";
import AdminLib "../lib/admin";
import OrderTypes "../types/orders";
import CatalogTypes "../types/catalog";

mixin (
  orders : List.List<OrderTypes.Order>,
  products : List.List<CatalogTypes.Product>,
  orderCounter : { var id : Nat },
  adminTokens : Map.Map<Text, Bool>,
) {

  public func createOrder(
    items : [OrderTypes.OrderItemInput],
    customerName : Text,
    customerPhone : Text,
    deliveryAddress : Text,
    deliveryCity : Text,
    deliveryPincode : Text,
    paymentMethod : Text,
  ) : async Nat {
    let orderId = orderCounter.id;
    orderCounter.id := OrdersLib.createOrder(
      orders, products, orderCounter.id,
      items, customerName, customerPhone,
      deliveryAddress, deliveryCity, deliveryPincode, paymentMethod,
    );
    orderId;
  };

  public query func getOrder(id : Nat) : async ?OrderTypes.Order {
    OrdersLib.getOrder(orders, id);
  };

  public query func getOrdersByPhone(phone : Text) : async [OrderTypes.Order] {
    OrdersLib.getOrdersByPhone(orders, phone);
  };

  public func listOrders(token : Text) : async [OrderTypes.Order] {
    assert AdminLib.verifyToken(adminTokens, token);
    OrdersLib.listOrders(orders);
  };

  public func updateOrderStatus(token : Text, id : Nat, status : Text) : async Bool {
    assert AdminLib.verifyToken(adminTokens, token);
    OrdersLib.updateOrderStatus(orders, id, status);
  };
};
