import type { ScheduleSettings } from "../model/settings-types";
import {
    DEFAULT_CANCELLATION_POLICY_HOURS,
    DEFAULT_MAX_BOOKING_DAYS_AHEAD,
    DEFAULT_MAX_RESCHEDULE_COUNT,
} from "../model/settings-types";
import type { ScheduleSettingsDto } from "./types";

export function mapScheduleSettings(dto: ScheduleSettingsDto): ScheduleSettings {
    return {
        bufferBetweenClientsMinutes: dto.bufferBetweenClientsMinutes,
        freeSlotIntervalMinutes: dto.freeSlotIntervalMinutes,
        minBookingNoticeMinutes: dto.minBookingNoticeMinutes,
        maxBookingDaysAhead:
            dto.maxBookingDaysAhead ?? DEFAULT_MAX_BOOKING_DAYS_AHEAD,
        maxRescheduleCount:
            dto.maxRescheduleCount ?? DEFAULT_MAX_RESCHEDULE_COUNT,
        cancellationPolicyHours:
            dto.cancellationPolicyHours ?? DEFAULT_CANCELLATION_POLICY_HOURS,
    };
}
