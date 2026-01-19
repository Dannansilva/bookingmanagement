"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  Wallet,
  Star,
  X,
  User,
  Clock,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import mockData from "../../mockData.json";

// Types
type Client = (typeof mockData.clients)[0];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL"); // ALL, VIP, REGULAR
  const [clients, setClients] = useState<Client[]>(mockData.clients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Filter Logic
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery);
      const matchesType = filterType === "ALL" || client.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType, clients]);

  // Handlers
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((c) => c._id !== id));
      if (selectedClient?._id === id) setSelectedClient(null);
    }
  };

  const handleSaveClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClient: any = {
      _id: `client${Date.now()}`,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: "REGULAR",
      wallet: 0,
      referralSource: "WALK_IN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setClients([newClient, ...clients]);
    setIsAddModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-[calc(100vh-100px)] overflow-hidden">
        {/* Main List Area */}
        <div
          className={`flex-1 flex flex-col ${selectedClient ? "hidden lg:flex" : "flex"}`}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Clients
              </h1>
              <p className="text-slate-500 text-sm dark:text-slate-400">
                Manage your customer base
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
            >
              <Plus size={18} />
              Add Client
            </button>
          </div>

          {/* Filters & Search */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-3 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            >
              <option value="ALL">All Clients</option>
              <option value="VIP">VIP</option>
              <option value="REGULAR">Regular</option>
            </select>
          </div>

          {/* Client List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium dark:bg-slate-800 dark:text-slate-400 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">Client Name</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Contact</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 hidden md:table-cell">Wallet</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredClients.map((client) => (
                  <tr
                    key={client._id}
                    onClick={() => setSelectedClient(client)}
                    className={`group cursor-pointer hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50 ${selectedClient?._id === client._id ? "bg-slate-50 dark:bg-slate-800" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold dark:bg-teal-900/30 dark:text-teal-400">
                          {client.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {client.fullName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">
                            {client.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Phone size={14} />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
                          <Mail size={14} />
                          <span>{client.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          client.type === "VIP"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {client.type === "VIP" && (
                          <Star size={12} fill="currentColor" />
                        )}
                        {client.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-mono text-slate-600 dark:text-slate-400">
                        Rs. {client.wallet.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight
                        size={20}
                        className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide-over Profile Panel */}
        {selectedClient && (
          <div className="w-full lg:w-[400px] border-l border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 flex flex-col h-full animate-in slide-in-from-right duration-300 absolute inset-y-0 right-0 z-20 shadow-2xl lg:relative lg:shadow-none lg:translate-x-0">
            {/* Profile Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-2xl border-4 border-white shadow-sm dark:bg-teal-900/50 dark:text-teal-400 dark:border-slate-800">
                  {selectedClient.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedClient.fullName}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                      selectedClient.type === "VIP"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {selectedClient.type} member
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-2 border-b border-slate-100 dark:border-slate-800">
              <div className="p-4 border-r border-slate-100 text-center dark:border-slate-800">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider dark:text-slate-400">
                  Wallet
                </p>
                <p className="text-xl font-bold text-teal-600 mt-1 dark:text-teal-400">
                  Rs. {selectedClient.wallet.toLocaleString()}
                </p>
              </div>
              <div className="p-4 text-center">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider dark:text-slate-400">
                  Total Visits
                </p>
                <p className="text-xl font-bold text-slate-900 mt-1 dark:text-white">
                  12
                </p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider dark:text-white">
                  Contact Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Phone
                      size={18}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <span>{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Mail
                      size={18}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <span>{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Calendar
                      size={18}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <span>
                      Member since{" "}
                      {new Date(selectedClient.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* VIP Details (if applicable) */}
              {selectedClient.vipSubscription && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 dark:from-amber-900/10 dark:to-orange-900/10 dark:border-amber-900/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold dark:text-amber-400">
                      <Star size={18} fill="currentColor" />
                      <span>
                        {selectedClient.vipSubscription.package.packageName}
                      </span>
                    </div>
                    <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded text-amber-700 dark:bg-black/20 dark:text-amber-400">
                      {
                        selectedClient.vipSubscription.package
                          .discountPercentage
                      }
                      % OFF
                    </span>
                  </div>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
                    Expires on{" "}
                    {new Date(
                      selectedClient.vipSubscription.expiryDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Past Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider dark:text-white">
                  Recent Activity
                </h3>
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start p-3 bg-slate-50 rounded-xl dark:bg-slate-800/50"
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Completed Appointment
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Swedish Massage • 60 min
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 dark:text-slate-500">
                        2 days ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full flex items-center justify-center gap-2 border border-slate-200 p-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  <Edit size={16} />
                  Edit Profile
                </button>
                <button
                  onClick={() => handleDelete(selectedClient._id)}
                  className="w-full flex items-center justify-center gap-2 border border-red-100 text-red-600 p-2 rounded-lg hover:bg-red-50 font-medium transition-colors dark:border-red-900/30 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={16} />
                  Delete Client
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <h3 className="text-xl font-bold dark:text-white">
                Add New Client
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveClient} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  name="fullName"
                  required
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Phone
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="+94..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-200 dark:shadow-none"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
