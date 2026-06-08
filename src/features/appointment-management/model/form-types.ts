import type { Appointment, AppointmentStatus } from "@/entities/appointment";
import type {
    CreateAppointmentInput,
    RescheduleAppointmentInput,
    UpdateAppointmentInput,
} from "@/entities/appointment";
import { toApiLocalDateTime, toDatetimeLocalInput } from "@/shared/lib/date";

export type CreateAppointmentFormValues = {
    serviceId: string;
    startLocal: string;
    clientName: string;
    clientPhone: string;
};

export type UpdateAppointmentFormValues = {
    status: string;
    notes: string;
    serviceId: string;
};

export type RescheduleAppointmentFormValues = {
    startLocal: string;
};

export const EMPTY_CREATE_APPOINTMENT_FORM_VALUES: CreateAppointmentFormValues = {
    serviceId: "",
    startLocal: "",
    clientName: "",
    clientPhone: "",
};

export function appointmentToUpdateFormValues(
    appointment: Appointment,
): UpdateAppointmentFormValues {
    return {
        status: "",
        notes: appointment.notes ?? "",
        serviceId: String(appointment.serviceId),
    };
}

export function createFormValuesToInput(
    values: CreateAppointmentFormValues,
): CreateAppointmentInput {
    return {
        serviceId: Number(values.serviceId),
        startLocal: toApiLocalDateTime(values.startLocal),
        clientName: values.clientName.trim(),
        clientPhone: values.clientPhone.trim(),
    };
}

export function updateFormValuesToInput(
    values: UpdateAppointmentFormValues,
    original: Appointment,
): UpdateAppointmentInput | null {
    const input: UpdateAppointmentInput = {};
    let hasChanges = false;

    if (values.status && values.status !== original.status) {
        input.status = values.status as AppointmentStatus;
        hasChanges = true;
    }

    const trimmedNotes = values.notes.trim();
    const originalNotes = original.notes ?? "";
    if (trimmedNotes !== originalNotes) {
        input.notes = trimmedNotes === "" ? "" : trimmedNotes;
        hasChanges = true;
    }

    const nextServiceId = Number(values.serviceId);
    if (nextServiceId !== original.serviceId) {
        input.serviceId = nextServiceId;
        hasChanges = true;
    }

    return hasChanges ? input : null;
}

export function appointmentToRescheduleFormValues(
    appointment: Appointment,
): RescheduleAppointmentFormValues {
    return {
        startLocal: toDatetimeLocalInput(appointment.startLocal),
    };
}

export function rescheduleFormValuesToInput(
    values: RescheduleAppointmentFormValues,
): RescheduleAppointmentInput {
    return {
        startLocal: toApiLocalDateTime(values.startLocal),
    };
}

export function defaultCreateStartLocal(): string {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
