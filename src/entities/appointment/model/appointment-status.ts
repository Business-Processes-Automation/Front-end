/** Статусы записи — совпадают с enum на бэкенде (.NET). */
export enum AppointmentStatus {
    Planned = "Planned",
    Completed = "Completed",
    Cancelled = "Cancelled",
    Rescheduled = "Rescheduled",
    NoShow = "NoShow",
}

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
    [AppointmentStatus.Planned]: "Заплановано",
    [AppointmentStatus.Completed]: "Завершено",
    [AppointmentStatus.Cancelled]: "Скасовано",
    [AppointmentStatus.Rescheduled]: "Перенесено",
    [AppointmentStatus.NoShow]: "Не з'явився",
};
