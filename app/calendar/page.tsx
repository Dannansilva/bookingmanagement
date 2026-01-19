import { DashboardLayout } from "@/components/layout";
import { CalendarBoard } from "@/components/features/calendar/CalendarBoard";

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <CalendarBoard />
      </div>
    </DashboardLayout>
  );
}
