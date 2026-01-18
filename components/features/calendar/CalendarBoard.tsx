"use client";

import React, { useState, useMemo } from "react";
import { ResourceGrid } from "./ResourceGrid";
import { addDays, format, isSameDay, parseISO, startOfDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
} from "lucide-react";
import mockData from "@/mockData.json";

// Types for our processed data
interface CalendarAppointment {
  _id: string; // The BookingServiceItem ID
  bookingId: string;
  clientName: string;
  clientPhone: string;
  service: {
    name: string;
    description: string;
  };
  assignedTo: {
    _id: string;
    name: string;
    designation: string;
  };
  scheduledStartTime: string;
  duration: number;
  status: string;
  price: number;
  paymentMode?: string;
  notes?: string;
}

export const CalendarBoard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Process mock data to flatten bookings into service items suitable for the calendar
  const appointments = useMemo(() => {
    const flattened: CalendarAppointment[] = [];
    const activeStaffIds = new Set(
      mockData.employees.filter((e) => e.isActive).map((e) => e._id),
    );

    mockData.bookings.forEach((booking) => {
      booking.bookingServiceItems.forEach((item) => {
        if (!item.isOptimistic) {
          flattened.push({
            _id: item._id,
            bookingId: booking._id,
            clientName: booking.client.fullName,
            clientPhone: booking.client.phone,
            service: {
              name: item.service.name,
              description: item.service.description,
            },
            assignedTo: item.assignedTo,
            scheduledStartTime: item.scheduledStartTime,
            duration: item.duration,
            status: booking.status,
            price: item.finalPrice,
            paymentMode: booking.paymentMode,
            notes: booking.notes,
          });
        }
      });
    });

    // Filter for current date
    return flattened.filter(
      (app) =>
        isSameDay(parseISO(app.scheduledStartTime), currentDate) &&
        activeStaffIds.has(app.assignedTo._id),
    );
  }, [currentDate]);

  // Get active staff
  const activeStaff = mockData.employees.filter((e) => e.isActive);

  const handlePrevDay = () => setCurrentDate((prev) => addDays(prev, -1));
  const handleNextDay = () => setCurrentDate((prev) => addDays(prev, 1));
  const handleToday = () => setCurrentDate(new Date());

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-teal-600" />
            {format(currentDate, "MMMM d, yyyy")}
          </h2>
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-1">
            <button
              onClick={handlePrevDay}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              Today
            </button>
            <button
              onClick={handleNextDay}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-teal-200 dark:shadow-none transition-colors">
            New Booking
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <ResourceGrid
        date={currentDate}
        staff={activeStaff}
        appointments={appointments}
        onAppointmentClick={(app) => console.log("Clicked appointment", app)}
      />
    </div>
  );
};
