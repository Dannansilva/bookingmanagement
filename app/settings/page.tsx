"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Building2, Bell, Lock, Save, Mail, Smartphone } from "lucide-react";
import { brandingConfig } from "@/config";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    businessName: brandingConfig.company.name as string,
    email: "admin@luxesalon.com",
    phone: "+94 77 123 4567",
    address: "123, Galle Road, Colombo 03",
    currency: "LKR (Rs.)",
    timezone: "Asia/Colombo",
    notifyEmail: true,
    notifySms: true,
    notifyPromo: false,
  });

  const handleSave = () => {
    // Mock save
    alert("Settings saved successfully!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Business Name
                </label>
                <input
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Contact Email
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  type="tel"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Address
                </label>
                <input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                Regional Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option>LKR (Rs.)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option>Asia/Colombo</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/20 dark:text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Email Notifications
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Receive booking confirmations and daily reports via email.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifyEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notifyEmail: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg dark:bg-green-900/20 dark:text-green-400">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      SMS Notifications
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Send SMS reminders to clients automatically.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifySms}
                    onChange={(e) =>
                      setFormData({ ...formData, notifySms: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Security Settings
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg dark:bg-amber-900/20 dark:text-amber-400">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        Password
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Settings
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Manage application preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-teal-200 dark:shadow-none"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex flex-col gap-2">
            {[
              { id: "general", label: "General", icon: Building2 },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security", icon: Lock },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${
                  activeTab === item.id
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Tab Panel */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-y-auto custom-scrollbar dark:bg-slate-900 dark:border-slate-800">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
