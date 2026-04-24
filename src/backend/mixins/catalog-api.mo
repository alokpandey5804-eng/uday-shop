import List "mo:core/List";
import Map "mo:core/Map";
import CatalogLib "../lib/catalog";
import AdminLib "../lib/admin";
import CatalogTypes "../types/catalog";

mixin (
  products : List.List<CatalogTypes.Product>,
  productCounter : { var id : Nat },
  adminTokens : Map.Map<Text, Bool>,
) {

  public query func listProducts(category : ?Text, minPrice : ?Float, maxPrice : ?Float) : async [CatalogTypes.Product] {
    CatalogLib.listProducts(products, category, minPrice, maxPrice);
  };

  public query func getProduct(id : Nat) : async ?CatalogTypes.Product {
    CatalogLib.getProduct(products, id);
  };

  public query func listCategories() : async [CatalogTypes.Category] {
    CatalogLib.listCategories();
  };

  public func addProduct(
    token : Text,
    name : Text,
    description : Text,
    price : Float,
    category : Text,
    images : [Text],
    stock : Nat,
  ) : async Nat {
    assert AdminLib.verifyToken(adminTokens, token);
    let newId = productCounter.id;
    productCounter.id := CatalogLib.addProduct(products, productCounter.id, name, description, price, category, images, stock);
    newId;
  };

  public func editProduct(
    token : Text,
    id : Nat,
    name : Text,
    description : Text,
    price : Float,
    category : Text,
    images : [Text],
    stock : Nat,
  ) : async Bool {
    assert AdminLib.verifyToken(adminTokens, token);
    CatalogLib.editProduct(products, id, name, description, price, category, images, stock);
  };

  public func deleteProduct(token : Text, id : Nat) : async Bool {
    assert AdminLib.verifyToken(adminTokens, token);
    CatalogLib.deleteProduct(products, id);
  };
};
