import type { AppointmentStatus } from "./appointment-status";

/** Основний об'єкт запису — AppointmentResponseDTO. */
export type Appointment = {
    id: number;
    serviceId: number;
    serviceName: string;
    durationInMinutes: number;
    totalOccupiedMinutes: number;
    clientId: number;
    clientName: string;
    clientPhone: string;
    startLocal: string;
    endLocal: string;
    status: AppointmentStatus;
    displayStatus: AppointmentStatus;
    rescheduleCount: number;
    notes: string | null;
    priceAtBooking: number;
    prepaymentAmount: number;
};

/** Query GET /api/masters/me/appointments. */
export type AppointmentListQuery = {
    from: string;
    to: string;
    status?: AppointmentStatus;
    serviceId?: number;
};

/** Тіло POST /api/masters/me/appointments. */
export type CreateAppointmentInput = {
    serviceId: number;
    startLocal: string;
    clientName: string;
    clientPhone: string;
};

/** Тіло PATCH /api/masters/me/appointments/{id}. */
export type UpdateAppointmentInput = {
    status?: AppointmentStatus;
    notes?: string | null;
    serviceId?: number;
};

/** Тіло POST /api/masters/me/appointments/{id}/reschedule. */
export type RescheduleAppointmentInput = {
    startLocal: string;
};

export const APPOINTMENT_NOT_FOUND = "Запис не знайдено." as const;
