import type {
    AppointmentDetails,
    ScheduleCalendar,
    ScheduleCalendarQuery,
} from "@/entities/schedule";

export type ScheduleCalendarState = {
    calendar: ScheduleCalendar | null;
    lastQuery: ScheduleCalendarQuery | null;
    selectedAppointment: AppointmentDetails | null;
    isCalendarInitialized: boolean;
    isCalendarLoading: boolean;
    isAppointmentLoading: boolean;
    loadingAppointmentId: number | null;
    error: string | null;
};
