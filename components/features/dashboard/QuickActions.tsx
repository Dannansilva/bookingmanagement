"use client";

import { CalendarPlus, UserPlus, ShoppingBag, Receipt } from "lucide-react";

export function QuickActions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm h-full dark:bg-slate-900 dark:border dark:border-slate-800">
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="col-span-1 flex flex-col items-center justify-center gap-2 rounded-xl bg-green-600 p-4 text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/20">
          <CalendarPlus size={24} />
          <span className="text-sm font-semibold">New Booking</span>
        </button>

        <button className="col-span-1 flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white p-4 text-slate-600 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white">
          <UserPlus size={24} />
          <span className="text-sm font-medium">Add Client</span>
        </button>

        <button className="col-span-1 flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white p-4 text-slate-600 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white">
          <ShoppingBag size={24} />
          <span className="text-sm font-medium">Checkout</span>
        </button>

        <button className="col-span-1 flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white p-4 text-slate-600 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white">
          <Receipt size={24} />
          <span className="text-sm font-medium">View Sales</span>
        </button>
      </div>
    </div>
  );
}
