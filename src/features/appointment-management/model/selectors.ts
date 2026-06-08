import type { AppointmentsState } from "./state-types";

type StateWithAppointments = {
    appointments: AppointmentsState;
};

export const selectAppointments = (state: StateWithAppointments) =>
    state.appointments.items;

export const selectSelectedAppointment = (state: StateWithAppointments) =>
    state.appointments.selectedAppointment;

export const selectAppointmentsError = (state: StateWithAppointments) =>
    state.appointments.error;

export const selectIsAppointmentsInitialized = (state: StateWithAppointments) =>
    state.appointments.isInitialized;

export const selectIsAppointmentsListLoading = (state: StateWithAppointments) =>
    state.appointments.isListLoading;

export const selectIsAppointmentDetailLoading = (state: StateWithAppointments) =>
    state.appointments.isDetailLoading;

export const selectIsAppointmentSubmitting = (state: StateWithAppointments) =>
    state.appointments.isSubmitting;

export const selectAppointmentsLastQuery = (state: StateWithAppointments) =>
    state.appointments.lastQuery;
