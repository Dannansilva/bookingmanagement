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
import { AppointmentModal } from "./AppointmentModal";

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

  // Initialize master list from mock data
  const [allAppointments, setAllAppointments] = useState<CalendarAppointment[]>(
    () => {
      const flattened: CalendarAppointment[] = [];
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
      return flattened;
    },
  );

  // Filter for current date
  const appointments = useMemo(() => {
    const activeStaffIds = new Set(
      mockData.employees.filter((e) => e.isActive).map((e) => e._id),
    );

    return allAppointments.filter(
      (app) =>
        isSameDay(parseISO(app.scheduledStartTime), currentDate) &&
        activeStaffIds.has(app.assignedTo._id),
    );
  }, [currentDate, allAppointments]);

  // Handle move
  const handleAppointmentMove = (
    appointmentId: string,
    newStaffId: string,
    newStartTime: Date,
  ) => {
    setAllAppointments((prev) =>
      prev.map((app) => {
        if (app._id === appointmentId) {
          // Find new staff details
          const newStaff = mockData.employees.find((e) => e._id === newStaffId);

          return {
            ...app,
            assignedTo: {
              _id: newStaffId,
              name: newStaff?.name || app.assignedTo.name,
              designation: newStaff?.designation || app.assignedTo.designation,
            },
            scheduledStartTime: newStartTime.toISOString(),
          };
        }
        return app;
      }),
    );
  };

  // Get active staff
  const activeStaff = mockData.employees.filter((e) => e.isActive);

  const handlePrevDay = () => setCurrentDate((prev) => addDays(prev, -1));
  const handleNextDay = () => setCurrentDate((prev) => addDays(prev, 1));
  const handleToday = () => setCurrentDate(new Date());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    staffId: string;
    staffName: string;
    startTime: Date;
  } | null>(null);

  const handleTimeSlotClick = (staffId: string, time: Date) => {
    const staff = activeStaff.find((s) => s._id === staffId);
    if (staff) {
      setSelectedSlot({
        staffId,
        staffName: staff.name,
        startTime: time,
      });
      setIsModalOpen(true);
    }
  };

  const handleCreateAppointment = (data: any) => {
    const newAppointment: CalendarAppointment = {
      _id: `new-${Date.now()}`,
      bookingId: `book-${Date.now()}`,
      clientName: data.clientName,
      clientPhone: "",
      service: {
        name: data.serviceName,
        description: "",
      },
      assignedTo: {
        _id: data.staffId,
        name: activeStaff.find((s) => s._id === data.staffId)?.name || "",
        designation: "THERAPIST", // Default
      },
      scheduledStartTime: data.startTime.toISOString(),
      duration: data.duration,
      status: "confirmed",
      price: 0, // Default
    };

    setAllAppointments((prev) => [...prev, newAppointment]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateAppointment}
        initialData={selectedSlot || undefined}
      />

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
        onAppointmentMove={handleAppointmentMove}
        onTimeSlotClick={handleTimeSlotClick}
      />
    </div>
  );
};
