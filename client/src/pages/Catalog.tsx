/**
 * Flash catalog — preserve Supercharged Editorial Commerce with paper-white density,
 * heavy Space Grotesk hierarchy, and dynamic 4-column expansion.
 */
import { useEffect, useMemo, useState } from "react";
import { Grid2X2, List, Search, Sparkles, X } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";
import Pagination from "@/components/Pagination";
import SafeImage from "@/components/common/SafeImage";
import { categoryOrder, formatINR, getDiscount, products, type Product, type ProductCategory } from "@/data/mockProducts";
import { useCommerce } from "@/contexts/CommerceContext";
import { getLiveStoreProducts } from "@/services/productService";

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

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(categoryFromLocation ?? "All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(products);

  useEffect(() => {
    setSelectedCategory(categoryFromLocation ?? "All");
  }, [categoryFromLocation]);

  useEffect(() => {
    async function loadLiveProducts() {
      const liveList = await getLiveStoreProducts();
      setAllProducts(liveList);
    }
    loadLiveProducts();
  }, []);

  const query = (searchParams.get("search") ?? searchQuery).trim().toLowerCase();
  const sort = searchParams.get("sort") ?? "featured";

  // Product pipeline: Search Query + Category + Collection + Sort
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
            (selectedCategory === "All" || product.category === selectedCategory)
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
    [allProducts, query, selectedCategory, sort, collection]
  );

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
  }, [selectedCategory, query, sort, collection]);

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
            <div className="empty-catalog">
              <Sparkles size={25} />
              <h2>Nothing in this lane yet.</h2>
              <p>Try searching for something else or explore other categories.</p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

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
