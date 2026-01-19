"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Search,
  Plus,
  MoreVertical,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import mockData from "../../mockData.json";

// Types
type Service = (typeof mockData.services)[0];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [services, setServices] = useState<Service[]>(mockData.services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Derived Categories
  const categories = [
    "All",
    ...Array.from(new Set(mockData.services.map((s) => s.serviceType))),
  ];

  // Filter Logic
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || service.serviceType === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, services]);

  // Handlers
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingService) {
      // Edit Mode
      setServices((prev) =>
        prev.map((s) =>
          s._id === editingService._id
            ? {
                ...s,
                name: formData.get("name") as string,
                price: Number(formData.get("price")),
                duration: Number(formData.get("duration")),
                description: formData.get("description") as string,
                serviceType: formData.get("serviceType") as string,
              }
            : s,
        ),
      );
    } else {
      // Add Mode
      const newService: any = {
        _id: `svc${Date.now()}`,
        name: formData.get("name"),
        price: Number(formData.get("price")),
        duration: Number(formData.get("duration")),
        description: formData.get("description"),
        serviceType: formData.get("serviceType"),
        isActive: true,
        hasVariants: false,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setServices([newService, ...services]);
    }
    closeModal();
  };

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const toggleStatus = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isActive: !s.isActive } : s)),
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Services
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Manage treatments and pricing
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
          >
            <Plus size={18} />
            Add Service
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto pb-6 custom-scrollbar pr-2">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-lg dark:bg-slate-900 dark:border-slate-800 dark:hover:border-teal-500/30"
            >
              {/* Status Indicator */}
              <div
                className={`absolute top-5 right-5 h-2.5 w-2.5 rounded-full ${service.isActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"}`}
              />

              <div className="mb-4 h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-xl dark:bg-teal-900/20 dark:text-teal-400">
                {service.name.charAt(0)}
              </div>

              <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1 dark:text-white">
                {service.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2 min-h-[2.5em] dark:text-slate-400">
                {service.description}
              </p>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock size={16} />
                    <span>{service.duration} min</span>
                  </div>
                  <div className="font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded-lg dark:bg-slate-800 dark:text-white">
                    Rs. {service.price.toLocaleString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(service)}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium text-xs hover:bg-teal-50 hover:text-teal-600 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium text-xs hover:bg-red-50 hover:text-red-500 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
              <AlertCircle size={48} className="mb-4 opacity-20" />
              <p>No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <h3 className="text-xl font-bold dark:text-white">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Service Name
                </label>
                <input
                  name="name"
                  required
                  defaultValue={editingService?.name}
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="e.g. Deep Tissue Massage"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select
                  name="serviceType"
                  required
                  defaultValue={editingService?.serviceType || "massage"}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="massage">Massage</option>
                  <option value="beauty">Beauty</option>
                  <option value="yoga">Yoga</option>
                  <option value="ayurveda">Ayurveda</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Price (Rs)
                  </label>
                  <input
                    name="price"
                    required
                    defaultValue={editingService?.price}
                    type="number"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="5000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Duration (min)
                  </label>
                  <input
                    name="duration"
                    required
                    defaultValue={editingService?.duration}
                    type="number"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  defaultValue={editingService?.description}
                  rows={3}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Brief description of the service..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-200 dark:shadow-none"
                >
                  {editingService ? "Update" : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
