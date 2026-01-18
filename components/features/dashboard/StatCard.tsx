interface StatCardProps {
  icon: React.ReactNode;
  iconBg?: string; // e.g. 'bg-blue-100'
  value: string | number;
  label: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({
  icon,
  iconBg = "bg-slate-100",
  value,
  label,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 dark:border dark:border-slate-800">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} dark:opacity-90`}
        >
          {icon}
        </div>
      </div>

      {trend && (
        <div
          className={`mt-4 text-xs font-semibold ${trendUp ? "text-teal-600 dark:text-teal-400" : "text-red-500 dark:text-red-400"}`}
        >
          {trendUp ? "↗" : "↘"} {trend}
        </div>
      )}
    </div>
  );
}
