"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  User,
  X,
  CheckCircle2,
  Filter,
} from "lucide-react";
import mockData from "../../mockData.json";

// Types derived from mockData structure
type Service = (typeof mockData.services)[0];
type Client = (typeof mockData.clients)[0];

interface CartItem extends Service {
  cartId: string;
  quantity: number;
}

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter services based on search and category
  const services = useMemo(() => {
    return mockData.services.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || service.serviceType === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // key categories from data
  const categories = [
    "All",
    ...Array.from(new Set(mockData.services.map((s) => s.serviceType))),
  ];

  // Cart Actions
  const addToCart = (service: Service) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === service._id);
      if (existing) {
        return prev.map((item) =>
          item._id === service._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        { ...service, cartId: crypto.randomUUID(), quantity: 1 },
      ];
    });
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.0; // Assuming tax included or 0 for now
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setShowSuccess(true);
      setCart([]);
      setSelectedClient(null);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const filteredClients = mockData.clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      c.phone.includes(clientSearchQuery),
  );

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-100px)] gap-6">
        {/* Left Side - Service Catalog */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Point of Sale
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Manage orders and process payments
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-lg bg-transparent py-2 pl-9 pr-4 text-sm outline-none placeholder:text-slate-400 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Service Grid */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => addToCart(service)}
                  className="group flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                    <span className="font-bold text-lg">
                      {service.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 line-clamp-1 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 dark:text-slate-400">
                    {service.description}
                  </p>
                  <div className="mt-4 flex w-full items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Rs. {service.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {service.duration} min
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Cart */}
        <div className="w-96 flex flex-col rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          {/* Cart Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Current Order
              </h2>
              <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-full text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {cart.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>

            {/* Client Selector Trigger */}
            <button
              onClick={() => setIsClientModalOpen(true)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedClient ? selectedClient.fullName : "Select Client"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedClient
                      ? selectedClient.phone
                      : "Add customer to order"}
                  </p>
                </div>
              </div>
              <Plus size={16} className="text-slate-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <ShoppingCart size={48} className="opacity-20" />
                <p>Cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm text-slate-900 line-clamp-1 dark:text-white">
                      {item.name}
                    </h4>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Rs. {item.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-3 bg-white rounded-lg p-1 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.cartId, -1)
                            : removeFromCart(item.cartId)
                        }
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 size={14} />
                        ) : (
                          <Minus size={14} />
                        )}
                      </button>
                      <span className="text-xs font-bold w-4 text-center dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="p-1 hover:text-teal-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 dark:bg-slate-800/50 dark:border-slate-800">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Tax</span>
                <span>Rs. {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200 dark:text-white dark:border-slate-700">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || isCheckingOut}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:shadow-none dark:bg-teal-600 dark:hover:bg-teal-500"
            >
              {isCheckingOut ? (
                "Processing..."
              ) : (
                <>
                  <CreditCard size={20} />
                  Charge Rs. {total.toLocaleString()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Client Selection Modal */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <h3 className="font-bold text-lg dark:text-white">
                Select Client
              </h3>
              <button
                onClick={() => setIsClientModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                {filteredClients.map((client) => (
                  <button
                    key={client._id}
                    onClick={() => {
                      setSelectedClient(client);
                      setIsClientModalOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left dark:hover:bg-slate-800"
                  >
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold dark:bg-teal-900/50 dark:text-teal-400">
                      {client.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {client.fullName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {client.phone}
                      </p>
                    </div>
                    {selectedClient?._id === client._id && (
                      <CheckCircle2
                        size={16}
                        className="ml-auto text-teal-600"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={20} />
          <span className="font-bold">Payment Processed Successfully!</span>
        </div>
      )}
    </DashboardLayout>
  );
}
