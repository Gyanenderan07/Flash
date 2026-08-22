import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryHero from '../components/CategoryHero';
import Pagination from '../components/Pagination';
import { getLiveStoreProducts } from '../services/productService';
import type { Product } from '../data/mockProducts';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven Parameters
  const categoryParam = searchParams.get('category') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  // Category Filtering Logic
  const filteredProducts = useMemo(() => {
    const targetCategory = categoryParam.toLowerCase().trim().replace(/[\s&]+/g, '-');
    if (targetCategory === 'all' || !targetCategory) {
      return allProducts;
    }
    return allProducts.filter((p) => {
      const cat = (p.category || 'electronics').toLowerCase().trim().replace(/[\s&]+/g, '-');
      return cat === targetCategory;
    });
  }, [allProducts, categoryParam]);

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

        {/* Full Width Product Grid */}
        <div className="w-full space-y-6">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#CCFF00]" />
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#12151B] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-12 text-center space-y-3">
              <h3 className="text-lg font-black text-neutral-900 dark:text-white">No products found</h3>
              <p className="text-xs font-medium text-neutral-500">
                No products are currently available in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
}
