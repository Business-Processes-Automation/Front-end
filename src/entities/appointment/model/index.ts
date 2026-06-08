export type {
    Appointment,
    AppointmentListQuery,
    CreateAppointmentInput,
    RescheduleAppointmentInput,
    UpdateAppointmentInput,
} from "./appointment-types";
export { APPOINTMENT_NOT_FOUND } from "./appointment-types";
export type { AppointmentStatus } from "./appointment-status";
export {
    APPOINTMENT_STATUS_LABELS,
    EDITABLE_APPOINTMENT_STATUSES,
    MANUAL_STATUS_TRANSITIONS,
    PATCH_STATUS_TRANSITIONS,
    canCancelAppointment,
    canChangeAppointmentStatus,
    canRescheduleAppointment,
    getAppointmentDisplayLabel,
} from "./appointment-status";
