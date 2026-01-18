import Link from 'next/link';

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

const quickActions: QuickAction[] = [
  {
    label: 'New Appointment',
    description: 'Schedule appointment',
    href: '/appointments/new',
    iconBgColor: 'bg-amber-500/20 text-amber-500',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Add Client',
    description: 'Register new client',
    href: '/clients/new',
    iconBgColor: 'bg-blue-500/20 text-blue-500',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    label: 'Services',
    description: 'Manage services',
    href: '/services',
    iconBgColor: 'bg-purple-500/20 text-purple-500',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
];

export function QuickActions() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-slate-900 p-6">
      <h2 className="mb-1 text-lg font-semibold text-white">Quick Actions</h2>
      <p className="mb-4 text-sm text-slate-400">Common tasks</p>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center justify-between rounded-lg border border-slate-800 p-4 transition-colors hover:border-slate-700 hover:bg-slate-800/50"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.iconBgColor}`}>
                {action.icon}
              </div>
              <div>
                <p className="font-medium text-white">{action.label}</p>
                <p className="text-sm text-slate-400">{action.description}</p>
              </div>
            </div>
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
