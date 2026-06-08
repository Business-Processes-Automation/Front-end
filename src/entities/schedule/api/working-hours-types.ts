import type {
    UpdateWorkingHoursDayInput,
    Weekday,
    WorkingHoursDayInput,
} from "../model/working-hours-types";

export type WorkingHoursDayDto = {
    dayOfWeek: Weekday;
    isWorking: boolean;
    workStartTime: string | null;
    workEndTime: string | null;
};

export type WorkingHoursDayRequestDto = {
    dayOfWeek: Weekday;
    isWorking: boolean;
    workStartTime: string | null;
    workEndTime: string | null;
};

export type UpdateWorkingHoursDayRequestDto = {
    isWorking: boolean;
    workStartTime: string | null;
    workEndTime: string | null;
};

export function toWorkingHoursDayRequest(
    day: WorkingHoursDayInput,
): WorkingHoursDayRequestDto {
    return {
        dayOfWeek: day.dayOfWeek,
        isWorking: day.isWorking,
        workStartTime: day.isWorking ? day.workStartTime || null : null,
        workEndTime: day.isWorking ? day.workEndTime || null : null,
    };
}

export function toUpdateWorkingHoursDayRequest(
    input: UpdateWorkingHoursDayInput,
): UpdateWorkingHoursDayRequestDto {
    return {
        isWorking: input.isWorking,
        workStartTime: input.isWorking ? input.workStartTime || null : null,
        workEndTime: input.isWorking ? input.workEndTime || null : null,
    };
}
