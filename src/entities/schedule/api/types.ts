import type { ScheduleSettings } from "../model/settings-types";

export type ScheduleSettingsDto = Partial<ScheduleSettings> &
    Pick<
        ScheduleSettings,
        | "bufferBetweenClientsMinutes"
        | "freeSlotIntervalMinutes"
        | "minBookingNoticeMinutes"
    >;

export type UpdateScheduleSettingsDto = ScheduleSettings;
