import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryHero from '../components/CategoryHero';
import Pagination from '../components/Pagination';
import FilterDrawer from '../components/FilterDrawer';
import ActiveFilterChips from '../components/ActiveFilterChips';
import { getLiveStoreProducts } from '../services/productService';
import { products, type Product } from '../data/mockProducts';
import {
  calculatePriceBounds,
  createDefaultFilters,
  filterProducts,
  countActiveFilters,
  getActiveChips,
  type FilterState,
  type ActiveChip,
} from '../lib/productFilterEngine';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven Parameters
  const categoryParam = searchParams.get('category') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';

  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const liveList = await getLiveStoreProducts();
        setAllProducts(liveList);
      } catch (err) {
        console.error('Failed to load shop catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const priceBounds = useMemo(() => calculatePriceBounds(allProducts), [allProducts]);
  const [filters, setFilters] = useState<FilterState>(() => createDefaultFilters(priceBounds));

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: Math.max(prev.minPrice, priceBounds.minPrice),
      maxPrice: Math.min(prev.maxPrice, priceBounds.maxPrice),
    }));
  }, [priceBounds]);

  const activeFilterCount = countActiveFilters(filters, priceBounds);
  const activeChips = getActiveChips(filters, priceBounds);

  const handleResetFilters = () => {
    setFilters(createDefaultFilters(priceBounds));
  };

  const handleRemoveChip = (chip: ActiveChip) => {
    const next = { ...filters };
    if (chip.type === 'categories' && chip.value) {
      next.categories = next.categories.filter((c) => c !== chip.value);
    } else if (chip.type === 'minPrice' || chip.type === 'maxPrice') {
      next.minPrice = priceBounds.minPrice;
      next.maxPrice = priceBounds.maxPrice;
    } else if (chip.type === 'minDiscount') {
      next.minDiscount = 0;
    } else if (chip.type === 'inStockOnly') {
      next.inStockOnly = false;
    } else if (chip.type === 'expressOnly') {
      next.expressOnly = false;
    }
    setFilters(next);
  };

  // Category & Engine Filtering Logic
  const filteredProducts = useMemo(() => {
    const engineFiltered = filterProducts(allProducts, filters, '');
    const targetCategory = categoryParam.toLowerCase().trim().replace(/[\s&]+/g, '-');
    if (targetCategory === 'all' || !targetCategory) {
      return engineFiltered;
    }
    return engineFiltered.filter((p) => {
      const cat = (p.category || 'electronics').toLowerCase().trim().replace(/[\s&]+/g, '-');
      return cat === targetCategory;
    });
  }, [allProducts, filters, categoryParam]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortParam === 'price-low') {
      return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }
    if (sortParam === 'price-high') {
      return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }
    return list;
  }, [filteredProducts, sortParam]);

  // Multi-page Pagination Engine
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const leadProduct = sortedProducts[0] || allProducts[0];

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0D10] text-black dark:text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Category Hero Banner */}
        <CategoryHero
          categoryTitle={categoryParam !== 'all' ? categoryParam.replace(/-/g, ' ') : 'All Catalog'}
          itemCount={sortedProducts.length}
          featuredProduct={leadProduct}
        />

        {/* Top Control Bar: Category Title, Item Count, & Sort Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#12151B] p-5 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
          <div>
            <h1 className="text-xl font-black capitalize text-neutral-900 dark:text-white tracking-tight">
              Category: {categoryParam.replace(/-/g, ' ')}
            </h1>
            <p className="text-xs text-neutral-500 font-medium">
              Showing {sortedProducts.length} Flash verified products
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* High-Contrast Flash Signature Filter Button */}
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className={`relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#000000] text-[#CCFF00] font-black text-xs tracking-widest uppercase border transition-all duration-200 shadow-md cursor-pointer ${
                isFilterDrawerOpen || activeFilterCount > 0
                  ? 'border-[#CCFF00] shadow-[0_0_16px_rgba(204,255,0,0.3)]'
                  : 'border-neutral-900 hover:border-[#CCFF00]/80 hover:shadow-[0_0_14px_rgba(204,255,0,0.22)] hover:-translate-y-0.5'
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

            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Sort By:
            </label>
            <select
              value={sortParam}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2.5 bg-neutral-50 dark:bg-[#181C24] border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#CCFF00] cursor-pointer"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        <ActiveFilterChips
          chips={activeChips}
          onRemoveChip={handleRemoveChip}
          onClearAll={handleResetFilters}
        />

        {/* Full Width Product Grid */}
        <div className="w-full space-y-6">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-4 border-[#CCFF00] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="pt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#12151B] rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No products found</h3>
              <p className="text-xs text-neutral-500">
                Try adjusting your filter options or select a different category.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-[#CCFF00] text-[#000000] text-xs font-bold rounded-xl hover:bg-[#b8e600] transition-colors cursor-pointer border-none"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Filter Drawer */}
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          filters={filters}
          bounds={priceBounds}
          allProducts={allProducts}
          onApplyFilters={setFilters}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
}
