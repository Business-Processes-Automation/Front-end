import type { Appointment, AppointmentStatus } from "@/entities/appointment";

import type { TimeOff } from "./time-off-types";

export type { AppointmentStatus };

export type CalendarWorkingHours = {
    start: string;
    end: string;
};

export type CalendarAppointmentSummary = {
    id: number;
    serviceId: number;
    startLocal: string;
    endLocal: string;
    serviceName: string;
    clientName: string;
    status: AppointmentStatus;
};

export type CalendarDay = {
    date: string;
    workingHours: CalendarWorkingHours | null;
    timeOffs: TimeOff[];
    appointments: CalendarAppointmentSummary[];
};

/** Відповідь GET /api/masters/me/schedule/calendar. */
export type ScheduleCalendar = {
    timeZone: string;
    from: string;
    to: string;
    days: CalendarDay[];
};

/** Деталі запису з календаря — той самий DTO, що й AppointmentResponseDTO. */
export type AppointmentDetails = Appointment;

export type ScheduleCalendarQuery = {
    from: string;
    to: string;
    includeCancelled?: boolean;
    status?: AppointmentStatus;
    serviceId?: number;
};
