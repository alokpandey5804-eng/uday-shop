module {
  public type Timestamp = Int;
  public type ProductId = Nat;
  public type OrderId = Nat;

  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
  };
};
