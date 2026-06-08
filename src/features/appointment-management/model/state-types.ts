import type {
    Appointment,
    AppointmentListQuery,
    UpdateAppointmentInput,
} from "@/entities/appointment";

export type UpdateAppointmentPayload = {
    id: number;
    input: UpdateAppointmentInput;
};

export type AppointmentsState = {
    items: Appointment[];
    selectedAppointment: Appointment | null;
    isInitialized: boolean;
    isListLoading: boolean;
    isDetailLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    lastQuery: AppointmentListQuery | null;
};
