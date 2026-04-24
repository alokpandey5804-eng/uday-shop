import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type OrderStatus = Common.OrderStatus;
  public type Timestamp = Common.Timestamp;

  public type OrderItem = {
    productId : Nat;
    productName : Text;
    quantity : Nat;
    priceAtPurchase : Float;
  };

  public type OrderItemInput = {
    productId : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : OrderId;
    items : [OrderItem];
    totalPrice : Float;
    status : OrderStatus;
    createdAt : Timestamp;
    paymentMethod : Text;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    deliveryCity : Text;
    deliveryPincode : Text;
  };
};
