"use client";

import { DashboardLayout } from "@/components/layout";
import { StatCard, QuickActions } from "@/components/features/dashboard";
import { RevenueChart } from "@/components/features/dashboard/RevenueChart";
import { StaffStatus } from "@/components/features/dashboard/StaffStatus";
import { Calendar, DollarSign, Clock, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Welcome back! Here&apos;s what&apos;s happening at Luxe Salon today.
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          iconBg="bg-blue-100 dark:bg-blue-500/10"
          value="12"
          label="Today's Appointments"
          trend="+12% vs yesterday"
          trendUp={true}
        />
        <StatCard
          icon={
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          }
          iconBg="bg-green-100 dark:bg-green-500/10"
          value="$1,616"
          label="Today's Revenue"
          trend="+8% vs yesterday"
          trendUp={true}
        />
        <StatCard
          icon={
            <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          }
          iconBg="bg-amber-100 dark:bg-amber-500/10"
          value="76"
          label="Pending Bookings"
        />
        <StatCard
          icon={
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          }
          iconBg="bg-red-100 dark:bg-red-500/10"
          value="5"
          label="Low Stock Alerts"
          trend="-2% from last week"
          trendUp={false}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (Chart) */}
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart />
        </div>

        {/* Right Column (Quick Actions & Staff) */}
        <div className="space-y-6">
          <QuickActions />
          <StaffStatus />
        </div>
      </div>
    </DashboardLayout>
  );
}
