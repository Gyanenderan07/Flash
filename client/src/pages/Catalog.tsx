/**
 * Flash catalog — preserve Supercharged Editorial Commerce with paper-white density,
 * heavy Space Grotesk hierarchy, dynamic 4-column expansion, and modern filter system.
 */
import { useEffect, useMemo, useState } from "react";
import { Grid2X2, List, Search, Sparkles, X } from "lucide-react";
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
  defaultCriteria,
  filterCatalog,
  countActiveFilters,
  getActiveChips,
  type FilterCriteria,
  type ActiveChip,
} from "@/lib/filterService";

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

  const priceBounds = useMemo(() => calculatePriceBounds(allProducts), [allProducts]);
  const [filters, setFilters] = useState<FilterCriteria>(() => ({
    ...defaultCriteria,
    categories: categoryFromLocation ? [categoryFromLocation] : [],
    priceRange: [priceBounds.minPrice, priceBounds.maxPrice],
  }));

  useEffect(() => {
    if (categoryFromLocation) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryFromLocation],
      }));
    }
  }, [categoryFromLocation]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [
        Math.max(prev.priceRange[0], priceBounds.minPrice),
        Math.min(prev.priceRange[1], priceBounds.maxPrice),
      ],
    }));
  }, [priceBounds]);

  const activeFilterCount = countActiveFilters(filters, priceBounds);
  const activeChips = getActiveChips(filters, priceBounds);

  const handleResetFilters = () => {
    setFilters({
      ...defaultCriteria,
      categories: categoryFromLocation ? [categoryFromLocation] : [],
      priceRange: [priceBounds.minPrice, priceBounds.maxPrice],
    });
  };

  const handleRemoveChip = (chip: ActiveChip) => {
    const next = { ...filters };
    if (chip.type === "categories" && chip.value) {
      next.categories = next.categories.filter((c) => c !== chip.value);
    } else if (chip.type === "priceRange") {
      next.priceRange = [priceBounds.minPrice, priceBounds.maxPrice];
    } else if (chip.type === "brands" && chip.value) {
      next.brands = next.brands.filter((b) => b !== chip.value);
    } else if (chip.type === "minRating") {
      next.minRating = 0;
    } else if (chip.type === "minDiscount") {
      next.minDiscount = 0;
    } else if (chip.type === "inStockOnly") {
      next.inStockOnly = false;
    } else if (chip.type === "expressDeliveryOnly") {
      next.expressDeliveryOnly = false;
    }
    setFilters(next);
  };

  const query = (searchParams.get("search") ?? searchQuery).trim().toLowerCase();
  const sort = searchParams.get("sort") ?? "featured";

  // Product pipeline: Search Query + Filters + Collection + Sort
  const results = useMemo(() => {
    const engineFiltered = filterCatalog(allProducts, filters, query, sort);
    return engineFiltered.filter((product: any) => {
      if (collection === "new-in") return Boolean(product.isNew);
      if (collection === "top-deals") return getDiscount(product) >= 40;
      return true;
    });
  }, [allProducts, filters, query, collection, sort]);

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
              {/* Signature Filter Button */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Toggle filter panel"
                className={`relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#000000] text-[#CCFF00] font-black text-xs tracking-widest uppercase border transition-all duration-200 shadow-md cursor-pointer ${
                  isDrawerOpen || activeFilterCount > 0
                    ? "border-[#CCFF00] shadow-[0_0_16px_rgba(204,255,0,0.3)]"
                    : "border-neutral-900 hover:border-[#CCFF00]/80 hover:shadow-[0_0_14px_rgba(204,255,0,0.22)] hover:-translate-y-0.5"
                } active:scale-95`}
              >
                {/* Flash Signature Neon Icon */}
                <svg
                  className="w-4 h-4 text-[#CCFF00] transition-transform duration-200 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="7" y1="12" x2="17" y2="12"></line>
                  <line x1="10" y1="18" x2="14" y2="18"></line>
                </svg>

                <span className="font-extrabold tracking-wider">FILTERS</span>

                {/* Active Count Badge */}
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-black bg-[#CCFF00] text-[#000000] rounded-full shadow-sm">
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
        onApplyFilters={setFilters}
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
