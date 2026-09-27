"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Search,
  Filter,
  Sparkles,
  Save,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface ProductsViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface ProductItem {
  id: string;
  name: string;
  craft: string;
  price: number;
  priceFormatted: string;
  status: "Active" | "Draft" | "Out of Stock";
  imageUrl: string;
  stock: number;
  salesCount: number;
  description?: string;
}

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    name: "Handcrafted Terracotta Earthen Pot",
    craft: "Clay Craft",
    price: 850,
    priceFormatted: "₹850",
    status: "Active",
    imageUrl: "/images/terracotta-craft.jpg",
    stock: 24,
    salesCount: 18,
    description: "Naturally porous river clay pot turned on traditional potter's wheel with traditional floral relief.",
  },
  {
    id: "prod-2",
    name: "Master Wood-Carved Floral Keepsake Vase",
    craft: "Wood Carving",
    price: 1200,
    priceFormatted: "₹1,200",
    status: "Active",
    imageUrl: "/images/wood-handicraft.jpg",
    stock: 15,
    salesCount: 9,
    description: "Hand-chiseled seasoned teakwood with beeswax organic polish and traditional jaali motifs.",
  },
  {
    id: "prod-3",
    name: "Organic Handwoven Artisan Tote Bag",
    craft: "Handloom",
    price: 950,
    priceFormatted: "₹950",
    status: "Draft",
    imageUrl: "/images/craft-weaving.jpg",
    stock: 10,
    salesCount: 0,
    description: "Pit-loom woven organic unbleached cotton with hand-spun yarn and natural indigo border.",
  },
  {
    id: "prod-4",
    name: "Dhokra Lost-Wax Bell Metal Figurine",
    craft: "Brass & Metal",
    price: 1650,
    priceFormatted: "₹1,650",
    status: "Active",
    imageUrl: "/images/craft-brass.jpg",
    stock: 8,
    salesCount: 12,
    description: "4000-year-old ancient lost-wax brass casting technique depicting tribal village music celebration.",
  },
];

