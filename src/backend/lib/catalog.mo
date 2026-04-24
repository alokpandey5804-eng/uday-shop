import List "mo:core/List";
import CatalogTypes "../types/catalog";

module {
  public type Product = CatalogTypes.Product;
  public type Category = CatalogTypes.Category;

  let CATEGORIES : [Category] = [
    { id = "electronics"; name = "Electronics" },
    { id = "fashion"; name = "Fashion" },
    { id = "home"; name = "Home & Kitchen" },
    { id = "beauty"; name = "Beauty & Health" },
    { id = "sports"; name = "Sports & Outdoors" },
    { id = "study"; name = "Study" },
  ];

  public func seedProducts(products : List.List<Product>, nextId : Nat) : Nat {
    if (not products.isEmpty()) { return nextId };

    // 15 sample products across Electronics, Fashion, Home, Beauty, Sports
    let samples : [(Text, Text, Float, Text, [Text], Nat)] = [
      (
        "iPhone 15",
        "Apple iPhone 15 with A16 Bionic chip, 48MP camera, Dynamic Island, USB-C and all-day battery life",
        79999.0,
        "electronics",
        ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"],
        30,
      ),
      (
        "Samsung 43\" Smart TV",
        "Full HD LED Smart TV with 43-inch display, built-in Wi-Fi, multiple HDMI ports and streaming apps",
        45999.0,
        "electronics",
        ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400"],
        20,
      ),
      (
        "Bluetooth Earphones",
        "Wireless Bluetooth 5.0 earphones with deep bass, 20hr battery, noise cancellation and mic",
        1999.0,
        "electronics",
        ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"],
        100,
      ),
      (
        "Men's Casual Shirt",
        "Slim-fit cotton casual shirt for men, breathable fabric, perfect for daily wear",
        899.0,
        "fashion",
        ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"],
        150,
      ),
      (
        "Women's Kurti",
        "Elegant floral printed Kurti with straight cut design, available in multiple colors",
        1299.0,
        "fashion",
        ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400"],
        120,
      ),
      (
        "Laptop Bag",
        "Water-resistant 15.6 inch laptop bag with multiple compartments and padded shoulder strap",
        1499.0,
        "fashion",
        ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
        80,
      ),
      (
        "Sunglasses",
        "UV400 polarized sunglasses with lightweight frame, suitable for men and women",
        699.0,
        "fashion",
        ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"],
        200,
      ),
      (
        "Air Fryer 4L",
        "Digital air fryer with 4L capacity, 8 preset cooking modes, oil-free healthy cooking",
        3499.0,
        "home",
        ["https://images.unsplash.com/photo-1612355301034-eb40e6fd9f69?w=400"],
        60,
      ),
      (
        "Coffee Maker",
        "Drip coffee maker with 1.5L carafe, programmable 24hr timer and keep-warm plate",
        4299.0,
        "home",
        ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"],
        40,
      ),
      (
        "Sofa Cover",
        "Stretchable waterproof sofa cover for 3-seater, multiple colors, easy to wash",
        799.0,
        "home",
        ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        90,
      ),
      (
        "Face Cream SPF30",
        "Lightweight daily moisturizing face cream with SPF30 sun protection for all skin types",
        599.0,
        "beauty",
        ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400"],
        180,
      ),
      (
        "Perfume Set",
        "Luxury gift set of 3 long-lasting perfumes for men and women, 50ml each",
        2499.0,
        "beauty",
        ["https://images.unsplash.com/photo-1541643600914-78b084683702?w=400"],
        70,
      ),
      (
        "Yoga Mat",
        "Premium anti-slip 6mm thick yoga mat with alignment lines, includes carrying strap",
        849.0,
        "sports",
        ["https://images.unsplash.com/photo-1601925228792-756a8c6e2c4b?w=400"],
        100,
      ),
      (
        "Running Shoes",
        "Lightweight mesh running shoes with cushioned sole, available in sizes 6-12",
        2999.0,
        "sports",
        ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
        85,
      ),
      (
        "Protein Powder 1kg",
        "Whey protein isolate 1kg, 25g protein per serving, chocolate flavour, no added sugar",
        1899.0,
        "sports",
        ["https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400"],
        55,
      ),
      (
        "Spiral Notebook Set (5 Pack)",
        "A5 spiral notebooks with 200 pages each, ruled lines, hard cover — perfect for school and college notes",
        299.0,
        "study",
        ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400"],
        150,
      ),
      (
        "Geometry Box",
        "Complete geometry box set with compass, divider, protractor, set squares, ruler and pencils for students",
        149.0,
        "study",
        ["https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400"],
        200,
      ),
      (
        "Stationery Set 20pcs",
        "Premium stationery kit with pens, pencils, highlighters, erasers, sharpener and sticky notes",
        499.0,
        "study",
        ["https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400"],
        120,
      ),
      (
        "LED Study Lamp",
        "Eye-care LED desk lamp with 5 brightness levels, USB charging port, flexible neck — ideal for reading and studying",
        899.0,
        "study",
        ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"],
        80,
      ),
      (
        "School Backpack 30L",
        "Ergonomic 30L school backpack with padded laptop compartment, water bottle pocket and rain cover",
        1299.0,
        "study",
        ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
        90,
      ),
      (
        "CBSE Science Textbook Class 10",
        "Latest edition CBSE Science textbook for Class 10 with solved examples, diagrams and practice questions",
        249.0,
        "study",
        ["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400"],
        60,
      ),
    ];

    var id = nextId;
    for ((name, desc, price, cat, imgs, stock) in samples.vals()) {
      products.add({ id; name; description = desc; price; category = cat; images = imgs; stock });
      id += 1;
    };
    id;
  };

  public func listProducts(
    products : List.List<Product>,
    category : ?Text,
    minPrice : ?Float,
    maxPrice : ?Float,
  ) : [Product] {
    products.filter(func(p) {
      let catOk = switch (category) {
        case null true;
        case (?c) p.category == c;
      };
      let minOk = switch (minPrice) {
        case null true;
        case (?m) p.price >= m;
      };
      let maxOk = switch (maxPrice) {
        case null true;
        case (?m) p.price <= m;
      };
      catOk and minOk and maxOk;
    }).toArray();
  };

  public func getProduct(products : List.List<Product>, id : Nat) : ?Product {
    products.find(func(p) { p.id == id });
  };

  public func addProduct(
    products : List.List<Product>,
    nextId : Nat,
    name : Text,
    description : Text,
    price : Float,
    category : Text,
    images : [Text],
    stock : Nat,
  ) : Nat {
    let product : Product = { id = nextId; name; description; price; category; images; stock };
    products.add(product);
    nextId + 1;
  };

  public func editProduct(
    products : List.List<Product>,
    id : Nat,
    name : Text,
    description : Text,
    price : Float,
    category : Text,
    images : [Text],
    stock : Nat,
  ) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with name; description; price; category; images; stock };
      } else {
        p;
      };
    });
    found;
  };

  public func deleteProduct(products : List.List<Product>, id : Nat) : Bool {
    let before = products.size();
    let filtered = products.filter(func(p) { p.id != id });
    products.clear();
    products.append(filtered);
    products.size() < before;
  };

  public func listCategories() : [Category] {
    CATEGORIES;
  };
};
