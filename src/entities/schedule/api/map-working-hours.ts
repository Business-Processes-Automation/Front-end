import type { WorkingHoursDay } from "../model/working-hours-types";
import type { WorkingHoursDayDto } from "./working-hours-types";

export function mapWorkingHoursDay(dto: WorkingHoursDayDto): WorkingHoursDay {
    return {
        dayOfWeek: dto.dayOfWeek,
        isWorking: dto.isWorking,
        workStartTime: dto.workStartTime ?? "",
        workEndTime: dto.workEndTime ?? "",
    };
}

export function mapWorkingHoursWeek(
    dtos: readonly WorkingHoursDayDto[],
): WorkingHoursDay[] {
    return dtos.map(mapWorkingHoursDay);
}
