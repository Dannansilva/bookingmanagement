"use client";

import { UserCircle } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: "available" | "busy" | "away";
  bookings: number;
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Maria Santos",
    role: "Senior Stylist",
    status: "available",
    bookings: 24,
  },
  //   { id: '2', name: 'John Doe', role: 'Barber', status: 'busy', bookings: 12 },
];

export function StaffStatus() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm h-full dark:bg-slate-900 dark:border dark:border-slate-800">
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
        Staff Status
      </h3>
      <div className="space-y-4">
        {mockStaff.map((staff) => (
          <div
            key={staff.id}
            className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                <span className="text-sm font-bold">
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm dark:text-white">
                  {staff.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {staff.role}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-teal-600 capitalize dark:text-teal-400">
                {staff.status}
              </p>
              <p className="text-[10px] text-slate-400">
                {staff.bookings} bookings
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
