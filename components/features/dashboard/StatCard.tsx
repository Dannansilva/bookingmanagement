interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconBgColor?: string;
}

export function StatCard({ icon, value, label, iconBgColor = 'bg-amber-500' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-900 p-5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </div>
  );
}
