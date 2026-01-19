"use client";

import React, { useRef, useEffect } from "react";
import { format } from "date-fns";
import {
  generateTimeSlots,
  HOUR_HEIGHT,
  SLOT_DURATION,
  PIXELS_PER_MINUTE,
  START_HOUR,
  END_HOUR,
  getTimeFromPixels,
} from "@/lib/calendarUtils";
import { AppointmentCard } from "./AppointmentCard";
import { TimeIndicator } from "./TimeIndicator";

interface ResourceGridProps {
  date: Date;
  staff: any[]; // List of staff members
  appointments: any[]; // Flat list of processed appointment items
  onAppointmentClick?: (appointment: any) => void;
  onTimeSlotClick?: (staffId: string, time: Date) => void;
  onAppointmentMove?: (
    appointmentId: string,
    newStaffId: string,
    newStartTime: Date,
  ) => void;
}

export const ResourceGrid = ({
  date,
  staff,
  appointments,
  onAppointmentClick,
  onTimeSlotClick,
  onAppointmentMove,
}: ResourceGridProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timeSlots = generateTimeSlots(date);

  // State for hover
  const [hoveredTime, setHoveredTime] = React.useState<{
    time: Date;
    top: number;
  } | null>(null);
  const [hoveredStaffId, setHoveredStaffId] = React.useState<string | null>(
    null,
  );

  // Handlers
  const handleMouseMove = (e: React.MouseEvent, staffId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top; // Relative to current target (the column div)

    // Snap to 15 mins (PIXELS_PER_MINUTE = 2.5)
    // 15 mins = 37.5px
    const rawMinutes = y / 2.5;
    const roundedMinutes = Math.floor(rawMinutes / 15) * 15;
    const top = roundedMinutes * 2.5;

    const time = getTimeFromPixels(top);

    setHoveredTime({ time, top });
    setHoveredStaffId(staffId);
  };

  const handleMouseLeave = () => {
    setHoveredTime(null);
    setHoveredStaffId(null);
  };

  const handleDragOver = (e: React.DragEvent, staffId: string) => {
    e.preventDefault(); // Allow drop
    // We reuse mouse move logic for ghost/indicator
    // However, for dragover, we might need clientY relative to the target again
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const rawMinutes = y / 2.5;
    const roundedMinutes = Math.floor(rawMinutes / 15) * 15;
    const top = roundedMinutes * 2.5;
    const time = getTimeFromPixels(top);

    setHoveredTime({ time, top });
    setHoveredStaffId(staffId);
  };

  const handleDrop = (e: React.DragEvent, staffId: string) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("appointment");
      if (data && hoveredTime) {
        const appointment = JSON.parse(data);
        // Call parent
        onAppointmentMove?.(appointment._id, staffId, hoveredTime.time);
      }
    } catch (err) {
      console.error("Failed to parse dropped appointment", err);
    }
    handleMouseLeave();
  };

  // Sync header scroll with body scroll
  const handleScroll = () => {
    if (headerRef.current && scrollContainerRef.current) {
      headerRef.current.scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  // Scroll to 8 AM (start of day) initially
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden bg-white dark:bg-slate-900 h-full border rounded-lg shadow-sm">
      {/* Header: Staff Names */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 shrink-0">
        {/* Time Column Header (Empty spacer) */}
        <div className="flex-none w-16 border-r border-slate-200 dark:border-slate-800 shrink-0" />

        {/* Staff Columns Header - Synced Scroll */}
        <div ref={headerRef} className="flex flex-1 overflow-hidden">
          <div className="flex min-w-full">
            {staff.map((member) => (
              <div
                key={member._id}
                className="flex-1 min-w-[200px] py-3 px-2 text-center border-r border-slate-200 dark:border-slate-800 last:border-r-0 shrink-0"
              >
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {member.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body: Time Slots and Grid */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex flex-1 overflow-auto relative"
      >
        <div className="flex min-w-full h-full">
          {/* Time Labels Column - Sticky */}
          <div className="flex-none w-16 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky left-0 z-30 shrink-0">
            <div className="relative h-full" style={{ marginTop: "12px" }}>
              {timeSlots.map((time, i) => (
                <div
                  key={i}
                  className="absolute w-full text-right pr-2 text-xs text-slate-400 font-medium transform -translate-y-1/2"
                  style={{ top: i * HOUR_HEIGHT }}
                >
                  {format(time, "h a")}
                </div>
              ))}
            </div>
          </div>

          {/* Main Grid Area */}
          <div className="flex-1 relative min-w-0">
            <div
              className="relative w-full h-full"
              style={{ marginTop: "12px" }}
            >
              {/* Background Grid Lines */}
              {timeSlots.map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="absolute w-full border-t border-slate-100 dark:border-slate-800/50"
                  style={{ top: i * HOUR_HEIGHT }}
                />
              ))}

              {/* Current Time Indicator */}
              <TimeIndicator />

              {/* Staff Columns */}
              <div className="flex absolute inset-0">
                {staff.map((member) => {
                  const memberAppointments = appointments.filter(
                    (app) => app.assignedTo._id === member._id,
                  );

                  return (
                    <div
                      key={member._id}
                      className="flex-1 min-w-[200px] border-r border-slate-200 dark:border-slate-800 last:border-r-0 relative group shrink-0"
                    >
                      {memberAppointments.map((app: any) => (
                        <AppointmentCard
                          key={app._id}
                          appointment={app}
                          onClick={onAppointmentClick}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
