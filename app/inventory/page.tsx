"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  History,
  MoreVertical,
  Filter,
  CheckCircle2,
  X,
  Edit,
  Trash2,
} from "lucide-react";

// Local Mock Data for Inventory
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minLevel: number;
  unit: string;
  price: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  lastRestocked: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: "inv1",
    name: "Lavender Essential Oil",
    category: "Oils",
    sku: "OIL-LAV-001",
    quantity: 15,
    minLevel: 10,
    unit: "Bottles",
    price: 2500,
    status: "IN_STOCK",
    lastRestocked: "2024-01-10",
  },
  {
    id: "inv2",
    name: "Massage Cream Base",
    category: "Creams",
    sku: "CRM-BAS-005",
    quantity: 3,
    minLevel: 5,
    unit: "Jars",
    price: 4500,
    status: "LOW_STOCK",
    lastRestocked: "2023-12-20",
  },
  {
    id: "inv3",
    name: "Disposable Towels",
    category: "Consumables",
    sku: "TWL-DIS-100",
    quantity: 0,
    minLevel: 50,
    unit: "Packs",
    price: 1200,
    status: "OUT_OF_STOCK",
    lastRestocked: "2023-12-01",
  },
  {
    id: "inv4",
    name: "Jasmine Incense Sticks",
    category: "Aromatherapy",
    sku: "INC-JAS-020",
    quantity: 45,
    minLevel: 20,
    unit: "Boxes",
    price: 350,
    status: "IN_STOCK",
    lastRestocked: "2024-01-15",
  },
];

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived State
  const lowStockCount = items.filter(
    (i) => i.status === "LOW_STOCK" || i.status === "OUT_OF_STOCK",
  ).length;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "ALL" ||
        (filterStatus === "LOW" &&
          (item.status === "LOW_STOCK" || item.status === "OUT_OF_STOCK")) ||
        item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, filterStatus]);

  // Handlers
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const calculateStatus = (
    qty: number,
    min: number,
  ): InventoryItem["status"] => {
    if (qty <= 0) return "OUT_OF_STOCK";
    if (qty <= min) return "LOW_STOCK";
    return "IN_STOCK";
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const qty = Number(formData.get("quantity"));
    const min = Number(formData.get("minLevel"));

    const newItem: InventoryItem = {
      id: `inv${Date.now()}`,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      sku: formData.get("sku") as string,
      quantity: qty,
      minLevel: min,
      unit: formData.get("unit") as string,
      price: Number(formData.get("price")),
      status: calculateStatus(qty, min),
      lastRestocked: new Date().toISOString().split("T")[0],
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Inventory
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Track stock levels and supplies
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lowStockCount > 0 && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 animate-pulse">
                <AlertTriangle size={16} />
                <span>{lowStockCount} items low/out of stock</span>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between dark:bg-slate-900 dark:border-slate-800">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {["ALL", "IN_STOCK", "LOW"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterStatus === status
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {status === "LOW" ? "Low Stock" : status.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col dark:bg-slate-900 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Last Restock</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors group dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
                          <Package size={20} />
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs dark:text-slate-400">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <span className="bg-slate-50 px-2 py-1 rounded text-xs border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 w-24 bg-slate-100 rounded-full h-2 overflow-hidden dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              item.status === "OUT_OF_STOCK"
                                ? "bg-red-500"
                                : item.status === "LOW_STOCK"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${Math.min(100, (item.quantity / 50) * 100)}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            item.status === "OUT_OF_STOCK"
                              ? "text-red-500"
                              : item.status === "LOW_STOCK"
                                ? "text-amber-500"
                                : "text-emerald-600"
                          }`}
                        >
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      Rs. {item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs dark:text-slate-400">
                      {item.lastRestocked}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <h3 className="text-xl font-bold dark:text-white">
                Add New Product
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Product Name
                </label>
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    SKU
                  </label>
                  <input
                    name="sku"
                    required
                    type="text"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <input
                    name="category"
                    required
                    type="text"
                    list="categories"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <datalist id="categories">
                    <option value="Oils" />
                    <option value="Creams" />
                    <option value="Consumables" />
                    <option value="Merchandise" />
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Quantity
                  </label>
                  <div className="flex gap-2">
                    <input
                      name="quantity"
                      required
                      type="number"
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="0"
                    />
                    <input
                      name="unit"
                      required
                      type="text"
                      className="w-20 p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="Unit"
                      defaultValue="pcs"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Min Level
                  </label>
                  <input
                    name="minLevel"
                    required
                    type="number"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    defaultValue={10}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Unit Price
                </label>
                <input
                  name="price"
                  required
                  type="number"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-200 dark:shadow-none"
                >
                  Add to Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
