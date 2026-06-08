/** Статус запису (рядковий enum з API). */
export type AppointmentStatus =
    | "Planned"
    | "Completed"
    | "Cancelled"
    | "Rescheduled"
    | "NoShow";

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
    Planned: "Заплановано",
    Completed: "Завершено",
    Cancelled: "Скасовано",
    Rescheduled: "Перенесено",
    NoShow: "Не з'явився",
};

/** Статуси, з яких дозволено ручну зміну через PATCH. */
export const EDITABLE_APPOINTMENT_STATUSES = [
    "Planned",
    "Rescheduled",
] as const satisfies readonly AppointmentStatus[];

/** Цільові статуси при PATCH (лише з Planned / Rescheduled). */
export const MANUAL_STATUS_TRANSITIONS = [
    "Completed",
    "Cancelled",
    "NoShow",
] as const satisfies readonly AppointmentStatus[];

/** Статуси для PATCH-форми (скасування — окремий POST /cancel). */
export const PATCH_STATUS_TRANSITIONS = [
    "Completed",
    "NoShow",
] as const satisfies readonly AppointmentStatus[];

export function canChangeAppointmentStatus(status: AppointmentStatus): boolean {
    return (EDITABLE_APPOINTMENT_STATUSES as readonly AppointmentStatus[]).includes(
        status,
    );
}

export function canCancelAppointment(status: AppointmentStatus): boolean {
    return canChangeAppointmentStatus(status);
}

export function canRescheduleAppointment(
    appointment: { status: AppointmentStatus; rescheduleCount: number },
    maxRescheduleCount: number,
): boolean {
    if (!canChangeAppointmentStatus(appointment.status)) {
        return false;
    }

    if (maxRescheduleCount <= 0) {
        return false;
    }

    return appointment.rescheduleCount < maxRescheduleCount;
}

/** Статус для відображення в UI (враховує displayStatus з API). */
export function getAppointmentDisplayLabel(
    status: AppointmentStatus,
    displayStatus: AppointmentStatus,
): string {
    return APPOINTMENT_STATUS_LABELS[displayStatus ?? status];
}