export default function ProductsView({
  onBackToDashboard,
  onNavigateTab,
}: ProductsViewProps) {
  // Products List
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);

  // Load custom/saved products from AI Product Assistant
  useEffect(() => {
    try {
      const customStr = localStorage.getItem("shilpmitra_custom_products");
      if (customStr) {
        const parsed = JSON.parse(customStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = parsed.filter((p: ProductItem) => !existingIds.has(p.id));
            return [...newItems, ...prev];
          });
        }
      } else {
        const lastCreatedStr = localStorage.getItem("shilpmitra_last_created_product");
        if (lastCreatedStr) {
          const lastCreated = JSON.parse(lastCreatedStr);
          if (lastCreated && lastCreated.id) {
            setProducts((prev) => {
              if (prev.some((p) => p.id === lastCreated.id)) return prev;
              return [lastCreated, ...prev];
            });
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals state
  const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New product form fields
  const [newProductName, setNewProductName] = useState("");
  const [newProductCraft, setNewProductCraft] = useState("Terracotta & Clay");
  const [newProductPrice, setNewProductPrice] = useState(750);
  const [newProductStock, setNewProductStock] = useState(15);
  const [newProductDesc, setNewProductDesc] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Delete product action
  const handleDelete = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`"${name}" removed from catalog.`);
  };

  // Save edited product
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...editingProduct,
              priceFormatted: `₹${editingProduct.price}`,
            }
          : p
      )
    );
    showToast(`Updated "${editingProduct.name}" successfully.`);
    setEditingProduct(null);
  };

  // Add new product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: ProductItem = {
      id: "prod-" + Date.now(),
      name: newProductName.trim(),
      craft: newProductCraft,
      price: newProductPrice,
      priceFormatted: `₹${newProductPrice}`,
      status: "Active",
      imageUrl: "/images/pot-after.jpg",
      stock: newProductStock,
      salesCount: 0,
      description: newProductDesc || "Handcrafted with natural materials and fair living wages.",
    };

    setProducts((prev) => [newProd, ...prev]);
    showToast(`"${newProd.name}" added to catalog.`);
    setIsAddingNew(false);
    setNewProductName("");
    setNewProductDesc("");
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.craft.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              MY WORKSPACE • CATALOG MANAGEMENT
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              {products.length} Products
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            My Craft Products
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Manage your workshop catalog, track available stock units, and review marketplace availability.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2.5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs shadow-warm-md hover:shadow-warm-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-2.5 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-700 bg-white border border-warm-border rounded-xl hover:bg-shilp-cream-50 transition-colors"
            >
              ← Overview
            </button>
          )}
        </div>
      </div>

      {/* 2. Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by craft or name..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-warm-border bg-[#FFFEFC] focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 text-shilp-charcoal-900"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-shilp-cream-100 rounded-xl border border-warm-border self-start sm:self-auto text-xs">
          {["all", "active", "draft"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition-colors ${
                statusFilter === tab
                  ? "bg-white text-shilp-charcoal-900 shadow-xs"
                  : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
              }`}
            >
              {tab === "all" ? "All Products" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Products Table (Desktop) & Cards (Mobile) */}
      <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl overflow-hidden shadow-warm-xs">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF6EE] text-shilp-charcoal-500 font-semibold border-b border-warm-border uppercase text-[11px] tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Product
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Craft Category
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Price
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Stock Units
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/60">
              {filteredProducts.map((p) => {
                const isActive = p.status === "Active";

                return (
                  <tr key={p.id} className="hover:bg-shilp-cream-100/50 transition-colors">
                    {/* Name + Thumb */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-warm-border shrink-0 relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-serif font-bold text-shilp-charcoal-900 block">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            {p.salesCount} sold • Fair trade
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Craft */}
                    <td className="px-5 py-4 font-medium text-stone-700">{p.craft}</td>

                    {/* Price */}
                    <td className="px-5 py-4 font-bold text-shilp-orange-600">
                      {p.priceFormatted}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4 text-stone-700">{p.stock} units</td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          isActive
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        <span>{p.status}</span>
                      </span>
                    </td>

                    {/* Actions: View, Edit, Delete */}
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setViewingProduct(p)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-shilp-orange-600 hover:bg-shilp-orange-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden divide-y divide-warm-border">
          {filteredProducts.map((p) => (
            <div key={p.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-warm-border shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-sm text-shilp-charcoal-900 block truncate">
                    {p.name}
                  </span>
                  <span className="text-xs text-stone-500 block">{p.craft}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-shilp-orange-600 text-sm">
                      {p.priceFormatted}
                    </span>
                    <span className="text-[11px] text-stone-500">Stock: {p.stock}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-warm-border/50">
                <button
                  type="button"
                  onClick={() => setViewingProduct(p)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(p)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.name)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. VIEW PRODUCT MODAL */}
      {viewingProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#FFFEFC] rounded-3xl max-w-lg w-full border border-warm-border shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-warm-border bg-[#FDFBF7]">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-sm font-bold text-shilp-charcoal-900">
                  Product Details
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewingProduct(null)}
                className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 border border-warm-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewingProduct.imageUrl}
                  alt={viewingProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wide">
                  {viewingProduct.craft}
                </span>
                <h3 className="font-serif text-lg font-bold text-shilp-charcoal-900 mt-0.5">
                  {viewingProduct.name}
                </h3>
                <span className="font-sans text-xl font-bold text-shilp-orange-600 mt-1 block">
                  {viewingProduct.priceFormatted}
                </span>
              </div>

              <p className="text-xs text-shilp-charcoal-700 leading-relaxed">
                {viewingProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-shilp-cream-50 border border-warm-border">
                  <span className="text-[10px] text-stone-500 font-semibold block">STOCK UNITS</span>
                  <span className="text-sm font-bold text-stone-900">{viewingProduct.stock} available</span>
                </div>
                <div className="p-3 rounded-xl bg-shilp-cream-50 border border-warm-border">
                  <span className="text-[10px] text-stone-500 font-semibold block">TOTAL SALES</span>
                  <span className="text-sm font-bold text-stone-900">{viewingProduct.salesCount} sold</span>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-warm-border">
                <button
                  type="button"
                  onClick={() => setViewingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-shilp-orange-500 text-white text-xs font-semibold shadow-warm-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#FFFEFC] rounded-3xl max-w-md w-full border border-warm-border shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-warm-border bg-[#FDFBF7]">
              <div className="flex items-center gap-2">
                <Edit className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-sm font-bold text-shilp-charcoal-900">
                  Edit Product
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
                <select
                  value={editingProduct.status}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      status: e.target.value as ProductItem["status"],
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-warm-border">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl border border-warm-border text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-warm-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ADD NEW PRODUCT MODAL */}
      {isAddingNew && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#FFFEFC] rounded-3xl max-w-md w-full border border-warm-border shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-warm-border bg-[#FDFBF7]">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-sm font-bold text-shilp-charcoal-900">
                  Add Handcrafted Product
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Blue Terracotta Vase"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Craft Category
                </label>
                <select
                  value={newProductCraft}
                  onChange={(e) => setNewProductCraft(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                >
                  <option value="Terracotta & Clay">Terracotta & Clay</option>
                  <option value="Handloom Weaving">Handloom Weaving</option>
                  <option value="Wood Carving">Wood Carving</option>
                  <option value="Brass & Metal">Brass & Metal</option>
                  <option value="Blue Pottery">Blue Pottery</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    min={10}
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Stock</label>
                  <input
                    type="number"
                    min={1}
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Artisan Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell buyers about the handiwork..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-warm-border">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl border border-warm-border text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-warm-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
