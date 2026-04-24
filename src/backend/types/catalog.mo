import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    images : [Text];
    stock : Nat;
  };

  public type Category = {
    id : Text;
    name : Text;
  };
};
