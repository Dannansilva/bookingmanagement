"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Calendar as CalendarIcon,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Mock Data for Charts
const revenueData = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 5500 },
  { name: "Thu", revenue: 4500 },
  { name: "Fri", revenue: 8000 },
  { name: "Sat", revenue: 12000 },
  { name: "Sun", revenue: 9000 },
];

const categoryData = [
  { name: "Massage", value: 45 },
  { name: "Facial", value: 25 },
  { name: "Ayurveda", value: 20 },
  { name: "Yoga", value: 10 },
];

const COLORS = ["#0d9488", "#14b8a6", "#5eead4", "#99f6e4"]; // Teal shades

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("This Week");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 pb-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Business Reports
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Insights and performance analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none dark:bg-slate-900 dark:border-slate-800 dark:text-white"
            >
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-medium transition-colors dark:bg-slate-800 dark:hover:bg-slate-700">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Revenue",
              value: "Rs. 46,500",
              icon: DollarSign,
              trend: "+12%",
              up: true,
              color:
                "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
            },
            {
              label: "Bookings",
              value: "84",
              icon: CalendarIcon,
              trend: "+5%",
              up: true,
              color:
                "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
            },
            {
              label: "New Clients",
              value: "12",
              icon: Users,
              trend: "-2%",
              up: false,
              color:
                "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
            },
            {
              label: "Avg. Sale",
              value: "Rs. 2,100",
              icon: TrendingUp,
              trend: "+8%",
              up: true,
              color:
                "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.up ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"}`}
                >
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 mb-6 dark:text-white">
              Revenue Trend
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    itemStyle={{ color: "#0f172a", fontWeight: "bold" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0d9488"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 mb-6 dark:text-white">
              Sales by Category
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {categoryData.map((cat, i) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-slate-600 dark:text-slate-400">
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {cat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Services Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Top Performing Services
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">Service Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Bookings</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      Swedish Massage (60 min)
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      Massage
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600 dark:text-slate-300">
                      45
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-teal-600 dark:text-teal-400">
                      Rs. 360,000
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
