interface Appointment {
  id: string;
  clientName: string;
  serviceName: string;
  time: string;
  status: string;
}

interface UpcomingAppointmentsProps {
  appointments?: Appointment[];
}

export function UpcomingAppointments({ appointments = [] }: UpcomingAppointmentsProps) {
  if (appointments.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Upcoming Appointments</h2>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-800">
            <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-slate-400">No upcoming appointments today</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl bg-slate-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Upcoming Appointments</h2>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 p-4"
          >
            <div>
              <p className="font-medium text-white">{appointment.clientName}</p>
              <p className="text-sm text-slate-400">{appointment.serviceName}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-amber-500">{appointment.time}</p>
              <p className="text-sm text-slate-400">{appointment.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
