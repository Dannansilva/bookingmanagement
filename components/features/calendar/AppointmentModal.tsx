"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    staffId: string;
    staffName: string;
    startTime: Date;
  };
}

export const AppointmentModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AppointmentModalProps) => {
  const [clientName, setClientName] = useState("");
  const [serviceName, setServiceName] = useState("Swedish Massage"); // Default
  const [duration, setDuration] = useState(60);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setClientName("");
      setServiceName("Swedish Massage");
      setDuration(60);
    }
  }, [isOpen]);

  if (!isOpen || !initialData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      clientName,
      serviceName,
      duration,
      staffId: initialData.staffId,
      startTime: initialData.startTime,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-800">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            New Appointment
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-only Context */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Staff
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {initialData.staffName}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Time
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {format(initialData.startTime, "h:mm a")}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Client Name
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Service
            </label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Swedish Massage">Swedish Massage</option>
              <option value="Deep Tissue">Deep Tissue</option>
              <option value="Facial">Facial</option>
              <option value="Haircut">Haircut</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Duration (minutes)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Create Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
