/** Настройки правил записи мастера. */
export type ScheduleSettings = {
    bufferBetweenClientsMinutes: number;
    freeSlotIntervalMinutes: number;
    minBookingNoticeMinutes: number;
    /** На скільки днів вперед можна записатися (1–365). */
    maxBookingDaysAhead: number;
    /** Скільки разів клієнт може перенести запис (0–10). */
    maxRescheduleCount: number;
    /** За скільки годин до візиту можна скасувати без штрафу (0–168). */
    cancellationPolicyHours: number;
};

/** Тело PATCH /api/masters/me/schedule/settings (все поля обязательны). */
export type ScheduleSettingsInput = ScheduleSettings;

export const DEFAULT_MAX_BOOKING_DAYS_AHEAD = 30;
export const DEFAULT_MAX_RESCHEDULE_COUNT = 2;
export const DEFAULT_CANCELLATION_POLICY_HOURS = 24;

/** Дефолты для нового мастера (когда GET → 404). */
export const DEFAULT_SCHEDULE_SETTINGS: ScheduleSettingsInput = {
    bufferBetweenClientsMinutes: 10,
    freeSlotIntervalMinutes: 15,
    minBookingNoticeMinutes: 60,
    maxBookingDaysAhead: DEFAULT_MAX_BOOKING_DAYS_AHEAD,
    maxRescheduleCount: DEFAULT_MAX_RESCHEDULE_COUNT,
    cancellationPolicyHours: DEFAULT_CANCELLATION_POLICY_HOURS,
};

export const SCHEDULE_SETTINGS_NOT_FOUND = "SCHEDULE_SETTINGS_NOT_FOUND" as const;
