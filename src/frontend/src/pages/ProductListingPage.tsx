import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Layout } from "../components/Layout";
import { LoadingPage } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import { useCategories, useProducts } from "../hooks/useProducts";

const PRICE_MAX = 200000;

export function ProductListingPage() {
  const search = useSearch({ from: "/products" });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    search.category ? [search.category] : [],
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    PRICE_MAX,
  ]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (search.category) setSelectedCategories([search.category]);
  }, [search.category]);

  const filterCategory =
    selectedCategories.length === 1 ? selectedCategories[0] : null;
  const minPrice = priceRange[0] > 0 ? priceRange[0] : null;
  const maxPrice = priceRange[1] < PRICE_MAX ? priceRange[1] : null;

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useProducts(filterCategory, minPrice, maxPrice);
  const { data: categories } = useCategories();

  const filteredProducts = products
    ? products.filter((p) => {
        const matchesQuery =
          !search.q || p.name.toLowerCase().includes(search.q.toLowerCase());
        const matchesCat =
          selectedCategories.length === 0 ||
          selectedCategories.includes(p.category);
        return matchesQuery && matchesCat;
      })
    : [];

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  const allCategories =
    categories && categories.length > 0
      ? categories.map((c) => c.name)
      : [
          "Electronics",
          "Fashion",
          "Home & Kitchen",
          "Appliances",
          "Books",
          "Sports",
          "Beauty",
          "Toys",
        ];

  const FilterPanel = () => (
    <div
      className="bg-card border border-border rounded-lg p-4"
      data-ocid="products.filter_panel"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-sm text-foreground">
          Filters
        </h3>
        <button
          type="button"
          className="text-xs text-primary hover:underline"
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([0, PRICE_MAX]);
          }}
          data-ocid="products.clear_filters_button"
        >
          Clear All
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Category
        </h4>
        <div className="space-y-2">
          {allCategories.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
                data-ocid={`products.category_filter.${cat.toLowerCase().replace(/\s+/g, "-")}`}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Price Range
        </h4>
        <Slider
          min={0}
          max={PRICE_MAX}
          step={500}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={(v) => setPriceRange([v[0], v[1]])}
          className="mb-2"
          data-ocid="products.price_slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
          <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-4" data-ocid="products.page">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">
              {search.q
                ? `Results for "${search.q}"`
                : (search.category ?? "All Products")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden flex items-center gap-2 border-primary text-primary"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            data-ocid="products.mobile_filter_toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="md:hidden mb-4 relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-muted-foreground"
              onClick={() => setShowMobileFilters(false)}
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
            <FilterPanel />
          </div>
        )}

        <div className="flex gap-4">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <FilterPanel />
          </aside>

          {/* Product Grid */}
          <div className="flex-1" data-ocid="products.list">
            {isLoading && <LoadingPage />}
            {error && <ErrorMessage onRetry={() => refetch()} />}
            {!isLoading && !error && filteredProducts.length === 0 && (
              <div
                className="text-center py-12"
                data-ocid="products.empty_state"
              >
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-display font-semibold text-foreground mb-1">
                  No products found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
            {!isLoading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
