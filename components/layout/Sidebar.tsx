"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { brandingConfig } from "@/config";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Users,
  Scissors,
  UserCircle, // Staff
  Package,
  Gift,
  BarChart3,
  Settings,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  count?: number; // For notification badges
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    count: 3,
    icon: <Calendar size={20} />,
  },
  {
    label: "Point of Sale",
    href: "/pos",
    icon: <CreditCard size={20} />,
  },
  {
    label: "Clients",
    href: "/clients",
    icon: <Users size={20} />,
  },
  {
    label: "Services",
    href: "/services",
    icon: <Scissors size={20} />,
  },
  {
    label: "Staff",
    href: "/staff",
    icon: <UserCircle size={20} />,
  },
  {
    label: "Inventory",
    href: "/inventory",
    count: 5,
    icon: <Package size={20} />,
  },
  {
    label: "Gift Cards",
    href: "/gift-cards",
    icon: <Gift size={20} />,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <BarChart3 size={20} />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings size={20} />,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between px-4">
        <div
          className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "w-10" : "w-full"}`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 text-white dark:bg-green-500">
            {/* Simple Logo Placeholder if image fails */}
            <Scissors size={20} />
          </div>
          <div
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <p className="font-bold text-slate-900 text-lg dark:text-white">
              {brandingConfig.company.name}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar - Only show when expanded */}
      <div className={`px-4 mb-4 mt-2 ${isCollapsed ? "hidden" : "block"}`}>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
          />
          <div className="absolute right-3 top-2.5 rounded bg-slate-200 px-1.5 text-[10px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-400">
            ⌘K
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-600 text-white shadow-md shadow-green-200 dark:bg-green-500 dark:shadow-none"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{item.icon}</span>
                    <span
                      className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                        isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {/* Badge */}
                  {!isCollapsed && item.count && (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${isActive ? "bg-white text-green-600" : "bg-red-500 text-white"}`}
                    >
                      {item.count}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white shadow-lg group-hover:block z-50 dark:bg-slate-700">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / User Profile */}
      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-9 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-green-600 hidden lg:flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-green-400"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Bottom Actions */}
        <div
          className={`flex items-center justify-between mb-4 px-1 ${isCollapsed ? "flex-col gap-4" : ""}`}
        >
          <button
            onClick={toggleTheme}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-slate-500 hover:text-slate-900 relative dark:text-slate-400 dark:hover:text-white">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* User Info */}
        <div
          className={`flex items-center gap-3 rounded-xl bg-slate-50 p-2 dark:bg-slate-800 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs dark:bg-green-500/10 dark:text-green-400">
            AD
          </div>
          <div
            className={`overflow-hidden ${isCollapsed ? "hidden" : "block"}`}
          >
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Admin User
            </p>
            <p className="text-[10px] text-slate-500 truncate w-32 dark:text-slate-400">
              admin@luxesalon.com
            </p>
          </div>
          <button
            onClick={handleLogout}
            className={`ml-auto text-slate-400 hover:text-slate-900 dark:hover:text-white ${isCollapsed ? "hidden" : "block"}`}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
