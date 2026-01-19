"use client";

import React, { useEffect, useState } from "react";
import { getCurrentTimePosition } from "@/lib/calendarUtils";

export const TimeIndicator = () => {
  const [top, setTop] = useState(-1);

  useEffect(() => {
    setTop(getCurrentTimePosition());
    const interval = setInterval(() => {
      setTop(getCurrentTimePosition());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (top < 0) return null;

  return (
    <div
      className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
      style={{ top }}
    >
      <div className="absolute -left-2 h-3 w-3 rounded-full bg-red-500" />
      <div className="h-[2px] w-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.6)]" />
    </div>
  );
};
