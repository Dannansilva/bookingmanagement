"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan 5", value: 1800 },
  { name: "Jan 6", value: 2500 },
  { name: "Jan 7", value: 1200 },
  { name: "Jan 8", value: 3100 },
  { name: "Jan 9", value: 2800 },
  { name: "Jan 10", value: 4100 },
  { name: "Jan 11", value: 4500 },
  { name: "Jan 12", value: 1600 },
  { name: "Jan 13", value: 3800 },
  { name: "Jan 14", value: 2200 },
  { name: "Jan 15", value: 3900 },
  { name: "Jan 16", value: 1600 },
  { name: "Jan 17", value: 2400 },
  { name: "Jan 18", value: 2100 },
];

export function RevenueChart() {
  const [timeRange, setTimeRange] = useState("14 days");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:border dark:border-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Revenue Overview
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total: Rs. 28,778 • Avg: Rs. 2,056/day
          </p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          {["7 days", "14 days", "30 days"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                timeRange === range
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
              className="dark:stroke-slate-800"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `Rs. ${value}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                backgroundColor: "var(--background-paper)",
                color: "var(--text-primary)",
              }}
              itemStyle={{ color: "#0d9488" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#0d9488", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
