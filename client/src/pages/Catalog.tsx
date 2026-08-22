/**
 * Flash catalog — preserve Supercharged Editorial Commerce with paper-white density,
 * heavy Space Grotesk hierarchy, dynamic 4-column expansion, and modern filter system.
 */
import { useEffect, useMemo, useState } from "react";
import { Grid2X2, List, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";
import Pagination from "@/components/Pagination";
import SafeImage from "@/components/common/SafeImage";
import FilterDrawer from "@/components/FilterDrawer";
import ActiveFilterChips from "@/components/ActiveFilterChips";
import { categoryOrder, formatINR, getDiscount, products, type Product, type ProductCategory } from "@/data/mockProducts";
import { useCommerce } from "@/contexts/CommerceContext";
import { getLiveStoreProducts } from "@/services/productService";
import {
  calculatePriceBounds,
  createDefaultFilters,
  filterProducts,
  countActiveFilters,
  getActiveChips,
  type FilterState,
  type ActiveChip,
} from "@/lib/productFilterEngine";

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

  const [view, setView] = useState<"grid" | "list">("grid");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadLiveProducts() {
      const liveList = await getLiveStoreProducts();
      setAllProducts(liveList);
    }
    loadLiveProducts();
  }, []);

  // Compute dataset bounds
  const priceBounds = useMemo(() => calculatePriceBounds(allProducts), [allProducts]);

  // Read filter state from URL or initialize
  const initialFilters = useMemo<FilterState>(() => {
    const categoriesParam = searchParams.get("categories") || searchParams.get("category");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const discountParam = searchParams.get("discount");
    const inStockParam = searchParams.get("inStock");
    const expressParam = searchParams.get("express");

    const categories: ProductCategory[] = [];
    if (categoriesParam) {
      const list = categoriesParam.split(",");
      for (const item of list) {
        const match = categoryOrder.find(
          (c) => c.toLowerCase().replace(/[^a-z0-9]/g, "") === item.toLowerCase().replace(/[^a-z0-9]/g, "")
        );
        if (match && !categories.includes(match)) {
          categories.push(match);
        }
      }
    } else if (categoryFromLocation) {
      categories.push(categoryFromLocation);
    }

    return {
      categories,
      minPrice: minPriceParam ? Math.max(priceBounds.minPrice, Number(minPriceParam)) : priceBounds.minPrice,
      maxPrice: maxPriceParam ? Math.min(priceBounds.maxPrice, Number(maxPriceParam)) : priceBounds.maxPrice,
      minDiscount: discountParam ? Number(discountParam) : 0,
      inStockOnly: inStockParam === "true",
      expressOnly: expressParam === "true",
    };
  }, [searchParams, categoryFromLocation, priceBounds]);

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Sync filters if URL changes externally
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Sync state changes with URL query parameters
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    const nextParams = new URLSearchParams(searchParams);

    if (newFilters.categories.length > 0) {
      nextParams.set(
        "categories",
        newFilters.categories.map((c) => c.toLowerCase().replace(/\s+/g, "-")).join(",")
      );
      nextParams.delete("category");
    } else {
      nextParams.delete("categories");
      nextParams.delete("category");
    }

    if (newFilters.minPrice > priceBounds.minPrice) {
      nextParams.set("minPrice", String(newFilters.minPrice));
    } else {
      nextParams.delete("minPrice");
    }

    if (newFilters.maxPrice < priceBounds.maxPrice) {
      nextParams.set("maxPrice", String(newFilters.maxPrice));
    } else {
      nextParams.delete("maxPrice");
    }

    if (newFilters.minDiscount > 0) {
      nextParams.set("discount", String(newFilters.minDiscount));
    } else {
      nextParams.delete("discount");
    }

    if (newFilters.inStockOnly) {
      nextParams.set("inStock", "true");
    } else {
      nextParams.delete("inStock");
    }

    if (newFilters.expressOnly) {
      nextParams.set("express", "true");
    } else {
      nextParams.delete("express");
    }

    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    const defaults = createDefaultFilters(priceBounds);
    updateFilters(defaults);
  };

  const handleRemoveChip = (chip: ActiveChip) => {
    const next = { ...filters };
    if (chip.type === "categories" && chip.value) {
      next.categories = next.categories.filter((c) => c !== chip.value);
    } else if (chip.type === "minPrice" || chip.type === "maxPrice") {
      next.minPrice = priceBounds.minPrice;
      next.maxPrice = priceBounds.maxPrice;
    } else if (chip.type === "minDiscount") {
      next.minDiscount = 0;
    } else if (chip.type === "inStockOnly") {
      next.inStockOnly = false;
    } else if (chip.type === "expressOnly") {
      next.expressOnly = false;
    }
    updateFilters(next);
  };

  const query = (searchParams.get("search") ?? searchQuery).trim().toLowerCase();
  const sort = searchParams.get("sort") ?? "featured";

  // Filtered & Sorted Product Pipeline
  const results = useMemo(() => {
    const filtered = filterProducts(allProducts, filters, query);

    // Apply collection filter constraint if specified
    const collectionFiltered = filtered.filter((product) => {
      if (collection === "new-in") return Boolean(product.isNew);
      if (collection === "top-deals") return getDiscount(product) >= 40;
      return true;
    });

    // Apply sorting method
    return collectionFiltered.sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
        ? b.price - a.price
        : collection === "new-in" || sort === "newest"
        ? Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || b.id.localeCompare(a.id)
        : collection === "top-deals" || sort === "discount"
        ? getDiscount(b) - getDiscount(a)
        : 0
    );
  }, [allProducts, filters, query, collection, sort]);

  const activeFilterCount = countActiveFilters(filters, priceBounds);
  const activeChips = getActiveChips(filters, priceBounds);

  const setSort = (value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", value);
    setSearchParams(next);
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
  }, [filters, query, sort, collection]);

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

      <div className="catalog-layout catalog-layout--full">
        <div className="catalog-results">
          {/* CONTROL BAR */}
          <div className="catalog-controls">
            <p>
              Showing <b>{results.length ? Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, results.length) : 0}</b>–<b>{Math.min(currentPage * ITEMS_PER_PAGE, results.length)}</b> of <b>{results.length}</b> products
              {catalogLabel !== "The Flash edit" && <> in <b>{catalogLabel}</b></>}
            </p>

            <div className="catalog-controls__actions">
              {/* FILTERS BUTTON */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
                aria-label="Toggle filter panel"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                  isDrawerOpen || activeFilterCount > 0
                    ? "bg-[#0F1115] text-white border-[#CCFF00] shadow-md ring-2 ring-[#CCFF00]/30"
                    : "bg-white dark:bg-[#12151B] text-[#0F1115] dark:text-white border-[#CCFF00] hover:bg-[#CCFF00]/15 hover:border-[#b8e600] shadow-xs"
                }`}
              >
                <SlidersHorizontal
                  size={15}
                  className={isDrawerOpen || activeFilterCount > 0 ? "text-[#CCFF00]" : "text-[#0F1115] dark:text-[#CCFF00]"}
                />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[#CCFF00] text-[#0F1115] text-[11px] font-black ml-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* VIEW SWITCH */}
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

              {/* SORT SELECT */}
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

          {/* ACTIVE FILTER CHIPS */}
          <ActiveFilterChips
            chips={activeChips}
            onRemoveChip={handleRemoveChip}
            onClearAll={handleResetFilters}
          />

          {/* PRODUCT GRID / EMPTY STATE */}
          {results.length ? (
            <div
              className={`catalog-grid catalog-grid--${view} ${
                view === "grid" ? "catalog-grid--4col" : ""
              }`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#12151B] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-12 text-center space-y-4 shadow-sm my-6">
              <Sparkles size={32} className="mx-auto text-[#CCFF00]" />
              <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
                No products found
              </h3>
              <p className="text-xs font-medium text-neutral-500 max-w-sm mx-auto">
                No products match your selected filter criteria. Try adjusting or clearing your filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#CCFF00] text-[#0F1115] text-xs font-black hover:bg-[#b8e600] transition-colors cursor-pointer border-none shadow-sm"
              >
                Clear Filters
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

      {/* FILTER DRAWER */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        bounds={priceBounds}
        allProducts={allProducts}
        onApplyFilters={updateFilters}
        onResetFilters={handleResetFilters}
      />

      {/* QUICK VIEW MODAL */}
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


