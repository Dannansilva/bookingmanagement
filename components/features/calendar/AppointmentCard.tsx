import React from "react";
import { getHeight, getTopPosition } from "@/lib/calendarUtils";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Scissors } from "lucide-react";

interface AppointmentCardProps {
  appointment: any; // Using any for now based on mock structure complexity
  onClick?: (appointment: any) => void;
}

export const AppointmentCard = ({
  appointment,
  onClick,
}: AppointmentCardProps) => {
  // Find the specific service item for this appointment from the booking
  // NOTE: In a real app, we'd pass the specific BookingServiceItem.
  // For this mock implementation, we assume 'appointment' is the BookingServiceItem joined with booking details.
  // If we are passing the raw booking, we need to handle multi-item bookings by rendering separate cards or a grouped card.
  // For the V1 Resource View, we usually want to render individual Service Items assigned to specific staff.

  // Let's assume 'appointment' here is a processed object containing:
  // { ...BookingServiceItem, clientName, status, paymentMode }

  const {
    scheduledStartTime,
    duration,
    service,
    clientName,
    status, // confirmed, pending, etc.
    price,
    notes,
  } = appointment;

  const top = getTopPosition(scheduledStartTime);
  const height = getHeight(duration);

  // Status colors
  const statusStyles = {
    confirmed:
      "bg-teal-100 border-teal-500 text-teal-900 dark:bg-teal-900/30 dark:border-teal-500/50 dark:text-teal-100",
    pending:
      "bg-amber-100 border-amber-500 text-amber-900 dark:bg-amber-900/30 dark:border-amber-500/50 dark:text-amber-100",
    completed:
      "bg-slate-100 border-slate-500 text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300",
    cancelled:
      "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:border-red-500/50 dark:text-red-100",
  };

  const currentStatusStyle =
    statusStyles[status?.toLowerCase() as keyof typeof statusStyles] ||
    statusStyles.confirmed;

  return (
    <div
      className={cn(
        "absolute left-1 right-1 rounded-md border-l-4 px-2 py-1 text-xs shadow-sm cursor-pointer transition-all hover:brightness-95 hover:z-10 overflow-hidden",
        currentStatusStyle,
      )}
      style={{ top, height: Math.max(height - 2, 20) }} // -2 for margin/spacing
      onClick={() => onClick?.(appointment)}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="font-bold truncate">{clientName}</div>
          <div className="truncate opacity-90">{service.name}</div>
        </div>
        {height > 40 && (
          <div className="flex items-center gap-1 opacity-75 mt-1">
            <Scissors size={10} />
            <span>{format(parseISO(scheduledStartTime), "h:mm a")}</span>
          </div>
        )}
      </div>
    </div>
  );
};
