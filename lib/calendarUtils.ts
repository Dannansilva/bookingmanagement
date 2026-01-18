import { format, setHours, setMinutes, startOfDay, addMinutes, differenceInMinutes, parseISO } from "date-fns";

export const START_HOUR = 8; // 8:00 AM
export const END_HOUR = 20; // 8:00 PM
export const SLOT_DURATION = 15; // 15 minutes
export const PIXELS_PER_MINUTE = 2.5; // Height of 1 minute in pixels
export const HOUR_HEIGHT = 60 * PIXELS_PER_MINUTE;

// Calculate the vertical position (top) for a given time
export const getTopPosition = (dateStr: string) => {
  const date = parseISO(dateStr);
  const startOfDayDate = startOfDay(date);
  const startTime = setMinutes(setHours(startOfDayDate, START_HOUR), 0);
  
  const diffMinutes = differenceInMinutes(date, startTime);
  return Math.max(0, diffMinutes * PIXELS_PER_MINUTE);
};

// Calculate the height of an appointment based on its duration
export const getHeight = (durationMinutes: number) => {
  return durationMinutes * PIXELS_PER_MINUTE;
};

// Generate time slots for the grid
export const generateTimeSlots = (baseDate: Date = new Date()) => {
  const slots = [];
  let currentTime = setMinutes(setHours(baseDate, START_HOUR), 0);
  const endTime = setMinutes(setHours(baseDate, END_HOUR), 0);

  while (currentTime <= endTime) {
    slots.push(new Date(currentTime));
    currentTime = addMinutes(currentTime, 60); // We primarily render hour lines
  }
  return slots;
};

// Get current time position
export const getCurrentTimePosition = () => {
  const now = new Date();
  const startOfDayDate = startOfDay(now);
  const startTime = setMinutes(setHours(startOfDayDate, START_HOUR), 0);
  
  const diffMinutes = differenceInMinutes(now, startTime);
  if (diffMinutes < 0) return -1; // Before start time
  
  const totalDayMinutes = (END_HOUR - START_HOUR) * 60;
  if (diffMinutes > totalDayMinutes) return -1; // After end time

  return diffMinutes * PIXELS_PER_MINUTE;
};

// Calculate time from pixels (Y position)
export const getTimeFromPixels = (pixels: number) => {
  const minutes = pixels / PIXELS_PER_MINUTE;
  const now = new Date();
  const startOfDayDate = startOfDay(now);
  const startTime = setMinutes(setHours(startOfDayDate, START_HOUR), 0);
  
  return addMinutes(startTime, minutes);
};
