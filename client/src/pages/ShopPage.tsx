import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // 1. Fetch live products from Supabase
      const { data: dbProducts, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }

      if (dbProducts) {
        // 2. Safe mapping to prevent dropped rows
        const mappedProducts = dbProducts.map((p) => {
          const rawCat = (p.category || 'electronics').toLowerCase().trim();
          const cleanCat = rawCat.replace(/[\s&]+/g, '-');
          const primaryImg = p.primary_image || p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
          const hoverImg = (p.hover_images && p.hover_images[0]) || p.primary_image || p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
          const priceNum = Number(p.price) || 0;
          const mrpNum = Number(p.original_price || p.mrp || (priceNum ? Math.round(priceNum * 1.4) : 0));

          return {
            id: String(p.id),
            name: p.name || p.title || 'Product',
            brand: p.brand || 'Flash',
            category: cleanCat,
            subcategory: p.subcategory || 'General',
            price: priceNum,
            mrp: mrpNum,
            originalPrice: mrpNum,
            discount: p.discount || '-0%',
            stock: p.stock ?? 10,
            express: true,
            isExpress: true,
            isNew: true,
            image: primaryImg,
            primaryImage: primaryImg,
            hoverImage: hoverImg,
            gallery: Array.isArray(p.hover_images) && p.hover_images.length ? p.hover_images : [primaryImg, hoverImg],
            description: p.description || 'Verified authentic Flash product.',
            highlights: ['Authentic quality guarantee', 'Fast dispatch eligible'],
            colors: Array.isArray(p.colors) && p.colors.length > 0 ? p.colors.map((c: any) => typeof c === 'string' ? c : (c.hex || '#0F1115')) : ['#0F1115', '#CCFF00'],
            sku: p.sku || `FL-SB-${Math.floor(100 + Math.random() * 900)}`,
            rating: 4.8,
            reviewsCount: 18,
          };
        });

        // 3. Apply category filter
        const targetCategory = categoryParam.toLowerCase().trim().replace(/[\s&]+/g, '-');
        if (targetCategory === 'all' || !targetCategory) {
          setProducts(mappedProducts);
        } else {
          setProducts(mappedProducts.filter((item) => item.category === targetCategory));
        }
      }
    } catch (err) {
      console.error('Unexpected error loading shop catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryParam]);

  // Render products grid using ProductCard
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0D10] text-black dark:text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-black capitalize mb-6">
          Category: {categoryParam.replace(/-/g, ' ')} ({products.length} items)
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#CCFF00]"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
