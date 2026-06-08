export { appointmentApi, mapAppointment, mapAppointmentList } from "./api";
export type {
    AppointmentDto,
    CreateAppointmentRequestDto,
    RescheduleAppointmentRequestDto,
    UpdateAppointmentRequestDto,
} from "./api";
export type {
    Appointment,
    AppointmentListQuery,
    AppointmentStatus,
    CreateAppointmentInput,
    RescheduleAppointmentInput,
    UpdateAppointmentInput,
} from "./model";
export {
    APPOINTMENT_NOT_FOUND,
    APPOINTMENT_STATUS_LABELS,
    EDITABLE_APPOINTMENT_STATUSES,
    MANUAL_STATUS_TRANSITIONS,
    PATCH_STATUS_TRANSITIONS,
    canCancelAppointment,
    canChangeAppointmentStatus,
    canRescheduleAppointment,
    getAppointmentDisplayLabel,
} from "./model";
