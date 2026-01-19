"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Search,
  Plus,
  Gift,
  Copy,
  CheckCircle2,
  X,
  CreditCard,
  Clock,
} from "lucide-react";

// Mock Data
interface GiftCard {
  id: string;
  code: string;
  initialAmount: number;
  currentBalance: number;
  recipientName: string;
  recipientEmail: string;
  status: "ACTIVE" | "REDEEMED" | "EXPIRED";
  issuedDate: string;
  expiryDate: string;
}

const mockGiftCards: GiftCard[] = [
  {
    id: "gc1",
    code: "GFT-2024-XJY9",
    initialAmount: 5000,
    currentBalance: 5000,
    recipientName: "Alice Wonderland",
    recipientEmail: "alice@example.com",
    status: "ACTIVE",
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
  },
  {
    id: "gc2",
    code: "GFT-2023-ABC1",
    initialAmount: 10000,
    currentBalance: 0,
    recipientName: "Bob Builder",
    recipientEmail: "bob@example.com",
    status: "REDEEMED",
    issuedDate: "2023-11-20",
    expiryDate: "2024-11-20",
  },
  {
    id: "gc3",
    code: "GFT-2024-KLM5",
    initialAmount: 7500,
    currentBalance: 2500,
    recipientName: "Charlie Brown",
    recipientEmail: "charlie@example.com",
    status: "ACTIVE",
    issuedDate: "2024-01-05",
    expiryDate: "2025-01-05",
  },
];

export default function GiftCardsPage() {
  const [cards, setCards] = useState<GiftCard[]>(mockGiftCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // Handlers
  const filteredCards = useMemo(() => {
    return cards.filter(
      (card) =>
        card.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.recipientName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [cards, searchQuery]);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "GFT-" + new Date().getFullYear() + "-";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(result);
  };

  const handleIssueCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get("amount"));

    const newCard: GiftCard = {
      id: `gc${Date.now()}`,
      code: generatedCode || `GFT-${Date.now()}`,
      initialAmount: amount,
      currentBalance: amount,
      recipientName: formData.get("recipientName") as string,
      recipientEmail: formData.get("recipientEmail") as string,
      status: "ACTIVE",
      issuedDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
    };

    setCards([newCard, ...cards]);
    setIsModalOpen(false);
    setGeneratedCode("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Gift Cards
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Manage and issue digital gift cards
            </p>
          </div>
          <button
            onClick={() => {
              generateCode();
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
          >
            <Plus size={18} />
            Issue Gift Card
          </button>
        </div>

        {/* Stats Row (Optional, putting filters here instead) */}
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm sm:w-min dark:bg-slate-900 dark:border-slate-800">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search code or recipient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6 custom-scrollbar">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-teal-50 dark:bg-teal-900/10" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/10" />

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-200 dark:shadow-none">
                    <Gift size={24} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      card.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30"
                        : card.status === "REDEEMED"
                          ? "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
                          : "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Card Value
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                      Rs. {card.currentBalance.toLocaleString()}
                    </h3>
                    {card.currentBalance !== card.initialAmount && (
                      <span className="text-sm text-slate-400 line-through">
                        Rs. {card.initialAmount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100 mb-6 dark:bg-slate-800/50 dark:border-slate-800">
                  <code className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200 tracking-wider">
                    {card.code}
                  </code>
                  <button
                    onClick={() => copyToClipboard(card.code)}
                    className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-colors shadow-sm dark:hover:bg-slate-700 dark:hover:text-white"
                    title="Copy Code"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Recipient
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {card.recipientName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Expires
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {card.expiryDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-900">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <h3 className="text-xl font-bold dark:text-white">
                Issue Gift Card
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleIssueCard} className="p-6 space-y-4">
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 text-center dark:bg-teal-900/10 dark:border-teal-900/30">
                <p className="text-xs text-teal-600 uppercase font-bold tracking-wider mb-1 dark:text-teal-400">
                  Generated Code
                </p>
                <p className="text-2xl font-mono font-bold text-teal-800 dark:text-teal-300 tracking-widest">
                  {generatedCode}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Amount (Rs)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500 dark:text-slate-400">
                    Rs.
                  </span>
                  <input
                    name="amount"
                    required
                    type="number"
                    className="w-full p-2 pl-10 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Recipient Name
                </label>
                <input
                  name="recipientName"
                  required
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Recipient Email
                </label>
                <input
                  name="recipientEmail"
                  required
                  type="email"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="jane@example.com"
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
                  Issue Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
