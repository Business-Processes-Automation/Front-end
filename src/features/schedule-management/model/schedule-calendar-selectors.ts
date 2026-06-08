import type { ScheduleCalendarState } from "./schedule-calendar-state-types";

type StateWithScheduleCalendar = {
    scheduleCalendar: ScheduleCalendarState;
};

export const selectScheduleCalendar = (state: StateWithScheduleCalendar) =>
    state.scheduleCalendar.calendar;

export const selectScheduleCalendarQuery = (state: StateWithScheduleCalendar) =>
    state.scheduleCalendar.lastQuery;

export const selectSelectedAppointment = (state: StateWithScheduleCalendar) =>
    state.scheduleCalendar.selectedAppointment;

export const selectScheduleCalendarError = (state: StateWithScheduleCalendar) =>
    state.scheduleCalendar.error;

export const selectIsScheduleCalendarInitialized = (
    state: StateWithScheduleCalendar,
) => state.scheduleCalendar.isCalendarInitialized;

export const selectIsScheduleCalendarLoading = (
    state: StateWithScheduleCalendar,
) => state.scheduleCalendar.isCalendarLoading;

export const selectIsAppointmentLoading = (state: StateWithScheduleCalendar) =>
    state.scheduleCalendar.isAppointmentLoading;

export const selectLoadingAppointmentId = (state: StateWithScheduleCalendar) =>
    state.scheduleCalendar.loadingAppointmentId;
