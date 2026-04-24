import List "mo:core/List";
import Map "mo:core/Map";
import CatalogTypes "types/catalog";
import OrderTypes "types/orders";
import CatalogMixin "mixins/catalog-api";
import OrdersMixin "mixins/orders-api";
import AdminMixin "mixins/admin-api";
import CatalogLib "lib/catalog";

actor {
  // --- Stable state ---
  let products = List.empty<CatalogTypes.Product>();

  let orders = List.empty<OrderTypes.Order>();

  let adminTokens = Map.empty<Text, Bool>();

  // Counter wrappers (mutable records so mixins can mutate via field assignment)
  let productCounter = { var id = 0 };
  let orderCounter = { var id = 0 };

  // Seed sample products on first run
  productCounter.id := CatalogLib.seedProducts(products, productCounter.id);

  // --- Mixin composition ---
  include CatalogMixin(products, productCounter, adminTokens);
  include OrdersMixin(orders, products, orderCounter, adminTokens);
  include AdminMixin(adminTokens);
};
