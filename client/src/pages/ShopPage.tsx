import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryHero from '../components/CategoryHero';
import SidebarFilter from '../components/SidebarFilter';
import Pagination from '../components/Pagination';
import { getLiveStoreProducts } from '../services/productService';
import { getDiscount, type Product } from '../data/mockProducts';
import { SlidersHorizontal, X } from 'lucide-react';
import { applyAllFilters, type FilterState } from '../lib/filterUtils';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven Filter State
  const categoryParam = searchParams.get('category') || 'all';
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 100000;
  const minDiscountParam = Number(searchParams.get('minDiscount')) || 0;
  const inStockParam = searchParams.get('inStock') === 'true';
  const expressParam = searchParams.get('express') === 'true';
  const sortParam = searchParams.get('sort') || 'featured';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Local state synced bidirectionally with URL searchParams
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPriceParam]);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(minDiscountParam);
  const [inStockOnly, setInStockOnly] = useState<boolean>(inStockParam);
  const [expressOnly, setExpressOnly] = useState<boolean>(expressParam);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

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

  // Synchronize local filter state when URL changes
  useEffect(() => {
    setPriceRange([0, Number(searchParams.get('maxPrice')) || 100000]);
    setSelectedDiscount(Number(searchParams.get('minDiscount')) || 0);
    setInStockOnly(searchParams.get('inStock') === 'true');
    setExpressOnly(searchParams.get('express') === 'true');
  }, [searchParams]);

  // Update URL Search Parameters
  const updateUrlFilters = (updated: {
    priceRange?: [number, number];
    minDiscount?: number;
    inStockOnly?: boolean;
    expressOnly?: boolean;
    selectedBrands?: string[];
  }) => {
    const params = new URLSearchParams(searchParams);

    if (updated.priceRange) {
      params.set('maxPrice', String(updated.priceRange[1]));
    }
    if (updated.minDiscount !== undefined) {
      if (updated.minDiscount > 0) params.set('minDiscount', String(updated.minDiscount));
      else params.delete('minDiscount');
    }
    if (updated.inStockOnly !== undefined) {
      if (updated.inStockOnly) params.set('inStock', 'true');
      else params.delete('inStock');
    }
    if (updated.expressOnly !== undefined) {
      if (updated.expressOnly) params.set('express', 'true');
      else params.delete('express');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedDiscount(0);
    setInStockOnly(false);
    setExpressOnly(false);
    setSelectedBrands([]);
    const params = new URLSearchParams();
    if (categoryParam !== 'all') params.set('category', categoryParam);
    setSearchParams(params);
  };

  // Derive unique brands from live product list
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    allProducts.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet);
  }, [allProducts]);

  // Dynamic Filtering Logic using Unified filterUtils Engine
  const sortedProducts = useMemo(() => {
    const currentFilterState: FilterState = {
      category: categoryParam,
      priceRange,
      minDiscount: selectedDiscount,
      inStockOnly,
      expressOnly,
      selectedBrand: selectedBrands[0] || 'all',
      sortBy: sortParam as any,
    };
    return applyAllFilters(allProducts, currentFilterState);
  }, [allProducts, categoryParam, priceRange, selectedDiscount, inStockOnly, expressOnly, selectedBrands, sortParam]);

  // Paginated Results
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const leadProduct = sortedProducts[0] || allProducts[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0D10] text-black dark:text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Category Hero Banner */}
        <CategoryHero
          categoryTitle={categoryParam !== 'all' ? categoryParam.replace(/-/g, ' ') : 'All Catalog'}
          itemCount={sortedProducts.length}
          featuredProduct={leadProduct}
        />

        {/* Mobile Filter & Sort Bar */}
        <div className="flex items-center justify-between lg:hidden bg-white dark:bg-[#12151B] p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
          <button
            type="button"
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black dark:text-white bg-[#CCFF00] px-4 py-2 rounded-xl"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
          </button>
          <span className="text-xs font-bold text-neutral-500">
            {sortedProducts.length} Products
          </span>
        </div>

        {/* Main Grid Layout: Desktop Sidebar + Product Cards */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
            <SidebarFilter
              priceRange={priceRange}
              setPriceRange={(range) => {
                setPriceRange(range);
                updateUrlFilters({ priceRange: range });
              }}
              selectedDiscount={selectedDiscount}
              setSelectedDiscount={(disc) => {
                setSelectedDiscount(disc);
                updateUrlFilters({ minDiscount: disc });
              }}
              inStockOnly={inStockOnly}
              setInStockOnly={(val) => {
                setInStockOnly(val);
                updateUrlFilters({ inStockOnly: val });
              }}
              expressOnly={expressOnly}
              setExpressOnly={(val) => {
                setExpressOnly(val);
                updateUrlFilters({ expressOnly: val });
              }}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              availableBrands={availableBrands}
              onApply={() => updateUrlFilters({ priceRange, minDiscount: selectedDiscount, inStockOnly, expressOnly, selectedBrands })}
              onClear={handleResetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full space-y-6">
            {loading ? (
              <div className="flex justify-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#CCFF00]" />
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="bg-white dark:bg-[#12151B] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-12 text-center space-y-3">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white">No products found</h3>
                <p className="text-xs font-medium text-neutral-500">Try adjusting your filters or resetting max price limits.</p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Multi-page Pagination Engine */}
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
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer Slide-Over */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
            <div className="w-full max-w-xs bg-white dark:bg-[#12151B] h-full p-6 overflow-y-auto space-y-6 shadow-2xl relative animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-black text-base uppercase tracking-wider">Filter Catalog</h3>
                <button
                  type="button"
                  onClick={() => setShowMobileFilter(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <SidebarFilter
                priceRange={priceRange}
                setPriceRange={(range) => {
                  setPriceRange(range);
                  updateUrlFilters({ priceRange: range });
                }}
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={(disc) => {
                  setSelectedDiscount(disc);
                  updateUrlFilters({ minDiscount: disc });
                }}
                inStockOnly={inStockOnly}
                setInStockOnly={(val) => {
                  setInStockOnly(val);
                  updateUrlFilters({ inStockOnly: val });
                }}
                expressOnly={expressOnly}
                setExpressOnly={(val) => {
                  setExpressOnly(val);
                  updateUrlFilters({ expressOnly: val });
                }}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                availableBrands={availableBrands}
                onApply={() => {
                  updateUrlFilters({ priceRange, minDiscount: selectedDiscount, inStockOnly, expressOnly, selectedBrands });
                  setShowMobileFilter(false);
                }}
                onClear={handleResetFilters}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
