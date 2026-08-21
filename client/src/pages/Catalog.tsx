/**
 * Flash catalog — preserve Supercharged Editorial Commerce with paper-white density,
 * heavy Space Grotesk hierarchy, on-demand toggleable filters, and dynamic 4-column expansion.
 */
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Grid2X2, List, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";
import Pagination from "@/components/Pagination";
import SafeImage from "@/components/common/SafeImage";
import { categoryOrder, formatINR, getDiscount, products, type Product, type ProductCategory } from "@/data/mockProducts";
import { useCommerce } from "@/contexts/CommerceContext";

import { supabase } from "@/lib/supabase";

const brands = Array.from(new Set(products.map((product) => product.brand)));

function slugToCategory(slug?: string) {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug).toLowerCase();
  const normalized = decoded.replace(/[^a-z0-9]/g, "");
  return (
    categoryOrder.find((category) => {
      const catNorm = category.toLowerCase().replace(/[^a-z0-9]/g, "");
      return catNorm === normalized;
    }) ?? null
  );
}

export default function Catalog() {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, addToCart } = useCommerce();
  const categoryFromRoute = slugToCategory(categoryName);
  const categoryFromQuery = slugToCategory(searchParams.get("category") ?? undefined);
  const categoryFromLocation = categoryFromRoute ?? categoryFromQuery;
  const collection = searchParams.get("collection") ?? "";
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(categoryFromLocation ?? "All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceFloor, setPriceFloor] = useState(499);
  const [priceCeiling, setPriceCeiling] = useState(100000);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(products);

  useEffect(() => {
    setSelectedCategory(categoryFromLocation ?? "All");
  }, [categoryFromLocation]);

  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          const mapped: Product[] = data.map((item: any, idx: number) => {
            const rawCat = item.category || "home-living";
            const categoryFormatted = categoryOrder.find(
              (c) => c.toLowerCase().replace(/[^a-z0-9]/g, "") === rawCat.toLowerCase().replace(/[^a-z0-9]/g, "")
            ) ?? "Home & Living";

            return {
              id: item.id ? String(item.id) : `sb-${idx}-${Date.now()}`,
              name: item.name || item.title || "Untitled Product",
              category: categoryFormatted as ProductCategory,
              subcategory: item.subcategory || "General",
              brand: item.brand || "Flash",
              price: Number(item.price || 0),
              mrp: Number(item.original_price || item.mrp || Math.round(Number(item.price || 0) * 1.4)),
              stock: Number(item.stock || 10),
              express: true,
              isNew: true,
              image: item.primary_image || item.image || "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
              gallery: Array.isArray(item.hover_images) && item.hover_images.length
                ? item.hover_images
                : [item.primary_image || item.image || "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"],
              description: item.description || "Flash verified product.",
              highlights: ["Authentic quality guarantee", "Fast dispatch eligible"],
              colors: ["#0F1115", "#CCFF00"],
              sku: item.sku || `FL-SB-${Math.floor(100 + Math.random() * 900)}`,
            };
          });

          setAllProducts((current) => {
            const dbIds = new Set(mapped.map((m) => m.id));
            return [...mapped, ...products.filter((p) => !dbIds.has(p.id))];
          });
        }
      } catch (err) {
        console.warn("Supabase live product fetch notice:", err);
      }
    }
    loadLiveProducts();
  }, []);

  const query = (searchParams.get("search") ?? searchQuery).trim().toLowerCase();
  const sort = searchParams.get("sort") ?? "featured";

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedBrands.length +
    (minDiscount > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (expressOnly ? 1 : 0) +
    (priceFloor > 499 || priceCeiling < 100000 ? 1 : 0);

  const results = useMemo(
    () =>
      allProducts
        .filter((product) => {
          const matchesQuery =
            !query ||
            `${product.name} ${product.brand} ${product.category} ${product.subcategory}`
              .toLowerCase()
              .includes(query);
          const matchesCollection =
            collection === "new-in"
              ? Boolean(product.isNew)
              : collection === "top-deals"
              ? getDiscount(product) >= 40
              : true;
          return (
            matchesQuery &&
            matchesCollection &&
            (selectedCategory === "All" || product.category === selectedCategory) &&
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            product.price >= priceFloor &&
            product.price <= priceCeiling &&
            getDiscount(product) >= minDiscount &&
            (!inStockOnly || product.stock > 0) &&
            (!expressOnly || product.express)
          );
        })
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
            ? b.price - a.price
            : collection === "new-in" || sort === "newest"
            ? Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || b.id.localeCompare(a.id)
            : collection === "top-deals" || sort === "discount"
            ? getDiscount(b) - getDiscount(a)
            : 0
        ),
    [
      allProducts,
      query,
      selectedCategory,
      selectedBrands,
      priceFloor,
      priceCeiling,
      minDiscount,
      inStockOnly,
      expressOnly,
      sort,
      collection,
    ]
  );

  const setSort = (value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", value);
    setSearchParams(next);
  };

  const toggleBrand = (brand: string) =>
    setSelectedBrands((current) =>
      current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]
    );

  const selectCategory = (category: ProductCategory | "All") => {
    setSelectedCategory(category);
    const next = new URLSearchParams(searchParams);
    next.delete("collection");
    if (category === "All") next.delete("category");
    else next.set("category", category.toLowerCase().replace(/\s+/g, "-"));
    setSearchParams(next);
  };

  const reset = () => {
    setSelectedCategory(categoryFromLocation ?? "All");
    setSelectedBrands([]);
    setPriceFloor(499);
    setPriceCeiling(100000);
    setMinDiscount(0);
    setInStockOnly(false);
    setExpressOnly(false);
  };

  const catalogLabel =
    collection === "new-in"
      ? "New in"
      : collection === "top-deals"
      ? "Top deals"
      : categoryFromLocation ?? "The Flash edit";
  const runwayProduct = results[0];

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedBrands,
    priceFloor,
    priceCeiling,
    minDiscount,
    inStockOnly,
    expressOnly,
    query,
    sort,
    collection,
  ]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(
    () => results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [results, currentPage]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  return (
    <section className="catalog-page shell">
      <div className="catalog-intro">
        <div>
          <p className="eyebrow">Move with the drop</p>
          <h1>{catalogLabel}</h1>
          <p>Fast finds, picked for the pace you keep.</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearchParams({ search: searchQuery });
          }}
          className="catalog-mobile-search"
        >
          <Search size={17} />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search the edit"
          />
        </form>
      </div>

      <div className="catalog-breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        {(categoryFromLocation || collection) && (
          <>
            <span>/</span>
            <b>{catalogLabel}</b>
          </>
        )}
      </div>

      {runwayProduct && (
        <CategoryHero
          categoryTitle={catalogLabel}
          itemCount={results.length}
          featuredProduct={runwayProduct}
          heroImage={runwayProduct.image}
        />
      )}

      <div className={`catalog-layout ${showFilters ? "catalog-layout--has-filters" : "catalog-layout--full"}`}>
        {showFilters && (
          <aside className="filter-rail" aria-label="Product filters">
            <div className="filter-rail__head">
              <div>
                <SlidersHorizontal size={17} />
                <h2>Filter the flow</h2>
              </div>
              <div className="filter-rail__head-actions">
                <button className="reset-btn" onClick={reset}>
                  Reset
                </button>
                <button className="close-filter-mobile" onClick={() => setShowFilters(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>
            <details open>
              <summary>
                Category <ChevronDown size={16} />
              </summary>
              <div className="filter-stack category-filter">
                {["All", ...categoryOrder].map((category) => (
                  <button
                    key={category}
                    className={selectedCategory === category ? "is-active" : ""}
                    onClick={() => selectCategory(category as ProductCategory | "All")}
                  >
                    {category}
                    <span>
                      {category === "All"
                        ? products.length
                        : products.filter((product) => product.category === category).length}
                    </span>
                  </button>
                ))}
              </div>
            </details>
            <details open>
              <summary>
                Price range <ChevronDown size={16} />
              </summary>
              <div className="price-filter">
                <div className="price-fields">
                  <label>
                    Min
                    <input
                      type="number"
                      value={priceFloor}
                      min="499"
                      max={priceCeiling}
                      onChange={(event) => setPriceFloor(Number(event.target.value))}
                    />
                  </label>
                  <span>—</span>
                  <label>
                    Max
                    <input
                      type="number"
                      value={priceCeiling}
                      min={priceFloor}
                      max="100000"
                      onChange={(event) => setPriceCeiling(Number(event.target.value))}
                    />
                  </label>
                </div>
                <div className="range-pair">
                  <input
                    aria-label="Minimum price"
                    type="range"
                    min="499"
                    max="100000"
                    step="500"
                    value={priceFloor}
                    onChange={(event) => setPriceFloor(Math.min(Number(event.target.value), priceCeiling - 500))}
                  />
                  <input
                    aria-label="Maximum price"
                    type="range"
                    min="499"
                    max="100000"
                    step="500"
                    value={priceCeiling}
                    onChange={(event) => setPriceCeiling(Math.max(Number(event.target.value), priceFloor + 500))}
                  />
                </div>
                <p>
                  {formatINR(priceFloor)} — {formatINR(priceCeiling)}
                </p>
              </div>
            </details>
            <details open>
              <summary>
                Discount <ChevronDown size={16} />
              </summary>
              <div className="filter-stack choice-filter">
                {[10, 30, 50].map((discount) => (
                  <button
                    className={minDiscount === discount ? "is-active" : ""}
                    key={discount}
                    onClick={() => setMinDiscount(minDiscount === discount ? 0 : discount)}
                  >
                    {discount}% or more
                  </button>
                ))}
              </div>
            </details>
            <details open>
              <summary>
                Availability <ChevronDown size={16} />
              </summary>
              <div className="toggle-stack">
                <label>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(event) => setInStockOnly(event.target.checked)}
                  />
                  <span />
                  In stock only
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={expressOnly}
                    onChange={(event) => setExpressOnly(event.target.checked)}
                  />
                  <span />
                  Flash Express Delivery
                </label>
              </div>
            </details>
            <details>
              <summary>
                Brands <ChevronDown size={16} />
              </summary>
              <div className="brand-checks">
                <div className="brand-search">
                  <Search size={14} />
                  <input placeholder="Search brands" />
                </div>
                {brands.map((brand) => (
                  <label key={brand}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </details>

            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-inputs">
                <span>{formatINR(priceFloor)}</span>
                <span>to</span>
                <span>{formatINR(priceCeiling)}</span>
              </div>
              <input
                type="range"
                min={499}
                max={100000}
                step={500}
                value={priceCeiling}
                onChange={(e) => setPriceCeiling(Number(e.target.value))}
              />
            </div>

            <div className="filter-group">
              <label>Minimum Discount</label>
              <select value={minDiscount} onChange={(e) => setMinDiscount(Number(e.target.value))}>
                <option value={0}>All Discounts</option>
                <option value={10}>10% or more</option>
                <option value={20}>20% or more</option>
                <option value={30}>30% or more</option>
                <option value={40}>40% or more</option>
                <option value={50}>50% or more</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Availability & Delivery</label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In-Stock Only</span>
              </label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={expressOnly}
                  onChange={(e) => setExpressOnly(e.target.checked)}
                />
                <span>Flash Express Shipping</span>
              </label>
            </div>

            <div className="filter-rail__footer-mobile">
              <button className="lime-button" onClick={() => setShowFilters(false)}>
                Apply Filters
              </button>
            </div>
          </aside>
        )}

        <div className="catalog-results">
          <div className="catalog-controls">
            <p>
              Showing <b>{results.length ? Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, results.length) : 0}</b>–<b>{Math.min(currentPage * ITEMS_PER_PAGE, results.length)}</b> of <b>{results.length}</b> products
              {catalogLabel !== "The Flash edit" && <> in <b>{catalogLabel}</b></>}
            </p>
            <div className="catalog-controls__actions">
              <button
                className={`filter-toggle-btn ${showFilters ? "is-active" : ""}`}
                onClick={() => setShowFilters((prev) => !prev)}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
                {activeFilterCount > 0 && <span className="filter-count-badge">{activeFilterCount}</span>}
              </button>
              {activeFilterCount > 0 && (
                <button className="clear-filters-btn" onClick={reset}>
                  Clear All
                </button>
              )}
              <div className="view-switch">
                <button
                  className={view === "grid" ? "is-active" : ""}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <Grid2X2 size={17} />
                </button>
                <button
                  className={view === "list" ? "is-active" : ""}
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <List size={17} />
                </button>
              </div>
              <label className="sort-select">
                Sort by
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="discount">Best Discount</option>
                </select>
              </label>
            </div>
          </div>

          {results.length ? (
            <div
              className={`catalog-grid catalog-grid--${view} ${
                !showFilters && view === "grid" ? "catalog-grid--4col" : ""
              }`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog">
              <Sparkles size={25} />
              <h2>Nothing in this lane yet.</h2>
              <p>Shift your filters and the next find will surface.</p>
              <button className="lime-button" onClick={reset}>
                Reset filters
              </button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {quickView && (
        <div className="quick-view-backdrop" role="presentation" onMouseDown={() => setQuickView(null)}>
          <article
            className="quick-view"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" aria-label="Close quick view" onClick={() => setQuickView(null)}>
              <X size={19} />
            </button>
            <div className="quick-view__media">
              <SafeImage src={quickView.image} alt={quickView.name} />
            </div>
            <div>
              <p className="eyebrow">{quickView.brand}</p>
              <h2 id="quick-view-title">{quickView.name}</h2>
              <p>{quickView.description}</p>
              <span className="availability-line">{quickView.stock} ready to dispatch</span>
              <div className="quick-price">
                <strong>{formatINR(quickView.price)}</strong>
                <del>{formatINR(quickView.mrp)}</del>
                <em>Save {getDiscount(quickView)}%</em>
              </div>
              <div className="quick-view__actions">
                <button
                  className="lime-button"
                  onClick={() => {
                    addToCart(quickView);
                    setQuickView(null);
                  }}
                >
                  Add to cart
                </button>
                <Link to={`/product/${quickView.id}`} onClick={() => setQuickView(null)}>
                  See the full detail
                </Link>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
