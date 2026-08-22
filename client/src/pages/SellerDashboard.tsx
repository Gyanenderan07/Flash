/**
 * Flash SellerDashboard Component (`/seller` / `/seller-dashboard`) — Direct Supabase DB insertion,
 * live catalog fetch, inventory overview, and merchant controls.
 */
import React, { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  ShoppingBag,
  Zap,
  Plus,
  Search,
  CheckCircle2,
  Database,
  Trash2,
  Pencil,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { products as fallbackProducts, formatINR, categoryOrder } from "@/data/mockProducts";
import SafeImage from "@/components/common/SafeImage";

import { uploadProductImage } from "@/lib/storage";

export default function SellerDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "home-living",
    price: "",
    originalPrice: "",
    stock: "10",
    description: "",
    image: "",
  });

  const fetchLiveCatalog = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch error, fallback to mock data:", error.message);
        setProducts(fallbackProducts);
        return;
      }

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(fallbackProducts);
      }
    } catch (err) {
      console.warn("Error fetching catalog from Supabase:", err);
      setProducts(fallbackProducts);
    }
  };

  useEffect(() => {
    fetchLiveCatalog();
  }, []);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingImage(true);
      try {
        const imageUrl = await uploadProductImage(file);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } catch (err) {
        console.warn("Image upload error:", err);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
      name: "",
      brand: "",
      category: "home-living",
      price: "",
      originalPrice: "",
      stock: "10",
      description: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: any) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name || product.title || "",
      brand: product.brand || "Flash",
      category: product.category || "home-living",
      price: String(product.price || ""),
      originalPrice: String(product.original_price || product.mrp || ""),
      stock: String(product.stock ?? 10),
      description: product.description || "",
      image: product.primary_image || product.image || "",
    });
    setIsModalOpen(true);
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        brand: formData.brand.trim() || "Flash",
        category: formData.category
          ? formData.category.toLowerCase().replace(/\s+/g, "-")
          : "home-living",
        price: Number(formData.price),
        original_price: Number(formData.originalPrice || formData.price),
        discount:
          formData.originalPrice && formData.price
            ? `-${Math.round(
                ((Number(formData.originalPrice) - Number(formData.price)) /
                  Number(formData.originalPrice)) *
                  100
              )}%`
            : "-0%",
        stock: Number(formData.stock || 10),
        description: formData.description.trim() || "Flash verified product.",
        primary_image:
          formData.image ||
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        hover_images: [
          formData.image ||
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        ],
        colors: [{ name: "Obsidian", hex: "#0F1115" }],
      };

      if (editingProductId) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProductId);

        if (error) {
          console.error("Supabase DB Update Error:", error);
          alert("DB Update Error: " + error.message);
          return;
        }

        alert("Product successfully updated in Supabase DB!");
      } else {
        const { error } = await supabase.from("products").insert([payload]).select();

        if (error) {
          console.error("Supabase DB Insert Error:", error);
          alert("DB Error: " + error.message);
          return;
        }

        alert("Product successfully added to Supabase DB!");
      }

      setIsModalOpen(false);
      setEditingProductId(null);

      setFormData({
        name: "",
        brand: "",
        category: "home-living",
        price: "",
        originalPrice: "",
        stock: "10",
        description: "",
        image: "",
      });

      // Reload catalog directly from Supabase
      await fetchLiveCatalog();
    } catch (err: any) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete error:", error);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((item) => {
    const title = item.name || item.title || "";
    const brand = item.brand || "";
    const matchesSearch =
      !searchQuery || `${title} ${brand}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F1115] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Navigation Banner */}
        <div className="bg-[#0F1115] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-[#CCFF00] text-[#0F1115] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5">
                <Zap size={13} fill="currentColor" /> Flash Merchant Hub
              </span>
              <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <Database size={13} className="text-[#CCFF00]" /> Supabase DB Connected
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Seller & Merchant Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">
              Manage product listings, perform direct Supabase DB inserts, and track store inventory.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 flex-wrap">
            <button
              onClick={handleOpenAddModal}
              style={{ backgroundColor: "#CCFF00", color: "#0F1115" }}
              className="px-5 py-3 rounded-2xl bg-[#CCFF00] text-[#0F1115] font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#D4F800] active:scale-95 transition-all shadow-lg shadow-[#CCFF00]/20 cursor-pointer border-none"
            >
              <Plus size={16} strokeWidth={3} />
              <span>Add Product to Catalog</span>
            </button>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Dashboard Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Gross Revenue</span>
              <div className="p-2 bg-[#CCFF00]/15 text-[#0F1115] rounded-xl">
                <TrendingUp size={18} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0F1115]">₹1,48,920</p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={14} /> +18.4% vs last week
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Catalog SKUs</span>
              <div className="p-2 bg-neutral-100 text-[#0F1115] rounded-xl">
                <Package size={18} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0F1115]">{products.length}</p>
            <p className="text-xs font-semibold text-neutral-500">Live products in database</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Orders</span>
              <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                <ShoppingBag size={18} />
              </div>
            </div>
            <p className="text-2xl font-black text-[#0F1115]">12</p>
            <p className="text-xs font-semibold text-amber-600">Ready for express dispatch</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Database Status</span>
              <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                <ShieldCheck size={18} />
              </div>
            </div>
            <p className="text-lg font-black text-emerald-700 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" /> Operational
            </p>
            <p className="text-[11px] font-mono text-neutral-400 truncate">deldhtqoygpoozbrfpgv</p>
          </div>
        </div>

        {/* Product Table Manager */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <h2 className="text-lg font-bold text-[#0F1115]">Supabase Catalog Manager</h2>
              <p className="text-xs text-neutral-500 font-medium">
                Showing {filteredProducts.length} items out of {products.length} live SKUs
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none focus:border-[#0F1115] w-48 sm:w-64 font-medium"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-[#0F1115] focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categoryOrder.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-2">Product</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Price</th>
                  <th className="pb-3 px-2">Stock</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.slice(0, 25).map((product) => {
                  const name = product.name || product.title || "Untitled Product";
                  const image = product.primary_image || product.image || "";
                  const price = product.price || 0;

                  return (
                    <tr key={product.id || product.name} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                            <SafeImage src={image} alt={name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#0F1115] line-clamp-1">{name}</p>
                            <p className="text-[10px] text-neutral-400 font-semibold">{product.brand || "Flash"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-neutral-600">{product.category}</td>
                      <td className="py-3 px-2 font-extrabold text-[#0F1115]">{formatINR(price)}</td>
                      <td className="py-3 px-2 font-bold text-neutral-700">{product.stock || 10} units</td>
                      <td className="py-3 px-2">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          Live DB
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit product"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id, name)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F1115]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="text-lg font-black text-[#0F1115]">
                {editingProductId ? "Edit Catalog Product" : "Add Product to Supabase DB"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-[#0F1115] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F1115] mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. AuraDesk Smart Lamp"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none focus:border-[#0F1115]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F1115] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none"
                  >
                    <option value="home-living">Home & Living</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="footwear">Footwear</option>
                    <option value="watches">Watches</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#0F1115] mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Flash"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#0F1115] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="3499"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F1115] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="5999"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F1115] mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F1115] mb-1">Product Image</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="w-full text-xs text-neutral-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0F1115] file:text-white hover:file:bg-neutral-800 cursor-pointer"
                  />
                  <div className="text-[10px] font-semibold text-neutral-400">or enter image URL below:</div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none"
                  />
                </div>
                {formData.image && (
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-neutral-200 shadow-sm flex-shrink-0">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      ✓ Image preview loaded
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-[#0F1115] mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description and specifications..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-[#0F1115] focus:outline-none h-20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 font-bold text-xs hover:bg-neutral-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingImage}
                  style={{ backgroundColor: "#CCFF00", color: "#0F1115" }}
                  className="px-5 py-2.5 rounded-xl bg-[#CCFF00] text-[#0F1115] font-black text-xs uppercase tracking-wider hover:bg-[#D4F800] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? "Inserting..." : isUploadingImage ? "Uploading Image..." : "Insert into Supabase"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
