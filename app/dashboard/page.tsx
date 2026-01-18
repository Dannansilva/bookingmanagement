'use client';

import { DashboardLayout } from '@/components/layout';
import { StatCard, QuickActions, UpcomingAppointments } from '@/components/features/dashboard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Stats Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={
            <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          value={0}
          label="Today's Appointments"
        />
        <StatCard
          icon={
            <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value="-"
          label="Next Appointment"
        />
        <StatCard
          icon={
            <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          value={0}
          label="Walk-ins Today"
        />
        <StatCard
          icon={
            <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value={0}
          label="Completed"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-h-0 lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <div className="min-h-0">
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}
