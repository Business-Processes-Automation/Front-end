import type { AppointmentStatus } from "../model/appointment-status";

export type AppointmentDto = {
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

export type CreateAppointmentRequestDto = {
    serviceId: number;
    startLocal: string;
    clientName: string;
    clientPhone: string;
};

export type UpdateAppointmentRequestDto = {
    status?: AppointmentStatus;
    notes?: string | null;
    serviceId?: number;
};

export type RescheduleAppointmentRequestDto = {
    startLocal: string;
};
